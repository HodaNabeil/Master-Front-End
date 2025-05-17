import { useMemo, useState } from "react";
import { useSelector } from "react-redux";

const useValidateSection = () => {
    const { DataSectionId, DataCityId } = useSelector((state) => state.Filter);
    const [initialData, setData] = useState({
        IsCommercial: false,
        IsResidential: false,
        SelectedCityId: null,
        SelectedSection: null
    });
    useMemo(() => {
        let r = DataSectionId?.label;
        if (r) {
            switch (r.trim()) {
                case "Commercial":
                    setData({
                        IsCommercial: true,
                        IsResidential: false,
                        SelectedCityId: DataCityId[0]?.value,
                        SelectedSection: DataSectionId?.value
                    });
                    break;
                case "Residential":
                    setData({
                        IsCommercial: false,
                        IsResidential: true,
                        SelectedCityId: DataCityId[0]?.value,
                        SelectedSection: DataSectionId?.value
                    });
                    break;
                default:
                    break;
            }
        }
    }, [DataCityId, DataSectionId]);
    return initialData;
};
export default useValidateSection;
