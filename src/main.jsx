import { createRoot } from "react-dom/client";

import "./index.css";
import { ChakraProvider } from "@chakra-ui/react";
import { Provider } from "react-redux";
import Store from "./Redux/Store";
import App from "./App";
import { Theme } from "./Utility";
import { BrowserRouter } from "react-router-dom";
import { NetworkErrorBoundary } from "./Layout";
createRoot(document.getElementById("root")).render(
    <NetworkErrorBoundary>
        <BrowserRouter>
            <Provider store={Store.Configration}>
                <ChakraProvider theme={Theme.Init}>
                    <App />
                </ChakraProvider>
            </Provider>
        </BrowserRouter>
    </NetworkErrorBoundary>
);
