import { PropsWithChildren } from "react";
import Header from "../components/header";

interface ILayoutProps {
  basic?: boolean;
}

const Layout = (props: PropsWithChildren<ILayoutProps>) => (
  <div>
    <Header basic={props.basic} />
    {props.children}
  </div>
);

export default Layout;
