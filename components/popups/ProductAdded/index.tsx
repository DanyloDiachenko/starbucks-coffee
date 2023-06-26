import Image from "next/image";
import { connect } from "react-redux";

import styles from "./productAdded.module.scss";
import PopupProductAddedProps from "./productAdded.props";
import IOpenPopupProductAdded from "store/popupProductAdded/order.interface";
import { useEffect } from "react";

const PopupProductAdded = ({
    popupProductAddedTitle,
    setPopupProductAddedTitle,
}: PopupProductAddedProps): JSX.Element => {
    console.log(popupProductAddedTitle);

    useEffect(() => {
        if (popupProductAddedTitle.length) {
            const timeoutId = setTimeout(() => {
                setPopupProductAddedTitle("");
            }, 3000);

            return () => clearTimeout(timeoutId);
        } else {
            return;
        }
    }, [popupProductAddedTitle]);

    return (
        <>
            {popupProductAddedTitle.length ? (
                <div
                    className={`${styles.popup} ${
                        popupProductAddedTitle.length
                            ? styles.active
                            : styles.inactive
                    }`}
                >
                    <div className={styles.closeWrapper}>
                        <Image
                            src="/close-small.svg"
                            alt="close"
                            width="11"
                            height="11"
                            onClick={() => setPopupProductAddedTitle("")}
                        />
                    </div>

                    <div className={styles.content}>
                        <div className={styles.iconWrapper}>
                            <Image
                                src="/success.svg"
                                alt="success photo"
                                width="32"
                                height="26"
                            />
                        </div>
                        <div className={styles.textColumn}>
                            <div className={styles.success}>Success!</div>
                            <p>
                                You successfully added product: <br />
                                <div className={styles.product}>
                                    {popupProductAddedTitle}
                                </div>
                            </p>
                        </div>
                    </div>
                </div>
            ) : (
                ""
            )}
        </>
    );
};

const mapState = (state: {
    popupProductAddedTitle: IOpenPopupProductAdded;
}) => {
    return {
        popupProductAddedTitle: state.popupProductAddedTitle.title,
    };
};
const mapDispatch = {
    setPopupProductAddedTitle: (titleValue: string) => ({
        type: "SET_PRODUCT_POPUP_ADDED_TITLE",
        titleValue,
    }),
};

const connector = connect(mapState, mapDispatch);

export default connector(PopupProductAdded);
