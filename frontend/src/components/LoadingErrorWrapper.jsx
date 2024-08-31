import { Message } from "./Message";
import { Spinner } from "./Spinner";

export const LoadingErrorWrapper = ({ isLoading = true, error, children }) => {
    return isLoading ? (
        <Spinner />
    ) : error ? (
        <Message variant="danger">
            {error?.data?.message || error?.status}
        </Message>
    ) : (
        <>{children}</>
    );
};
