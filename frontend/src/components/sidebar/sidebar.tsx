import { useParams } from "react-router-dom";
import { equalsIgnoreCase, isKeyOfEnum } from "../../utils/functions";
import { Category, Gender } from "../../models/item";
import CollapseSidebarItem from "./collapseSidebarItem";
import { useContext } from "react";
import { SidebarDataContext } from "../../App";
import "../../styles/sidebar.css";

export const Sidebar = () => {
  const params = useParams();
  const data = useContext(SidebarDataContext);

  const pathGender = isKeyOfEnum(Object.keys(Gender), params.gender)
    ? Gender[params.gender!.toUpperCase() as keyof typeof Gender]
    : undefined;
  const pathCategory = isKeyOfEnum(Object.keys(Category), params.category)
    ? Category[params.category!.toUpperCase() as keyof typeof Category]
    : undefined;
  const pathSubcategory = params.subcategory;
  const pathProductType = params.productType;

  return (
    <div className="sidebar">
      {data?.genders.map((gender) => {
        const isActive = equalsIgnoreCase(gender.name, pathGender);
        return (
          <CollapseSidebarItem
            parent={gender}
            toggler={gender.name}
            path={`/${gender.name}`}
            isParentActive={isActive}
            pathValues={[pathCategory, pathSubcategory, pathProductType]}
          />
        );
      })}
    </div>
  );
};

export default Sidebar;
