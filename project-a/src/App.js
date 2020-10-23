import logo from './logo.svg';
import './App.css';
import AiringShowsList from './AiringShowsList.js'

const _ = require('lodash')
const Jikan = require('jikan-node')
const mal = new Jikan()

function App() {

  return (
    <div>
      <body>
        <AiringShowsList />
      </body>
    </div>
  );
}

export default App;
