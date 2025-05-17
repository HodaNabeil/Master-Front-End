class BodyHelper {
    static Data = (Filter) => {
        const Key = "value";
        const MergedConsultants = [
            ...Filter.DataEngineering,
            ...Filter.DataExecutive,
            ...Filter.DataManagement,
            ...Filter.DataArchitecture
        ];
        let Cities =
            Filter.DataCityId && Array.isArray(Filter.DataCityId)
                ? Filter.DataCityId?.filter((item) => item)
                : null;
        return {
            Limit: Filter.Limit || 1000,
            Page: Filter.Page || 1,
            Sort: Filter.Sort || "ASC",
            OrderBy: Filter.OrderBy || "DataUnitTotalPriceFrom",
            UType: Filter.DataViewTab || "Basic",
            // Array Keys
            DataCityId: Cities ? Cities?.map((item) => item[Key]) : [],
            DataAreaId: Filter.DataAreaId ? Filter.DataAreaId?.map((item) => item[Key]) : [],
            DataTypeId: Filter.DataTypeId ? Filter.DataTypeId?.[Key] : "",
            DataSubTypeId: Filter.DataSubTypeId
                ? Filter.DataSubTypeId?.map((item) => item[Key])
                : [],
            DataStatus: Filter.DataStatus,
            DataBedRooms: Filter.DataBedRooms ? Filter.DataBedRooms?.map((item) => item[Key]) : [],
            // Object Keys
            DataSectionId: Filter.DataSectionId ? Filter.DataSectionId?.[Key] : 1,
            DataFinishingId: Filter.DataFinishingId ? Filter.DataFinishingId[Key] : null,
            DataDeliveryFrom: Filter.DataDeliveryFrom ? Filter.DataDeliveryFrom[Key] : "",
            DataDeliveryTo: Filter.DataDeliveryTo ? Filter.DataDeliveryTo[Key] : "",
            DataYearsFrom: Filter.DataYearsFrom ? Filter.DataYearsFrom : "",
            DataYearsTo: Filter.DataYearsTo ? Filter.DataYearsTo : "",
            DataDownPaymentFrom: Filter.DataDownPaymentFrom ? Filter.DataDownPaymentFrom : "",
            DataDownPaymentTo: Filter.DataDownPaymentTo ? Filter.DataDownPaymentTo : "",
            // String Keys
            DataUnitTotalPriceFrom: Filter.DataUnitTotalPriceFrom,
            DataUnitTotalPriceTo: Filter.DataUnitTotalPriceTo,
            DataBuiltUpAreaFrom: Filter.DataBuiltUpAreaFrom,
            DataBuiltUpAreaTo: Filter.DataBuiltUpAreaTo,
            DataCompoundId: [1],
            // DataCompoundId: Filter.DataCompoundId
            //     ? Filter.DataCompoundId?.map((item) => item[Key])
            //     : [],
            DataDeveloperId: Filter.DataDeveloperId
                ? Filter.DataDeveloperId?.map((item) => item[Key])
                : null,
            IsCityScape: Filter.IsCityScape || false,
            DataExtraBenefits: Filter.DataExtraBenefits
                ? Filter.DataExtraBenefits?.map((item) => item[Key])
                : [],
            DataConsultants:
                MergedConsultants && Array.isArray(MergedConsultants)
                    ? MergedConsultants?.filter((item) => item)?.map((item) => item[Key])
                    : []
        };
    };
    static SubUsersFilter = (Filter, UserId) => {
        const { Limit, Page, Sort, OrderBy, SearchBy, Search, To, From, UType } = Filter || {};
        const DataToReturn = {
            Limit: Limit || 1000,
            Page: Page || 1,
            Sort: Sort || "ASC",
            OrderBy: OrderBy ? OrderBy : UserId ? "UserId" : "",
            SearchBy: SearchBy || "",
            Search: Search || "",
            To: To || "",
            From: From || ""
        };
        if (UserId) {
            DataToReturn.UserId = UserId;
        }
        if (UType) {
            DataToReturn.UType = UType;
        }
        return DataToReturn;
    };
    static SubUser = (Form, Type) => {
        const {
            UserId,
            UserParentId,
            UserName,
            UserPhoneNumber,
            UserEmail,
            UserJobTitle,
            UserPassword,
            UserSections,
            Residential,
            Commercial
        } = Form;
        const UpdateData = {
            UserName,
            UserPhoneNumber: UserPhoneNumber?.startsWith("+")
                ? UserPhoneNumber?.slice(1)
                : UserPhoneNumber,
            UserEmail,
            UserJobTitle,
            UserPassword,
            UserSections: UserSections
                ? UserSections?.map((item) => ({
                      SectionId: item.SectionId,
                      SectionName: item.SectionName,
                      SectionKey: item.SectionKey
                  }))
                : [],
            Residential: Residential
                ? Residential?.map((item) => ({
                      CityId: item.CityId,
                      CityName: item.CityName,
                      CitySectionId: item.CitySectionId
                  }))
                : [],
            Commercial: Commercial
                ? Commercial?.map((item) => ({
                      CityId: item.CityId,
                      CityName: item.CityName,
                      CitySectionId: item.CitySectionId
                  }))
                : []
        };
        const Forms = {
            Create: { UserParentId, ...UpdateData },
            Update: { UserId, body: UpdateData },
            Delete: { UserId }
        };
        return Forms[Type];
    };
    static Sales(Form) {
        const {
            Tab,
            SalesId,
            // SalesDeveloper,
            // SalesProject,
            SalesCustomer,
            SalesExecutive,
            SalesDate,
            SalesUnitPrice,
            SalesUnitType,
            SalesNote,
            Files = []
        } = Form || {};
        let FormBody = new FormData();
        if (Tab == "Add") {
            [
                "SalesDeveloper",
                "SalesProject",
                "SalesCustomer",
                "SalesExecutive",
                "SalesDate",
                "SalesUnitType",
                "SalesUnitPrice",
                "SalesNote"
            ].forEach((item) => {
                if (["SalesDeveloper", "SalesProject", "SalesUnitType"].includes(item)) {
                    FormBody.append(item, Form[item] ? Form[item]?.value : "");
                } else {
                    FormBody.append(item, Form[item] ? Form[item] : "");
                }
            });
            if (Files?.length > 0) {
                for (let index = 0; index < Files.length; index++) {
                    const element = Files[index];
                    FormBody.append("SalesContract", element, element?.name);
                }
            }
        }
        switch (Tab) {
            case "Add": {
                return FormBody;
            }
            case "Edit": {
                return {
                    SalesId,
                    body: {
                        SalesCustomer,
                        SalesExecutive,
                        SalesDate,
                        SalesUnitPrice,
                        SalesUnitType : SalesUnitType?.value ? SalesUnitType?.value : "",
                        SalesNote
                    }
                };
            }
            default: {
                return {
                    SalesId
                };
            }
        }
    }
}
export default BodyHelper;
