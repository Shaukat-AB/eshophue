import { useEffect } from "react";
import { useLocation } from "react-router";

export const usePageTitle = (title = "") => {
    const path = useLocation();

    useEffect(() => {
        document.title = title ? title + " | EShopehue" : "EShopehue";
    }, [path, title]);
    return [title];
};
