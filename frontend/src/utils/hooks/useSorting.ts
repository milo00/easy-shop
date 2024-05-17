import { useLocation, useNavigate } from "react-router-dom";
import ItemSortingType from "../../models/itemSortingType";
import { useEffect, useMemo, useState } from "react";
import { getEnumFromValue } from "../functions";

const useSorting = () => {
  const location = useLocation();
  const queryParams = useMemo(
    () => new URLSearchParams(location.search),
    [location.search]
  );
  const [currentSorting, setCurrentSorting] = useState(
    getEnumFromValue(
      ItemSortingType,
      (queryParams.get("sort") ?? "domyślnie").toUpperCase()
    ) ?? ItemSortingType.DEFAULT
  );

  useEffect(() => {
    setCurrentSorting(
      getEnumFromValue(
        ItemSortingType,
        (queryParams.get("sort") ?? "domyślnie").toUpperCase()
      ) ?? ItemSortingType.DEFAULT
    );
  }, [queryParams]);

  const navigate = useNavigate();

  const onSortingChange = (sorting: ItemSortingType) => {
    setCurrentSorting(sorting);
    const newParams = new URLSearchParams();
    queryParams.forEach((value, key) => {
      newParams.append(key, value);
    });
    if (sorting === ItemSortingType.DEFAULT) {
      newParams.delete("sort");
    } else {
      newParams.set("sort", sorting.toLowerCase());
    }

    navigate(`${location.pathname}?${newParams.toString()}`);
  };

  return { currentSorting, onSortingChange };
};

export default useSorting;
