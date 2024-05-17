import { useEffect, useState } from "react";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import ItemSortingType from "../models/itemSortingType";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowDown19,
  faArrowDownAZ,
  faArrowDownShortWide,
  faArrowUp19,
  faArrowUpAZ,
} from "@fortawesome/free-solid-svg-icons";

interface IItemSorterProps {
  currentSorting: ItemSortingType;
  onSortingChange: (newSorting: ItemSortingType) => void;
}

const ItemSorter = (props: IItemSorterProps) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedSort, setSelectedSort] = useState<ItemSortingType>(
    props.currentSorting
  );

  useEffect(() => {
    setSelectedSort(props.currentSorting);
  }, [props.currentSorting]);

  const toggleDropdown = () => setDropdownOpen((prev) => !prev);

  const handleSortChange = (sortType: ItemSortingType) => {
    setSelectedSort(sortType);
    props.onSortingChange(sortType);
  };

  const generateSortingOption = (item: ItemSortingType, itemString: string) => {
    const name = itemString.split("_")[0];
    const direction = itemString.split("_")[1];
    let icon;
    switch (item) {
      case ItemSortingType.NAME_ASC:
        icon = <FontAwesomeIcon icon={faArrowDownAZ} />;
        break;
      case ItemSortingType.NAME_DESC:
        icon = <FontAwesomeIcon icon={faArrowUpAZ} />;
        break;
      case ItemSortingType.PRICE_ASC:
        icon = <FontAwesomeIcon icon={faArrowDown19} />;
        break;
      case ItemSortingType.PRICE_DESC:
        icon = <FontAwesomeIcon icon={faArrowUp19} />;
        break;
      case ItemSortingType.DEFAULT:
        icon = <FontAwesomeIcon icon={faArrowDownShortWide} />;
        break;
    }
    let directionString = null;

    switch (direction) {
      case "ASC":
        directionString = "malejąco";
        break;
      case "DESC":
        directionString = "rosnąco";
        break;
    }

    return (
      <span>
        {icon} {name.toLowerCase()} {directionString}
      </span>
    );
  };

  return (
    <Dropdown isOpen={dropdownOpen} toggle={toggleDropdown} color="primary">
      <DropdownToggle caret color="primary" outline>
        sortowanie
      </DropdownToggle>
      <DropdownMenu>
        {Object.entries(ItemSortingType).map((v) => {
          const sortingType =
            ItemSortingType[v[0] as keyof typeof ItemSortingType];
          return (
            <DropdownItem
              key={v[0]}
              onClick={() => handleSortChange(sortingType)}
              active={selectedSort === sortingType}
            >
              {generateSortingOption(sortingType, v[1])}
            </DropdownItem>
          );
        })}
      </DropdownMenu>
    </Dropdown>
  );
};

export default ItemSorter;
