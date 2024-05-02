import { MAX_VALUE } from "@/algorithms/consts";

export const randomArray = (length: number) => {
  const arr = [];
  for (let i = 0; i < length; i++) {
    // arr.push(Math.round(Math.random() * MAX_VALUE));
    arr.push(((i + 1) / length) * MAX_VALUE);
  }
  arr.sort(() => Math.random() - 0.5);
  return arr;
};
