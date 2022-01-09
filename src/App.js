import { BrowserRouter, Routes, Route} from 'react-router-dom';
import './App.css';
import Logo from './Components/Logo/Logo';
import Landing from './Pages/Landing/Landing';
import Signup from './Pages/Signup/Signup';

function App() {
  return (
    <BrowserRouter>
      <Logo/>
      <Routes>
        <Route element={<Landing/>} path="/"/>
        <Route element={<Signup/>} path="/register/:referer" exact/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
