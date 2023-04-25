export const addObjectToLocalStorage = (name, data) => {
  localStorage.setItem(name, JSON.stringify(data));
};

export const removeObjectFromLocalStorage = (name) => {
  localStorage.removeItem(name);
};

export const getObjectFromLocalStorage = (name) => {
  const result = localStorage.getItem(name);
  const item = result ? JSON.parse(result) : null;
  return item;
};
