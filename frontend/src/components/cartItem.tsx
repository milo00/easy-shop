import React from "react";
import IItem, { getPrice } from "../models/item";
import { Input, Label } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import {
  addItem,
  removeSingleItem,
  removeWholeItem,
} from "../store/slices/cartSlice";

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
            onClick={() => dispatch(removeWholeItem(props.item.id))}
            style={{ cursor: "pointer", marginLeft: "2rem" }}
          />
        </div>
        <div>{props.item.gender}</div>
        <div>{getPrice(props.item)}zł</div>
        <Label>Quantity:</Label>
        <div className="d-flex align-items-center gap-2">
          <FontAwesomeIcon
            icon={faMinus}
            onClick={() => dispatch(removeSingleItem(props.item.id))}
          />
          <Input
            value={props.quantity}
            type="number"
            readOnly
            style={{ width: "4rem" }}
          />
          <FontAwesomeIcon
            icon={faPlus}
            onClick={() => dispatch(addItem(props.item.id))}
          />
        </div>
      </div>
    </div>
  );
};

export default CartItem;
