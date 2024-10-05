import {Link} from "react-router-dom";

export const ErrorPage = () => {
  return (
    <div className={"flex flex-col items-center justify-center"}>
      <h1 className={' text-2xl mb-5'}>
        Something went wrong =(
      </h1>
      <Link to={"/"}>
        <button className={'border-2 p-5 rounded-xl border-red-300 hover:bg-red-100 hover:text-gray-600'}>
          <span>Return to main page</span>
        </button>
      </Link>
    </div>
  );
};