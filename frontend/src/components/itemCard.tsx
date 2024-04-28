import { useNavigate } from "react-router-dom";
import IItem from "../models/item";
import { Card, CardBody, CardSubtitle, CardText, CardTitle } from "reactstrap";
import "../styles/card.css";

interface IItemCardProps {
  item: IItem;
}

export const ItemCard = (props: IItemCardProps) => {
  const navigate = useNavigate();

  const handleOnClick = () => {
    navigate(`/items/${props.item?.id}`);
  };

  return (
    <Card className="mx-3 align-items-center border-0" onClick={handleOnClick}>
      <img
        alt={props.item.name + " image"}
        src={props.item.imgUrl}
        style={{ height: "300px", width: "auto" }}
      />
      <CardBody>
        <CardTitle tag="h5" style={{ fontWeight: "normal" }}>
          {props.item.name}
        </CardTitle>
        <CardSubtitle
          className="mb-2"
          tag="h6"
          style={{ fontWeight: props.item.currentPrice ? "bolder" : "normal" }}
        >
          <span
            className={
              props.item.currentPrice
                ? "text-decoration-line-through font-weight-bold"
                : "font-weight-medium"
            }
          >
            {props.item.regularPrice} PLN
          </span>
          {props.item.currentPrice && (
            <span className="mx-2 text-danger font-weight-bold">
              {props.item.currentPrice} PLN
            </span>
          )}
        </CardSubtitle>
        <CardText className="text-muted">
          <div>{props.item.productType?.productType}</div>
          <div style={{ fontSize: "smaller" }}>
            {props.item.productType?.subcategory}
          </div>
        </CardText>
      </CardBody>
    </Card>
  );
};
