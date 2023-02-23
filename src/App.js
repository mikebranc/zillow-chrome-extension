/*global chrome*/
import React, {useEffect, useState} from 'react'
import './App.css';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { CSVLink } from "react-csv";

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
})

function App() {
  const [homes, setHomes] = useState([])
  const [avgPrice, setAvgPrice] = useState()
  const [medianPrice, setMedianPrice] = useState()

  useEffect(() => {
    const sendMessageToContentScript = async () => {
      const [tab] = await chrome.tabs.query({active: true, currentWindow: true});
      const response = await chrome.tabs.sendMessage(tab.id, {type: 'zillow_DOM_req'});
      setHomes(response?.homes);
      setAvgPrice(response?.averagePrice);
      setMedianPrice(response?.medianPrice);
    }
    sendMessageToContentScript()
  },[]);

  console.log(homes)


  return (
    <div className="App" style={{background: "linear-gradient(to bottom, pink, DeepSkyBlue)"}}>
       <Row>
        <h1 style={{fontWeight:'bold'}}>Zillow Chrome Extension</h1>
      </Row>
      <Row style={{width:'100%'}}>
        <Col xs={6}>
          <Card style={{height:'150px'}}>
            <Card.Body className='d-flex flex-column justify-content-center'>
              <Card.Title>
                Average Home Price
              </Card.Title>
              <Card.Text>
                {avgPrice && `${formatter.format(avgPrice)}`}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={6}>
          <Card style={{height:'150px'}}>
            <Card.Body className='d-flex flex-column justify-content-center'>
              <Card.Title>
                Median Home Price
              </Card.Title>
              <Card.Text>
                {medianPrice && `${formatter.format(medianPrice)}`}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className='mt-3'>
        <CSVLink 
              data={homes}
              filename={'zillow-chrome-extension-data.csv'}
              style={{textDecoration: 'none', color:'black'}}
        > 
          <Button variant='light' style={{backgroundColor: '#ffffff'}}>
            <span>Export Results</span>
          <CloudDownloadIcon style={{marginLeft:'5px'}}/>
          </Button>
        </CSVLink>
      </Row>
    </div>
  );
}

export default App;
