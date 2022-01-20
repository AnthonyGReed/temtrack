import './App.css';
import TemChart from './container/TemChart/TemChart';
import { useState, useEffect } from 'react'
import Axios from 'axios'
import { Container } from 'react-bootstrap'

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
        <h1 className="px-4 py-3">TemTracker</h1>
      </header>
      <Container className="pt-4">
        <TemChart data={temData}/>
      </Container>
    </div>
  );
}

export default App;
