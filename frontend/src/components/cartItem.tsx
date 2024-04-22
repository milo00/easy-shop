import React from "react";
import IItem from "../models/item";
import { Input, Label } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { removeItem } from "../store/slices/cartSlice";

interface ICartItemProps {
  item: IItem;
  quantity: number;
}

const CartItem = (props: ICartItemProps) => {
  const dispatch = useDispatch();

  return (
    <div className="d-flex">
      <div>
        <img
          alt={props.item.name + " image"}
          src={props.item.imgUrl}
          style={{ height: "140px", width: "140px" }}
        />
      </div>
      <div>
        <div>
          <span>{props.item.name}</span>
          <FontAwesomeIcon
            icon={faClose}
            onClick={() => dispatch(removeItem(props.item.id))}
            style={{ cursor: "pointer", marginLeft: "2rem" }}
          />
        </div>
        <div>{props.item.gender}</div>
        <div>{props.item.currentPrice ?? props.item.regularPrice}zł</div>
        <Label>Quantity:</Label>
        <Input value={props.quantity} />
        <div>
          Total:
          {props.quantity *
            (props.item.currentPrice ?? props.item.regularPrice ?? 0)}
          zł
        </div>
      </div>
    </div>
  );
};

export default CartItem;
