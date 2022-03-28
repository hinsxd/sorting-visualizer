export const getCompareColor = (arr: number[], left: number, right: number) => {
  return {
    [left]: "yellow",
    [right]: arr[left] > arr[right] ? "green" : "yellow",
  };
};
