import React from 'react';
import { Navbar, Container, Nav } from "react-bootstrap";
import styles from '../styles/NavBar.module.css';
import { NavLink } from 'react-router-dom';
import { 
  useCurrentUser,
  useSetCurrentUser
} from '../contexts/CurrentUserContext';
import axios from 'axios';
import Avatar from './Avatar';
import useClickOutsideToggle from '../hooks/useClickOutsideToggle';

const NavBar = () => {
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();

  const { expanded, setExpanded, ref } = useClickOutsideToggle();

  const handleSignOut = async () => {
    try {
      await axios.post("dj-rest-auth/logout/");
      setCurrentUser(null);
    } catch (err) {
      console.log(err);
    }
  };

  const addTaskIcon = (
    <NavLink
      className={styles.NavLink}
      activeClassName={styles.Active}
      to="/tasks/create"
    >
      <i className="far fa-plus-square"></i>
      Add task
    </NavLink>
  );
  const loggedInIcons = (
    <>
      <NavLink
        className={styles.NavLink}
        activeClassName={styles.Active}
        to="/feed"
      >
        <i className="fas fa-stream"></i>
        Feed
      </NavLink>
      <NavLink
        className={styles.NavLink}
        activeClassName={styles.Active}
        to="/liked"
      >
        <i className="fas fa-heart"></i>
        Liked
      </NavLink>
      <NavLink className={styles.NavLink}
        to="/"
        onClick={handleSignOut}
      >
        <i className="fas fa-sign-out-alt"></i>
        Sign out
      </NavLink>
      <NavLink
        className={styles.NavLink}
        to={`/profiles/${currentUser?.profile_id}`}
      >
        <Avatar src={currentUser?.profile_image} text="Profile" height={40} />
      </NavLink>
    </>
  );
  const loggedOutIcons = (
  <>
    <NavLink
      className={styles.NavLink}
      activeClassName={styles.Active}
      to='/signin'
    >
      <i className='fs-6 fas fa-sign-in-alt'></i>
      Sign in
    </NavLink>
    <NavLink
      className={styles.NavLink}
      activeClassName={styles.Active}
      to='/register'
    >
      <i className='fs-6 fas fa-user-plus'></i>
      Register
    </NavLink>
  </>
  );

  return (
    <Navbar expanded={expanded} className={styles.NavBar} expand="md" fixed="top">
      <Container>
        <NavLink to='/'>
          <Navbar.Brand className={styles.Brand}>
            <i className="fa-solid fa-calendar-check"></i>
            <em><strong>PRODUCTIVITY</strong> TOOL</em>
          </Navbar.Brand>
        </NavLink>
        {currentUser && addTaskIcon}
        <Navbar.Toggle
          ref={ref}
          onClick={() => setExpanded(!expanded)}
          aria-controls="basic-navbar-nav"
        />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto text-start">
            <NavLink
              exact
              className={styles.NavLink}
              activeClassName={styles.Active}
              to='/'
            >
              <i className='fs-6 fas fa-home'></i>
              Home
            </NavLink>

            {currentUser ? loggedInIcons : loggedOutIcons}
            
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}


export default NavBar