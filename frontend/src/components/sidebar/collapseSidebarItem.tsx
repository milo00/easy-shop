import { useState } from "react";
import { IMenuDataInner } from "../../models/menuData";
import { Collapse } from "reactstrap";
import { equalsIgnoreCase } from "../../utils/functions";
import SidebarMenuItem from "./sidebarItem";
import _ from "lodash";
import { getTranslatedValue } from "./sidebar";

interface ICollapseSidebarItemProps {
  parent: IMenuDataInner;
  toggler: string;
  path: string;
  isParentActive: boolean;
  pathValues: (string | undefined)[];
}

const CollapseSidebarItem = (props: ICollapseSidebarItemProps) => {
  const [isOpen, setIsOpen] = useState(props.isParentActive);

  return (
    <div className="sidebar-level">
      <SidebarMenuItem
        name={getTranslatedValue(props.parent.name)}
        path={getTranslatedValue(props.path)}
        isOpen={isOpen}
        isActive={props.isParentActive}
        toggleOpen={() => setIsOpen((prev) => !prev)}
        displayArrow={!_.isEmpty(props.parent.data)}
      />
      {props.parent.data && (
        <Collapse isOpen={isOpen}>
          {props.parent.data.map((d) => {
            const isActive =
              props.isParentActive &&
              !!props.pathValues.find((p) =>
                equalsIgnoreCase(getTranslatedValue(d.name), p)
              );
            const newPath = `${props.path}/${getTranslatedValue(d.name)}`;
            const newToggler = `${props.toggler}-${d.name}`.replace(/\s/g, "");

            return (
              <CollapseSidebarItem
                key={newToggler}
                parent={d}
                toggler={newToggler}
                path={newPath}
                isParentActive={isActive}
                pathValues={props.pathValues}
              />
            );
          })}
        </Collapse>
      )}
    </div>
  );
};

export default CollapseSidebarItem;
