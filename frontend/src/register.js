import './App.css';
import register_img from './components/register_page_img.jpg';
import {setField, getId} from './components/userDetails'
import { useState } from 'react';

const Register = ({updatePage}) => {

  const [newUser, setNewUSer] = useState(
    {
      _id : "",
      aadhar : "",
      epic : "",
      authkey : "",
      password : ""
    }
  )

    const setPage = () => {
        updatePage('login')
    }

    const handleChange = (page) =>{
      console.log('handle change');
      updatePage(page);
    }

    const addUser=async(e)=>
    {
        e.preventDefault();
        console.log("adduser called");
        let Adhar = document.getElementById('aadhar').value;
        console.log(Adhar);
        let Epic = document.getElementById('epic').value;
        console.log(Epic);
        let AuthKey = document.getElementById('authkey').value;
        console.log(AuthKey);
        setField(Adhar, Epic, AuthKey)
        
        console.log('from getId : ' + getId());
        setNewUSer({_id:AuthKey, aadhar:Adhar, epic:Epic, authkey:AuthKey});
        console.log('newUser id : '+newUser.authkey);
        
        var flagVar = true
        var statusCode = 0

        const fields = {aadhar:Adhar, epic:Epic, authkey:AuthKey}
        const {aadhar, epic, authkey} = fields

        const res=await fetch('/search', {
          method:'POST',
          headers:{
            'content-type':'application/json'
          },
          body:JSON.stringify({aadhar, epic, authkey})
        })

        const data = await res.json();
        const dataString = JSON.stringify(data)
        const dataJson = JSON.parse(dataString)
        //console.log('status : '+data.status);
        if(dataJson.msg === 'success')
        {
          console.log('correct key');
          handleChange('password');
        }
        else if(dataJson.msg === 'epic registered')
        {
          console.log('epic registered');
          document.getElementById('epicValidate').innerText = 'EPIC registered';
        }
        else if(dataJson.msg === 'aadhar registered')
        {
          console.log('aadhar registered');
          document.getElementById('aadharValidate').innerText = 'Aadhar registered';
        }
        else if(dataJson.msg === 'epic does not exists')
        {
          console.log('epic does not exist');
          document.getElementById('epicValidate').innerText = 'EPIC does not exist';
        }
        else if(dataJson.msg === 'invalid authkey')
        {
          console.log('wrong key');
          document.getElementById('authKeyValidate').innerText = 'Wrong Key';
        }
        else{
          handleChange('password')
        }
    }

    const validateFields = (e) =>{
      e.preventDefault();
      document.getElementById('aadharValidate').innerText = ''
      document.getElementById('epicValidate').innerText = ''
      document.getElementById('authKeyValidate').innerText = ''
      var aadhar = document.getElementById('aadhar').value;
      var epic = document.getElementById('epic').value;
      var authkey = document.getElementById('authkey').value;

      var aadharPattern = /^[2-9]{1}[0-9]{3}[0-9]{4}[0-9]{4}$/;
      var epicPattern = /^[A-Z]{3}[0-9]{7}$/;
      var authKeyPattern = /^[0-9]{11}$/;
      var flag = true;

      if(aadhar.length === 0)
      {
        document.getElementById('aadharValidate').innerText = 'Fill your Aadhar Number';
        flag = false;
      }
      else if(!aadharPattern.test(aadhar))
      {
        document.getElementById('aadharValidate').innerText = 'Invalid Aadhar Number';
        flag = false;
      }
      if(epic.length === 0)
      {
        document.getElementById('epicValidate').innerText = 'Fill your EPIC Number';
        flag = false;
      }
      else if(!epicPattern.test(epic))
      {
        document.getElementById('epicValidate').innerText = 'Invalid EPIC Number';
        flag = false;
      }
      if(authkey.length === 0)
      {
        document.getElementById('authKeyValidate').innerText = 'Enter your Authorization Key';
        flag = false;
      }
      else if(!authKeyPattern.test(authkey))
      {
        document.getElementById('authKeyValidate').innerText = 'Invalid Authorization Key';
        flag = false;
      }
      
      if(flag)
        addUser(e);
    }
  return (
      <div className='register-container'>
        <div className='card'>
        <div className='register-img-div'>
          <img className='register-img' src={register_img} alt='NA'></img>
        </div>
        &emsp;&emsp;
        <div className='box'>
          <div className='registration-form'><h1>Voter Registration</h1></div>
          <div className='registration-form'>
            <form>
              <p>
                <label>Aadhar Number</label><br></br>
                <input type='text' id='aadhar' placeholder='Enter Aadhar Number' autoComplete='off'></input><br></br>
                <label className='alert' id='aadharValidate'></label>
              </p>
              <p>
                <label>EPIC Number</label><br></br>
                <input type='text' id='epic' placeholder='Enter EPIC Number' autoComplete='off'></input><br></br>
                <label className='alert' id='epicValidate'></label>
              </p>
              <p>
                <label>Authorization Key</label><br></br>
                <input type='password' id='authkey' placeholder='Enter Authorization Key' autoComplete='off'></input><br></br>
                <label className='alert' id='authKeyValidate'></label>
              </p>
              <button className='register-btn' onClick={validateFields}>Submit</button><br></br><br></br>
              Already Registered ? <button className='state-change-btn' onClick={setPage}>Login</button>

            </form>
          </div>
        </div>
        </div>
      </div>
  );
}

export default Register;