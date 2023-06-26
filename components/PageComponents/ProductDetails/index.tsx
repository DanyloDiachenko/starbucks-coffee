import Image from "next/image";
import { useEffect, useState } from "react";
import { connect } from "react-redux";

import styles from "./productDetails.module.scss";
import renderRating from "components/PageComponents/Rating";
import Button from "components/UI/Button";
import ProductDetailsProps from "./productDetails.props";
import formatPrice from "helpers/formatPrice";
import { IOrder } from "store/orders/order.interface";
import IDeatils from "./productDetails.interface";

const ProductDetailsComponent = ({
    product,
    addProductToBasket,
    setPopupProductAddedTitle,
}: ProductDetailsProps): JSX.Element => {
    const [details, setDetails] = useState<IDeatils>({
        calories: product.details[0].calories,
        sugar: product.details[0].sugar,
        price: product.details[0].price,
        size: product.details[0].volume,
    });
    const [activeSize, setActiveSize] = useState<string>("short");

    const setPopupProductAddedTitleHandler = (
        productTitleClicked: string,
    ): void => {
        setPopupProductAddedTitle(productTitleClicked);
    };

    const addProductToBasketHandler = (): void => {
        const productToAdd = {
            _id: product._id,
            title: product.title,
            imgSrc: product.imgSrc,
            size: activeSize,
            volume: details.size,
            price: details.price,
            quantity: 1,
        };

        addProductToBasket(productToAdd);
        setPopupProductAddedTitleHandler(productToAdd.title);
    };

    const renderButtons = (): JSX.Element => {
        const buttons = ["short", "tall", "grande", "venti"];

        return (
            <div className={styles.sizes}>
                {buttons.map((btn, id) => {
                    return (
                        <button
                            onClick={() => setActiveSize(btn)}
                            key={id}
                            className={`${styles.size} ${
                                activeSize === btn ? styles.active : ""
                            }`}
                        >
                            {btn}
                        </button>
                    );
                })}
            </div>
        );
    };

    useEffect(() => {
        const findedDetails = product.details.find(
            (detail) => detail.size === activeSize,
        );
        if (findedDetails?._id) {
            setDetails({
                calories: findedDetails.calories,
                sugar: findedDetails.sugar,
                price: findedDetails.price,
                size: findedDetails.volume,
            });
        }
    }, [activeSize]);

    return (
        <section className={styles.productDetails}>
            <div className={styles.rightCol}>
                <h1>Product details</h1>
                <p>
                    Product / <b>{product.title}</b>
                </p>
            </div>
            <div className={styles.details}>
                <div className={styles.leftCol}>
                    <h2>{product.title}</h2>
                    <p className={styles.description}>{product.description}</p>
                    <div className={styles.characteristic}>
                        <p>Total Fat 19g</p>
                        <p>{product.totalFat19g}%</p>
                    </div>
                    <div className={styles.characteristic}>
                        <p>Saturated Fat 13g</p>
                        <p>{product.saturatedFat3g}%</p>
                    </div>
                    <div className={styles.characteristic}>
                        <p>Trans Fat 0.5g</p>
                        <p>{product.transFat05g}%</p>
                    </div>
                    <div className={styles.characteristic}>
                        <p>Calories</p>
                        <p>{details.calories}</p>
                    </div>
                    <div className={styles.characteristic}>
                        <p>Sugar</p>
                        <p>{details.sugar}g</p>
                    </div>
                </div>
                <div className={styles.mainCol}>
                    <div className={styles.borderFirst}></div>
                    <div className={styles.borderSecond}></div>
                    <div>
                        <Image
                            src={product.imgSrc}
                            alt={`${product.title} photo`}
                            quality={100}
                            width="160"
                            height="300"
                            layout="intrinsic"
                            className={styles.banner}
                        />
                        <div className={styles.price}>
                            <b>${formatPrice(details.price)}</b>{" "}
                            <span className={styles.size}>
                                / {details.size}ml
                            </span>
                        </div>
                    </div>
                </div>
                <div className={styles.rightCol}>
                    <div className={styles.rating}>
                        Rating: {renderRating(product.rating)}
                    </div>
                    <>{renderButtons()}</>
                    <div className={styles.btnWrapper}>
                        <Button
                            onClick={addProductToBasketHandler}
                            className={styles.button}
                        >
                            add to basket
                        </Button>
                    </div>
                </div>
            </div>
        </section>
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

export default connector(ProductDetailsComponent);
