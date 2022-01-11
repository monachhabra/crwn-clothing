import './App.css';
import HomePage from './pages/homepage/homepage.components';
import {Route, Routes} from 'react-router-dom'
import ShopPage from './pages/shop/shop.component';
// const HatsPage =()=>(
//   <div>
//     <h1>Hats Page</h1>
//   </div>
// );

function App() {
  return (
    <div>
      <Routes>
      <Route exact path='/' element={<HomePage/>}/>
      <Route path='/shop' element={<ShopPage/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
