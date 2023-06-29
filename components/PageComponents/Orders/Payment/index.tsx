import { useState } from "react";
import { connect } from "react-redux";
import { PayPalButton } from "react-paypal-button-v2";

import { IOrders } from "store/orders/order.interface";
import PaymentProps from "./payment.props";

const Payment = ({
    orders,
    removeProductFromBasket,
    setPopupProductAddedTitle,
    amount,
}: PaymentProps): JSX.Element => {
    const [isPaymentComplete, setIsPaymentComplete] = useState(false);

    const handlePaymentSuccess = () => {
        setIsPaymentComplete(true);

        orders.forEach((order) => {
            removeProductFromBasket(order._id, order.size);
        });
        setPopupProductAddedTitle("Payment successfuly completed. Thanks!");
    };

    return (
        <>
            {!isPaymentComplete ? (
                <PayPalButton
                    amount={amount}
                    onSuccess={handlePaymentSuccess}
                    options={{
                        clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID,
                    }}
                />
            ) : (
                <p>Payment Complete!</p>
            )}
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
    setPopupProductAddedTitle: (titleValue: string) => ({
        type: "SET_PRODUCT_POPUP_ADDED_TITLE",
        titleValue,
    }),
};
const connector = connect(mapState, mapDispatch);

export default connector(Payment);
