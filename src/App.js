import './App.css';
import TemChart from './container/TemChart/TemChart';
import { useState, useEffect } from 'react'
import Axios from 'axios'

function App() {
  const [temData, setTemData] = useState(null)
  useEffect(()=> {
    if(temData == null) {
      Axios.get("https://temtem-api.mael.tech/api/temtems?fields=name,tvYields,portraitWikiUrl,wikiPortraitUrlLarge,wikiUrl").then(response => {
        setTemData(response.data)
      })
    }
  })


  return (
    <div className="App">
      <header className="App-header">
        {/* Logo goes here whenever we can make that happen */}
        <h1>TemTracker</h1>
      </header>
      <div>
        <TemChart data={temData}/>
      </div>
    </div>
  );
}

export default App;
