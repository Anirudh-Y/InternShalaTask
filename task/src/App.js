import { useEffect, useState } from 'react';
import './App.css';
import Tablecom from './Components/Tablecom';
import ListGroup from 'react-bootstrap/ListGroup'
import { Button } from '@mui/material';
import Radio from '@mui/material/Radio';


function App() {

  let [data, setData] = useState([])
  let [list, setList] = useState([])
  let listed = []

  useEffect(() => {
    fetchData()
    setList(listed)
  }, [])

  function listingData(data) {
    for (let i = 0; i < data.length; i++) {
      let tmp = []
      for (let j in data[i]) {
        tmp.push(data[i][j]);
      }
      listed.push(tmp)
    }
  }

  function fetchData() {
    fetch('https://house-stock-watcher-data.s3-us-west-2.amazonaws.com/data/all_transactions.json')
      .then((res) => res.json())
      .then((res) => {
        let tmp = []
        for (let i in res[0]) {
          tmp.push(i)
        };
        setData(tmp);
        // console.log(res[0]);
        listingData(res);
      })
      .catch((err) => console.log(err))
  }

  return (<>
    <div className="App">
      <h1>TASK</h1>
      <ListGroup className='App__listGroup' as="ol" numbered>
        <ListGroup.Item as="li">Table showing data ftecched from given link</ListGroup.Item>
        <ListGroup.Item as="li">Cliclinh <Button variant="outlined" style={{ borderColor: "black", color: "black", width: "10px", margin: "5px 5px 0 0" }}>Sort</Button> will only give list of the chosen column</ListGroup.Item>
        <ListGroup.Item as="li">Clicking <Button variant="outlined" style={{ borderColor: "blue", color: "blue", width: "10px", margin: "5px 5px 0 0" }}>Show</Button> will sort the table according to the chosen column</ListGroup.Item>
        <ListGroup.Item as="li">Click <Radio /> and enter the value by which you want to filter in the text field</ListGroup.Item>
        <ListGroup.Item as="li">Click SHOW ALL<Radio /> and click Search button to get initial table </ListGroup.Item>
      </ListGroup>
      {data.length === 0 && list.length === 0 ? <h2>Please Wait...</h2> : <Tablecom columnNames={data} listData={list} />}
    </div>
  </>
  );
}

export default App;
