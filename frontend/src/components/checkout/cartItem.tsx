import { Input } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import {
  addItem,
  removeSingleItem,
  removeWholeItem,
} from "../../store/slices/cartSlice";
import { useNavigate } from "react-router-dom";
import { ICheckoutItem } from "../../models/cart";

interface ICartItemProps {
  item: ICheckoutItem;
}

const CartItem = (props: ICartItemProps) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div className="d-flex gap-3 w-100 border ps-0">
      <div role="button" onClick={() => navigate(`/produkty/${props.item.id}`)}>
        <img
          alt={props.item.name + " image"}
          src={props.item.imgUrl}
          style={{ height: "240px", width: "240px", objectFit: "cover" }}
        />
      </div>
      <div className="d-flex flex-column align-items-start justify-content-around w-100">
        <div className="d-flex w-100">
          <span
            role="button"
            onClick={() => navigate(`/produkty/${props.item.id}`)}
          >
            {props.item.name}
          </span>
          <FontAwesomeIcon
            icon={faClose}
            onClick={() =>
              dispatch(
                removeWholeItem({ id: props.item.id, size: props.item.size })
              )
            }
            style={{
              cursor: "pointer",
              marginLeft: "auto",
              marginRight: "1rem",
            }}
          />
        </div>
        <div>{props.item.currentPrice} PLN</div>
        <div>rozmiar: {props.item.size}</div>
        <div className="d-flex align-items-center justify-content-start gap-2">
          <FontAwesomeIcon
            icon={faMinus}
            onClick={() =>
              dispatch(
                removeSingleItem({ id: props.item.id, size: props.item.size })
              )
            }
          />
          <Input
            value={props.item.quantity}
            type="number"
            disabled
            style={{ width: "4rem", backgroundColor: "white" }}
          />
          <FontAwesomeIcon
            icon={faPlus}
            onClick={() =>
              dispatch(addItem({ id: props.item.id, size: props.item.size }))
            }
          />
        </div>
      </div>
    </div>
  );
};

export default CartItem;
