import React, {useEffect} from "react";
import {Route, Routes} from "react-router-dom";
import {Header} from "./components";
import {ErrorPage, MainPage} from "./pages";
import {useCountStore} from "./state";

const App: React.FC = () => {
  const items = useCountStore((state) => state.items);
  const setState = useCountStore((state) => state.setState);

  useEffect(() => {
    const myStorage = window.localStorage;

    if (myStorage.length === 0) {
      myStorage.setItem("state", JSON.stringify(items));
    } else {
      const store:any = myStorage.getItem("state");
      setState(JSON.parse(store));
    }
  }, []);
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
