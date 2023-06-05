import { useEffect, useState } from "react";

import Product from "./ProductCard";
import styles from "./products.module.scss";
import Filter from "./Filter";
import ProductsProps from "./products.props";
import IFilterType from "./Filter/filterType.interface";
import IProduct from "./product.interface";

const Products = ({ products }: ProductsProps): JSX.Element => {
    const [productsFiltered, setProductsFiltered] =
        useState<IProduct[]>(products);

    const [filterType, setFilterType] = useState<IFilterType>({
        title: "Newest",
        titleKey: "newest",
    });

    console.log(products);

    useEffect(() => {
        switch (filterType.titleKey) {
            case "newest": {
                setProductsFiltered(
                    [...products].sort(
                        (a, b) =>
                            new Date(b.createdAt).getTime() -
                            new Date(a.createdAt).getTime(),
                    ),
                );
                break;
            }
            case "oldest": {
                setProductsFiltered(
                    [...products].sort(
                        (a, b) =>
                            new Date(a.createdAt).getTime() -
                            new Date(b.createdAt).getTime(),
                    ),
                );
                break;
            }
            case "priceToHigh": {
                setProductsFiltered(
                    [...products].sort(
                        (a, b) => a.details[0].price - b.details[0].price,
                    ),
                );
                break;
            }
            case "priceToLow": {
                setProductsFiltered(
                    [...products].sort(
                        (a, b) => b.details[0].price - a.details[0].price,
                    ),
                );
                break;
            }
            default: {
                setProductsFiltered(products);
                break;
            }
        }
    }, [filterType.titleKey]);

    return (
        <section id="frappucino" className={styles.products}>
            <Filter filterType={filterType} setFilterType={setFilterType} />
            <div className={styles.wrapper}>
                {productsFiltered.length &&
                    productsFiltered.map((coffee) => <Product {...coffee} />)}
            </div>
        </section>
    );
};

export default Products;
