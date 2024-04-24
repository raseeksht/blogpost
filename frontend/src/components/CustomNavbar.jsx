import React from 'react'
import { Avatar, Dropdown, Navbar } from "flowbite-react";


const CustomNavbar = () => {
    return (
        <Navbar fluid rounded>
            <Navbar.Brand href="https://flowbite-react.com">
                <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Awesome Blogger</span>
            </Navbar.Brand>
            <div className="flex md:order-2">
                <Avatar alt="User settings" img="https://flowbite.com/docs/images/people/profile-picture-5.jpg" rounded />

                <Navbar.Toggle />
            </div>
            <Navbar.Collapse>
                <Navbar.Link href="#" active>
                    Home
                </Navbar.Link>
                <Navbar.Link href="#">About</Navbar.Link>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default CustomNavbar