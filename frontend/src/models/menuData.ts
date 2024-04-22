export default interface IMenuData {
  genders: IMenuDataInner[];
}

export interface IMenuDataInner {
  name: string;
  data: IMenuDataInner[];
}

export function isSidebarData(object: any): object is IMenuData {
  return "genders" in object;
}
