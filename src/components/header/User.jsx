import React, { useState } from "react"
import { IoSettingsOutline } from "react-icons/io5"
import { GrHelp } from "react-icons/gr"
import { BiLogOut } from "react-icons/bi"
import { Link } from "react-router-dom"
import { useDispatch } from "react-redux"
import { authActions } from "../../store/authSlice"
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

export const User = () => {
  const user = true;
  const history = useHistory();
  const {id, isLoggedIn} = useSelector((state) => state.auth)
  const [profileOpen, setProfileOpen] = useState(false)

  const close = () => {
    setProfileOpen(null)
  }

  const dispatch = useDispatch()
  const logoutHandler = (e) => {
    dispatch(authActions.logout())
    history.push('/')
  }

  const signUp = () => {
    history.push("/signup");
  }

  return (
    <>
      <div className='profile'>
        {user ? (
          <>
          {!isLoggedIn ? 
            <button className='btn btn-primary' onClick={signUp}>
              Sign Up
            </button>
            :
            <button className='img' onClick={() => setProfileOpen(!profileOpen)}>
              <img src='https://cdn-icons-png.flaticon.com/512/2202/2202112.png' alt='' />
            </button>
            }

            {profileOpen && (
              <div className='openProfile boxItems' onClick={close}>
                <div className='image'>
                  <Link to='/account'>
                    <div className='img'>
                      <img src='https://cdn-icons-png.flaticon.com/512/2202/2202112.png' alt='' />
                    </div>
                  </Link>
                  <div className='text'>
                    <h4>Eden Smith</h4>
                    <label htmlFor=''>Los Angeles,CA</label>
                  </div>
                </div>
                <Link to={`/innovator/dashboard/${id}`}>
                  <button className='box'>
                    <IoSettingsOutline className='icon' />
                    <h4>My Dashboard</h4>
                  </button>
                </Link>
                <button className='box'>
                  <GrHelp className='icon' />
                  <h4>Help</h4>
                </button>
                <button className='box' onClick={logoutHandler}>
                  <BiLogOut className='icon' />
                  <h4>Log Out</h4>
                </button>
              </div>
            )}
          </>
        ) : (
          <button>My Account</button>
        )}
      </div>
    </>
  )
}
