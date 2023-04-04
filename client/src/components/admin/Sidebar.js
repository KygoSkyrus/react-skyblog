import React, { useEffect, useState } from 'react'


import CategoryModal from './CategoryModal'
import ChangePasswordModal from './ChangePasswordModal'


import "../../assets/css/sidebar.css"


const Sidebar = (props) => {

    const { allCategory } = props
    const [adminName,setAdminName]=useState()

    useEffect(() => {
        getSidebarWorking()
        getAdminName()
    }, [])


    //this will set the admin name in sidebar
    async function getAdminName() {

        const res = await fetch("/getAdminName", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({}),
        });

        const data = await res.json();
        setAdminName(data.admin)
        console.log('get admin name', data,data.admin)

    }




    async function logout() {
        console.log("logout function ran");
        const res = await fetch("/logout", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({}),
        });

        const data = await res.json();
        console.log(data);
        if (data.message == "loggedOut") {
            window.location.reload();
        }
    }



    function getSidebarWorking() {
        //elements 
        const btnToggler = document.querySelector(".navbar-togglerr");
        const inputSearch = document.querySelector(".navbar-search");
        const iconSearch = document.querySelector("#icon-search");
        const navbar = document.querySelector(".sidebar");

        //events
        btnToggler.addEventListener('click', () => {
            navbar.classList.toggle('active');
        });

        inputSearch.addEventListener('click', () => {
            if (!navbar.classList.contains("active")) {
                navbar.classList.add('active');
            }
        });

        iconSearch.addEventListener('click', () => {
            if (!navbar.classList.contains("active")) {
                navbar.classList.add('active');
            }
        });
    }




    //have to fix this when an optin is slected from sidebar,,highlight that
    function handleSelectedOption(e) {
        console.log(e.target)

    }




    return (
        <>



            <nav class="sidebar">
                <div class="navbar-container">

                    <div class="navbar-logo-div">
                        <a class="navbar-logo-link" href="">
                            <i class="fas fa-shield-dog"></i>
                        </a>
                        <button class="navbar-togglerr"><i class='fas fa-solid fa-bars'></i></button>
                    </div>


                    <input type="search" name="search" placeholder="Search..."
                        class="navbar-search" id="search" />

                    <i id='icon-search' class="fas fa-regular fa-magnifying-glass"></i>

                    <ul class="menu-list" onClick={e => handleSelectedOption(e)}>
                        <li class="menu-item">
                            <a class="menu-link" href="">
                                <i class="fas fa-solid fa-table"></i>
                                <span class="menu-link-text">Dashboard</span>
                            </a>
                        </li>
                        <li class="menu-item">
                            <a class="menu-link" href="">
                                <i class="fas fa-solid fa-user"></i>
                                <span class="menu-link-text">Blogs</span>
                            </a>
                        </li>
                        <li class="menu-item">
                            <a class="menu-link" href="">
                                <i class="fas fa-solid fa-paw"></i>
                                <span class="menu-link-text">Message</span>
                            </a>
                        </li>
                        <li class="menu-item">
                            <a class="menu-link" href="">
                                <i class="fas fa-solid fa-user"></i>
                                <span class="menu-link-text">Submitted Blogs</span>
                            </a>
                        </li>
                        <li class="menu-item" data-bs-toggle="modal" data-bs-target="#manageCat">
                            <span class="menu-link" href="">
                                <i class="fas fa-regular fa-stethoscope"></i>
                                <span class="menu-link-text">Category</span>
                            </span>
                        </li>
                        <li class="menu-item" data-bs-toggle="modal" data-bs-target="#change">
                            <span class="menu-link" href="">
                                <i class="fas fa-duotone fa-gear"></i>
                                <span class="menu-link-text">Change Password</span>
                            </span>
                        </li>
                    </ul>
                </div>

                <div class="user-container">
                    <div class="user-info">
                        <i class="fas fa-solid fa-user-secret"></i>
                        <div class="user-details">      
                            <h3 class="user-name">{adminName}</h3>
                            <p class="user-occupation">Admin</p>
                        </div>
                    </div>
                    <span class="logout-btn" href="" onClick={e => logout(e)}>
                        <i class="fas fa-sharp fa-regular fa-arrow-right-from-bracket"></i>
                    </span>
                </div>
            </nav>

            {/*            
            <main className="dashboard">
        <h1 className="title">Dashboard</h1>
    </main> */}


            {/* <!--change password Modal --> */}
            <ChangePasswordModal />

            {/* <!--  manage category Modal --> */}
            <CategoryModal allCategory={allCategory} />



        </>
    )
}

export default Sidebar