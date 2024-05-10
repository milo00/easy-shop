import { Component, ErrorInfo, ReactNode } from "react";
import Error from "../views/error";
import { IRootState } from "../store/store";
import { ConnectedProps, connect } from "react-redux";
import Layout from "./layout";

interface IErrorBoundaryProps extends PropsFromRedux {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<IErrorBoundaryProps, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError || this.props.error) {
      return (
        <Layout basic>
          <Error />
        </Layout>
      );
    }

    return this.props.children;
  }
}

const mapStateToProps = (state: IRootState) => ({
  error:
    state.account.status === "failed" ||
    state.items.status === "failed" ||
    state.userIrritationTime.status === "failed",
});

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(ErrorBoundary);
