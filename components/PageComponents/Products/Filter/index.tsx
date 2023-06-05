import Image from "next/image";
import { useState } from "react";

import styles from "./filter.module.scss";
import IFilterType from "./filterType.interface";
import FilterProps from "./filter.props";

const Filter = ({ setFilterType, filterType }: FilterProps): JSX.Element => {
    const [isFiltersOpen, setIsFiltersOpen] = useState<boolean>(false);

    const filters: IFilterType[] = [
        {
            title: "Newest",
            titleKey: "newest",
        },
        {
            title: "Oldest",
            titleKey: "oldest",
        },
        {
            title: "Price: low to high",
            titleKey: "priceToHigh",
        },
        {
            title: "Price: high to low",
            titleKey: "priceToLow",
        },
    ];

    const setFilterTypeHandler = (
        filterTypeClicked: IFilterType["titleKey"],
    ) => {
        let findedFilterType = filters.find(
            (filter) => filter.titleKey === filterTypeClicked,
        );
        findedFilterType &&
            setFilterType({
                title: findedFilterType.title,
                titleKey: findedFilterType.titleKey,
            });
    };

    return (
        <div className={styles.filtersWrapper}>
            <button
                onClick={() => setIsFiltersOpen(!isFiltersOpen)}
                className={styles.filters}
            >
                <p>{filterType.title}</p>
                <Image
                    src="/arrow-bottom.svg"
                    alt="arrow"
                    width="12"
                    height="7"
                    className={isFiltersOpen ? styles.active : ""}
                />
            </button>

            <div
                className={`${styles.filtersSelect} ${
                    isFiltersOpen ? styles.active : ""
                }`}
            >
                {filters.map((filter) => (
                    <p
                        onClick={() => setFilterTypeHandler(filter.titleKey)}
                        key={filter.titleKey}
                        tabIndex={0}
                    >
                        {filter.title}
                    </p>
                ))}
            </div>
        </div>
    );
};

export default Filter;
