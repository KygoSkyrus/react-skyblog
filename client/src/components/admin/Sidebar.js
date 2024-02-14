import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

import CategoryModal from './CategoryModal'
import ChangePasswordModal from './ChangePasswordModal'
import "../../assets/css/sidebar.css"

const Sidebar = () => {

    useEffect(() => {
        getSidebarWorking()
        handleSelectedOption()
    }, [])

    async function logout() {
        fetch("/admin/logout", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
        })
            .then(response => response.json())
            .then(data => {
                if (data.isLoggedOut === true) {
                    window.location.reload();
                } else {
                    alert(data.message)
                }
            })
    }

    function getSidebarWorking() {
        const btnToggler = document.querySelector(".navbar-togglerr");
        const navbar = document.querySelector(".sidebar");
        const menuItem = document.querySelectorAll(".menu-item");

        btnToggler.addEventListener('click', () => {
            navbar.classList.toggle('active');
            menuItem?.forEach(x => { x.classList.toggle('pl'); x.classList.toggle('w') })
        });
    }

    function handleSelectedOption(e) {
        let currentOption;

        switch (window.location.href) {

            case window.location.origin + "/admin/dashboard": common("dashboard")
                break;

            case window.location.origin + "/admin/blogs-management": common("management")
                break;

            case window.location.origin + "/admin/messages": common("messages")
                break;

            case window.location.origin + "/admin/user-submitted-blogs": common("submitted")
                break;

            default:
                break;
        }

        function common(data) {
            document.querySelector(`[data-link="${data}"]`)?.classList.add('selected')
            currentOption = data
        }

        //removing selected class from other options
        document.getElementById('handleSelected')?.childNodes.forEach(x => {
            if (x.classList.contains('selected')) {
                if (x.dataset.link !== currentOption) {
                    x.classList.remove('selected')
                }
            }
        })
    }




    return (
        <>
            {/* <!--change password Modal --> */}
            <ChangePasswordModal />

            {/* <!--  manage category Modal --> */}
            <CategoryModal />

            <nav className="sidebar shadow">
                <div className="navbar-container">

                    <div className="navbar-logo-div">
                        <a className="navbar-logo-link" href="!#">
                            <i className="fas fa-shield-dog"></i>
                        </a>
                        <span className="navbar-togglerr"><i className='fas fa-solid fa-bars'></i></span>
                    </div>

                    <ul className="menu-list" id='handleSelected' onClick={e => handleSelectedOption(e)}>
                        <li className="menu-item" data-link="dashboard" title='Blogs / category dashboard' >
                            <Link className="menu-link" to="/admin/dashboard">
                                <i className="fas fa-solid fa-table"></i>
                                <span className="menu-link-text">Dashboard</span>
                            </Link>
                        </li>
                        <li className="menu-item" data-link="management" title='Create a blog' >
                            <Link className="menu-link" to="/admin/blogs-management">
                                <i className="fas fa-solid fa-blog"></i>
                                <span className="menu-link-text">Blogs</span>
                            </Link>
                        </li>
                        <li className="menu-item" data-link="messages" title='User messages'>
                            <Link className="menu-link" to="/admin/messages">
                                <i className="fas fa-solid fa-comments"></i>
                                <span className="menu-link-text">Message</span>
                            </Link>
                        </li>
                        <li className="menu-item" data-link="submitted" title='User submitted blogs'>
                            <Link className="menu-link" to="/admin/user-submitted-blogs">
                                <i className="fas fa-inbox"></i>
                                <span className="menu-link-text">Submitted Blogs</span>
                            </Link>
                        </li>
                        <li className="menu-item" data-toggle="modal" data-target="#manageCat" title='Manage category'>
                            <span className="menu-link" href="">
                                <i className="fas fa-th-list"></i>
                                <span className="menu-link-text">Category</span>
                            </span>
                        </li>
                        <li className="menu-item" data-toggle="modal" data-target="#change" title='Change password'>
                            <span className="menu-link" href="">
                                <i className="fas fa-duotone fa-key"></i>
                                <span className="menu-link-text">Change Password</span>
                            </span>
                        </li>
                    </ul>
                </div>

                <div className="user-container">
                    <div className="user-info">
                        <i className="fas fa-solid fa-user-secret"></i>
                        <div className="user-details">
                            <section className="user-name"></section>
                            {/* <span className="user-occupation">Admin</span> */}
                        </div>
                    </div>
                    <span className="logout-btn cursor-pointer" href="" onClick={e => logout(e)}>
                        <i className="fas fa-sharp fa-regular fa-arrow-right-from-bracket"></i>
                    </span>
                </div>
            </nav>
        </>
    )
}

export default Sidebar