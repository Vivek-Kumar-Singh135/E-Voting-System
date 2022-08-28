import React from 'react';
import profile_icon from './components/Profile_icon.png'
import party1_logo from './components/party1_logo.jfif'
import party2_logo from './components/party2_logo.jfif'
import party3_logo from './components/party3_logo.jfif'
import party4_logo from './components/party4_logo.jfif'
import party5_logo from './components/party5_logo.jfif'
import { setVoteStatus, getName, getEpic, getAC, getPC, getVoteStatus } from './components/userDetails';
import { useState } from 'react';

const VoterPage = ({updatePage, updateLogin}) => {

    const[status, setStatus] = useState("")

    const fetchStatus = async()=>{
        const userEpic = {epic:getEpic()};
        const {epic} = userEpic;
        const res = await fetch('/fetchVoteStatus', {
            method:'POST',
            headers:{
                'content-type':'application/json'
            },
            body:JSON.stringify({epic})
        })
        const data = await res.json()
        const dataString = JSON.stringify(data);
        const result = JSON.parse(dataString);
        if(result.status === "Not Voted")
            {
                console.log('if block 29');
                setStatus("Not Voted")
                setVoteStatus("Not Voted")
                document.getElementById('status').setAttribute('class', 'alert');
            }
            else
            {
                console.log('else block 36');
                setStatus("Voted")
                setVoteStatus("Voted")
                document.getElementById('status').setAttribute('class', 'success');
                document.getElementById('vote-btn1').setAttribute('disabled', 'true')
                document.getElementById('vote-btn2').setAttribute('disabled', 'true')
                document.getElementById('vote-btn3').setAttribute('disabled', 'true')
                document.getElementById('vote-btn4').setAttribute('disabled', 'true')
                document.getElementById('vote-btn5').setAttribute('disabled', 'true')
            }
        /*.then((res)=>{
            console.log(res);
            var resString = JSON.stringify(res)
            var result = JSON.parse(resString)
            console.log(result);
            if(result === "Not Voted")
            {
                console.log('if block 24');
                setStatus("Not Voted")
                setVoteStatus("Not Voted")
                document.getElementById('status').setAttribute('class', 'alert');
            }
            else
            {
                console.log('else block 30');
                setStatus("Voted")
                setVoteStatus("Voted")
                document.getElementById('status').setAttribute('class', 'success');
                document.getElementById('vote-btn1').setAttribute('disabled', 'true')
                document.getElementById('vote-btn2').setAttribute('disabled', 'true')
                document.getElementById('vote-btn3').setAttribute('disabled', 'true')
                document.getElementById('vote-btn4').setAttribute('disabled', 'true')
                document.getElementById('vote-btn5').setAttribute('disabled', 'true')
            }
        })
        .catch((err)=>{
            console.log("error");
        })*/
    }

    document.addEventListener("fetchStatus", fetchStatus());

    const handleClick = (e) => {
        e.preventDefault();
        updatePage('login');
        updateLogin(false);
    }

    const recordVote = async(e) =>{
        e.preventDefault();
        console.log('record vote called');
        const userEpic = {epic:getEpic()}
        const {epic} = userEpic;
        const res = await fetch('/updateVoteStatus', {
            method:'POST',
            headers:{
                'content-type':'application/json'
            },
            body:JSON.stringify({epic})
        })

        const result = await res.json();
        const resultString = JSON.stringify(result);
        const status = JSON.parse(resultString);

        if(status.msg === 'status updated')
        {
            console.log('status updated');
            fetchStatus();
        }

        /*.then(()=>{
            console.log('success');
            fetchStatus()
        })
        .catch((err)=>{
            console.log('err');
        })*/
    }

    return(
        <div className='voter-page-container'>
            <div className='voter-details'>
                <div className='profile-icon-div'>
                    <img className='profile-icon' src={profile_icon} alt='NA'></img>
                </div>
                <br></br><br></br>
                <div className='profile-details'>
                    Name : {getName()}<br></br>
                    EPIC : {getEpic()} <br></br>
                    Assembly Constituency : {getAC()}<br></br>
                    Parliament Constituency : {getPC()}
                </div>
                <br></br>
                <div className='vote-div'>
                    <p>Vote Status : </p><p id='status'>{status}</p>
                </div>
                <div className='logout-btn-div'>
                    <button className='logout-btn' onClick={handleClick}>Log Out</button>
                </div>
            </div>
            <div></div>
            <div className='candidate-details'>
                <div className='candidate'>
                    <div>1</div>
                    <div className='party-logo-div'>
                        <img className='party-logo' src={party1_logo} alt='NA'></img>
                    </div>
                    <div className='candidate-name'>Candidate Name</div>
                    <div>
                        <button id='vote-btn1' onClick={recordVote}>Vote</button>
                    </div>
                </div>
                <div className='candidate'>
                    <div>2</div>
                    <div className='party-logo-div'>
                        <img className='party-logo' src={party2_logo} alt='NA'></img>
                    </div>
                    <div className='candidate-name'>Candidate Name</div>
                    <div>
                        <button id='vote-btn2' onClick={recordVote}>Vote</button>
                    </div>
                </div>
                <div className='candidate'>
                    <div>3</div>
                    <div className='party-logo-div'>
                        <img className='party-logo' src={party3_logo} alt='NA'></img>
                    </div>
                    <div className='candidate-name'>Candidate Name</div>
                    <div>
                        <button id='vote-btn3' onClick={recordVote}>Vote</button>
                    </div>
                </div>
                <div className='candidate'>
                    <div>4</div>
                    <div className='party-logo-div'>
                        <img className='party-logo' src={party4_logo} alt='NA'></img>
                    </div>
                    <div className='candidate-name'>Candidate Name</div>
                    <div>
                        <button id='vote-btn4' onClick={recordVote}>Vote</button>
                    </div>
                </div>
                <div className='candidate'>
                    <div>5</div>
                    <div className='party-logo-div'>
                        <img className='party-logo' src={party5_logo} alt='NA'></img>
                    </div>
                    <div className='candidate-name'>Candidate Name</div>
                    <div>
                        <button id='vote-btn5' onClick={recordVote}>Vote</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default VoterPage;