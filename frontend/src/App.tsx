import "./App.css";
import store from "./store/store";
import { Provider } from "react-redux";
import { AppRoutes } from "./routes";
import "bootstrap/dist/css/bootstrap.min.css";
import { createContext, useEffect, useState } from "react";
import api, { BASE_URL } from "./config/axiosInterceptor";
import IMenuData, { isSidebarData } from "./models/menuData";
import CatchKey from "./utils/catchKey";

export const SidebarDataContext = createContext<IMenuData | null>(null);

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
        <div className="App">
          <AppRoutes />
        </div>
      </SidebarDataContext.Provider>
    </Provider>
  );
}

export default App;
