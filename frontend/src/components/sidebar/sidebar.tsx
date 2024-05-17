import { useLocation, useParams } from "react-router-dom";
import { equalsIgnoreCase, isSalePath } from "../../utils/functions";
import {
  Gender,
  getCategoryFromTranslation,
  getCategoryTranslation,
  getGenderFromTranslation,
  getGenderTranslation,
  isBoysOrGirlsGender,
  isCategoryKey,
  isGenderKey,
} from "../../models/item";
import CollapseSidebarItem from "./collapseSidebarItem";
import { Fragment, useContext } from "react";
import { SidebarDataContext } from "../../App";
import "../../styles/sidebar.css";

export const getTranslatedValue = (value: string) => {
  if (isGenderKey(value)) return getGenderTranslation(value) ?? "";
  if (isCategoryKey(value)) return getCategoryTranslation(value) ?? "";
  if (value === "SALE") return "WYPRZEDAŻ";
  return value;
};

export const Sidebar = () => {
  const params = useParams();
  const location = useLocation();
  const data = useContext(SidebarDataContext);

  const pathGender = getGenderFromTranslation(params.gender);
  const pathCategory = getCategoryFromTranslation(params.category);
  const pathSubcategory = params.subcategory;
  const pathProductType = params.productType;

  const isSale = (menuData: string) =>
    isSalePath(location) && menuData === "SALE";

  const isCurrentGender = (gender: string) =>
    equalsIgnoreCase(getTranslatedValue(gender), pathGender) ||
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
            path={`${
              isGenderKey(menuData.name) ? "/produkty/kategorie/" : "/"
            }${getTranslatedValue(menuData.name)}`}
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
