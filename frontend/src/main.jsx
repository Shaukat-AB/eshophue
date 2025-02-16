import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import store from "./store/store.js";
import { Provider } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import "./assets/styles/index.css";
import { AppRouter } from "./routes";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <Provider store={store}>
            <AppRouter />
        </Provider>
    </StrictMode>
);
