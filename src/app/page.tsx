"use client";
import { useState } from "react";

type resultType = {
  image: string;
  label: string;
  ingredientLines: [];
};
type searchResultProps = {
  result: resultType;
};
const SearchResult = (props: searchResultProps) => {
  return (
    <div>
      <img src={props.result.image} title="food" />
      <h1>{props.result.label}</h1>
      <ul>
        {props.result.ingredientLines.map((ingredient) => (
          <li>{ingredient}</li>
        ))}
      </ul>
    </div>
  );
};

export default function Home() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState([]);

  const callAPI = () => {
    fetch(
      `https://api.edamam.com/search?q=${input}&app_id=5d798d52&app_key=b5776ee934123ae321b5176b622c3c9a`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data.hits);
        setResult(data.hits);
      });
  };
  console.log(input);
  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="Search recipes by keywords or ingredients"
          onChange={(e) => {
            setInput(e.target.value);
          }}
        />
        <button onClick={() => callAPI()}>Search</button>
        {result.length > 0 ? (
          result.map((r: any) => <SearchResult result={r.recipe} />)
        ) : (
          <h1>Could not find</h1>
        )}
      </div>
    </div>
  );
}
