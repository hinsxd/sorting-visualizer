import { MAX_VALUE } from "@/algorithms/consts";

export const randomArray = (length: number) => {
  const arr = [];
  for (let i = 0; i < length; i++) {
    arr.push(Math.round(Math.random() * MAX_VALUE));
  }
  return arr;
};
