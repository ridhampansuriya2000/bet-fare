import "@/styles/globals.css";
import "@/styles/custom.css";
import Layout from "../Layout";
import ErrorBoundary from "../_components/Wrapper/ErrorBoundary";
import store from "../store/store";
import {Provider} from "react-redux";

export default function App({Component, pageProps}) {
    return (
        <div>
            <ErrorBoundary>
                <Provider store={store}>
                    <Layout>
                        <Component {...pageProps} />
                    </Layout>
                </Provider>
            </ErrorBoundary>
        </div>
    );
}

// export default wrapper.withRedux(appWithTranslation(App));
