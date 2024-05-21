import { PropsWithChildren } from "react";
import Header from "../components/header/header";
import CatchKey from "./catchKey";
import Footer from "../components/footer";

interface ILayoutProps {
  basic?: boolean;
}

const Layout = (props: PropsWithChildren<ILayoutProps>) => (
  <CatchKey>
    <Header basic={props.basic} />
    {props.children}
    <Footer />
  </CatchKey>
);

export default Layout;
