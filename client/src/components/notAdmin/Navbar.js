import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import "../../assets/css/navbar.css"

const Navbar = (props) => {

    const { allBlog, finalArr } = props
    const [searchedOptions, setSearchedOptions] = useState()

    function handleMenu(e) {
        document.querySelectorAll('.nav')[0]?.classList.toggle('mobile-nav')
        document.querySelectorAll('.menu-toggle')[0]?.classList.toggle("is-active");
    }

    function hideMobileNav(e) {
        if (document.querySelectorAll('.nav')[0]?.classList.contains('mobile-nav')) {
            document.getElementById('mobile-menu').click()
        }
    }

    function getSearchedBlog(e) {
        document.getElementById('searchdropdown').classList.remove('hide')//removes display none
        setSearchedOptions(allBlog.filter(x => x.title.toLowerCase().includes(e.target.value.toLowerCase())))//responsible for filter search data
    }

    function hideSearched(e) {
        e.target.value = ""; //clearing the input on focus out
        document.getElementById('searchdropdown').classList.toggle('hide')//hiding the dropdown
    }

    return (
        <>
            <div className="page-wrapper">
                <div className="nav-wrapper">
                    <div className="grad-bar"></div>
                    <nav className="navbar px-5">
                        <Link to="/" ><section className='theLogo'>SKYBLOG</section></Link>
                        <div className="menu-toggle" id="mobile-menu" onClick={e => handleMenu(e)} >
                            <span className="bar"></span>
                            <span className="bar"></span>
                            <span className="bar"></span>
                        </div>
                        <ul className="nav list w-100 t-pl-30 t-pr-30 navbars__list pl-lg-0" >

                            <li className="dropdown list__item navbars__list-item nav-item">
                                <span>CATEGORY <i className="fa fa-angle-down" ></i>

                                    <div className="dropdown-content" id="ulCategory">
                                        {finalArr?.map((x, index) => {
                                            return (
                                                <span className="sub-menu__item" onClick={e => hideMobileNav(e)} key={index}>
                                                    <Link to={"category/" + x} state={{ category: x }}
                                                        className="t-link sub-menu__link text-uppercase">
                                                        {x}
                                                    </Link>
                                                </span>
                                            )
                                        })}
                                    </div>
                                </span>
                            </li>

                            <li className="nav-item" onClick={e => hideMobileNav(e)}><Link state={{ category: "tech" }} to="/category/tech">TECH</Link></li>
                            <li className="nav-item" onClick={e => hideMobileNav(e)}><Link state={{ category: "travel" }} to="/category/travel">TRAVEL</Link></li>
                            <li className="nav-item" onClick={e => hideMobileNav(e)}><Link state={{ category: "lifestyle" }} to="/category/lifestyle">LIFESTYLE</Link></li>
                            <li className="nav-item" onClick={e => hideMobileNav(e)}><Link state={{ category: "business" }} to="/category/business">BUSINESS</Link></li>
                            <li className="nav-item" onClick={e => hideMobileNav(e)}><Link to="/contact">CONTACT</Link></li>
                            <li className="nav-item" onClick={e => hideMobileNav(e)}><Link to="/post-your-blog">POST A BLOG</Link></li>

                            <div className="searchContainer">
                                <form action="" className="search">
                                    <input className="search__input" type="search" placeholder="Search" id="searchInput" onChange={e => getSearchedBlog(e)} onBlur={e => hideSearched(e)} />

                                    <div className="search__icon-container">
                                        <label htmlFor="searchInput" className="search__label" aria-label="Search">
                                            <svg viewBox="0 0 1000 1000" title="Search"><path fill="currentColor" d="M408 745a337 337 0 1 0 0-674 337 337 0 0 0 0 674zm239-19a396 396 0 0 1-239 80 398 398 0 1 1 319-159l247 248a56 56 0 0 1 0 79 56 56 0 0 1-79 0L647 726z" /></svg>
                                        </label>

                                        <button className="search__submit" aria-label="Search">
                                            {/* <svg viewBox="0 0 1000 1000" title="Search"><path fill="currentColor" d="M408 745a337 337 0 1 0 0-674 337 337 0 0 0 0 674zm239-19a396 396 0 0 1-239 80 398 398 0 1 1 319-159l247 248a56 56 0 0 1 0 79 56 56 0 0 1-79 0L647 726z"/></svg> */}
                                        </button>
                                    </div>
                                </form>

                                <div className="search-dropdown shadow" id='searchdropdown'>
                                    {searchedOptions?.map(x => {
                                        return (
                                            <Link className="dropdown-item" to={"/" + x.url} key={x._id}>{x.title}</Link>
                                        )
                                    })}
                                </div>

                            </div>
                        </ul>
                    </nav>
                </div>
            </div>
        </>
    )
}

export default Navbar