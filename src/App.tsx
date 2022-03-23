import React, { useEffect, useState } from 'react';
import './App.scss';
import Header from './components/Header';
import Upload from './components/Upload';
import People from './components/People';

const App = () => {
  const [people, setPeople] = useState<React.SetStateAction<[]>>([]);

  useEffect(() => {
    console.log(people);
  }, [people]);

  return (
    <div className="homeowners">
      <Header />
      <Upload setPeople={setPeople} />
      <People people={people} />
    </div>
  );
}

export default App;
