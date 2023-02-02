import { useDogs } from "../providers/DogList";
// Right now these dogs are constant, but in reality we should be getting these from our server
import { DogCard } from "./DogCard";
import { CreateDogForm } from "./CreateDogForm";
// Todo: Refactor to get rid of props (THERE SHOULD BE NO PROPS DRILLING ON THIS COMPONENT)
export const Dogs = () => {
  const { filteredDogs, unfavoriteDog, favoriteDog, deleteDog, showComponent } =
    useDogs();
  return (
    //  the "<> </>"" are called react fragments, it's like adding all the html inside
    // without adding an actual html element
    <>
      {["all-dogs", "favorite-dogs", "unfavorite-dogs"].includes(
        showComponent
      ) ? (
        <>
          {" "}
          {filteredDogs.map((dog) => (
            <DogCard
              dog={dog}
              key={dog.id}
              onTrashIconClick={() => deleteDog(dog.id)}
              onHeartClick={() => unfavoriteDog(dog.id)}
              onEmptyHeartClick={() => favoriteDog(dog.id)}
            />
          ))}{" "}
        </>
      ) : (
        <CreateDogForm />
      )}
    </>
  );
};
