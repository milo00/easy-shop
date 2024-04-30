import { PropsWithChildren, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "../store/store";
import { endTimer } from "../store/slices/irritationTimeSlice";

interface ICatchKeyProps {
  key?: string;
}

const CatchKey = (props: PropsWithChildren<ICatchKeyProps>) => {
  const userId = useSelector((state: IRootState) => state.account.userId);
  const location = useLocation();
  const dispatch = useDispatch();

  console.log(userId);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.target === document.body) {
        event.preventDefault();
        if (event.key === " " && userId) {
          toast("Space clicked at " + location.pathname, { type: "info" });
          dispatch(endTimer({ userId, location: location.pathname }));
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [location, userId, dispatch]);

  return (
    <>
      <ToastContainer />
      {props.children}
    </>
  );
};

export default CatchKey;
