import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export const generateAvatarUrl = (name: string) =>
  `https://ui-avatars.com/api/?name=${encodeURIComponent(
    name || "undefined null"
  )}&background=random`;

export const createLocalstorage = (key: string, value: unknown) => {
  window.localStorage.setItem(key, JSON.stringify(value));
};

export const getLocalstorage = (key: string) => {
  const storedData = localStorage.getItem(key);
  return storedData; //? JSON.parse(storedData) : null;
};
export const removeLocalStorageData = (key: string) => {
  localStorage.removeItem(key);
};
