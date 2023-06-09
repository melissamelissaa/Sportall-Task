"use client";

import { useState, useEffect } from "react";
import { SearchResult } from "./Components/SearchResult";

import { v4 as uuid } from "uuid";

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
    // with this i determine wheter if user has scrolled to the bottom of the page
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >=
      document.documentElement.scrollHeight
    ) {
      setLoading(true);
      setFrom((prev) => prev + 10);
      setTo((prev) => prev + 10);
    }
  };

  useEffect(() => {
    //Handler which gives new fetchs new data on scroll
    window.addEventListener("scroll", handleScroller);
    return () => window.removeEventListener("scroll", handleScroller);
  }, []);

  useEffect(() => {
    fetch(SearchURL)
      .then((res) => res.json())
      .then((data) => {
        setResult((prev) => [...prev, ...data.hits]);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, [from, to]);

  const callAPI = () => {
    fetch(SearchURL)
      .then((res) => res.json())
      .then((data) => {
        setResult(data.hits);
        setIsClicked(true);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="home">
      <div className="home-searchDiv">
        <input
          className="home-searchDiv-input"
          type="text"
          placeholder="Search recipes by keywords or ingredients"
          onChange={(e) => {
            setInput(e.target.value);
          }}
        />
        <button className="home-searchDiv-btn" onClick={callAPI}>
          Search
        </button>
      </div>
      <div className="home-searchDiv-foodDiv">
        
        {/* each object of array data renders as searchResult component */}

        {result.map((r: any) => (
          <SearchResult key={uuid()} result={r.recipe} />
        ))}

        {/* if there is no data of inputed string, output "Could not find" */}

        {result.length === 0 && isClicked ? <h1>Could not find</h1> : null}
        {loading ? <h1>Loading...</h1> : null}
      </div>
    </div>
  );
}
