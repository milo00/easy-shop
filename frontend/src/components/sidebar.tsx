import { useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { equalsIgnoreCase, isKeyOfEnum } from "../utils/functions";
import { Category, Gender } from "../models/item";
import { UncontrolledCollapse } from "reactstrap";
import IMenuData, {
  IMenuDataCategory,
  IMenuDataGender,
  IMenuDataSubcategory,
} from "../models/menuData";
import "../styles/sidebar.css";
var _ = require("lodash");

// TODO: more generic structure of menu data

interface ISidebarProps {
  menuData?: IMenuData;
}

export const Sidebar = (props: ISidebarProps) => {
  let params = useParams();

  const pathGender = isKeyOfEnum(Object.keys(Gender), params.gender)
    ? Gender[params.gender!.toUpperCase() as keyof typeof Gender]
    : undefined;
  const pathCategory = isKeyOfEnum(Object.keys(Category), params.category)
    ? Category[params.category!.toUpperCase() as keyof typeof Category]
    : undefined;
  const pathSubcategory = params.subcategory;
  const pathProductType = params.productType;

  const navigate = useNavigate();

  const handleOnClick = (
    e: React.MouseEvent<HTMLSpanElement>,
    path: string
  ) => {
    e.stopPropagation();
    navigate(path);
  };

  const renderProductTypes = (
    gender: string,
    category: string,
    subcategory: IMenuDataSubcategory,
    canBeActive: boolean
  ) => {
    return (
      <UncontrolledCollapse
        toggler={`${gender}-${category}-${subcategory.name}`.replace(/\s/g, "")}
        defaultOpen={canBeActive}
      >
        {subcategory.productTypes.map((productType) => {
          const isActive =
            canBeActive && equalsIgnoreCase(productType, pathProductType);
          return (
            <div key={productType} className="sidebar-level">
              <div className={`item ${isActive ? "active" : ""}`}>
                <span
                  onClickCapture={(e) =>
                    handleOnClick(
                      e,
                      `/${gender}/${category}/${subcategory.name}/${productType}`
                    )
                  }
                >
                  {productType}
                </span>
              </div>
            </div>
          );
        })}
      </UncontrolledCollapse>
    );
  };

  const renderSubcategories = (
    gender: string,
    category: IMenuDataCategory,
    canBeActive: boolean
  ) => {
    return (
      <UncontrolledCollapse
        toggler={`${gender}-${category.name}`}
        defaultOpen={canBeActive}
      >
        {category.subcategories.map((subcategory) => {
          const isActive =
            canBeActive && equalsIgnoreCase(subcategory.name, pathSubcategory);
          return (
            <div key={subcategory.name} className="sidebar-level">
              <div
                id={`${gender}-${category.name}-${subcategory.name}`.replace(
                  /\s/g,
                  ""
                )}
                className={`item ${isActive ? "active" : ""}`}
              >
                <span
                  onClickCapture={(e) =>
                    handleOnClick(
                      e,
                      `/${gender}/${category.name}/${subcategory.name}`
                    )
                  }
                >
                  {subcategory.name}
                </span>
              </div>
              {subcategory.productTypes &&
                renderProductTypes(
                  gender,
                  category.name,
                  subcategory,
                  isActive
                )}
            </div>
          );
        })}
      </UncontrolledCollapse>
    );
  };

  const renderCategories = (gender: IMenuDataGender, canBeActive: boolean) => {
    return (
      <UncontrolledCollapse toggler={gender.name} defaultOpen={canBeActive}>
        {gender.categories.map((category) => {
          const isActive =
            canBeActive && equalsIgnoreCase(category.name, pathCategory);

          return (
            <div key={category.name} className="sidebar-level">
              <div
                id={`${gender.name}-${category.name}`}
                className={`item ${isActive ? "active" : ""}`}
              >
                <span
                  onClickCapture={(e) =>
                    handleOnClick(e, `/${gender.name}/${category.name}`)
                  }
                >
                  {_.capitalize(category.name)}
                </span>
              </div>
              {category.subcategories &&
                renderSubcategories(gender.name, category, isActive)}
            </div>
          );
        })}
      </UncontrolledCollapse>
    );
  };

  return (
    <div className="sidebar">
      {props.menuData?.genders.map((gender) => {
        const isActive = equalsIgnoreCase(gender.name, pathGender);
        return (
          <div key={gender.name}>
            <div
              id={gender.name}
              className={`item ${isActive ? "active" : ""}`}
            >
              <span onClickCapture={(e) => handleOnClick(e, `/${gender.name}`)}>
                {_.capitalize(gender.name)}
              </span>
              <span className="icon">
                <FontAwesomeIcon
                  icon={isActive ? faChevronUp : faChevronDown}
                />
              </span>
            </div>
            {gender.categories && renderCategories(gender, isActive)}
          </div>
        );
      })}
    </div>
  );
};

export default Sidebar;
