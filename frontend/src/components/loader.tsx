import { PropsWithChildren } from "react";
import { Progress, Spinner } from "reactstrap";

interface ILoaderProps {
  loading: boolean;
  type: "spinner" | "progressBar";
}

const Loader = (props: PropsWithChildren<ILoaderProps>) => {
  const getLoader = () =>
    props.type === "spinner" ? (
      <Spinner color="primary" size="large" />
    ) : (
      <Progress />
    );
  return props.loading ? getLoader() : <>{props.children}</>;
};

export default Loader;
