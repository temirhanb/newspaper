import React from "react";
import {Route, Routes} from "react-router-dom";
import {Header} from "./components";
import {ErrorPage, MainPage} from "./pages";

const App: React.FC = () => {

  return (
      <Routes>
        <Route path={"/"} element={<Header/>}>
          <Route path={"/"} element={<MainPage/>}/>
          <Route path={"*"} element={<ErrorPage/>}/>
        </Route>
      </Routes>
  );
};

export default App;
