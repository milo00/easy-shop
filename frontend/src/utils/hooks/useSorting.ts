import { useLocation, useNavigate } from "react-router-dom";
import ItemSortingType from "../../models/itemSortingType";

const useSorting = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const currentSorting =
    ItemSortingType[
      (
        queryParams.get("sort") ?? "default"
      ).toUpperCase() as keyof typeof ItemSortingType
    ];

  const navigate = useNavigate();

  const onSortingChange = (sorting: ItemSortingType) => {
    navigate(`${location.pathname}?sort=${sorting.toLowerCase()}`);
  };

  return { currentSorting, onSortingChange };
};

export default useSorting;
