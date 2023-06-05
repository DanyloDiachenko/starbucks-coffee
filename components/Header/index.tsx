import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import styles from "./header.module.scss";
import Orders from "components/PageComponents/Orders";
import { IOrders } from "store/orders/order.interface";
import { connect } from "react-redux";
import HeaderProps from "./header.props";

const Header = ({ ordersProps }: HeaderProps): JSX.Element => {
    const [isOrdersOpen, setIsOrdersOpen] = useState<boolean>(false);

    return (
        <>
            <div className={`container ${styles.header}`}>
                <div className={styles.logoNavigation}>
                    <Link href="/">
                        <Image
                            src="/logo.webp"
                            width="139"
                            height="140"
                            alt="logotype"
                        />
                    </Link>
                    <nav className={styles.navigation}>
                        <Link href="#frappucino">frappucino</Link>
                        <Link href="#">tea</Link>
                        <Link href="#">menu</Link>
                    </nav>
                </div>
                <div className={styles.searchWrapper}>
                    <input
                        type="text"
                        placeholder="SEARCH"
                        className={styles.input}
                    />
                    <Image
                        width="18"
                        height="18"
                        src="/search.svg"
                        alt="search-icon"
                    />
                </div>
                <div className={styles.basketMenu}>
                    <div className={styles.basketWrapper}>
                        {ordersProps.length ? (
                            <div className={styles.length}>
                                {ordersProps.length}
                            </div>
                        ) : (
                            ""
                        )}

                        <div className={styles.title}>MY BASKET</div>
                    </div>
                    <button className={styles.menuButton}>
                        <Image
                            src="/burger-menu.svg"
                            alt="menu"
                            width="37"
                            height="32"
                            className={styles.menu}
                            onClick={() => setIsOrdersOpen(true)}
                        />
                    </button>
                </div>
            </div>
            <Orders
                isOrdersOpen={isOrdersOpen}
                closeOrders={() => setIsOrdersOpen(false)}
            />
        </>
    );
};

const mapState = (state: { orders: IOrders }) => {
    return {
        ordersProps: state.orders.orders,
    };
};
const mapDispatch = {};
const connector = connect(mapState, mapDispatch);

export default connector(Header);
