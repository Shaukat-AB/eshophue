import { StarHalfIcon, StarIcon, StarEmptyIcon } from "../../../lib";

export const Ratings = ({ value, count }) => {
    const ratingsElement = [];

    for (let i = 0; i < 5; i++) {
        ratingsElement.push(
            <span key={i + 1}>
                {value >= i + 1 ? (
                    <StarIcon />
                ) : value >= i + 0.5 ? (
                    <StarHalfIcon />
                ) : (
                    <StarEmptyIcon />
                )}
            </span>
        );
    }
    return (
        <>
            {ratingsElement}
            <span className="text-muted mx-1">
                <small>{`${count} reviews`}</small>
            </span>
        </>
    );
};
