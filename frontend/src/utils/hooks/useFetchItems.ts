import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { Category, Gender } from "../../models/item";
import { AppDispatch } from "../../store/store";
import { isKeyOfEnum } from "../functions";

const useFetchItems = (currentPage: number, action: any) => {
  const params = useParams();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (
      isKeyOfEnum(Object.keys(Category), params.category) &&
      isKeyOfEnum(Object.keys(Gender), params.gender)
    ) {
      dispatch(
        action({
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
        action({
          page: currentPage,
          gender: Gender[params.gender!.toUpperCase() as keyof typeof Gender],
        })
      );
    } else {
      dispatch(
        action({
          page: currentPage,
        })
      );
    }
  }, [params, dispatch, currentPage, action]);

  return params;
};

export default useFetchItems;
