import React, {ChangeEvent, useState} from "react";
import * as yup from "yup";
import {useFormik} from "formik";

import {Inputs} from "../inputs";
import {useCountStore} from "../../state";
import {nanoid} from "nanoid";
import {TextArea} from "../textArea";
import {CloseIcon} from "../../assets/close-icon";

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

interface IProps {
  openCreateForm: () => void;
}

export const CreateForm: React.FC<IProps> = ({openCreateForm}) => {
  const createNewsState = useCountStore((state) => state.createNews);

  const [selectedImage, setSelectedImage] = useState<any>(null);

  const handlerImage = (event: ChangeEvent) => {
    const target = event.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];
    setSelectedImage(file);
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      createNewsState({
        id: nanoid(6),
        name: values.name,
        description: values.description,
        imgUrl: selectedImage !== null ?
          URL.createObjectURL(selectedImage) :
          "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAWlBMVEXv8fNod4f19vhkdIRcbX52g5KPmqX29/iYoq3l6OuCj5vd4eTr7fBfcIFaa33M0dbBx82SnKe7wchtfIt8iZejq7TU2N2Ik6CwuL/Gy9Gqsrqbpa/P1NmhqrNz0egRAAADBklEQVR4nO3c63KqMBRAYUiwwUvEete27/+ax1tVAqhwEtnprO+XM62Oyw2CGTFJAAAAAAAAAAAAAAAAAAAAAAAAAAAAAJe6Mb5vqL7jjsws/wgln/dddzBZZjocuxj2HaiWNg1JL/oO3GVBA9PUzvvdF80q7AgPQ/zot1DlOnThyFBIIYWvFtrMK3mFdj30aWzFFWZjr+/qE4mFXh+YwrehsDMK34bCzmIoVEad1nC6PbD8QpXMNwOdDvKi2xMUX2jm2h7/onU2WHcZo/RCld8WN3TWZR1CeKH6LK1tTGftE2UXqpmzPGXbLwnKLkzcT8X6s/UQRReqWWX9LWs9RNGF5qOysmFb74miC9XCDUzt6k8VJtXC9jsihW9Tu5Uuq/vhvlKokuGjc1bRhWZVLdw5MWq8mU6zfNL4wKILk/W0spW6dyvOZ61p4wKd7EIzcoZot+UQVVxeA62bEmUXJuPyIV8PnDsVtxXtpikKL1S7++1U6/IZzV1g8xSFFx4i9HWMdjksNZQCGxOlFyZq8jW1VmubpZV90PngUZ8ovvDYuNt//Wy/1ZPAhsQICo+rUMa4T70msP7tJorCun8vKofKhilGWlg7wfopxlnYMMHaKUZZ2DjBuinGWPgwsDLFCAufBLqJ8RU+DXQ21OgKXwgsTzG2wpcCj1O8nsJGVvjgMNE0xbgKX5zgeYqXxKgKX57geYrnDTWmwhYTvJtiRIUtA3/fbuIpbB14mWI0hR0Cz1OMpbBT4CkxiaOwY+BpQ42isNVhwk283hJc2HmC5Va5hf8xwTgK/UxQcKGvQLGF3gKlFvoLFFroMVBmoc9AkYWeDhNyC1Xh9aJLeYV+Jyiw0Os+KLHQe6C0Qv+BwgoDBMoqDBEoqtCECJRUOPz2e5gQV2jnYa7qllOYBvr5CEGFgVBIIYXPmJ/ghZueZ+hexOWd+w3q9ycuwg5R2377DsapDflbX7rTFah+TbajQSij/aT/wNNF26FUvoELAAAAAAAAAAAAAAAAAAAAAAAAAAAA4G/4B9L3P1vg3y4/AAAAAElFTkSuQmCC"
      });
      openCreateForm();
    },
  });

  return (
    <form
      className={"bg-white md:max-h-[550px] w-96  overflow-x-hidden overflow-y-auto flex flex-col shadow-xl border-[1px] rounded-2xl px-8 pt-6 pb-8 mb-4"}
      onSubmit={formik.handleSubmit}
    >
      <div className={"mb-5 flex flex-row justify-between\t"}>
        <h1>Добавить новость:</h1>
        <div className={"cursor-pointer"} onClick={openCreateForm}>
          <CloseIcon/>
        </div>
      </div>
      <Inputs formik={formik} name={"Заголовок"} formName={"name"}/>
      <TextArea formik={formik}/>
      {selectedImage && (
        <div className={"w-1/3 h-1/3"}>
          <img
            className={"mb-5"}
            src={URL.createObjectURL(selectedImage)}
          />
        </div>
      )}

      <input
        type="file"
        accept="image/png, image/gif, image/jpeg"
        name="Картинка"
        onChange={handlerImage}
        className={"mb-5"}
      />
      <button type={"submit"}
              className={"border-2 p-5 rounded-xl border-green-300 hover:bg-green-100 hover:text-gray-600"}>Готово!
      </button>
    </form>
  );
};