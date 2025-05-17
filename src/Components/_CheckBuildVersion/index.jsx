import { useNotify } from "@/Hooks";
import { Helper } from "@/Utility";
import { useEffect } from "react";

const CheckBuildVersion = () => {
    const Notify = useNotify();
    useEffect(() => {
        const GetOldBuildId = Helper.GetStorage("BuildId");
        const FetchBuildId = async () => {
            try {
                const res = await fetch("/buildId.txt", { cache: "no-store" });
                const GetBuildId = await res.text();
                if (!GetOldBuildId) {
                    Helper.SetStorage("BuildId", GetBuildId);
                    Notify("info", "New Update Available Force Reload");
                    ClearCacheAndReload();
                } else if (GetOldBuildId != GetBuildId) {
                    Helper.SetStorage("BuildId", GetBuildId);
                    Notify("info", "New Update Available Force Reload");
                    ClearCacheAndReload();
                }
            } catch (error) {
                // eslint-disable-next-line no-console
                console.error("Error fetching buildId.txt:", error);
            }
        };
        // eslint-disable-next-line no-undef
        if (process.env.NODE_ENV !== "production") return;
        FetchBuildId();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const ClearCacheAndReload = () => {
        if ("caches" in window) {
            caches.keys().then((names) => {
                names.forEach((name) => {
                    caches.delete(name);
                });
            });
        }
        setTimeout(() => {
            window.location.reload(true);
        }, 2000);
    };

    return null;
};

export default CheckBuildVersion;
