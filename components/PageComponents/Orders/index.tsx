import Image from "next/image";
import { connect } from "react-redux";

import styles from "./order.module.scss";
import OrderProps from "./orders.props";
import { IOrders } from "store/orders/order.interface";

const Orders = ({
    isOrdersOpen,
    closeOrders,
    orders,
    removeProductFromBasket,
    incrementProductQuantity,
    decrementProductQuantity,
}: OrderProps): JSX.Element => {
    const countPrice = (): string => {
        const totalCost = orders.reduce((sum, order) => {
            const orderCost = order.quantity * order.price;
            return sum + orderCost;
        }, 0);

        return totalCost.toFixed(2);
    };

    const removeProductFromBasketHandler = (
        productId: string,
        productSize: string,
    ) => {
        return () => removeProductFromBasket(productId, productSize);
    };

    const incrementProductQuantityHandler = (
        productId: string,
        productSize: string,
    ) => {
        return () => incrementProductQuantity(productId, productSize);
    };

    const decrementProductQuantityHandler = (
        productId: string,
        productSize: string,
    ) => {
        return () => decrementProductQuantity(productId, productSize);
    };

    const countPricePerOrder = (
        pricePerOrder: number,
        orderQuantity: number,
    ) => {
        const price: number = pricePerOrder * orderQuantity;
        return price.toFixed(2);
    };

    return (
        <>
            {isOrdersOpen && (
                <div
                    className={styles.activeBackground}
                    onClick={closeOrders}
                ></div>
            )}
            <aside
                className={`${styles.orders} ${
                    isOrdersOpen ? styles.ordersActive : styles.ordersInactive
                }`}
            >
                <div className={styles.top}>
                    <span className="h3">My basket</span>
                    <button>
                        <Image
                            src="/close.svg"
                            alt="close orders menu"
                            width="26"
                            height="26"
                            onClick={closeOrders}
                        />
                    </button>
                </div>
                {orders.map((order, index) => (
                    <div key={index} className={styles.orderWrapper}>
                        <Image
                            src={order.imgSrc}
                            alt={order.title + "photo"}
                            width="70"
                            height="134"
                        />
                        <div>
                            <div className={styles.title}>{order.title}</div>
                            <p className={styles.size}>{order.size}</p>
                            <p className={styles.priceVolume}>
                                ${order.price} / {order.volume}ml
                            </p>
                            <div className={styles.controls}>
                                <button
                                    onClick={decrementProductQuantityHandler(
                                        order._id,
                                        order.size,
                                    )}
                                    disabled={
                                        order.quantity === 1 ? true : false
                                    }
                                    className={
                                        order.quantity === 1
                                            ? styles.inactive
                                            : ""
                                    }
                                >
                                    -
                                </button>
                                <div className={styles.quantity}>
                                    {order.quantity}
                                </div>
                                <button
                                    disabled={
                                        order.quantity === 10 ? true : false
                                    }
                                    className={
                                        order.quantity === 10
                                            ? styles.inactive
                                            : ""
                                    }
                                    onClick={incrementProductQuantityHandler(
                                        order._id,
                                        order.size,
                                    )}
                                >
                                    +
                                </button>
                            </div>
                            <div className={styles.removeAndPrice}>
                                <p
                                    onClick={removeProductFromBasketHandler(
                                        order._id,
                                        order.size,
                                    )}
                                    className={styles.remove}
                                >
                                    Remove
                                </p>
                                <p className={styles.price}>
                                    $
                                    {countPricePerOrder(
                                        order.price,
                                        order.quantity,
                                    )}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
                {orders.length ? (
                    <div className={styles.paymentWrapper}>
                        <div>
                            <p>Total:</p>
                            <div className={styles.total}>${countPrice()}</div>
                        </div>
                        <button>Payment</button>
                    </div>
                ) : (
                    <p className={styles.nothing}>Here is nothing...</p>
                )}
            </aside>
        </>
    );
};

const mapState = (state: { orders: IOrders }) => {
    return {
        orders: state.orders.orders,
    };
};
const mapDispatch = {
    removeProductFromBasket: (productId: string, productSize: string) => ({
        type: "REMOVE_PRODUCT_FROM_BASKET",
        _id: productId,
        size: productSize,
    }),
    incrementProductQuantity: (productId: string, productSize: string) => ({
        type: "INCREASE_PRODUCT_QUANTITY",
        _id: productId,
        size: productSize,
    }),
    decrementProductQuantity: (productId: string, productSize: string) => ({
        type: "DEACREASE_PRODUCT_QUANTITY",
        _id: productId,
        size: productSize,
    }),
};
const connector = connect(mapState, mapDispatch);

export default connector(Orders);
