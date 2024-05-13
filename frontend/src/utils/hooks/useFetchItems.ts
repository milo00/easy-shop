import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { Category, Gender } from "../../models/item";
import { AppDispatch } from "../../store/store";
import { isKeyOfEnum } from "../functions";
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
      isKeyOfEnum(Object.keys(Category), params.category) &&
      isKeyOfEnum(Object.keys(Gender), params.gender)
    ) {
      actionPromise = dispatch(
        action({
          page: currentPage,
          sortingType: currentSorting,
          gender: Gender[params.gender!.toUpperCase() as keyof typeof Gender],
          category:
            Category[params.category!.toUpperCase() as keyof typeof Category],
          subcategory: params.subcategory,
          productType: params.productType,
        })
      );
    } else if (isKeyOfEnum(Object.keys(Gender), params.gender)) {
      actionPromise = dispatch(
        action({
          page: currentPage,
          sortingType: currentSorting,
          gender: Gender[params.gender!.toUpperCase() as keyof typeof Gender],
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
