export const updateObjectProperty = (object, property, updater) => ({
  ...object,
  [property]: updater(object[property])
});

