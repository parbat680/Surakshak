import React from 'react'
import { Navbar, Dropdown, Button } from 'flowbite-react'
import { Link } from 'react-router-dom'
import Logo from '../assets/surakshak-logo-white.png';

const Header = () => {
    return (
        <div className='px-24'>
            <br></br> <br></br> <br></br>
            <Navbar
                fluid={true}
                rounded={true}
            >
                <Navbar.Brand href="/">
                    {/* <img
                        src={Logo}
                        className="mb-8"
                        alt="Agewell Logo"
                        width={120} height={80}
                    /> */}
                </Navbar.Brand>

                <div className='ml-auto'>
                    {/* <Navbar.Collapse>
                        <Navbar.Link
                            href="/"
                            class='text-lg text-cyan-400'
                        // active={true}
                        >
                            Home
                        </Navbar.Link>
                        <Navbar.Link href="#events" class='text-lg text-cyan-400'>
                            Events
                        </Navbar.Link>
                        <Navbar.Link href="#service" class='text-lg text-cyan-400'>
                            Services
                        </Navbar.Link>
                        <Navbar.Link href="/yoga" class='text-lg text-cyan-400'>
                            Yogas
                        </Navbar.Link>
                        <Navbar.Link href="/" class='text-lg text-cyan-400'>
                            Dashboard
                        </Navbar.Link>
                    </Navbar.Collapse> */}
                </div>
                <div className="flex ml-auto text-xl pr-3">
                    <Button className='bg-teal-400'>
                        <Link to='/login'>Login</Link>
                    </Button>
                    <Navbar.Toggle />
                </div>
                <div className="flex text-xl">
                    <Dropdown label="Sign Up" color="teal">
                        <Dropdown.Item>
                            <Link to='/usersignup'>As User</Link>
                        </Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item>
                            <Link to='/ngosignup'>As NGO</Link>
                        </Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item>
                            <Link to='/hospitalsignup'>As Hospital</Link>
                        </Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item>
                            <Link to='/volunteersignup'>As Volunteer</Link>
                        </Dropdown.Item>
                        <Dropdown.Item>
                            <Link to='/doctorsignup'>As Doctor</Link>
                        </Dropdown.Item>
                    </Dropdown>
                    <Navbar.Toggle />
                </div>
            </Navbar>
        </div>
    )
}

export default Header