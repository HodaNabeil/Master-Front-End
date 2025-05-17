import { Box } from "@chakra-ui/react";
import { startTransition } from "react";
import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import CompaniesFilter from "./CompaniesFilter";
import CompaniesView from "./CompaniesView";
import { useUpdateUserCompaniesMutation } from "@/Redux";
import { Helper } from "@/Utility";
const InitialState = {
    SectionId: "",
    CityId: "",
    Residential: {},
    Commercial: {}
};
const CompaniesComp = ({ Toast, Lang, Rtl }) => {
    const { UserSelectedResidential, UserSelectedCommercial } = useSelector((state) => state.Auth);
    const { City } = useSelector((state) => state.Public);
    const [State, SetState] = useState(InitialState);
    const [UpdateCompanies, { isError, error, isLoading }] = useUpdateUserCompaniesMutation();
    useEffect(() => {
        if (isError) {
            const Msg = Helper.ValidateErrorMessage(error);
            Toast("error", Msg);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isError]);
    const SecttionsOptions = useMemo(() => {
        // Lang?.DATA_PAGE?.TABS?.SECTIONS
        return Lang?.DATA_PAGE?.TABS?.SECTIONS
            ? Lang?.DATA_PAGE?.TABS?.SECTIONS?.map((item) => {
                  return {
                      Name: item.ViewLabel,
                      Value: item.value
                  };
              })
            : [];
    }, [Lang?.DATA_PAGE?.TABS?.SECTIONS]);
    const CitiesOptions = useMemo(() => {
        return City?.length > 0
            ? City.reduce((prev, curr) => {
                  const { CitySectionId, CitySection, CityName, CityId, CityAreas } = curr || {};
                  if (!prev[CitySectionId]) {
                      prev[CitySectionId] = [];
                  }
                  prev[CitySectionId].push({
                      Name: CityName,
                      Value: CityId,
                      CityAreas: CityAreas?.map((item) => {
                          return {
                              Label: item.AreaName,
                              Value: item.AreaId,
                              CitySection: CitySection
                          };
                      }),
                      CitySection: CitySection
                  });
                  return prev;
              }, {})
            : {};
    }, [City]);
    const CityOptions = useMemo(() => {
        const Data = CitiesOptions?.[State.SectionId] || [];
        const CityData = Data?.filter((item) => item.Value == State.CityId);
        const AreasData = CityData.length > 0 ? CityData[0]?.CityAreas : [];
        return {
            Options: Data?.map((item) => {
                return {
                    Name: item.Name,
                    Value: item.Value
                };
            }),
            CityAreas: AreasData
        };
    }, [CitiesOptions, State.CityId, State.SectionId]);
    const Selected = useMemo(() => {
        const Sec = Helper.GetSectionByIdOrName(State.SectionId);
        if (Sec) {
            return {
                CitySection: Sec,
                Data: Array.isArray(State?.[Sec]?.[State?.CityId]) ? State?.[Sec]?.[State?.CityId] : []
            };
        }
        return {
            CitySection: "Residential",
            Data: []
        };
    }, [State]);
    useEffect(() => {
        if (!State.SectionId) {
            startTransition(() => {
                SetState((prev) => ({
                    ...prev,
                    SectionId: SecttionsOptions[0]?.Value
                }));
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [State.SectionId]);
    useEffect(() => {
        if (!State.CityId) {
            startTransition(() => {
                SetState((prev) => ({
                    ...prev,
                    CityId: CityOptions.Options[0]?.Value
                }));
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [State.CityId]);
    useEffect(() => {
        let Update = {};
        if (UserSelectedResidential?.length > 0) {
            let NewDatas = UserSelectedResidential.reduce((prev, curr) => {
                const { UserAreaCityId, UserAreaValue } = curr;
                if (!prev[UserAreaCityId]) {
                    prev[UserAreaCityId] = [];
                }
                prev[UserAreaCityId] = UserAreaValue;
                return prev;
            }, {});
            Update.Residential = NewDatas;
        }
        if (UserSelectedCommercial?.length > 0) {
            let NewDatas = UserSelectedCommercial.reduce((prev, curr) => {
                const { UserAreaCityId, UserAreaValue } = curr;
                if (!prev[UserAreaCityId]) {
                    prev[UserAreaCityId] = [];
                }
                prev[UserAreaCityId] = UserAreaValue;
                return prev;
            }, {});
            Update.Commercial = NewDatas;
        }
        if (Object.keys(Update).length > 0) {
            startTransition(() => {
                SetState((prev) => ({
                    ...prev,
                    ...Update
                }));
            });
        }
    }, [UserSelectedCommercial, UserSelectedResidential]);
    const OnChange = (Name, Value) => {
        let Update = {
            [Name]: Value
        };
        if (Name == "SectionId") {
            let NewC = CitiesOptions?.[Value]?.[0]?.Value;
            Update.CityId = NewC ? NewC : null;
        }
        startTransition(() => {
            SetState((prev) => ({
                ...prev,
                ...Update
            }));
        });
    };
    const OnSave = async (Form, Type) => {
        if (Type == "All") {
            const { Data } = Selected;
            const CitySection = Helper.GetSectionByIdOrName(Form.SectionId);
            const IsAllSelected = Data.length == CityOptions.CityAreas.length;
            startTransition(() => {
                SetState((prev) => ({
                    ...prev,
                    [CitySection]: {
                        ...prev[CitySection],
                        [Form.CityId]: IsAllSelected
                            ? []
                            : CityOptions.CityAreas?.map((item) => item.Value)
                    }
                }));
            });
            return;
        }
        const Commercial =
            Form.Commercial && Object.keys(Form.Commercial)?.length > 0 ? Form.Commercial : null;
        const Residential =
            Form.Residential && Object.keys(Form.Residential)?.length > 0 ? Form.Residential : null;
        const Body = {
            Residential,
            Commercial
        };
        const { data } = await UpdateCompanies(Body);
        if (data && !data?.error) {
            const { message } = data || {};
            Toast("success", message);
        }
    };

    const OnReset = async (Form) => {
        const CitySection = Helper.GetSectionByIdOrName(Form.SectionId);
        if (CitySection == "Commercial" && !Form.Commercial) {
            Toast("warn", Lang?.ERRORS?.RESET_SECTION_EMPTY);
            return;
        }
        if (CitySection == "Residential" && !Form.Residential) {
            Toast("warn", Lang?.ERRORS?.RESET_SECTION_EMPTY);
            return;
        }
        const Commercial = Object.keys(Form.Commercial)?.length > 0 ? Form.Commercial : null;

        const Residential = Object.keys(Form.Residential)?.length > 0 ? Form.Residential : null;
        const Body = {
            Residential,
            Commercial
        };
        Body[CitySection] = null;
        const { data } = await UpdateCompanies(Body);
        if (data && !data?.error) {
            const { message } = data || {};
            Toast("success", message);
            startTransition(() => {
                SetState((prev) => ({
                    ...prev,
                    ...Body
                }));
            });
        }
    };
    const OnSelect = (Item, IsSelected) => {
        const { Data } = Selected;
        let NewData = IsSelected
            ? Data?.filter((item) => item != Item?.Value)
            : [...Data, Item?.Value];
        startTransition(() => {
            SetState((prev) => ({
                ...prev,
                [Item.CitySection]: {
                    ...prev[Item.CitySection],
                    [State.CityId]: NewData
                }
            }));
        });
    };
    return (
        <Box w={"100%"}>
            <Box
                px={{
                    base: 0,
                    md: "15%"
                }}
            >
                <CompaniesFilter
                    SecttionsOptions={SecttionsOptions}
                    CityOptions={CityOptions.Options}
                    IsAllSelected={Selected?.Data?.length == CityOptions?.CityAreas?.length}
                    IsLoading={isLoading}
                    OnChange={OnChange}
                    OnReset={OnReset}
                    OnSave={OnSave}
                    State={State}
                    Lang={Lang}
                    Rtl={Rtl}
                />
            </Box>
            <CompaniesView
                Data={CityOptions.CityAreas}
                OnSelect={OnSelect}
                Selected={Selected.Data}
                mt={1}
                className={"Shadow"}
                rounded={"md"}
                p={".2rem"}
                mx={{
                    base: 0,
                    md: "1rem"
                }}
            />
        </Box>
    );
};

export default CompaniesComp;
