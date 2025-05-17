import "./index.css";
import { lazy, Suspense, useState } from "react";
import { RoutingManager } from "./Utility";
import { useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";
import { CheckBuildVersion, WebSocketEvents } from "./Components";
import { useOnline, useValidateRole } from "./Hooks";
import { Box } from "@chakra-ui/react";
import { Loader, OfflineMessage } from "./Common";

const Error404 = lazy(() => import("./Pages/Error404"));
const AppDataPage = lazy(() => import("./Pages/Data"));
const AuthPage = lazy(() => import("./Pages/Auth"));
const AuthResetPage = lazy(() => import("./Pages/Auth/Reset"));
const SettingsPage = lazy(() => import("./Pages/Settings"));
const DetailPage = lazy(() => import("./Pages/Detail"));
const DashboardPage = lazy(() => import("./Pages/Dashboard"));
const SalesPage = lazy(() => import("./Pages/Sales"));

function App() {
    const { ServerStatus } = useSelector((state) => state.Helper);
    const { IsCompany, IsGold } = useValidateRole();
    const IsOnline = useOnline();
    const [Socket, setSocket] = useState(null);

    return (
        <Box className="Main-Background">
            <CheckBuildVersion />
            <WebSocketEvents setSocket={setSocket} Socket={Socket} />
            {!(ServerStatus.Main && IsOnline) && <OfflineMessage />}
            <Suspense fallback={<Loader />}>
                <Routes>
                    <Route path={RoutingManager.Client.Detail.Path} element={<DetailPage />} />
                    <Route path={RoutingManager.Client.Auth.Path} element={<AuthPage />} />
                    <Route
                        path={RoutingManager.Client.AuthReset.Path}
                        element={<AuthResetPage Type={"Password"} />}
                    />
                    <Route
                        path={RoutingManager.Client.Data.Path}
                        element={<AppDataPage Socket={Socket} />}
                    />
                    <Route path={RoutingManager.Client.Settings.Path} element={<SettingsPage />} />
                    {IsCompany && (
                        <>
                            <Route
                                path={RoutingManager.Client.Dashboard.Path}
                                element={<DashboardPage />}
                            />
                        </>
                    )}
                    {IsGold && (
                        <>
                            <Route
                                path={RoutingManager.Client.Sales.Path}
                                element={<SalesPage
                                    Socket={Socket}
                                    />}
                            />
                        </>
                    )}
                    <Route path="*" element={<Error404 />} />
                </Routes>
            </Suspense>
        </Box>
    );
}

export default App;
