import React from 'react';


import '../../css/register.css';

const Register = () => {
  return (
    <>
    <form className='register-component-container'>
        <label className='label-container'>Fornavn</label>
        <input type="text" placeholder='Fornavn ...' className='input-container'></input>

        <label className='label-container'>Etternavn</label>
        <input type="text" placeholder="Etternavnet ..." className='input-container'></input>
    </form>
    </>
  )
}

export default Register