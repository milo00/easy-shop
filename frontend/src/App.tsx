import "./App.css";
import store from "./store/store";
import { Provider } from "react-redux";
import { AppRoutes } from "./routes";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <AppRoutes />
      </div>
    </Provider>
  );
}

export default App;
