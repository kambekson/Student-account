export type UUID = string;

export interface BaseFilter {
  page: number;
  pageSize: number;
}

export interface ServiceFile {
  name: string;
  size: number;
  url: string;
}

export interface WithPutLink<T> {
  entity: T;
  putLink: string;
}

export enum Language {
  RU = "ru",
  KZ = "kk",
}

export enum SortDirection {
  ASC = "asc",
  DESC = "desc",
}
