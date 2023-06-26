import Image from "next/image";
import Link from "next/link";
import { useRouter, NextRouter } from "next/router";
import { useState, useEffect, ChangeEvent } from "react";

import styles from "./search.module.scss";
import IProduct from "components/PageComponents/Products/product.interface";

const Search = (): JSX.Element => {
    const [productsToChoose, setProductsToChoose] = useState<IProduct[]>([]);
    const [productsToChooseFiltered, setProductsToChooseFiltered] =
        useState<IProduct[]>(productsToChoose);
    const [inputValue, setInputValue] = useState<string>("");

    const router: NextRouter = useRouter();

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/coffees`)
            .then((res) => res.json())
            .then((data) => {
                if (data.success && data.data.length) {
                    setProductsToChoose(data.data);
                } else {
                    setProductsToChoose([]);
                }
            })
            .catch((error) => {
                console.log(error);
                setProductsToChoose([]);
            });
    }, []);

    useEffect(() => {
        setInputValue("");
    }, [router.pathname]);

    useEffect(() => {
        if (inputValue.length) {
            setProductsToChooseFiltered(() =>
                productsToChoose.filter((product) =>
                    product.title
                        .toLocaleLowerCase()
                        .includes(inputValue.toLocaleLowerCase()),
                ),
            );
        } else {
            setProductsToChooseFiltered(productsToChoose);
        }
    }, [inputValue]);

    return (
        <div className={styles.searchWrapper}>
            <input
                value={inputValue}
                type="text"
                placeholder="SEARCH"
                className={styles.input}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setInputValue(e.target.value)
                }
            />
            <Image width="18" height="18" src="/search.svg" alt="search icon" />
            {inputValue.length ? (
                <div className={styles.searchSelect}>
                    {productsToChooseFiltered.length ? (
                        productsToChooseFiltered.map((product) => (
                            <div className={styles.item} key={product._id}>
                                <Image
                                    src={product.imgSrc}
                                    alt={product.title + "photo"}
                                    width="35"
                                    height="70"
                                />
                                <Link href={"/product/" + product._id}>
                                    {product.title}
                                </Link>
                            </div>
                        ))
                    ) : (
                        <span>Nothing found...</span>
                    )}
                </div>
            ) : (
                ""
            )}
        </div>
    );
};

export default Search;
