import { Spinner as BSpinner } from "react-bootstrap";

export const Spinner = () => {
    return (
        <BSpinner
            className="spinner"
            animation="border"
            role="status"
        ></BSpinner>
    );
};
