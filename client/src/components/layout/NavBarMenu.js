import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import CollectorLogo from '../../assets/logo.svg'
import logoutIcon from '../../assets/logout.svg'
import Button from 'react-bootstrap/Button'
import {Link} from 'react-router-dom'
import { useContext } from 'react'
import {AuthContext} from '../../contexts/AuthContext'

const NavbarMenu = () => {

    const {authState: {user: {username}}, logoutUser} = useContext(AuthContext)

    const logout = () => logoutUser()

    return(
        <Navbar expand='lg' bg='primary' variant='dark' className='shadow'>
            <Navbar.Brand className='font-weight-border text-dark'>
                <img src={CollectorLogo} alt='CollectorLogo' width='32' height='32' className='mr-2' />
                <b>Collector</b>
            </Navbar.Brand>

            <Navbar.Toggle aris-controls='responsive-navbar-nav'/>

            <Navbar.Collapse id='basic-navbar-nav'>
                <Nav className='mr-auto'>
                    <Nav.Link className='font-weight-border text-white' to ='/dashboard' as={Link}>
                        Dashboard
                    </Nav.Link>
                    <Nav.Link className='font-weight-border text-white' to ='/about' as={Link}>
                        About
                    </Nav.Link>
                </Nav>

                <Nav>          
                    <Nav.Link className='font-weight-border text-dark mr-4 mt-10' disabled>
                        <b>What's up {username} !</b>
                    </Nav.Link>

                    <Button variant='secondary' className='font-weight-border text-white' onClick={logout} >
                        <img src={logoutIcon} alt='logoutIcon' width='25' height='30' className='mr-2'/>
                        Logout
                    </Button>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default NavbarMenu