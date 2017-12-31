export const updateObjectProperty = (object, property, updater) => ({
  ...object,
  [property]: updater(object[property])
});

export const toggleObjectProperty = (object, property) =>
  updateObjectProperty(object, property, property => !property);
