import { PropsWithChildren, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface ICatchKeyProps {
  key?: string;
}

const CatchKey = (props: PropsWithChildren<ICatchKeyProps>) => {
  const location = useLocation();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.target === document.body) {
        event.preventDefault();
        if (event.key === " ")
          toast("Space clicked at " + location.pathname, { type: "info" });
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [location]);

  return (
    <>
      <ToastContainer />
      {props.children}
    </>
  );
};

export default CatchKey;
