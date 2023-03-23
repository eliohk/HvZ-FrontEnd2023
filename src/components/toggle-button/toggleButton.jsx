import React, { useState } from 'react'

const toggleButton = () => {
  const[toggle, setToggle] = useState(true);

  const toggleButton = (props) => {
    setToggle(!toggle);
  }

  return (
    <div>
      <button onClick={toggleButton()}>
        <ul>
          <li className='list-group-item'>Date</li>
          <li className='list-group-item'>State</li>
          <li className='list-group-item'>Players</li>
          <li className='list-group-item'>Title</li>

        </ul>


      </button>


    </div>
  )
}

export default toggleButton