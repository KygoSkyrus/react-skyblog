import React from 'react'
import { Link } from 'react-router-dom'

import "../../assets/css/navbar.css"

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
                    <nav class="navbar px-5">
                        <section className='theLogo'>SOMETHING</section>
                        <div class="menu-toggle" id="mobile-menu" onClick={e => handleMenu(e)} >
                            <span class="bar"></span>
                            <span class="bar"></span>
                            <span class="bar"></span>
                        </div>
                        <ul class="nav list w-100 t-pl-30 t-pr-30 navbars__list pl-lg-0">

                            <li class="dropdown list__item navbars__list-item nav-item">
                                <span>Category <i class="fa fa-angle-down" ></i>

                                    <div class="dropdown-content" id="ulCategory">
                                        {finalArr?.map(x => {
                                            return (<span class="sub-menu__item" key={x._id}>
                                                <Link target="blank" to={"/category/"+x}
                                                    class="t-link sub-menu__link text-uppercase">
                                                    {x}
                                                </Link>
                                            </span>)
                                        })}
                                    </div>
                                </span>
                            </li>

                            <li class="nav-item"><Link to="/category/tech">TECH</Link></li>
                            <li class="nav-item"><Link to="/category/travel">TRAVEL</Link></li>
                            <li class="nav-item"><Link to="/category/lifestyle">LIFESTYLE</Link></li>
                            <li class="nav-item"><Link to="/category/business">BUSINESS</Link></li>
                                                  
                            <li class="nav-item"><Link to="/contact">CONTACT</Link></li>

                            <li class="nav-item"><Link to="/post-your-blog">POST A BLOG</Link></li>
                            

                            {/* <i class="fas fa-search" id="search-icon" onClick={e => handleSearchIcon(e)}></i>
                            <input class="search-input" type="text" placeholder="Search.." /> */}

<div class="searchContainer">
  <form action="" class="search">
    <input class="search__input" type="search" placeholder="Search" id="searchInput"/>

    <div class="search__icon-container">
      <label for="searchInput" class="search__label" aria-label="Search">
        <svg viewBox="0 0 1000 1000" title="Search"><path fill="currentColor" d="M408 745a337 337 0 1 0 0-674 337 337 0 0 0 0 674zm239-19a396 396 0 0 1-239 80 398 398 0 1 1 319-159l247 248a56 56 0 0 1 0 79 56 56 0 0 1-79 0L647 726z"/></svg>
      </label>

      <button class="search__submit" aria-label="Search">
        <svg viewBox="0 0 1000 1000" title="Search"><path fill="currentColor" d="M408 745a337 337 0 1 0 0-674 337 337 0 0 0 0 674zm239-19a396 396 0 0 1-239 80 398 398 0 1 1 319-159l247 248a56 56 0 0 1 0 79 56 56 0 0 1-79 0L647 726z"/></svg>
      </button>
    </div>
  </form>
</div>


                        </ul>
                    </nav>
                </div>
            </div>

        </>
    )
}

export default Navbar