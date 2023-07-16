import React, { useEffect, useState } from 'react';
import './nav.css'

function Nav() {
    const [show,handleShow]=useState([])
    useEffect(()=>{
        window.addEventListener('scroll',()=>{
            if(window.scrollY>100){
                handleShow(true);
            }
            else handleShow(false);
        })
        return ()=>{
            window.removeEventListener('scroll')
        }
    },[])
    return (
        <div className={`nav ${show && 'nav-black'}`}>
            <img 
            className='logo' 
            src='https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg'
            alt='logo'
            /> 
        </div>
    );
}

export default Nav;