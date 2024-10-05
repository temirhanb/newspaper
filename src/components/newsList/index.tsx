import React from "react";
import {StateNews} from "../../state";
import {News} from "../news";

interface IProps {
  items: StateNews[];
}

export const NewsList: React.FC<IProps> = ({items}) => {
  return (
    <>
      {items.map((item) => {
        return (
          <News {...item}/>
        );
      })}
    </>
  );
};