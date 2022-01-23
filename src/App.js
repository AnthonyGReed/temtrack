import './App.css';
import TemChart from './container/TemChart/TemChart';
import { useState, useEffect } from 'react'
import Axios from 'axios'
import { Container, Row, Col } from 'react-bootstrap'

function App() {
  const [temData, setTemData] = useState(null)
  useEffect(()=> {
    Axios.get("https://temtem-api.mael.tech/api/temtems?fields=name,tvYields,portraitWikiUrl,wikiPortraitUrlLarge,wikiUrl").then(response => {
      setTemData(response.data)
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
      {/* <footer className="footer">
        <Container>
          <Row>
            <Col xs={12}>        
              TemTem content copyright Crema - TemTracker Project by Anthony Reed - Available on <a href="githublink">Github</a>
            </Col>
          </Row>
        </Container>
      </footer> */}
    </div>
  );
}

export default App;
