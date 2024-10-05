import React, {ChangeEvent, useState} from "react";
import * as yup from "yup";
import {useFormik} from "formik";

import {Inputs} from "../inputs";
import {useCountStore} from "../../state";
import {TextArea} from "../textArea";
import {CloseIcon} from "../../assets/close-icon";
import {DeleteIcon} from "../../assets/delete-icon";

const validationSchema = yup.object({
  name: yup
    .string()
    .min(5, "Минимальная длина заголовка 5 символов")
    .max(200, "Максимальная длина заголовка 200 символов")
    .required("Обязательный параметр"),
  description: yup
    .string()
    .max(5000, "Максимальная длина описания 5000 символов")
});

export const EditForm: React.FC = () => {
  const currentNewsState = useCountStore((state) => state.editedNewsItem);
  const setIsOpenEditForm = useCountStore((state) => state.setOpenEditForm);
  const updateNews = useCountStore((state) => state.updateNews);
  const deleteNews = useCountStore((state) => state.deleteNews);
  const [selectedImage, setSelectedImage] = useState<any>(null);

  const handlerImage = (event: ChangeEvent) => {
    const target = event.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];
    setSelectedImage(file);
  };

  const checkSelectedImage: boolean = selectedImage !== null;

  const formik = useFormik({
    initialValues: {
      name: currentNewsState.name,
      description: currentNewsState.description,
      imgUrl: currentNewsState?.imgUrl
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      updateNews({
        id: currentNewsState.id,
        name: values.name,
        description: values.description,
        imgUrl: checkSelectedImage ? URL.createObjectURL(selectedImage) : currentNewsState.imgUrl
      });
      setIsOpenEditForm();
    },
  });

  const handlerDeleteItem = () => {

    deleteNews(currentNewsState.id);
    setIsOpenEditForm();
  };
  return (
    <form
      className={"bg-white max-h-[550px] w-96 overflow-x-hidden overflow-y-auto flex flex-col shadow-xl border-[1px] rounded-2xl px-8 pt-6 pb-8 mb-4"}
      onSubmit={formik.handleSubmit}
    >
      <div className={"mb-5 flex flex-row justify-between\t"}>
        <h1>Изменить новость:</h1>
        <div className={"cursor-pointer"} onClick={setIsOpenEditForm}>
          <CloseIcon/>
        </div>
      </div>
      <Inputs formik={formik} name={"Заголовок"} formName={"name"}/>
      <TextArea formik={formik}/>
      <div className={"w-1/3 h-1/3"}>
        <img
          className={"mb-5"}
          src={checkSelectedImage ? URL.createObjectURL(selectedImage) : currentNewsState.imgUrl}
        />
      </div>
      <input
        type="file"
        accept="image/png, image/gif, image/jpeg"
        name="Картинка"
        onChange={handlerImage}
        className={"mb-5"}
      />
      <div className={"flex justify-between items-center"}>
        <button
          onClick={handlerDeleteItem}
          className={" border-2 rounded-xl p-5 border-red-300 hover:bg-red-50"}
        >
          <DeleteIcon/>
        </button>
        <button
          type={"submit"}

          className={"border-2 p-5 rounded-xl border-blue-300 hover:bg-blue-100 hover:text-gray-600"}>Изменить
        </button>
      </div>

    </form>
  );
};