import { Item, MovieList, Results } from "../Model";
import React, { useEffect, useState } from "react";
import ChosenDisplay from "./ChosenDisplay";
import "./MovieRow.css";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
type MovieRowProps = {
  item: MovieList;
  handleModal: (eachItem: Results) => Promise<void>;
  frontDisplay: React.Dispatch<React.SetStateAction<Results | undefined>>;
  setSimilarList: React.Dispatch<React.SetStateAction<Item | undefined>>;
};
const MovieRow = ({
  item,
  frontDisplay,
  handleModal,
  setSimilarList,
}: MovieRowProps) => {
  const { title, items } = item;

  const [scrollX, setScrollX] = useState<number>(0);

  const handleLeftArrow = () => {
    let x = scrollX + Math.round(window.innerWidth / 2);
    if (x > 0) {
      x = 0;
    }
    setScrollX(x);
  };
  const handleRightArrow = () => {
    let x = scrollX - Math.round(window.innerWidth / 2);
    let listW = items.results.length * 150;
    if (window.innerWidth - listW > x) {
      x = window.innerWidth - listW - 60;
    }
    setScrollX(x);
  };
  return (
    <div className="movieRow">
      <h2>{title}</h2>
      <div className="movieRow--left" onClick={handleLeftArrow}>
        <NavigateBeforeIcon style={{ fontSize: 50 }} />
      </div>
      <div className="movieRow--right" onClick={handleRightArrow}>
        <NavigateNextIcon style={{ fontSize: 50 }} />
      </div>
      <div className="movieRow--listarea">
        <div
          className="movieRow--list"
          style={{
            marginLeft: scrollX,
            width: items.results.length * 150,
          }}
        >
          {items.results.length > 0 &&
            items.results.map((eachItem, key) => (
              // <ChosenDisplay
              //   key={key}
              //   item={item}
              //   frontDisplay={frontDisplay}
              // />

              <div key={key} className="movieRow--item">
                <img
                  src={`https://image.tmdb.org/t/p/w300/${eachItem.poster_path}`}
                  alt={eachItem.original_title}
                  onClick={(e) => {
                    e.preventDefault();
                    setSimilarList(undefined);
                    frontDisplay(eachItem);
                    handleModal(eachItem);
                    console.log(eachItem);
                  }}
                ></img>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default MovieRow;
