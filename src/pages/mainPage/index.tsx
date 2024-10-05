import React, {useState} from "react";
import {CreateSvg} from "../../assets/create-icon";
import {useCountStore} from "../../state";
import {NewsList} from "../../components";
import {CreateForm} from "../../components/createForm";
import {EditForm} from "../../components/editForm";

export const MainPage: React.FC = () => {

  const items = useCountStore((state) => state.items);
  const isOpenEditForm = useCountStore((state) => state.openEditForm);

  const [isOpenCreateForm, setIsOpenCreateForm] = useState(false);

  const openCreateForm = () => {
    setIsOpenCreateForm(!isOpenCreateForm);
  };


  return (
    <div className={"grid sm:grid-cols-1 md:grid-cols-2  lg:grid-cols-3 items-start mx-[10%]"}>
      <NewsList items={items}/>
      <div className={"flex h-[300px] w-auto items-center justify-center pt-5 "}>
        <button
          onClick={openCreateForm}
          className={"border-2 p-5 w-36  h-36 flex justify-center items-center rounded-full border-red-300 hover:bg-red-50"}
        >
          <CreateSvg/>
        </button>
      </div>
      {isOpenCreateForm && (
        <div className={"max-w-1/2 fixed left-2/4 translate-x-[-50%]"}>
          <CreateForm openCreateForm={openCreateForm}/>
        </div>
      )}
      {isOpenEditForm && (
      <div className={"max-w-1/2 fixed left-2/4 translate-x-[-50%]"}>
        <EditForm />
      </div>
    )}
    </div>
  );
};