import './App.css';
import React, { useState } from 'react'
import News from './components/News';
import LoadingBar from 'react-top-loading-bar'

import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom"

const App = () => {
  const pageSize = 9
  // const apiKey = process.env.REACT_APP_NEWS_API   //This is for my local machine.
  const apiKey = "Paste Your API Key Here"
  const [progress, setProgress] = useState(0)
  
  return (
    <Router>
      <LoadingBar
        color='#f44336'
        progress={progress}
        height={5}
        onLoaderFinished={() => setProgress(0)}
      />
      {/* <NavBar category={props.category}></NavBar> */}
      <Routes>
        <Route exact path="/" element={<News apiKey={apiKey} setProgress={setProgress} key="general" pageSize={pageSize} country="in" category="general"></News>} />
        <Route exact path="/entertainment" element={<News apiKey={apiKey} setProgress={setProgress} key="entertainment" pageSize={pageSize} country="in" category="entertainment"></News>} />
        <Route exact path="/business" element={<News apiKey={apiKey} setProgress={setProgress} key="business" pageSize={pageSize} country="in" category="business"></News>} />
        <Route exact path="/health" element={<News apiKey={apiKey} setProgress={setProgress} key="health" pageSize={pageSize} country="in" category="health"></News>} />
        <Route exact path="/science" element={<News apiKey={apiKey} setProgress={setProgress} key="science" pageSize={pageSize} country="in" category="science"></News>} />
        <Route exact path="/sports" element={<News apiKey={apiKey} setProgress={setProgress} key="sports" pageSize={pageSize} country="in" category="sports"></News>} />
        <Route exact path="/technology" element={<News apiKey={apiKey} setProgress={setProgress} key="technology" pageSize={pageSize} country="in" category="technology"></News>} />
      </Routes>
    </Router>
  )
}

export default App