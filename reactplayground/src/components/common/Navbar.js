import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { decodeJwt } from '../../utils/tokenUtils';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, Dropdown } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';

function Navbars() {

    // board dropdown
    const [showDropdown, setShowDropdown] = useState(false);

    const handleMouseEnter = () => {
        setShowDropdown(true);
    };

    const handleMouseLeave = () => {
        setShowDropdown(false);
    };
    
    const activeStyle = {
        backgroundColor: '#B4BCA3',
        color: '#B4BCA3',
		borderRadius: '10px',
		lineHeight: '40px'
    }    


    const isLogin = window.localStorage.getItem('accessToken');
    let decoded = null;

    if(isLogin !== undefined && isLogin !== null) {
        const temp = decodeJwt(window.localStorage.getItem("accessToken"));
        console.log(temp);
        decoded = temp.auth[0];
    }

    console.log('decoded ', decoded);
    return (
        <Navbar expand="lg" className="bg-body-tertiary navbar">
            <Container>
                <Navbar.Toggle aria-controls="basic-navbar-nav" style={{marginLeft: 'auto'}} />
                <Navbar.Collapse id="basic-navbar-nav" >
                        <ul className='justify-content-center'>
                            <Nav className="me-auto navbar-me-auto">
                                <li><NavLink to='/' style={({isActive}) => isActive? activeStyle : undefined}>Main</NavLink></li>
                                <li><NavLink to='/boardgame' style={({isActive}) => isActive? activeStyle : undefined}>BoardGames</NavLink></li>
                                <li><NavLink to='/Menu' style={({isActive}) => isActive? activeStyle : undefined}>Menu</NavLink></li>
                                <li><NavLink to='/shop' style={({isActive}) => isActive? activeStyle : undefined}>Shops</NavLink></li>
                                <li><Dropdown 
                                        as={Nav.Item}
                                        onMouseEnter={handleMouseEnter}
                                        onMouseLeave={handleMouseLeave}
                                        show={showDropdown}
                                    >
                                    <Dropdown.Toggle as={Nav.Link} id="dropdown-custom-components">
                                        Board
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        <Dropdown.Item as={NavLink} to='/board/notice' activeClassName="active" style={({ isActive }) => isActive ? activeStyle : undefined}>
                                            공지게시판
                                        </Dropdown.Item>
                                        <Dropdown.Item as={NavLink} to='/board/review' activeClassName="active" style={({ isActive }) => isActive ? activeStyle : undefined}>
                                            고객리뷰게시판
                                        </Dropdown.Item>
                                    </Dropdown.Menu>
                                    </Dropdown>
                                </li>
                                { decoded ==="ROLE_ADMIN" && <li><NavLink to="/product-management" style={({isActive}) => isActive? activeStyle : undefined}>Product</NavLink></li>}
                            </Nav>
                        </ul>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Navbars;