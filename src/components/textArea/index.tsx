import React from "react";
import {FormikValues} from "formik/dist/types";

export const TextArea: React.FC<FormikValues > = ({formik}) => {
  return (
    <div className={"mb-5 flex flex-col"}>
      <label htmlFor="">Описание:</label>
      <textarea
        name="description"
        id="description"
        cols={30}
        rows={5}
        className={'mt-2 h-1/5 outline-none border-[1px] rounded-xl px-2'}
        value={formik.values.description}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      ></textarea>
    </div>
  );
};