export default (store) => (next) => (action) => {
  console.dir(action);
  console.dir(store.getState());
  next(action);
};
