import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { Category, Gender } from "../../models/item";
import { AppDispatch } from "../../store/store";
import { getEnumKeyFromValue, isEnumValue } from "../functions";
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
      isEnumValue(Category, params.category) &&
      isEnumValue(Gender, params.gender)
    ) {
      actionPromise = dispatch(
        action({
          page: currentPage,
          sortingType: getEnumKeyFromValue(ItemSortingType, currentSorting),
          gender: getEnumKeyFromValue(Gender, params.gender),
          category: getEnumKeyFromValue(Category, params.category),
          subcategory: params.subcategory,
          productType: params.productType,
        })
      );
    } else if (isEnumValue(Gender, params.gender)) {
      actionPromise = dispatch(
        action({
          page: currentPage,
          sortingType: getEnumKeyFromValue(ItemSortingType, currentSorting),
          gender: getEnumKeyFromValue(Gender, params.gender),
        })
      );
    } else {
      actionPromise = dispatch(
        action({
          page: currentPage,
          sortingType: getEnumKeyFromValue(ItemSortingType, currentSorting),
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
