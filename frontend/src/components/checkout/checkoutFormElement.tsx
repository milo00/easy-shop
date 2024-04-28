import React, { PropsWithChildren, ReactNode, useState } from "react";
import { Button, Form } from "reactstrap";
import CheckoutCollapse from "./checkoutCollapse";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";

interface ICheckoutFormElementProps {
  isOpen: boolean;
  wasSubmitted: boolean;
  header: string;
  onSubmitCallback: (data: FormData) => ReactNode;
  onResetCallback: VoidFunction;
}

const CheckoutFormElement = (
  props: PropsWithChildren<ICheckoutFormElementProps>
) => {
  const [submittedData, setsubmittedData] = useState<ReactNode>();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    setsubmittedData(props.onSubmitCallback(data));
  };

  if (props.wasSubmitted) {
    return (
      <div className="text-secondary">
        <div className="d-flex justify-content-between">
          <h4>{props.header}</h4>
          <FontAwesomeIcon
            icon={faPen}
            onClick={props.onResetCallback}
            role="button"
          />
        </div>
        <span style={{ fontSize: "smaller" }}>{submittedData}</span>
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
          next
        </Button>
      </Form>
    </CheckoutCollapse>
  );
};

export default CheckoutFormElement;
