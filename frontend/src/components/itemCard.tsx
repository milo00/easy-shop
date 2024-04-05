import IItem from "../models/item";
import { Card, CardBody, CardSubtitle, CardText, CardTitle } from "reactstrap";

interface IItemCardProps {
  item: IItem;
}

export const ItemCard = (props: IItemCardProps) => {
  return (
    <Card className="mx-3 align-items-center border-0">
      <img
        alt={props.item.name + " image"}
        src={props.item.src}
        style={{ height: "300px", width: "300px" }}
      />
      <CardBody>
        <CardTitle tag="h5">{props.item.name}</CardTitle>
        <CardSubtitle className="mb-2 text-muted" tag="h6">
          {props.item.price}
        </CardSubtitle>
        <CardText>
          Some quick example text to build on the card title and make up the
          bulk of the card‘s content.
        </CardText>
      </CardBody>
    </Card>
  );
};
