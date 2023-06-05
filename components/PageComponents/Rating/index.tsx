import Image from "next/image";

import styles from "./rating.module.scss";

const renderRating = (rating: number): JSX.Element => {
    let rateArray: number[] = [];
    for (let i = 0; i <= rating - 1; i++) {
        rateArray.push(i);
    }

    return (
        <div className={styles.rating}>
            {rateArray.map((rateIcon) => (
                <Image
                    src="/rate-star.svg"
                    alt={"rating" + rating}
                    width="30"
                    height="30"
                    key={rateIcon}
                />
            ))}
        </div>
    );
};

export default renderRating;
