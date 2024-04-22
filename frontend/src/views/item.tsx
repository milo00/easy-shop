import { useDispatch, useSelector } from "react-redux";
import { Button, Col, Container, Row } from "reactstrap";
import { useEffect, useState } from "react";
import { fetchById } from "../store/slices/itemsSlice";
import { IRootState, AppDispatch } from "../store/store";
import { useParams } from "react-router-dom";
import { breadcrumbBuilder } from "../utils/breadcrumbBuilder";
import { addItem } from "../store/slices/cartSlice";

export const Item = () => {
  const [cartText, setCartText] = useState("");
  const item = useSelector((state: IRootState) => state.items.item);
  const dispatch = useDispatch<AppDispatch>();
  let params = useParams();

  useEffect(() => {
    dispatch(fetchById(Number(params.id)));
  }, [params.id, dispatch]);

  const onAddToCard = () => {
    setCartText("");
    dispatch(addItem(item.id));
    setCartText("Item added to cart.");
  };

  return (
    <Container>
      <Row className="justify-content-flex-start">
        <Col>
          {item &&
            breadcrumbBuilder([
              item.gender,
              item.productType?.category,
              item.productType?.subcategory,
              item.productType?.productType,
              item.name,
            ])}
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col xs="12" md="6">
          <img
            alt={item?.name + " image"}
            src={item?.imgUrl}
            style={{ width: "auto", maxHeight: window.innerHeight * 0.75 }}
          />
        </Col>
        <Col
          className="d-flex flex-column justify-content-center px-3"
          xs="12"
          md="6"
        >
          <span>{item?.name}</span>
          <span>{item?.gender}</span>
          <span>{item?.productType?.productType}</span>
          <div>
            <span
              className={
                item?.currentPrice ? "text-decoration-line-through" : ""
              }
            >
              {item?.regularPrice}zł
            </span>
            {item?.currentPrice && (
              <span className="mx-2 text-danger">{item?.currentPrice}zł</span>
            )}
          </div>
          <Button
            className="mt-3"
            color="primary"
            onClick={onAddToCard}
            style={{ width: "fit-content" }}
          >
            Add to cart
          </Button>
          <span style={{ fontSize: "x-small" }}>{cartText}</span>
        </Col>
      </Row>
    </Container>
  );
};

export default Item;
