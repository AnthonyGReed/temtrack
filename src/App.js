import './App.css';
import TemChart from './container/TemChart/TemChart';
import { useState, useEffect } from 'react'
import Axios from 'axios'
import { Container, Row, Col } from 'react-bootstrap'

function App() {
  const [temData, setTemData] = useState(null)
  useEffect(()=> {
    Axios.get("https://temtem-api.mael.tech/api/temtems?fields=name,tvYields,wikiUrl").then(response => {
      setTemData(response.data.sort((a,b) => (a.name > b.name) ? 1 : -1))
      })
    document.title = "TemTracker"
  }, [])


  return (
    <div className="App">
      <header className="App-header">
        {/* Logo goes here whenever we can make that happen */}
        <h1 className="px-4 py-3">TemTracker</h1>
      </header>
      <Container className="pt-4">
        <TemChart data={temData}/>
      </Container>
      <footer className={"text-center"}> 
        TemTem content copyright Crema - TemTracker Project by Anthony Reed - Available on <a href="https://github.com/AnthonyGReed/temtrack">Github</a>
      </footer>
    </div>
  );
}

export default App;
