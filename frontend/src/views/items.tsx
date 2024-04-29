import { useSelector } from "react-redux";
import { IRootState } from "../store/store";
import { ItemCard } from "../components/itemCard";
import { Col, Container, Progress, Row } from "reactstrap";
import { breadcrumbBuilder } from "../utils/breadcrumbBuilder";
import Sidebar from "../components/sidebar/sidebar";
import Loader from "../components/loader";
import Pagination from "../components/pagination";
import usePagination from "../utils/hooks/usePagination";
import useFetchItems from "../utils/hooks/useFetchItems";
import { useLocation } from "react-router-dom";
import { isSalePath } from "../utils/functions";
import { useEffect } from "react";

interface IItemsProps {
  fetchItems: any;
}

const Items = (props: IItemsProps) => {
  const items = useSelector((state: IRootState) => state.items.items);
  const totalPages = useSelector((state: IRootState) => state.items.totalPages);
  const status = useSelector((state: IRootState) => state.items.status);

  const { currentPage, onPageChange } = usePagination();
  const params = useFetchItems(currentPage, props.fetchItems);
  const location = useLocation();

  return (
    <Container fluid>
      <Row>
        <Col xs={2}>
          <Sidebar />
        </Col>
        <Col>
          <Row>
            {breadcrumbBuilder([
              isSalePath(location) ? "sale" : undefined,
              params.gender,
              params.category,
              params.subcategory,
              params.productType,
            ])}
          </Row>
          <Row>
            <Col className="d-flex flex-column align-items-center mt-5">
              <Loader loading={status === "loading"} type={"progressBar"}>
                <Row xs={1} md={2} lg={3}>
                  {items?.map((item) => (
                    <Col key={item.id}>
                      <ItemCard key={item.id} item={item} />
                    </Col>
                  ))}
                </Row>
              </Loader>
            </Col>
            {status === "loading" ? <Col xs={2} /> : null}
          </Row>
        </Col>
      </Row>
      {status === "loading" ? null : (
        <Row className="justify-content-center mt-5">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChanges={onPageChange}
          />
        </Row>
      )}
    </Container>
  );
};

export default Items;
