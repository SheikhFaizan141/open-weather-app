import React from 'react'
import Profile from '../assets/Profile.png'

const Header = ({onSubmit}) => {
  return (
    <div id='header'>
      <div className='user-profile'>
        <img id='user-profile-img' src={Profile} alt="" />
        <div className='user-name'>
          <span>Hello,</span>
          <h3>Jack Grealish</h3>
        </div>
      </div>
      <div className="search">
        <form onSubmit={onSubmit}>
          {/* <input type='search' placeholder='Search here' />
          <button>Search</button> */}
        </form>
        {/* <input type='checkbox' /> */}
      </div>
    </div>
  )
}

export default Header