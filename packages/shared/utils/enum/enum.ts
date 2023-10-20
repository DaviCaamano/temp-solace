import { Enum } from 'shared/interfaces/enum';

export const getEnumValues = <T = string | number>(enumerable: Enum<T>): T[] => {
  // @ts-ignore
  return Object.values(enumerable).filter((value: T) => {
    return typeof value === 'string';
  });
};

export const enumToJson = <T = string | number>(enumerable: Enum<T>): Record<keyof T, T> => {
  // @ts-ignore
  const json: Record<keyof T, T> = {};
  Object.keys(enumerable).forEach((key: string) => {
    json[key as keyof T] = enumerable[key];
  });
  return json;
};
