import { useLocation, useNavigate } from "react-router-dom";

const usePagination = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const currentPage = parseInt(queryParams.get("page") ?? "1");

  const navigate = useNavigate();

  const onPageChange = (page: number) => {
    const newParams = new URLSearchParams();
    queryParams.forEach((value, key) => {
      newParams.append(key, value);
    });
    newParams.set("page", page + "");

    navigate(`${location.pathname}?${newParams.toString()}`);
  };

  return { currentPage, onPageChange };
};

export default usePagination;
