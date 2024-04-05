import { ReactNode } from "react";
import Header from "../components/header";

interface ILayoutProps {
  children: ReactNode;
}

const Layout = (props: ILayoutProps) => (
  <div>
    <Header />
    {props.children}
  </div>
);

export default Layout;
