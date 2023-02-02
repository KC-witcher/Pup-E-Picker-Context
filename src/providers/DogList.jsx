import { createContext, useContext, useState, useEffect } from "react";
import { getDogsFromDb } from "../fetch/get-dog";
import { addDogToDb } from "../fetch/add-dog";
import { updateFavoriteForDog } from "../fetch/update-favorite";
import { deleteDogFromDb } from "../fetch/delete-dog-from-db";

const DogsContext = createContext({});

export const DogsProvider = ({ children }) => {
  const [dogs, setDogs] = useState([]);
  const [showComponent, setShowComponent] = useState("all-dogs");

  const unfavorited = dogs.filter((dog) => dog.isFavorite === false);
  const favorited = dogs.filter((dog) => dog.isFavorite === true);

  const refetchDogs = () => {
    getDogsFromDb().then(setDogs);
  };

  const addDog = (dog) => {
    addDogToDb({
      name: dog.name,
      description: dog.description,
      image: dog.image,
    }).then(() => {
      refetchDogs();
    });
  };

  const deleteDog = (dogId) => {
    deleteDogFromDb(dogId).then(() => refetchDogs());
  };

  const unfavoriteDog = (dogId) => {
    updateFavoriteForDog({ dogId, isFavorite: false }).then(() =>
      refetchDogs()
    );
  };

  const favoriteDog = (dogId) => {
    updateFavoriteForDog({ dogId, isFavorite: true }).then(() => refetchDogs());
  };

  let filteredDogs = (() => {
    if (showComponent === "favorite-dogs") {
      return favorited;
    }

    if (showComponent === "unfavorite-dogs") {
      return unfavorited;
    }
    return dogs;
  })();

  const onClickFavorited = () => {
    if (showComponent === "favorite-dogs") {
      setShowComponent("all-dogs");
      return;
    }
    setShowComponent("favorite-dogs");
  };

  const onClickUnfavorited = () => {
    if (showComponent === "unfavorite-dogs") {
      setShowComponent("all-dogs");
      return;
    }
    setShowComponent("unfavorite-dogs");
  };

  const onClickCreateDog = () => {
    if (showComponent === "create-dog-form") {
      setShowComponent("all-dogs");
      return;
    }
    setShowComponent("create-dog-form");
  };

  useEffect(() => {
    refetchDogs();
  }, []);

  return (
    <DogsContext.Provider
      value={{
        filteredDogs,
        favorited,
        unfavorited,
        onClickFavorited,
        onClickUnfavorited,
        onClickCreateDog,
        showComponent,
        favoriteDog,
        unfavoriteDog,
        addDog,
        deleteDog,
      }}
    >
      {children}
    </DogsContext.Provider>
  );
};

export const useDogs = () => {
  const context = useContext(DogsContext);

  return {
    filteredDogs: context.filteredDogs,
    favorited: context.favorited,
    unfavorited: context.unfavorited,
    onClickFavorited: context.onClickFavorited,
    onClickUnfavorited: context.onClickUnfavorited,
    onClickCreateDog: context.onClickCreateDog,
    showComponent: context.showComponent,
    favoriteDog: context.favoriteDog,
    unfavoriteDog: context.unfavoriteDog,
    addDog: context.addDog,
    deleteDog: context.deleteDog,
  };
};
