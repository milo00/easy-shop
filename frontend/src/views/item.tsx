import { useDispatch, useSelector } from "react-redux";
import { Button, Col, Container, Row } from "reactstrap";
import { useEffect, useState } from "react";
import { fetchById } from "../store/slices/itemsSlice";
import { IRootState, AppDispatch } from "../store/store";
import { useParams } from "react-router-dom";
import { breadcrumbBuilder } from "../utils/breadcrumbBuilder";
import { addItem } from "../store/slices/cartSlice";
import Loader from "../components/loader/loader";
import Sidebar from "../components/sidebar/sidebar";
import { Category, Gender } from "../models/item";
import _ from "lodash";
import { getEnumFromKey, getEnumValueFromKey } from "../utils/functions";

const apparelSizes: Map<Gender, string[]> = new Map([
  [Gender.WOMEN, ["XS", "S", "M", "L", "XL"]],
  [Gender.MEN, ["XS", "S", "M", "L", "XL"]],
  [Gender.KIDS, ["116", "128", "134", "140", "146", "152", "158", "164"]],
  [Gender.GIRLS, ["116", "128", "134", "140", "146", "152", "158", "164"]],
  [Gender.BOYS, ["116", "128", "134", "140", "146", "152", "158", "164"]],
]);
const footwearSizes: Map<Gender, number[]> = new Map([
  [Gender.KIDS, _.range(31, 37)],
  [Gender.BOYS, _.range(31, 37)],
  [Gender.GIRLS, _.range(31, 37)],
  [Gender.MEN, _.range(38, 46)],
  [Gender.WOMEN, _.range(35, 41)],
]);

export const Item = () => {
  const [cartText, setCartText] = useState("");
  const [chosenSize, setChosenSize] = useState<string | number | undefined>(
    undefined
  );
  const item = useSelector((state: IRootState) => state.items.item);
  const status = useSelector((state: IRootState) => state.items.status);

  const dispatch = useDispatch<AppDispatch>();
  const params = useParams();

  useEffect(() => {
    const actionPromise = dispatch(fetchById(Number(params.id)));

    return () => {
      actionPromise.abort();
    };
  }, [params.id, dispatch]);

  const onAddToCard = () => {
    setCartText("");
    dispatch(addItem({ id: item.id, size: chosenSize }));
    setCartText("produkt dodany do koszyka");
  };

  const isLoading = status === "loading";

  const getSizeForGender = (
    sizes: Map<Gender, number[]> | Map<Gender, string[]>,
    gender?: Gender
  ) => gender && sizes.get(getEnumFromKey(Gender, gender) ?? Gender.WOMEN);

  const getSizes = (category?: Category, gender?: Gender) => {
    return (
      (getEnumValueFromKey(Category, category) === Category.APPAREL
        ? getSizeForGender(apparelSizes, gender)
        : getSizeForGender(footwearSizes, gender)) ?? []
    );
  };

  const onSizeChange = (size: string | number) => {
    setChosenSize(chosenSize === size ? "" : size);
    setCartText("");
  };

  return (
    <Container fluid>
      <Row>
        <Col xs={2}>
          <Sidebar />
        </Col>
        <Col
          className={`d-flex flex-column align-items-${
            isLoading ? "center mt-5" : "start"
          }`}
        >
          <Loader loading={isLoading} width={50}>
            <Row className="justify-content-flex-start">
              <Col>
                {item &&
                  breadcrumbBuilder([
                    getEnumValueFromKey(Gender, item.gender),
                    getEnumValueFromKey(Category, item.productType?.category),
                    item.productType?.subcategory,
                    item.productType?.productType,
                    item.name,
                  ])}
              </Col>
            </Row>

            <Row>
              <Col xs="12" md="6">
                <img
                  alt={item?.name + " image"}
                  src={item?.imgUrl}
                  style={{
                    width: "100%",
                    height: window.innerHeight * 0.75,
                    objectFit: "contain",
                  }}
                />
              </Col>
              <Col
                className="d-flex flex-column justify-content-center px-3"
                xs="12"
                md="6"
              >
                <span style={{ fontSize: "larger" }}>{item?.name}</span>
                <span>{item?.gender?.toLowerCase()}</span>
                <span>{item?.productType?.productType?.toLowerCase()}</span>
                <div>
                  <span
                    className={
                      item?.currentPrice === item?.regularPrice
                        ? ""
                        : "text-decoration-line-through"
                    }
                  >
                    {item?.regularPrice} PLN
                  </span>
                  {item?.currentPrice && (
                    <span className="mx-2 text-danger">
                      {item?.currentPrice} PLN
                    </span>
                  )}
                </div>
                <div className="d-flex gap-2 my-4">
                  {getSizes(item.productType?.category, item.gender).map(
                    (i) => (
                      <Button
                        key={i}
                        color="secondary"
                        outline
                        active={chosenSize === i}
                        onClick={() => onSizeChange(i)}
                      >
                        {i}
                      </Button>
                    )
                  )}
                </div>

                <Button
                  className="mt-3"
                  color="primary"
                  onClick={onAddToCard}
                  disabled={!chosenSize}
                  style={{ width: "fit-content" }}
                >
                  dodaj do koszyka
                </Button>
                <span style={{ fontSize: "small", paddingTop: "0.5rem" }}>
                  {cartText}
                </span>
              </Col>
            </Row>
          </Loader>
        </Col>
        {isLoading ? <Col xs={2} /> : null}
      </Row>
    </Container>
  );
};

export default Item;
