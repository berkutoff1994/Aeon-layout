import React, { useEffect, useState } from 'react';
import './styles/App.scss';
import { MyGantt } from './components/MyGantt';

function App() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [data, setData] = useState([]);

  //получаем входные данные для рендера
  useEffect(() => {
    fetch("http://82.202.204.94/tmp/test.php")
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setData(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, [])
  if (error) {
    return <div>Ошибка: {error}</div>;
  } else if (!isLoaded) {
    return <div>Загрузка...</div>;
  } else {
  return (
    <div className="App">
      <MyGantt data={data}/>
    </div>
    );
  }
}

export default App;
