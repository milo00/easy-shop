import { Breadcrumb, BreadcrumbItem } from "reactstrap";
import { Gender } from "../models/item";
import { isEnumKey, isEnumValue } from "./functions";

const singleBreadItemForPath = (
  path: string,
  name: string,
  isActive: boolean
) => (
  <BreadcrumbItem
    key={name}
    href={path}
    tag={isActive ? "span" : "a"}
    active={isActive}
  >
    {name.toLowerCase()}
  </BreadcrumbItem>
);

const breadcrumbItemsFromPath = (paths: (string | undefined)[]) => {
  const items: JSX.Element[] = [];
  console.log(isEnumKey(Gender, paths[0]));
  console.log(Object.values(Gender));
  let path = isEnumValue(Gender, paths[0]) ? "/produkty/kategorie" : "";

  paths?.forEach((p, index) => {
    if (p) {
      path = `${path}/${p.toLowerCase()}`;
      items.push(singleBreadItemForPath(path, p, index === paths.length - 1));
    }
  });

  return items;
};

export const breadcrumbBuilder = (
  paths?: (string | undefined)[]
): JSX.Element => (
  <Breadcrumb>
    <BreadcrumbItem href="/" tag="a">
      home
    </BreadcrumbItem>
    {paths ? breadcrumbItemsFromPath(paths.filter(Boolean)) : null}
  </Breadcrumb>
);
