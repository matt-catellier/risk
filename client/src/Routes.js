import React, {useEffect} from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import './App.css';

const getData = async () => {
  const result = await axios.get('/example');
  return result.data;
}

const Test = () => {
  useEffect(() => {
    const result = getData();
    console.log(result);
  }, [])
  return <div> test </div>;
}

function Routes() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={() => <div> home </div>} />
        <Route path="/test" component={Test} />
      </Switch>
    </Router>
  );
}

export default Routes;
