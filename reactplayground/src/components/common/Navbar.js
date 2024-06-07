
import { NavLink } from 'react-router-dom';
import { decodeJwt } from '../../utils/tokenUtils';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';

function Navbars() {



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
                                <li><NavLink to='/boardgame' style={({isActive}) => isActive? activeStyle : undefined}>BoardGames</NavLink></li>
                                <li><NavLink to='/Menu' style={({isActive}) => isActive? activeStyle : undefined}>Menu</NavLink></li>
                                <li><NavLink to='/shop' style={({isActive}) => isActive? activeStyle : undefined}>Shops</NavLink></li>
                                <li><NavLink to='/board/notice' style={({isActive}) => isActive? activeStyle : undefined}>Board</NavLink></li>

                            </Nav>
                        </ul>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Navbars;