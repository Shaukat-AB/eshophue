import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

export const Ratings = ({ value, count }) => {
    const ratingsElement = [];

    for (let i = 0; i < 5; i++) {
        ratingsElement.push(
            <span key={i + 1}>
                {value >= i + 1 ? (
                    <FaStar />
                ) : value >= i + 0.5 ? (
                    <FaStarHalfAlt />
                ) : (
                    <FaRegStar />
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
