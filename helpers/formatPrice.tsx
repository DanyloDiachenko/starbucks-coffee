const formatPrice = (price: number): JSX.Element => {
    const formattedPrice = price.toFixed(2);
    return <span>{formattedPrice} </span>;
};

export default formatPrice;