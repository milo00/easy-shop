import { useLocation, useParams } from "react-router-dom";
import {
  equalsIgnoreCase,
  isKeyOfEnum,
  isSalePath,
} from "../../utils/functions";
import { Category, Gender, isKidsGender } from "../../models/item";
import CollapseSidebarItem from "./collapseSidebarItem";
import { useContext } from "react";
import { SidebarDataContext } from "../../App";
import "../../styles/sidebar.css";

export const Sidebar = () => {
  const params = useParams();
  const location = useLocation();
  const data = useContext(SidebarDataContext);

  const pathGender = isKeyOfEnum(Object.keys(Gender), params.gender)
    ? Gender[params.gender!.toUpperCase() as keyof typeof Gender]
    : undefined;
  const pathCategory = isKeyOfEnum(Object.keys(Category), params.category)
    ? Category[params.category!.toUpperCase() as keyof typeof Category]
    : undefined;
  const pathSubcategory = params.subcategory;
  const pathProductType = params.productType;

  const isSale = (menuData: string) =>
    isSalePath(location) && menuData === "SALE";

  const isCurrentGender = (gender: string) =>
    equalsIgnoreCase(gender, pathGender) ||
    (gender === Gender.KIDS && isKidsGender(pathGender));

  const isActive = (menuData: string) =>
    isSale(menuData) || (!isSalePath(location) && isCurrentGender(menuData));

  return (
    <div className="sidebar border-right">
      {data?.data.map((gender) => (
        <CollapseSidebarItem
          parent={gender}
          toggler={gender.name}
          path={`/${gender.name}`}
          isParentActive={isActive(gender.name)}
          pathValues={[
            pathGender,
            pathCategory,
            pathSubcategory,
            pathProductType,
          ]}
        />
      ))}
    </div>
  );
};

export default Sidebar;
