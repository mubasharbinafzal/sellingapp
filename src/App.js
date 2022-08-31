import './App.css';
import Main from "./container/Main";
import { Provider } from "react-redux";
import { SnackbarProvider } from "notistack";
import store from "./redux/store";

function App() {
  return (
    <Provider store={store}>
      <SnackbarProvider
        dense={false}
        hideIconVariant={false}
        preventDuplicate={false}
        autoHideDuration={2000}
        // persist={true}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
      >
        <Main />
      </SnackbarProvider>
    </Provider>

  );
}

export default App;
