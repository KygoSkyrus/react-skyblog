import React, { useEffect } from 'react'
import "../../assets/css/sidebar.css"
const Sidebar = () => {


    useEffect(() => {
        getSidebarWorking()
    }, [])


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
    function handleSelectedOption(e){
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

                    <ul class="menu-list" onClick={e=>handleSelectedOption(e)}>
                        <li class="menu-item">
                            <a class="menu-link" href="">
                                <i class="fas fa-solid fa-table"></i>
                                <span class="menu-link-text">Dashboard</span>
                            </a>
                        </li>
                        <li class="menu-item">
                            <a class="menu-link" href="">
                                <i class="fas fa-solid fa-paw"></i>
                                <span class="menu-link-text">Pets</span>
                            </a>
                        </li>
                        <li class="menu-item">
                            <a class="menu-link" href="">
                                <i class="fas fa-solid fa-user"></i>
                                <span class="menu-link-text">Customers</span>
                            </a>
                        </li>
                        <li class="menu-item">
                            <a class="menu-link" href="">
                                <i class="fas fa-regular fa-stethoscope"></i>
                                <span class="menu-link-text">Vets</span>
                            </a>
                        </li>
                        <li class="menu-item">
                            <a class="menu-link" href="">
                                <i class="fas fa-duotone fa-gear"></i>
                                <span class="menu-link-text">Settings</span>
                            </a>
                        </li>
                    </ul>
                </div>

                <div class="user-container">
                    <div class="user-info">
                        <i class="fas fa-solid fa-user-secret"></i>
                        <div class="user-details">
                            <h3 class="user-name">DG</h3>
                            <p class="user-occupation">Admin</p>
                        </div>
                    </div>
                    <a class="logout-btn" href="">
                        <i class="fas fa-sharp fa-regular fa-arrow-right-from-bracket"></i>
                    </a>
                </div>
            </nav>

           

        </>
    )
}

export default Sidebar