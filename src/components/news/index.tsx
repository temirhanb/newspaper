import React from "react";
import {StateNews, useCountStore} from "../../state";

export const News: React.FC<StateNews> = ({id, name, description, imgUrl}) => {

  const setIsOpenEditForm = useCountStore((state) => state.setOpenEditForm);
  const editNewsState = useCountStore((state) => state.editedNews);

  const handlerOpenForm = () => {
    editNewsState({id, name, description, imgUrl});
    setIsOpenEditForm();
  };
  return (
    <div key={id} onClick={handlerOpenForm}
         className={"flex flex-col hover:shadow-2xl border-2 flex-wrap cursor-pointer border-red-300 rounded-2xl m-5 p-5 items-center"}>
      <img className={"rounded-2xl border-[1px] shadow-xl mt-5 w-2/3 h-1/3"} src={imgUrl} alt=""/>
      <h1 className={"text-2xl  mt-2"}>
        {name}
      </h1>
      <span className={"text-mb my-2 line-clamp-3 "}>
        {description === "" ? "Нет описания" : description}
      </span>
    </div>
  );
};
