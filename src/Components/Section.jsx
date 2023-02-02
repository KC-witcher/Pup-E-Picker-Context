//! Get rid of all props except 'children' and 'label'
import { useDogs } from "../providers/DogList";
export const Section = ({
  label, // do not delete
  children, // do not delete
}) => {
  const {
    onClickCreateDog,
    onClickUnfavorited,
    onClickFavorited,
    showComponent,
    favorited,
    unfavorited,
  } = useDogs();
  return (
    <section>
      <div className="container-header">
        <div className="container-label">{label}</div>
        <div className="selectors">
          {/* This should display the favorited count */}
          <div
            className={`selector ${
              showComponent === "favorite-dogs" && "active"
            }`}
            onClick={onClickFavorited}
          >
            favorited ( {favorited.length} )
          </div>

          {/* This should display the unfavorited count */}
          <div
            className={`selector ${
              showComponent === "unfavorite-dogs" && "active"
            }`}
            onClick={onClickUnfavorited}
          >
            unfavorited ( {unfavorited.length} )
          </div>
          <div
            className={`selector ${
              showComponent === "create-dog-form" && "active"
            }`}
            onClick={onClickCreateDog}
          >
            create dog
          </div>
        </div>
      </div>
      {children}
    </section>
  );
};
