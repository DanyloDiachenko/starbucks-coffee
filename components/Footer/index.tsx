import Link from "next/link";
import Image from "next/image";

import styles from "./footer.module.scss";

const Footer = (): JSX.Element => {
    const currentYear: number = new Date().getFullYear();

    return (
        <>
            <div className={`container ${styles.footer}`}>
                <div className={styles.leftCol}>
                    © {currentYear} Starbucks Coffee. All rights reserved.
                </div>
                <div className={styles.rightCol}>
                    <div className={styles.phone}>
                        <Image
                            width="20"
                            height="20"
                            src="/phone-icon.svg"
                            alt="contacts phone icon"
                        />
                        <Link href="tel:98-765-4321">+380-98-765-4321</Link>
                    </div>
                    <div className={styles.email}>
                        <Image
                            width="24"
                            height="24"
                            src="/email-icon.svg"
                            alt="contacts email icon"
                        />
                        <Link href="mailto:starbucks-coffee@gmail.com">
                            starbucks-coffee@gmail.com
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Footer;
