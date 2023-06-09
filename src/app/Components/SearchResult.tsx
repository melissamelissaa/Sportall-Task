import Swal from "sweetalert2";
import { v4 as uuid } from "uuid";

export type resultType = {
  image: string;
  label: string;
  url: string;
  cuisineType: string[];
  mealType: string[];
  ingredientLines: [];
};

type searchResultProps = {
  result: resultType;
};


// Create html variable and set value lists

export const SearchResult = (props: searchResultProps) => {
  let html = '<ul class="details-list">';

  for (let i = 0; i < props.result.ingredientLines.length; i++) {
    html += `<li class="details-list-item" key=${uuid()}>${
      props.result.ingredientLines[i]
    }</li>\n`;
  }

  html += "</ul>";

  return (
    <div
      className="searchResult"
      onClick={() => {
        Swal.fire({
          title: props.result.label,
          html,
          showCloseButton: true,
          showCancelButton: true,
          focusConfirm: false,
          confirmButtonText: `<a href=${props.result.url} target="_blank">For more information</a>`,
          confirmButtonAriaLabel: "Thumbs up, great!",
        });
      }}
    >
      <img className="searchResult-img" src={props.result.image} title="food" />
      <h1 className="searchResult-name">{props.result.label}</h1>
      <p className="searchResult-type">
        Cuisine type: {props.result.cuisineType[0]}
      </p>
      <p className="searchResult-type">Meal type: {props.result.mealType[0]}</p>
    </div>
  );
};
