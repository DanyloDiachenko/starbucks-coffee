import Image from "next/image";
import Link from "next/link";

import styles from "./homeMainComponent.module.scss";

const HomeMainComponent = (): JSX.Element => {
    return (
        <section className={styles.homeWrapper}>
            <div className={styles.leftCol}>
                <Image
                    src="/starbucks-rewards.webp"
                    alt="starbucks rewards"
                    width="237"
                    height="57"
                />
                <Link href="https://www.starbucks.com/rewards" target="_blank">
                    get more info
                </Link>
            </div>
            <div className={styles.rightCol}>
                <h1>The happiest hour of the year</h1>
                <p className={styles.description}>
                    Sign up to get exlusive to deals on drinks this holiay
                    season.
                </p>
                <Link
                    className={styles.magic}
                    href="https://www.starbucks.com/"
                    target="_blank"
                >
                    send me magic
                </Link>
            </div>
        </section>
    );
};

export default HomeMainComponent;
