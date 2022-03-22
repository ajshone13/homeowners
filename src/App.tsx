import React, { useState } from 'react';
import './App.scss';
import Header from './components/Header';
import Upload from './components/Upload';
import People from './components/People';

const App = () => {
  const [people, setPeople] = useState([]);

  return (
    <div className="homeowners">
      <Header />
      <Upload people={people} setPeople={setPeople} />
      <People people={people} />
    </div>
  );
}

export default App;
