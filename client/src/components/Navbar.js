import React, { useEffect, useState } from 'react'

import "./css/navbar.css"

const Navbar = (props) => {

    const { finalArr } = props

    //have to in corporate serach thing in navbar
   

    function handleSearchIcon(e) {
        document.querySelectorAll('.nav')[0]?.classList.toggle('search')
        document.querySelectorAll('.nav')[0]?.classList.toggle("no-search");
        document.querySelectorAll('.search-input')[0]?.classList.toggle("search-active");
    }

    function handleMenu(e) {
        document.querySelectorAll('.nav')[0]?.classList.toggle('mobile-nav')
        document.querySelectorAll('.menu-toggle')[0]?.classList.toggle("is-active");
    }




    return (
        <>

            <div class="page-wrapper">
                <div class="nav-wrapper">
                    <div class="grad-bar"></div>
                    <nav class="navbar">
                        <img src="https://picsum.photos/200/100" alt="Company Logo" />
                        <div class="menu-toggle" id="mobile-menu" onClick={e => handleMenu(e)} >
                            <span class="bar"></span>
                            <span class="bar"></span>
                            <span class="bar"></span>
                        </div>
                        <ul class="nav no-search">
                            <li class="nav-item"><a href="#">Home</a></li>

                            <li class="dropdown list__item navbars__list-item nav-item">
                                <a href="#">Category <i class="fa fa-angle-down" ></i>

                                    <div class="dropdown-content" id="ulCategory">
                                        {finalArr?.map(x => {
                                            return (<span class="sub-menu__item" key={x._id}>
                                                <span target="blank" href="/category/${final[i]}"
                                                    class="t-link sub-menu__link text-uppercase">
                                                    {x}
                                                </span>
                                            </span>)
                                        })}
                                    </div></a>
                            </li>
                            <li class="nav-item"><a href="#">Work</a></li>
                            <li class="nav-item"><a href="/contact">Contact Us</a></li>
                            <i class="fas fa-search" id="search-icon" onClick={e => handleSearchIcon(e)}></i>
                            <input class="search-input" type="text" placeholder="Search.." />
                        </ul>
                    </nav>
                </div>


            </div>






            <div>
                <p>name</p>
                <div class="dropdown-content" id="ulCategory">
                    {finalArr?.map(x => {
                        return (<li class="sub-menu__item">
                            <a target="blank" href="/category/${final[i]}"
                                class="t-link sub-menu__link text-uppercase">
                                {x}
                            </a>
                        </li>)
                    })}
                </div>

            </div>


        </>
    )
}

export default Navbar