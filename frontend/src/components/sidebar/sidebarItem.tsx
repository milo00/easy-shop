import { faChevronUp, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useNavigate } from "react-router-dom";
import {
  getCategoryTranslation,
  getGenderTranslation,
  isCategoryKey,
  isGenderKey,
} from "../../models/item";

interface ISidebarMenuItemProps {
  name: string;
  path: string;
  isOpen: boolean;
  isActive: boolean;
  displayArrow: boolean;
  toggleOpen?: VoidFunction;
}

const SidebarMenuItem = (props: ISidebarMenuItemProps) => {
  const navigate = useNavigate();

  const handleOnClick = (
    e: React.MouseEvent<HTMLSpanElement>,
    path: string
  ) => {
    e.stopPropagation();
    navigate(path.toLowerCase());
  };

  return (
    <div
      className={`item ${props.isActive ? "active" : ""}`}
      onClick={props.toggleOpen}
    >
      <span
        className={props.name === "WYPRZEDAŻ" ? "text-danger fw-bold" : ""}
        onClickCapture={(e) => handleOnClick(e, props.path)}
      >
        {props.name.toLowerCase()}
      </span>
      <span className="icon">
        {props.displayArrow && (
          <FontAwesomeIcon icon={props.isOpen ? faChevronUp : faChevronDown} />
        )}
      </span>
    </div>
  );
};

export default SidebarMenuItem;
