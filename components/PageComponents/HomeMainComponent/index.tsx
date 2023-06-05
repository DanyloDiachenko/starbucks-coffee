import Image from "next/image";

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
                <p>get more info</p>
            </div>
            <div className={styles.rightCol}>
                <h1>The happiest hour of the year</h1>
                <p className={styles.description}>
                    Sign up to get exlusive to deals on drinks this holiay
                    season.
                </p>
                <p className={styles.magic}>SEND ME MAGIC</p>
            </div>
        </section>
    );
};

export default HomeMainComponent;
