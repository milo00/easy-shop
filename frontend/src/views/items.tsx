import { useEffect, useMemo, useState } from "react";
import { Category, Gender } from "../models/item";
import { useSelector, useDispatch } from "react-redux";
import { IRootState, AppDispatch } from "../store/store";
import { fetchItems } from "../store/slices/itemsSlice";
import { ItemCard } from "../components/itemCard";
import { Col, Container, Row } from "reactstrap";
import { useParams } from "react-router-dom";
import { breadcrumbBuilder } from "../utils/breadcrumbBuilder";
import { isKeyOfEnum } from "../utils/functions";
import Sidebar from "../components/sidebar";
import IMenuData, { isMenuData } from "../models/menuData";
import api, { BASE_URL } from "../config/axiosInterceptor";

const Items = () => {
  const [menuData, setMenuData] = useState<IMenuData | undefined>(undefined);

  let params = useParams();
  const items = useSelector((state: IRootState) => state.items.items);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (
      isKeyOfEnum(Object.keys(Category), params.category) &&
      isKeyOfEnum(Object.keys(Gender), params.gender)
    ) {
      dispatch(
        fetchItems({
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
          gender: Gender[params.gender!.toUpperCase() as keyof typeof Gender],
        })
      );
    }
  }, [params.subcategory, params.category, params.gender, dispatch]);

  useEffect(() => {
    const fetchMenuData = async () => {
      const data = await api.get(`${BASE_URL}/menu-data`);
      isMenuData(data.data) && setMenuData(data.data);
    };

    if (!menuData) {
      fetchMenuData();
    }
  }, [menuData]); // Dependency array ensures this effect runs only once on mount

  const memoizedCategories = useMemo(() => {
    return menuData;
  }, [menuData]);

  return (
    <Container className="ms-0">
      <Row>
        <Col xs={2} className="px-0">
          <Sidebar menuData={memoizedCategories} />
        </Col>
        <Col xs={10}>
          <Row xs={12}>
            {breadcrumbBuilder([
              params.gender,
              params.category,
              params.subcategory,
              params.productType,
            ])}
          </Row>
          <Row xs={1} md={2} lg={3}>
            {items?.map((item) => (
              <Col key={item.id}>
                <ItemCard key={item.id} item={item} />
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default Items;
