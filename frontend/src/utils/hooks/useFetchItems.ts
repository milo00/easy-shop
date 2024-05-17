import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { Category, Gender } from "../../models/item";
import { AppDispatch } from "../../store/store";
import { isKeyOfEnum as isValueOfEnum } from "../functions";
import { reset } from "../../store/slices/itemsSlice";
import ItemSortingType from "../../models/itemSortingType";

const useFetchItems = (
  currentPage: number,
  currentSorting: ItemSortingType,
  action: any
) => {
  const params = useParams();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    let actionPromise: { abort: () => any };

    if (
      isValueOfEnum(Object.values(Category), params.category) &&
      isValueOfEnum(Object.values(Gender), params.gender)
    ) {
      actionPromise = dispatch(
        action({
          page: currentPage,
          sortingType: currentSorting,
          gender: Object.entries(Gender).find(
            (val) => val[1] === params.gender?.toUpperCase()
          )![0],
          category: Object.entries(Category).find(
            (val) => val[1] === params.category?.toUpperCase()
          )![0],
          subcategory: params.subcategory,
          productType: params.productType,
        })
      );
    } else if (isValueOfEnum(Object.values(Gender), params.gender)) {
      actionPromise = dispatch(
        action({
          page: currentPage,
          sortingType: currentSorting,
          gender: Object.entries(Gender).find(
            (val) => val[1] === params.gender?.toUpperCase()
          )![0],
        })
      );
    } else {
      actionPromise = dispatch(
        action({
          page: currentPage,
          sortingType: currentSorting,
        })
      );
    }

    return () => {
      if (actionPromise) {
        actionPromise.abort();
        dispatch(reset());
      }
    };
  }, [params, dispatch, currentPage, currentSorting, action]);

  return params;
};

export default useFetchItems;
