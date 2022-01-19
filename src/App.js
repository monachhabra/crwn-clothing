import './App.css';
import {Route, Routes} from 'react-router-dom'
import React from 'react';

import HomePage from './pages/homepage/homepage.components';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.components';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.components';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';

class App extends React.Component {
   constructor() {
    super();
    this.state = {
      currentUser : null
    }
   }

   unSubscribeFromAuth = null;

   componentDidMount(){
     this.unSubscribeFromAuth= auth.onAuthStateChanged(async userAuth=>{
       if(userAuth){
         const userRef = await createUserProfileDocument(userAuth);
         userRef.onSnapshot(snapShot =>{
           this.setState({
             currentUser :{
               id : snapShot.id,
               ...snapShot.data()
             }
           })
         })
         
       }
       this.setState({currentUser:userAuth});
     })
   }

   componentWillUnmount(){
     this.unSubscribeFromAuth();
   }
  render(){
  return (
    <div>
      <Header currentUser={this.state.currentUser}/>
      <Routes>
      <Route exact path='/' element={<HomePage/>}/>
      <Route path='/shop' element={<ShopPage/>}/>
      <Route path='/signin' element={<SignInAndSignUpPage/>}/>
      </Routes>
    </div>
  );
}
}

export default App;
