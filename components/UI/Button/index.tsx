import ButtonProps from "./button.props";
import styles from "./button.module.scss";

const Button = ({
    children,
    className,
    ...props
}: ButtonProps): JSX.Element => {
    return (
        <button className={`${className} ${styles.button}`} {...props}>
            {children}
        </button>
    );
};

export default Button;
