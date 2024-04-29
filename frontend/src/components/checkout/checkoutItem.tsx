import { ICheckoutItem } from "../../models/cart";
import { getPrice } from "../../models/item";

interface ICheckoutItemProps {
  item: ICheckoutItem;
}

const CheckoutItem = (props: ICheckoutItemProps) => {
  return (
    <div className="d-flex w-100">
      <div>
        <img
          alt={props.item.name + " image"}
          src={props.item.imgUrl}
          style={{ width: "120px", height: "120px", objectFit: "cover" }}
        />
      </div>
      <div
        className="d-flex flex-column align-items-start"
        style={{ fontSize: "16px" }}
      >
        <span>{props.item.name}</span>
        <span>{getPrice(props.item)} PLN</span>
        <span className="text-secondary" style={{ fontSize: "smaller" }}>
          size: {props.item.size}
        </span>
        <span className="text-secondary" style={{ fontSize: "smaller" }}>
          quantity: {props.item.quantity}
        </span>
      </div>
    </div>
  );
};

export default CheckoutItem;
