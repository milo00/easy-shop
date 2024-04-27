import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ItemCard } from "../components/itemCard";
import { fetchOnSale } from "../store/slices/itemsSlice";
import { IRootState, AppDispatch } from "../store/store";
import { Container, Row, Col } from "reactstrap";
import Loader from "../components/loader";
import usePagination from "../utils/hooks/usePagination";
import Pagination from "../components/pagination";

const Sale = () => {
  const items = useSelector((state: IRootState) => state.items.items);
  const totalPages = useSelector((state: IRootState) => state.items.totalPages);
  const status = useSelector((state: IRootState) => state.items.status);

  const { currentPage, onPageChange } = usePagination();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchOnSale({ page: currentPage }));
  }, [dispatch, currentPage]);

  return (
    <Container>
      <Row xs={1} md={2} lg={3} className="justify-content-center">
        <Loader loading={status === "loading"} type={"spinner"}>
          {items?.map((item) => (
            <Col>
              <ItemCard key={item.id} item={item} />
            </Col>
          ))}
        </Loader>
      </Row>
      <Row className="justify-content-center mt-3">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChanges={onPageChange}
        />
      </Row>
    </Container>
  );
};

export default Sale;
