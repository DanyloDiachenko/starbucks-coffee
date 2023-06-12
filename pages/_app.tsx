import type { AppProps } from "next/app";
import { Inter } from "next/font/google";
import { StrictMode } from "react";
import { Provider } from "react-redux";

import store from "store";
import Header from "components/Header";
import Footer from "components/Footer";
import "../styles/globals.scss";
import PopupProductAdded from "../components/popups/ProductAdded";

const inter = Inter({
    subsets: ["latin"],
    weight: ["500", "600", "700", "800", "900"],
    style: ["normal"],
});

const App = ({ Component, pageProps }: AppProps): JSX.Element => {
    return (
        <StrictMode>
            <Provider store={store}>
                <header className={inter.className}>
                    <Header />
                </header>

                <main className={`container ${inter.className}`}>
                    <PopupProductAdded />
                    <div className="backgroundDot"></div>
                    <Component {...pageProps} />
                </main>

                <footer className={`footer ${inter.className}`}>
                    <Footer />
                </footer>
            </Provider>
        </StrictMode>
    );
};

export default App;
