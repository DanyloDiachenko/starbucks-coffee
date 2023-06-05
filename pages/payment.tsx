import { useState } from "react";
import { PayPalButton } from "react-paypal-button-v2";

const PaymentPage = () => {
    const [isPaymentComplete, setIsPaymentComplete] = useState(false);

    const handlePaymentSuccess = () => {
        // Обработка успешной оплаты
        setIsPaymentComplete(true);
    };

    return (
        <div>
            <h1>Payment Page</h1>
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
        </div>
    );
};

export default PaymentPage;
