import './App.css';
import ImageUploader from './components/ImageUploader';
import Facts from './components/Facts';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/header';
import About from './components/About';


function App() {
  return (
    <div className='App'>
      {/* <Router> */}
      <Header/>
      <Routes>
        <Route path='*' Component={ImageUploader} />
        <Route path='/facts/:animal' Component={Facts} />
        <Route path='/about' Component={About} />
      </Routes>
    {/* </Router> */}
    </div>
  );
}

export default App;
