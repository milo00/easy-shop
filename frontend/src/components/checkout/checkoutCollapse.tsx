import { PropsWithChildren } from "react";
import { Collapse } from "reactstrap";

interface ICheckoutCollapseProps {
  isOpen: boolean;
  header: string;
}

const CheckoutCollapse = (props: PropsWithChildren<ICheckoutCollapseProps>) => {
  return (
    <div>
      <h4 className={`${props.isOpen ? "" : "text-secondary"}`}>
        {props.header}
      </h4>
      <Collapse isOpen={props.isOpen}>{props.children}</Collapse>
    </div>
  );
};

export default CheckoutCollapse;
