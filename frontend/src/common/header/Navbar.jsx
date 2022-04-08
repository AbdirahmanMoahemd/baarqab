import React, { useState , useEffect, useCallback} from "react"
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import { GiHamburgerMenu } from "react-icons/gi";
import { VscChromeClose } from "react-icons/vsc";
import styled from 'styled-components';
import logo from "../../components/assets/images/logo.svg"

var isScorlling = false

const Navbar = () => {
  // Toogle Menu
  const [navbarState, setNavbarState] = useState(false);
  const [y, setY] = useState(window.scrollY);

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

const handleNavigation = useCallback(
  e => {
    const window = e.currentTarget;
    if (y > window.scrollY) {
      if (y == 601) {
        isScorlling = true
        setNavbarState(true)
      }
      else {
        isScorlling=false
      }
      console.log(y);
    } else if (y + 14 < window.scrollY) {
      isScorlling=true
      console.log("scrolling down");
    }
    setY(window.scrollY);
  }, [y]
);

useEffect(() => {
  setY(window.scrollY);
  window.addEventListener("scroll", handleNavigation);
console.log(isScorlling)
  return () => {
    window.removeEventListener("scroll", handleNavigation);
  };
}, [handleNavigation,]);
  return (
    <>
    <div className='container'>
     <Nav>
        <div className="brand">
          <div className="toggle">
            {navbarState ? (
              <VscChromeClose onClick={() => setNavbarState(false)} />
            ) : (
              <GiHamburgerMenu onClick={() => setNavbarState(true)} />
            )}
          </div>
        </div>

        <ul>
          <li>
            <Link to='/' ><a >Home</a></Link>
          </li>
          <li>
            <Link to='/products'><a >Products</a></Link>
          </li>

          <li>
            <Link to='/about'><a >About Us</a></Link>
          </li>
          {userInfo && userInfo.isAdmin && (
                            <li>
                                <Link to="/admin">Dashboard</Link>
                            </li>
          )}
          
        </ul>
         
        
       
        </Nav>
        
        {window.scrollY <= 120  ? <ResponsiveNav state={navbarState} scroll={isScorlling} >
          <ul>
            <li>
              <a href="/" onClick={() => setNavbarState(false)}>
                Home
              </a>
            </li>

            <li>
              <a href="#recommend" onClick={() => setNavbarState(false)}>
                Places
              </a>
            </li>
            <li>
              <a href="#testimonials" onClick={() => setNavbarState(false)}>
                Testimonials
              </a>
            </li>
            <li>
              <a href="#services" onClick={() => setNavbarState(false)}>
                About
              </a>
            </li>
          <li>
        <div class="search_box-dd-2">
                <input type="search" placeholder="Search here ..."
                    />
                <span class="fa fa-search" ></span>
    </div>
        </li>
          </ul>
          
        </ResponsiveNav> 
        : ''}
      </div>
    </>
  )
}

export default Navbar

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  .brand {
    .container {
      cursor: pointer;
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 0.4rem;
      font-size: 1.2rem;
      font-weight: 900;
      text-transform: uppercase;
    }
    .toggle {
      display: none;
    }
  }
  ul {
    display: flex;
    gap: 1rem;
    list-style-type: none;
    li {
      a {
        text-decoration: none;
        color: #ff7800;
        font-size: 1.2rem;
        transition: 0.1s ease-in-out;
        &:hover {
          color: #023e8a;
        }
      }
      &:first-of-type {
        a {
          color: #ff7800;
        }
      }
    }
  }
 
  }
  @media screen and (min-width: 280px) and (max-width: 1080px) {
    .brand {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      .toggle {
        display: block;
      }
    }
    ul {
      display: none;
    }
    
  }
`;

const ResponsiveNav = styled.div`
  display: flex;
  position: absolute;
  z-index: 100;
  top:  ${({ scroll }) => (scroll ? (({ state }) => (state ? "100px" : "-360px")) : (({ state }) => (state ? "150px" : "-360px")))};
  background-color: white;
  height: 38vh;
  width: 100%;
  left:0px;
  align-items: center;
  transition: 0.3s ease-in-out;
  ul {
    margin: -80px 0 0 0;
    list-style-type: none;
    width: 100%;
    li {
      width: 100%;
      margin: 1rem 0;
      margin-left: 2rem;

      a {
        text-decoration: none;
        color: #ff7800;
        font-size: 1.2rem;
        transition: 0.1s ease-in-out;
        &:hover {
          color: #023e8a;
        }
      }
      &:first-of-type {
        a {
          color: #ff7800;
        }
      }
    }
  }
`;
