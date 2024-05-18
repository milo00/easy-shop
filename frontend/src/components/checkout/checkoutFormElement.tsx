import React, {
  PropsWithChildren,
  ReactNode,
  useEffect,
  useState,
} from "react";
import { Button, Form } from "reactstrap";
import CheckoutCollapse from "./checkoutCollapse";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import Loader from "../loader/loader";

interface ICheckoutFormElementProps {
  isOpen: boolean;
  wasSubmitted: boolean;
  header: string;
  onSubmitCallback: (data: FormData) => ReactNode;
  onResetCallback: VoidFunction;
  setCardValidatedCallback?: VoidFunction;
}

const CheckoutFormElement = (
  props: PropsWithChildren<ICheckoutFormElementProps>
) => {
  const [submittedData, setSubmittedData] = useState<ReactNode>();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (props.wasSubmitted && props.header === "płatność") {
      setIsLoading(true);
      timer = setTimeout(() => {
        setIsLoading(false);
        props.setCardValidatedCallback && props.setCardValidatedCallback();
      }, 10000);
    }

    return () => {
      timer && clearTimeout(timer);
    };
  }, [props.wasSubmitted]); // eslint-disable-line

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    setSubmittedData(props.onSubmitCallback(data));
  };

  if (props.wasSubmitted) {
    return (
      <div className="text-secondary">
        <div className="d-flex justify-content-between">
          <h4>{props.header}</h4>
          {!isLoading && (
            <FontAwesomeIcon
              icon={faPen}
              onClick={props.onResetCallback}
              role="button"
            />
          )}
        </div>
        <Loader loading={isLoading} basic>
          <span style={{ fontSize: "smaller" }}>{submittedData}</span>
        </Loader>
      </div>
    );
  }

  return (
    <CheckoutCollapse isOpen={props.isOpen} header={props.header}>
      <Form onSubmit={onSubmit}>
        {props.children}
        <Button
          className="my-3"
          type="submit"
          color="primary"
          outline
          size="sm"
        >
          dalej
        </Button>
      </Form>
    </CheckoutCollapse>
  );
};

export default CheckoutFormElement;
