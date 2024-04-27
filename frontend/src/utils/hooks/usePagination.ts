import { useLocation, useNavigate } from "react-router-dom";

const usePagination = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const currentPage = parseInt(queryParams.get("page") ?? "1");

  const navigate = useNavigate();

  const onPageChange = (page: number) => {
    navigate(`${location.pathname}?page=${page}`);
  };

  return { currentPage, onPageChange };
};

export default usePagination;
