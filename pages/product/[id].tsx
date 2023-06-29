import Head from "next/head";
import { GetStaticProps, GetStaticPaths } from "next";

import ProductDetailsComponent from "../../components/PageComponents/ProductDetails";
import ProductDetailsProps from "../../components/PageComponents/ProductDetails/productDetails.props";
import IProduct from "components/PageComponents/Products/product.interface";

const ProductDetails = ({ product }: ProductDetailsProps): JSX.Element => {
    return (
        <>
            <Head>
                <title>Buy {product.title}</title>
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
                <meta name="title" content={product.title} />
                <meta
                    name="description"
                    content={
                        product.title +
                        "Buy cheep coffee online with a delivery to home for a few minutes"
                    }
                />
                <meta
                    name="keywords"
                    content={
                        product.title +
                        "coffee, starbucks, frappucino, fresh coffee, coffee online, starbucks frappuccino, frappuccino starbucks, caramel frappuccino, frappuccino recipe, mocha frappuccino, frappuccino at starbucks, a frappuccino from starbucks, frappuccino blended beverage, frappuccino drinks"
                    }
                />
                <meta name="robots" content="index, follow" />
                <meta name="language" content="English" />
                <meta name="revisit-after" content="2 days" />
                <meta
                    property="og:title"
                    content={`${product._id} in Starbucks Coffee`}
                />
                <meta
                    property="og:site_name"
                    content={`${product._id} in Starbucks Coffee`}
                />
                <meta
                    property="og:url"
                    content={`https://starbucks-coffee-gules.vercel.app/${product._id}`}
                />
                <meta
                    property="og:description"
                    content={
                        product.title +
                        " - Buy cheep coffee online with a delivery to home for a few minutes"
                    }
                />
                <meta property="og:type" content="website" />
                <meta property="og:image" content="/logo.webp" />
                <meta
                    name="apple-mobile-web-app-title"
                    content="Starbucks Coffee"
                />
                <meta name="application-name" content="Starbucks Coffee" />
            </Head>
            <>
                <ProductDetailsComponent product={product} />
            </>
        </>
    );
};

export default ProductDetails;

export const getStaticProps: GetStaticProps = async (context) => {
    const productId = context.params && context.params.id;

    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/coffees/${productId}`,
        );
        console.log(res);
        const data = await res.json();
        if (data.success) {
            return {
                props: {
                    product: data.data,
                },
            };
        } else {
            return {
                props: {
                    product: {},
                },
            };
        }
    } catch (error) {
        console.error(error);
        return {
            props: {
                product: {},
            },
        };
    }
};

export const getStaticPaths: GetStaticPaths = async () => {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/coffees`,
        );
        const data = await res.json();

        if (data.success) {
            const paths = data.data.map((product: IProduct) => ({
                params: { id: product._id.toString() },
            }));

            return {
                paths,
                fallback: false,
            };
        } else {
            return {
                paths: [],
                fallback: false,
            };
        }
    } catch (error) {
        console.error(error);
        return {
            paths: [],
            fallback: false,
        };
    }
};
