import React from 'react';


import '../../css/register.css';

const Register = () => {
  return (
    <div className='register-container'>
    <form className=''>
      <div className='form-floating mb-3'>
        <input type="fornavn" className='form-control'></input>
        <label className='label-container'>Fornavn</label>
        </div>
        <div className='form-floating mb-3'>
        <input type="text" className='form-control'></input>
        <label className='label-container'>Etternavn</label>
        </div>
        <button className='btn btn-danger'> Register</button>
    </form>
    </div>
  )
}

export default Register