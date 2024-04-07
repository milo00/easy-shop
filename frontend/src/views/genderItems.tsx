import { useEffect } from "react";
import { Gender } from "../models/item";
import { useSelector, useDispatch } from "react-redux";
import { IRootState, AppDispatch } from "../store/store";
import { fetchByGender } from "../store/slices/itemsSlice";
import { ItemCard } from "../components/itemCard";
import { Col, Container, Row } from "reactstrap";

interface IGenderItemsProps {
  gender: Gender;
}

const GenderItems = (props: IGenderItemsProps) => {
  const items = useSelector((state: IRootState) => state.items.items);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchByGender(props.gender));
  }, []);

  return (
    <Container>
      <Row xs={1} md={2} lg={3}>
        {items?.map((item) => (
          <Col>
            <ItemCard key={item.id} item={item} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default GenderItems;
