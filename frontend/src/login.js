import './App.css';
import register_img from './components/register_page_img.jpg';
import { useState } from 'react';
import { setDetails,setVoteStatus, getEpic } from './components/userDetails';

const Login = ({updatePage, updateLogin}) => {

    const [verifyUser, setVerifyUser] = useState({
      epic : '',
      password : ''
    })

    const [userDetails, setUserDetails] = useState(
      {
        epic:""
      }
    )

  const [user, setUser] = useState(false)

    const setPage = () =>{
        updatePage('register');
    }

    const setLoginPage = (e) =>{
      e.preventDefault();
      updateLogin(true);
    }

    /*const getStatus = async(e)=>{
        e.preventDefault();
        const{epic} = await user
        fetchVoteStatus(getEpic())
        .then((res)=>{
            console.log(res);
            var resString = JSON.stringify(res)
            var result = JSON.parse(resString)
            console.log(result);
            if(result === "Not Voted")
            {
                console.log('if block 24');
                setVoteStatus("Not Voted")
            }
            else
            {
                console.log('else block 30');
                setVoteStatus("Voted")
            }
        })
        .catch((err)=>{
            console.log("error");
        })
    }*/

    const fetchUserDetails = async(e, Epic) =>{
      e.preventDefault();
      var flag = false;
      const userEpic = {epic:Epic}
      const {epic} = userEpic
      console.log(Epic);
      const res = await fetch('/fetchDetails', {
        method:'POST',
        headers:{
          'content-type':'application/json'
        },
        body:JSON.stringify({epic})
      })

      console.log(typeof(res));
      const data = await res.json()
      const dataString = JSON.stringify(data);
      const details = JSON.parse(dataString)
      console.log('71 '+details.name);
      setDetails(details.name, details.epic, details.ac, details.pc)
      setLoginPage(e);
      /*.then((res)=>{
        setDetails(res.name, res.epic, res.ac, res.pc)
        //getStatus(e)
        flag = true;
      })
      .catch((err) =>{
        console.log("error");
      })
      .finally(()=>{
        if(flag)
        setLoginPage(e)
      })*/
    }

    const checkCredentials = async(e) =>{
      e.preventDefault();
      var statusCode = 0;
      var flagVal = true
      var Epic = document.getElementById('epic').value
      console.log(Epic);
      var Password = document.getElementById('password').value
      console.log(Password);

      setVerifyUser({...verifyUser, epic:Epic, password:Password})

      const cred = {epic:Epic, password:Password}
      const {epic, password} = cred
      const res = await fetch('/verify', {
        method:'POST',
        headers:{
          'content-type':'application/json'
        },
        body:JSON.stringify({epic, password})
      })

      const data = await res.json();
      const dataString = JSON.stringify(data);
      const dataJson = JSON.parse(dataString);

      if(dataJson.msg === 'success')
      {
        console.log('login success');
        fetchUserDetails(e, Epic);
      }
      else if(dataJson.msg === 'not registerd')
      {
        console.log('not registered');
        document.getElementById('epicLoginValidate').innerText = 'EPIC not registerd'
      }
      else if(dataJson.msg === 'wrong password')
      {
        console.log('wrong password');
        document.getElementById('pwdLoginValidate').innerText = 'Wrong Password'
      }
      else{
        fetchUserDetails(e, Epic);
      }

    }

    const validateCredentials = (e) => {
      e.preventDefault();
      document.getElementById('epicLoginValidate').innerText = ''
      document.getElementById('pwdLoginValidate').innerText = ''
      var epic = document.getElementById('epic').value;
      var password = document.getElementById('password').value;
      var flag = true;

      if(epic.length === 0)
      {
        document.getElementById('epicLoginValidate').innerText = 'This is required';
        flag = false;
      }
      if(password.length === 0)
      {
        document.getElementById('pwdLoginValidate').innerText = 'This is required';
        flag = false;
      }

      if(flag)
        checkCredentials(e);
    }
  return (
      <div className='register-container'>
        <div className='card'>
        <div className='register-img-div'>
          <img className='register-img' src={register_img} alt='NA'></img>
        </div>
        &emsp;&emsp;
        <div className='box'>
          <div className='registration-form'><h1>Voter Login</h1></div>
          <div className='registration-form'>
            <form>
              <p>
                <label>EPIC Number</label><br></br>
                <input type='text' id='epic' placeholder='Enter EPIC Number' autoComplete='off'></input><br></br>
                <label className='alert' id='epicLoginValidate'></label>
              </p>
              <p>
                <label>Password</label><br></br>
                <input type='password' id='password' placeholder='Enter Password' autoComplete='off'></input><br></br>
                <label className='alert' id='pwdLoginValidate'></label>
              </p>
              <button className='register-btn' onClick={validateCredentials}>Login</button><br></br><br></br>
              Not Registered ? <button className='state-change-btn' onClick={setPage}>Register</button>

            </form>
          </div>
        </div>
        </div>
      </div>
  );
}

export default Login;