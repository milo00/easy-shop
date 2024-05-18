import { useLocation, useParams } from "react-router-dom";
import {
  equalsIgnoreCase,
  getEnumFromValue,
  getEnumValueFromKey,
  isEnumKey,
  isSalePath,
} from "../../utils/functions";
import { Category, Gender, isBoysOrGirlsGender } from "../../models/item";
import CollapseSidebarItem from "./collapseSidebarItem";
import { Fragment, useContext } from "react";
import { SidebarDataContext } from "../../App";
import "../../styles/sidebar.css";
import { SALE, SALE_TRANSLATED } from "../../models/menuData";

export const getTranslatedValue = (value: string) => {
  if (isEnumKey(Gender, value)) return getEnumValueFromKey(Gender, value) ?? "";
  if (isEnumKey(Category, value))
    return getEnumValueFromKey(Category, value) ?? "";
  if (value === "SALE") return SALE_TRANSLATED;
  return value;
};

export const Sidebar = () => {
  const params = useParams();
  const location = useLocation();
  const data = useContext(SidebarDataContext);

  const pathGender = getEnumFromValue(Gender, params.gender);
  const pathCategory = getEnumFromValue(Category, params.category);
  const pathSubcategory = params.subcategory;
  const pathProductType = params.productType;

  const isSale = (menuData: string) =>
    isSalePath(location) && menuData === SALE;

  const isCurrentGender = (gender: string) =>
    equalsIgnoreCase(getTranslatedValue(gender), pathGender) ||
    (getEnumValueFromKey(Gender, gender) === Gender.KIDS &&
      isBoysOrGirlsGender(pathGender));

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
              isEnumKey(Gender, menuData.name) ? "/produkty/kategorie/" : "/"
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
