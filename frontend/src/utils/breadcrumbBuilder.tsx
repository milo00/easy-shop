import { Breadcrumb, BreadcrumbItem } from "reactstrap";

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

const breadcrumbItemsFromPath = (paths?: (string | undefined)[]) => {
  const items: JSX.Element[] = [];
  let path = "";

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
    {breadcrumbItemsFromPath(paths)}
  </Breadcrumb>
);
