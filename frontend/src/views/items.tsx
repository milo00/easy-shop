import { useEffect } from "react";
import { Category, Gender } from "../models/item";
import { useSelector, useDispatch } from "react-redux";
import { IRootState, AppDispatch } from "../store/store";
import { fetchItems } from "../store/slices/itemsSlice";
import { ItemCard } from "../components/itemCard";
import { Col, Container, Row } from "reactstrap";
import { useParams } from "react-router-dom";
import { breadcrumbBuilder } from "../utils/breadcrumbBuilder";
import { isKeyOfEnum } from "../utils/functions";
import Sidebar from "../components/sidebar/sidebar";
import Loader from "../components/loader";
import Pagination from "../components/pagination";
import usePagination from "../utils/hooks/usePagination";

const Items = () => {
  let params = useParams();
  const items = useSelector((state: IRootState) => state.items.items);
  const totalPages = useSelector((state: IRootState) => state.items.totalPages);
  const status = useSelector((state: IRootState) => state.items.status);

  const { currentPage, onPageChange } = usePagination();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (
      isKeyOfEnum(Object.keys(Category), params.category) &&
      isKeyOfEnum(Object.keys(Gender), params.gender)
    ) {
      dispatch(
        fetchItems({
          page: currentPage,
          gender: Gender[params.gender!.toUpperCase() as keyof typeof Gender],
          category:
            Category[params.category!.toUpperCase() as keyof typeof Category],
          subcategory: params.subcategory,
          productType: params.productType,
        })
      );
    } else if (isKeyOfEnum(Object.keys(Gender), params.gender)) {
      dispatch(
        fetchItems({
          page: currentPage,
          gender: Gender[params.gender!.toUpperCase() as keyof typeof Gender],
        })
      );
    }
  }, [
    params.subcategory,
    params.category,
    params.gender,
    params.productType,
    dispatch,
    currentPage,
  ]);

  return (
    <Container className="ms-0">
      <Row>
        <Col xs={2} className="px-0">
          <Sidebar />
        </Col>
        <Col>
          <Row>
            {breadcrumbBuilder([
              params.gender,
              params.category,
              params.subcategory,
              params.productType,
            ])}
          </Row>
          <Row xs={1} md={2} lg={3} className="justify-content-center">
            <Loader loading={status === "loading"} type={"spinner"}>
              {items?.map((item) => (
                <Col key={item.id}>
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
        </Col>
      </Row>
    </Container>
  );
};

export default Items;
