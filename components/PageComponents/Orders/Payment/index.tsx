import { useState } from "react";
import { PayPalButton } from "react-paypal-button-v2";


const Payment = (): JSX.Element => {
    const [isPaymentComplete, setIsPaymentComplete] = useState(false);

    const handlePaymentSuccess = () => {
        // Обработка успешной оплаты
        setIsPaymentComplete(true);
    };

    return (
        <>
            {!isPaymentComplete ? (
                <PayPalButton
                    amount="0.01"
                    onSuccess={handlePaymentSuccess}
                    options={{
                        clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID,
                    }}
                />
            ) : (
                <p>Payment Complete!</p>
            )}
        </>
    ); /* <button className={styles.paymentButton}>Payment</button>; */
};

export default Payment;
