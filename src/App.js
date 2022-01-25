import './App.css';
import {Route, Routes,Navigate} from 'react-router-dom'
import React from 'react';

import HomePage from './pages/homepage/homepage.components';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.components';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.components';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';

import { connect } from 'react-redux';

import { setCurrentUser } from './redux/user/users.actions';
class App extends React.Component {
   

   unSubscribeFromAuth = null;

   componentDidMount(){
     const {setCurrentUser}  = this.props;
     this.unSubscribeFromAuth= auth.onAuthStateChanged(async userAuth=>{
       if(userAuth){
         const userRef = await createUserProfileDocument(userAuth);
         userRef.onSnapshot(snapShot =>{
           setCurrentUser({
               id : snapShot.id,
               ...snapShot.data()
           })
         })
       }
       setCurrentUser(userAuth);
     })
   }

   componentWillUnmount(){
     this.unSubscribeFromAuth();
   }
  render(){
  return (
    <div>
      <Header />
      <Routes>
      <Route exact path='/' element={<HomePage/>}/>
      <Route path='/shop' element={<ShopPage/>}/>
      <Route exact path='/signin' render={()=> this.props.currentUser ? (<Navigate to="/"></Navigate>):<SignInAndSignUpPage/>}/>
      </Routes>
    </div>
  );
}
}

const mapStateToProps = ({user}) =>({
  currentUser : user.currentUser
}
)

const mapDispatchToProps = dispatch =>({
    setCurrentUser: user=>dispatch(setCurrentUser(user))
}

)
export default connect(mapStateToProps, mapDispatchToProps)(App);
 