import "./App.css";
import store from "./store/store";
import { Provider } from "react-redux";
import { AppRoutes } from "./routes";
import "bootstrap/dist/css/bootstrap.min.css";
import { createContext, useEffect, useState } from "react";
import api, { BASE_URL } from "./config/axiosInterceptor";
import IMenuData, { isSidebarData } from "./models/menuData";
import LoaderType from "./models/loader";

export const SidebarDataContext = createContext<IMenuData | null>(null);
export const LoaderTypeDataContext = createContext<LoaderType>(
  LoaderType.SPINNER
);

function App() {
  const [sidebarData, setSidebarData] = useState<IMenuData | null>(null);

  useEffect(() => {
    const fetchSidebarData = async () => {
      const data = await api.get(`${BASE_URL}/menu-data`);
      isSidebarData(data.data) && setSidebarData(data.data);
    };

    fetchSidebarData();
  }, []);

  return (
    <Provider store={store}>
      <SidebarDataContext.Provider value={sidebarData}>
        <LoaderTypeDataContext.Provider value={LoaderType.MEMES}>
          <div className="App">
            <AppRoutes />
          </div>
        </LoaderTypeDataContext.Provider>
      </SidebarDataContext.Provider>
    </Provider>
  );
}

export default App;
