import { useMemo } from "react";
import { useSelector } from "react-redux";

const useValidateRole = () => {
    const { UserRole } = useSelector((state) => state.Auth);
    const Result = useMemo(() => {
        const initialData = {
            IsPersonal: false,
            IsCompany: false,
            IsSubUser: false,
            IsGold: false
        }
        let r = UserRole?.RoleKey;
        const Update = (Key, Key2 = null) => {
            initialData[Key] = !initialData[Key];
            if (Key2) initialData[Key2] = !initialData[Key2];
        };
        if (r) {
            r = r.trim();
            switch (r.trim()) {
                case "Company":
                    Update("IsCompany");
                    break;
                case "Personal":
                    Update("IsPersonal");
                    break;
                case "Gold":
                    Update("IsPersonal", "IsGold");
                    break;
                case "SubUser":
                    Update("IsSubUser");
                    break;
                default:
                    break;
            }
        }
        return initialData;
    }, [UserRole?.RoleKey]);
    return Result;
};
export default useValidateRole;
