export const getActiveItems = (todos) => {
  let count = 0;
  todos.forEach((element) => {
    if (element.completed === false) {
      count++;
    }
  });
  return count;
};
