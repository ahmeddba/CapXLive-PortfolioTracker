import React, { useContext, useEffect, useState } from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';
import { Button } from 'antd';
import { AuthContext } from '../../Context/AuthContext';

const Header = () => {
    const [path, setpath] = useState('/')
    const handleActive = (e) => {
        setpath(e.target.pathname)
    }
useEffect(() => {
 setpath(window.location.pathname)
}, [window.location.pathname])

        const {logout} = useContext(AuthContext)
        const navigate = useNavigate()

  return (
    <Navbar   bg="light" data-bs-theme="light">
    <Container>
      <Nav className="mx-auto display-flex justify-content-center " style={{width:'90%' , gap:'50px' , margin:'0 auto' , alignItems:'center'}}>
      <Link to={''} className="homelink" onClick={handleActive}>Portfolio<i>Tracker</i></Link>
        {
          !sessionStorage.getItem('token') ? (<>
            <Link to={'register'} className={`links ${path ==='/register' && 'active'}`} onClick={handleActive}>Sign Up</Link>
            <Link to={'login'} className={`links ${path ==='/login' && 'active'}`} onClick={handleActive}>Sign In</Link>
          </>):
          (<>
            <Link to={'see-stocks'} className={`links ${path ==='/see-stocks' && 'active'}`} onClick={handleActive} >See Stocks</Link>
            <Link to={'manage-stocks'} className={`links ${path ==='/manage-stocks' && 'active'}`} onClick={handleActive}>Add Stocks</Link>
            <Link to={'see-dashboard'} className={`links ${path ==='/see-dashboard' && 'active'}`} onClick={handleActive}>Dashboard</Link>
            <Link to={'/'} className={`logout`}  onClick={(e) => {
              logout();
              handleActive(e);
            }}>Log Out</Link>
          </>)
        }

      </Nav>
    </Container>
  </Navbar>
  )
}

export default React.memo(Header)
