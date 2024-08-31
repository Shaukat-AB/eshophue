import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export const PageTitle = ({ title }) => {
    const path = useLocation();

    useEffect(() => {
        document.title = title || "EShopehue";
    }, [path, title]);
    return null;
};
