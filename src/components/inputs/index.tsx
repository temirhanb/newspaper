import React from "react";
import {FormikValues} from "formik/dist/types";

interface IProps {
  formik: FormikValues,
  name: string,
  formName: string;
}

export const Inputs: React.FC<IProps> = (
  {
    formik,
    name,
    formName,
  }) => {

  return (
    <div className={"mb-5 flex flex-col"}>
      <label className={"flex flex-row"} htmlFor={formName}>{name} <p className={"text-red-500"}>*</p>:</label>
      <input
        id={formName}
        type="text"
        name={formName}
        className={'mt-2 outline-none border-[1px] rounded-xl sm:h-16 md:h-8 lg:h-8 px-2'}
        value={formik.values[formName]}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />
      {formik.errors[formName] && (
        <span className={"text-red-500 mt-2 text-sm"}>{formik.errors[formName]}</span>
      )}
    </div>
  );
};