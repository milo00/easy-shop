export default interface IMenuData {
  data: IMenuDataInner[];
}

export interface IMenuDataInner {
  name: string;
  data: IMenuDataInner[];
}

export function isSidebarData(object: any): object is IMenuData {
  return "data" in object && !("name" in object);
}
