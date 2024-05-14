import { useLocation, useNavigate } from "react-router-dom";
import ItemSortingType from "../../models/itemSortingType";
import { useEffect, useMemo, useState } from "react";

const useSorting = () => {
  const location = useLocation();
  const queryParams = useMemo(
    () => new URLSearchParams(location.search),
    [location.search]
  );
  const [currentSorting, setCurrentSorting] = useState(
    ItemSortingType[
      (
        queryParams.get("sort") ?? "default"
      ).toUpperCase() as keyof typeof ItemSortingType
    ]
  );

  useEffect(() => {
    setCurrentSorting(
      ItemSortingType[
        (
          queryParams.get("sort") ?? "default"
        ).toUpperCase() as keyof typeof ItemSortingType
      ]
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
