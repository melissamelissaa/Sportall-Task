"use client";

import { useState, useEffect } from "react";
import { SearchResult } from "./Components/SearchResult";

const emptyArray: any[] = [];

export default function Home() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState(emptyArray);
  const [isClicked, setIsClicked] = useState(false);
  const [from, setFrom] = useState(0);
  const [to, setTo] = useState(15);
  const [loading, setLoading] = useState(false);

  const SearchURL = `https://api.edamam.com/search?q=${input}&app_id=5d798d52&app_key=b5776ee934123ae321b5176b622c3c9a&from=${from}&to=${to}`;
  const handleScroller = () => {
    if (
      window.innerHeight + +document.documentElement.scrollTop + 1 >=
      document.documentElement.scrollHeight
    ) {
      setLoading(true);
      setFrom((prev) => prev + 10);
      setTo((prev) => prev + 10);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroller);
    return () => window.removeEventListener("scroll", handleScroller);
  }, []);

  useEffect(() => {
    fetch(SearchURL)
      .then((res) => res.json())
      .then((data) => {
        setResult((prev) => [...prev, ...data.hits]);
        setLoading(false);
      });
  }, [from, to]);

  const callAPI = () => {
    fetch(SearchURL)
      .then((res) => res.json())
      .then((data) => {
        console.log(data.hits);
        setResult(data.hits);
        setIsClicked(true);
      });
  };

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
        <button onClick={callAPI}>Search</button>

        {result.map((r: any) => (
          <SearchResult key={Math.random() * 1000000} result={r.recipe} />
        ))}
        {result.length === 0 && isClicked ? <h1>Could not find</h1> : null}
      </div>
      {loading ? <h1>Loading...</h1> : null}
    </div>
  );
}
