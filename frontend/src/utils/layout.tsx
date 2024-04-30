import { PropsWithChildren } from "react";
import Header from "../components/header";
import CatchKey from "./catchKey";

interface ILayoutProps {
  basic?: boolean;
}

const Layout = (props: PropsWithChildren<ILayoutProps>) => (
  <CatchKey>
    <Header basic={props.basic} />
    {props.children}
  </CatchKey>
);

export default Layout;
