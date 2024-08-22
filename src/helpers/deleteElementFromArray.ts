export const deleteElemFromArray = (array: any[], element: any) => {
  const index = array.indexOf(element);
  array.splice(index, 1);
  return array;
}; 
