import React, {useEffect} from 'react';
import './App.css';
import Main from "../Main/Main";
import {Routes, Route} from 'react-router-dom';
import getData from "../../utils/Api";

function App() {
  const [ingredients, setIngredients] = React.useState({});

  useEffect(() => {
      getData()
        .then((res) => {
          if (res) {
            setIngredients(res);
          }
        })
        .catch((err) => {
          console.log(`Ошибка загрузки ингридиентов: ${err}`);
        })
    },
    []
  );

  return (
    <div className="App">
      <Routes>
        <Route path="/"
               element={
                 <Main ingredients={ingredients}/>
               }/>
      </Routes>
    </div>
  );
}

export default App;
