import logo from './logo.svg';
import './App.css';
import Pages from './router';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { StrictMode } from 'react';

axios.defaults.baseURL = "https://api.dev.pastorsline.com";
axios.defaults.headers.common['Authorization'] = 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjU2MCwiZXhwIjoxNzI2NTY3MTc5LCJ0eXBlIjoiYWNjZXNzIiwidGltZXN0YW1wIjoxNjk1MDMxMTc5fQ.0y7NtuVDCvcPvmWbliMs1q02sov2oFC6u2Hi6H4A2W4';

function App() {
  return (
    <Pages />
  );
}

export default App;
