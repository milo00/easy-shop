import { ICheckoutItem } from "../../models/cart";

interface ICheckoutItemProps {
  item: ICheckoutItem;
}

const CheckoutItem = (props: ICheckoutItemProps) => {
  return (
    <div className="d-flex w-100 gap-3">
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
        <span>{props.item.currentPrice} PLN</span>
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
