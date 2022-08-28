import './App.css';
import register_img from './components/register_page_img.jpg';
import { useState } from 'react';
import { getId, getAdhar, getEpic, getAuthKey } from './components/userDetails';

const PasswordPage = ({updatePage}) => {

    const [newUser, setNewUSer] = useState(
        {
          _id : "",
          aadhar : "",
          epic : "",
          authkey : "",
          password : ""
        }
      )
    
      const [newVoter, setNewVoter] = useState(
        {
          epic : ""
        }
      )

    const setPage = () => {
        updatePage('login')
    }

    const addUserToCast = async(e) =>{
      e.preventDefault();
      console.log('addusertocast');
      var Epic = getEpic();
      console.log('32 epic '+Epic);
      const userEpic = {epic:Epic}
      const {epic} = userEpic
      const res = await fetch('/addStatus', {
        method:'POST',
        headers:{
          'content-type':'application/json'
        },
        body:JSON.stringify({epic})
      })
      .then(()=>{
        console.log('updated');
      })
      .catch((err)=>{
        console.log(err);
      })
    }

    const addUser=async(e)=>
    {
        e.preventDefault();
        console.log("adduser called");
        let pwd = document.getElementById('pwd').value;
        //setUser({...user, password:pwd});
        console.log('pwd : ');
        //console.log(password);
        var Id = getId()
        var Adhar = getAdhar()
        var Epic = getEpic()
        var AuthKey = getAuthKey()

        const user = {_id:Id, aadhar:Adhar, epic:Epic, authkey:AuthKey, password:pwd}
        const {_id, aadhar, epic, authkey, password} = user;
        const res = await fetch('/register', {
          method:'POST',
          headers:{
            'content-type':'application/json'
          },
          body:JSON.stringify({_id, aadhar, epic, authkey, password})
        })
        .then(()=>{
          console.log('user added');
          document.getElementById('success').innerText = 'Registration Successful !!!'
          addUserToCast(e)
        })
        .catch((err) =>{
          console.log('caught error : ' + err);
        })
    }

    const validatePwd = (e) =>{
        e.preventDefault();
        document.getElementById('pwdValidate').innerText = ''
        document.getElementById('pwdValidate2').innerText = ''
        document.getElementById('cnfpwdValidate').innerText = ''
        var pwd = document.getElementById('pwd').value;
        console.log('pwd : ' + pwd);
        var cnfpwd = document.getElementById('cnfpwd').value;

        var pwdPattern = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&-+=()])/

        var flag = true;

        console.log(pwdPattern.test(pwd));
        if(pwd.length === 0)
        {
            document.getElementById('pwdValidate').innerText = 'Please set a password';
            document.getElementById('pwdValidate2').innerText = '';
            flag = false;
        }
        else if(!pwdPattern.test(pwd))
        {
            console.log('pattern block');
            document.getElementById('pwdValidate').innerText = 'Must have 1 capital, 1 small letter,';
            document.getElementById('pwdValidate2').innerText = '1 digit & 1 special character';
            flag = false;
        }

        if(cnfpwd.length === 0 && pwd.length === 0)
        {
            document.getElementById('cnfpwdValidate').innerText = 'Confirm Your Password';
            flag = false;
        }

        else if(cnfpwd.length === 0 || cnfpwd !== pwd)
        {
            document.getElementById('cnfpwdValidate').innerText = 'Confirm Password does not match';
            flag = false;
        }
        if(flag)
           addUser(e);
    }
  return(
      <div className='register-container'>
        <div className='card'>
        <div className='register-img-div'>
          <img className='register-img' src={register_img} alt='NA'></img>
        </div>
        &emsp;&emsp;
        <div className='box'>
          <div className='registration-form'>
            <h1>Voter Registration</h1>
          </div>
          <div className='registration-form'>
            <form>
                <span id='success'></span>
                <p>
                    <label>Password</label><br></br>
                    <input type='password' id='pwd' placeholder='Set Your Password'></input><br></br>
                    <label className='alert' id='pwdValidate'></label><br></br>
                    <label className='alert' id='pwdValidate2'></label>
                </p>
                <p>
                    <label>Confirm Password</label><br></br>
                    <input type='password' id='cnfpwd' placeholder='Confirm Your Password'></input><br></br><br></br>
                    <label className='alert' id='cnfpwdValidate'></label>
                </p>
                <button className='register-btn' onClick={validatePwd}>Register</button><br></br><br></br>
                Already Registered ? <button className='state-change-btn' onClick={setPage}>Login</button>
            </form>
          </div>
        </div>
        </div>
      </div>
  );
}

export default PasswordPage;