export const getDogsFromDb = () => {
  return fetch("http://localhost:3000/dogs").then((response) =>
    response.json()
  );
};
