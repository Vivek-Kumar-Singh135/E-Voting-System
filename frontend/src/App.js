import { useState } from 'react';
import './App.css';
import Header from './header';
import Register from './register';
import Login from './login';
import Communication from './communicate';
import VoterPage from './voterpage';
import PasswordPage from './password';

const App = () => {

  const [activity, setActivity] = useState('register');
  const [login, setLogin] = useState(localStorage.getItem('isUserLogin'));

  const updatePage = (page) => {
    console.log(page);
    setActivity(page);
    console.log(activity);
  }

  const updateLogin = (isLogin) => {
    setLogin(isLogin);
  }

  return (
      <div>
        <Header/>
        <br></br>
        {(login === true) ? <VoterPage updatePage={updatePage} updateLogin={updateLogin}/> : (activity === 'register')?<Register updatePage={updatePage}/>: (activity === 'password') ? <PasswordPage updatePage={updatePage}/>:<Login updatePage={updatePage} updateLogin={updateLogin}/>}
        <Communication/>
      </div>
  );
}

export default App;