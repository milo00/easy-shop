import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ItemCard } from "../components/itemCard";
import { fetchOnSale } from "../store/slices/itemsSlice";
import { IRootState, AppDispatch } from "../store/store";
import { Container, Row, Col } from "reactstrap";

const Sale = () => {
  const items = useSelector((state: IRootState) => state.items.items);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchOnSale());
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

export default Sale;
