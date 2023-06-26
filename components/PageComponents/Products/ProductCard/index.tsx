import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { connect } from "react-redux";

import ProductProps from "./product.props";
import Button from "components/UI/Button";
import styles from "./product.module.scss";
import renderRating from "components/PageComponents/Rating";
import formatPrice from "helpers/formatPrice";
import { IOrder } from "store/orders/order.interface";

const Product = ({
    _id,
    title,
    imgSrc,
    rating,
    details,
    totalFat19g,
    saturatedFat3g,
    transFat05g,

    addProductToBasket,
    setPopupProductAddedTitle,
}: ProductProps): JSX.Element => {
    const [activeSize, setActiveSize] = useState<{
        size: string;
        price: number;
        volume: number;
    }>({
        size: details[0].size,
        price: details[0].price,
        volume: details[0].volume,
    });

    const setActiveSizeHandler = (id: number): void => {
        setActiveSize({
            size: details[id].size,
            price: details[id].price,
            volume: details[id].volume,
        });
    };

    const addProductToBasketHandler = (): void => {
        const productToAdd = {
            _id: _id,
            title: title,
            imgSrc: imgSrc,
            size: activeSize.size,
            volume: activeSize.volume,
            price: activeSize.price,
            quantity: 1,
        };

        addProductToBasket(productToAdd);
        setPopupProductAddedTitle(productToAdd.title);
    };

    const renderButtons = (): JSX.Element => {
        const buttons = ["short", "tall", "grande", "venti"];

        return (
            <>
                {buttons.map((btn, id) => {
                    const activeIndex = details.findIndex(
                        (detail) => detail.size === activeSize.size,
                    );
                    const isActive = id === activeIndex;
                    return (
                        <button
                            key={id}
                            onClick={() => setActiveSizeHandler(id)}
                            className={`${styles.size} ${
                                isActive ? styles.active : ""
                            }`}
                        >
                            {btn}
                        </button>
                    );
                })}
            </>
        );
    };

    return (
        <article
            onMouseEnter={() =>
                setActiveSize({
                    size: details[0].size,
                    price: details[0].price,
                    volume: details[0].volume,
                })
            }
            onMouseLeave={() =>
                setActiveSize({
                    size: details[0].size,
                    price: details[0].price,
                    volume: details[0].volume,
                })
            }
            className={styles.product}
        >
            <Image
                src={imgSrc}
                alt={`${title} photo`}
                width="160"
                height="296"
                className={styles.banner}
            />
            <div className={styles.help}>
                Tap to get <br /> more info
            </div>
            <div className={`h2 ${styles.title}`}>{title}</div>
            {renderRating(rating)}
            <div className={styles.sizes}>{renderButtons()}</div>

            <div className={styles.sizePrice}>
                <p>
                    ${formatPrice(activeSize.price)} / {activeSize.volume}ml
                </p>
            </div>
            <Button
                onClick={addProductToBasketHandler}
                className={styles.button}
            >
                add to basket
            </Button>
            <Link href={"/product/" + _id} className={styles.moreInfo}>
                More information <span className="visuallyHidden">{title}</span>
            </Link>
            <div className={styles.characteristics}>
                <div className={styles.characteristic}>
                    <p>Calories</p>
                    <p>{details[0].calories}</p>
                </div>
                <div className={styles.characteristic}>
                    <p>Sugar</p>
                    <p>{details[0].sugar}g</p>
                </div>
                <div className={styles.characteristic}>
                    <p>Total Fat 19g</p>
                    <p>{totalFat19g}%</p>
                </div>
                <div className={styles.characteristic}>
                    <p>Saturated Fat 13g</p>
                    <p>{saturatedFat3g}%</p>
                </div>
                <div className={styles.characteristic}>
                    <p>Trans Fat 0.5g</p>
                    <p>{transFat05g}%</p>
                </div>
            </div>
        </article>
    );
};

const mapState = () => {
    return {};
};
const mapDispatch = {
    addProductToBasket: (product: IOrder) => ({
        type: "ADD_PRODUCT_TO_BASKET",
        product,
    }),
    setPopupProductAddedTitle: (titleValue: string) => ({
        type: "SET_PRODUCT_POPUP_ADDED_TITLE",
        titleValue,
    }),
};
const connector = connect(mapState, mapDispatch);

export default connector(Product);
