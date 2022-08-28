import React from 'react';
import header_img from './components/header_img.jpg';

const Header = () =>{
    return(
        <div className='header'>
            <div className='header-img-div'>
                <img className='header-img' src={header_img} alt='NA'></img>
            </div>
            <div>
                <h1>Online Voting Portal</h1>
            </div>
        </div>
    )
}

export default Header;