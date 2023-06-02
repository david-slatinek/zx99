import './App.css';
import ImageUploader from './components/ImageUploader';
import Facts from './components/Facts';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className='App'>
      {/* <Router> */}
      <Routes>
        <Route path='*' Component={ImageUploader} />
        <Route path='/facts/:animal' Component={Facts} />
      </Routes>
    {/* </Router> */}
    </div>
  );
}

export default App;
