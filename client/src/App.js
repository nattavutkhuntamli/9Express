import logo from './logo.svg';
import './App.css';
import FormProduct from './components/FormProduct';
import FormEditProduct from './components/FromeditProduct';

// "react-router-dom" ซึ่งใช้ในการจัดการการนำทาง (routing) ในแอปพลิเคชัน React
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  /** Javascript
   * 
   */
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<FormProduct/>}>   </Route>
        <Route path='/edit/:id' element={<FormEditProduct/>}></Route>
      </Routes>
    </BrowserRouter>
   
  );
}

export default App;
