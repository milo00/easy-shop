import { useLocation, useParams } from "react-router-dom";
import {
  equalsIgnoreCase,
  isKeyOfEnum,
  isSalePath,
} from "../../utils/functions";
import {
  Category,
  Gender,
  isBoysOrGirlsGender,
  isGender,
} from "../../models/item";
import CollapseSidebarItem from "./collapseSidebarItem";
import { Fragment, useContext } from "react";
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
    (gender === Gender.KIDS && isBoysOrGirlsGender(pathGender));

  const isActive = (menuData: string) =>
    isSale(menuData) || (!isSalePath(location) && isCurrentGender(menuData));

  return (
    <div className="sidebar border-right">
      {data?.data.map((menuData) => (
        <Fragment key={menuData.name}>
          <CollapseSidebarItem
            parent={menuData}
            toggler={menuData.name}
            path={`${isGender(menuData.name) ? "/items/categories/" : "/"}${
              menuData.name
            }`}
            isParentActive={isActive(menuData.name)}
            pathValues={[
              pathGender,
              pathCategory,
              pathSubcategory,
              pathProductType,
            ]}
          />
        </Fragment>
      ))}
    </div>
  );
};

export default Sidebar;
