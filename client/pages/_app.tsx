import "../styles/globals.css";
import "antd/dist/antd.css";
import { Provider, useDispatch } from "react-redux";
import { useStore } from "../redux/store";
import { useEffect } from "react";
import { authCheckT } from "../redux/reducers/userReducer";

export default function MyApp({ Component, pageProps }) {
  const store = useStore(pageProps.initialReduxState);

  return (
    <Provider store={store}>
      <App Component={Component} pageProps={pageProps} />
    </Provider>
  );
}

const App = ({ Component, pageProps }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(authCheckT());
  });
  return <Component {...pageProps} />;
};
