type resultType = {
  image: string;
  label: string;
  ingredientLines: [];
};
type searchResultProps = {
  result: resultType;
};
export const SearchResult = (props: searchResultProps) => {
  return (
    <div>
      <img src={props.result.image} title="food" />
      <h1>{props.result.label}</h1>
      <ul>
        {props.result.ingredientLines.map((ingredient) => (
          <li key={Math.random() * 1000000}>{ingredient}</li>
        ))}
      </ul>
    </div>
  );
};
