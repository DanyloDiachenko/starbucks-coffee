import type { AppProps } from "next/app";
import { Inter } from "next/font/google";
import { StrictMode } from "react";
import { Provider } from "react-redux";

import store from "store";
import Header from "components/Header";
import "../styles/globals.scss";

const inter = Inter({
    subsets: ["latin"],
    weight: ["500", "600", "700", "800", "900"],
    style: ["normal"],
});

const App = ({ Component, pageProps }: AppProps): JSX.Element => {
    return (
        <StrictMode>
            <Provider store={store}>
                <header className={`${inter.className}`}>
                    <Header />
                </header>

                <main className={`container ${inter.className}`}>
                    <div className="backgroundDot"></div>
                    <Component {...pageProps} />
                </main>

                {/* <footer className={`container ${inter.className}`}></footer> */}
            </Provider>
        </StrictMode>
    );
};

export default App;
