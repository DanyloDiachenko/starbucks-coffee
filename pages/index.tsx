import Head from "next/head";
import { GetStaticProps } from "next";

import HomeMainComponent from "components/PageComponents/HomeMainComponent";
import Products from "components/PageComponents/Products";
import ProductsProps from "components/PageComponents/Products/products.props";

const HomePage = ({ products }: ProductsProps): JSX.Element => {
    return (
        <>
            <Head>
                <title>Starbucks Coffee</title>
                <link rel="icon" type="image/webp" href="/logo.webp" />
                <link rel="manifest" href="/manifest.json" />
                <meta name="theme-color" content="#ffffff" />
                <link
                    rel="apple-touch-icon"
                    type="image/webp"
                    href="/logo.webp"
                />
                <meta
                    name="apple-mobile-web-app-status-bar"
                    content="#ffffff"
                />
                <meta name="title" content="Starbucks Coffee" />
                <meta
                    name="description"
                    content={
                        "Buy cheep coffee online with a delivery to home for a few minutes"
                    }
                />
                <meta
                    name="keywords"
                    content={
                        "coffee, starbucks, frappucino, fresh coffee, coffee online, starbucks frappuccino, frappuccino starbucks, caramel frappuccino, frappuccino recipe, mocha frappuccino, frappuccino at starbucks, a frappuccino from starbucks, frappuccino blended beverage, frappuccino drinks"
                    }
                />
                <meta name="robots" content="index, follow" />
                <meta name="language" content="English" />
                <meta name="revisit-after" content="2 days" />
                <meta property="og:title" content="Starbucks Coffee" />
                <meta property="og:site_name" content="Starbucks Coffee" />
                {/* <meta property="og:url" content="https://spacecore.pro" /> */}
                <meta
                    property="og:description"
                    content={
                        "Buy cheep coffee online with a delivery to home for a few minutes"
                    }
                />
                <meta property="og:type" content="website" />
                <meta property="og:image" content="/logo.webp" />
                <meta
                    name="apple-mobile-web-app-title"
                    content="Starbucks Coffee"
                />
                <meta name="application-name" content="Starbucks Coffee" />
                <link
                    rel="preload"
                    as="image"
                    type="image/webp"
                    href="/logo.webp"
                />
            </Head>
            <>
                <HomeMainComponent />
                <Products products={products} />
            </>
        </>
    );
};

export default HomePage;

export const getStaticProps: GetStaticProps<ProductsProps> = async () => {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/coffees`,
        );
        const data = await res.json();
        if (data.success) {
            return {
                props: {
                    products: data.data,
                },
            };
        } else {
            return {
                props: {
                    products: [],
                },
            };
        }
    } catch (error) {
        console.error(error);
        return {
            props: {
                products: [],
            },
        };
    }
};
