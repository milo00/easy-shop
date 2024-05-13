import { PropsWithChildren, useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, IRootState } from "../store/store";
import {
  endTimerGlobally,
  endTimerLocally,
} from "../store/slices/userIrritationTimeSlice";
import { LoaderTypeDataContext } from "../App";

interface ICatchKeyProps {
  key?: string;
}

const CatchKey = (props: PropsWithChildren<ICatchKeyProps>) => {
  const userId = useSelector((state: IRootState) => state.account.userId);
  const canRegisterIrritationTime =
    useSelector((state: IRootState) => state.userIrritationTime.startTime) !==
    0;

  const loaderType = useContext(LoaderTypeDataContext);

  const location = useLocation();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.target === document.body) {
        event.preventDefault();
        if (event.key === " " && canRegisterIrritationTime) {
          toast("Enter clicked at " + location.pathname, { type: "info" });
          if (userId) {
            dispatch(
              endTimerGlobally({
                userId,
                location: location.pathname,
                loaderType,
              })
            );
          } else {
            dispatch(
              endTimerLocally({ location: location.pathname, loaderType })
            );
          }
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [location, userId, dispatch, canRegisterIrritationTime, loaderType]);

  return (
    <>
      <ToastContainer />
      {props.children}
    </>
  );
};

export default CatchKey;
