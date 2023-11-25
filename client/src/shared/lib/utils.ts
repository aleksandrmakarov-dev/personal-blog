import clsx, { ClassValue } from "clsx";
import moment from "moment";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(input: Date | string | number): string {
  const date = moment(new Date(input));
  const diff = moment().diff(date, "days");
  if (diff > 1) {
    return date.format("MMM D, YYYY");
  } else {
    return date.fromNow();
  }
}

export function stringToColor(string: string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

export function stringAvatar(value: string) {
  const matches = value.match(/\b(\w)/g)?.slice(0, 2);
  return matches?.join("").toUpperCase() ?? "";
}

export async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function getSearchParamsObject<T>(searchParams: URLSearchParams): T {
  const paramsObject: Record<string, string> = {};
  searchParams.forEach((value, key) => {
    paramsObject[key] = value;
  });
  return paramsObject as T;
}
