import React, { useEffect, useState } from "react";
import useWindowDimensions from "../useWindowDimensions";
import "./carousel.css";

const Carousel = (props) => {
    const { children, show } = props;

    const { height, width } = useWindowDimensions();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [length, setLength] = useState(children.length);

    const [touchPosition, setTouchPosition] = useState(null);
    const [isViewMore, setViewMore] = useState(false);

    useEffect(() => {
        setLength(children.length);
    }, [children]);

    const handleViewMore = () => {
        setViewMore(true);
    };
    const handleViewLess = () => {
        setViewMore(false);
    };
    const next = () => {
        if (currentIndex < length - show) {
            setCurrentIndex((prevState) => prevState + 1);
        }
    };

    const prev = () => {
        if (currentIndex > 0) {
            setCurrentIndex((prevState) => prevState - 1);
        }
    };

    const handleTouchStart = (e) => {
        const touchDown = e.touches[0].clientX;
        setTouchPosition(touchDown);
    };

    const handleTouchMove = (e) => {
        const touchDown = touchPosition;

        if (touchDown === null) {
            return;
        }

        const currentTouch = e.touches[0].clientX;
        const diff = touchDown - currentTouch;

        if (diff > 5) {
            next();
        }

        if (diff < -5) {
            prev();
        }

        setTouchPosition(null);
    };

    return (
        <div className="carousel-container">
            <div className="carousel-wrapper">
                <div
                    className="carousel-content-wrapper"
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                >
                    {width < 768 ? (
                        <>
                            {" "}
                            <div
                                className={
                                    !isViewMore
                                        ? `carousel-content show-${show} height-325`
                                        : `carousel-content show-${show}`
                                }
                            // style={{ transform: `translateX(-${currentIndex * (100 / show)}%)` }}
                            >
                                {children}
                            </div>
                            <div></div>
                        </>
                    ) : (
                        <div
                            className={`carousel-content show-${show}`}
                            style={{
                                transform: `translateX(-${currentIndex * (100 / show)}%)`,
                            }}
                        >
                            {children}
                        </div>
                    )}
                </div>
                {width >= 768 ? (
                    <div className="right-arrow">
                        <button
                            onClick={prev}
                            className={
                                props.theme === "dark"
                                    ? (currentIndex > 0 && "cursor-pointer bg-192a59 p-0") ||
                                    "cursor-not-allowed bg-192a59 p-0"
                                    : (currentIndex > 0 && "cursor-pointer bg-white p-0") ||
                                    "cursor-not-allowed bg-white p-0"
                            }
                        >
                            <img
                                src={
                                    (currentIndex > 0 && "/images/back-active.svg") ||
                                    "/images/back-inactive.svg"
                                }
                            />
                        </button>
                        <button
                            onClick={next}
                            className={
                                props.theme === "dark"
                                    ? (currentIndex < length - show &&
                                        "cursor-pointer bg-192a59 p-0") ||
                                    "cursor-not-allowed bg-192a59 p-0"
                                    : (currentIndex < length - show &&
                                        "cursor-pointer bg-white p-0") ||
                                    " cursor-not-allowed bg-white p-0"
                            }
                        >
                            <img
                                src={
                                    (currentIndex < length - show && "/images/next-active.svg") ||
                                    "/images/next-inactive.svg"
                                }
                            />
                        </button>
                    </div>
                ) : (
                    ""
                )}
            </div>

            {children.length >= 6 && (
                !isViewMore ? (
                    <div onClick={handleViewMore} className="view-more-less-button">
                        View More
                    </div>
                ) : (
                    <div onClick={handleViewLess} className="view-more-less-button">
                        View Less
                    </div>
                ))}
        </div>
    );
};

export default Carousel;
