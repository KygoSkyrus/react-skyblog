import React, { useState } from 'react'

const Navbar = (props) => {

    const {allBlog}=props
const [catListForNav,setCatListForNav]=useState([])

      //for setting category
			let options = "";
			let ulCategory = "";
			let footerCat = "";
        let catinnav = ["tech", "lifestyle", "business", "travel"]; //categories that are in navbar

        let arrAllCat = [];
        for (var i = 0; i < allBlog.length; i++) {
            arrAllCat.push(allBlog[i].category);
        }

        let final = arrAllCat.filter(function (item) {
            return !catinnav.includes(item);
        });
        setCatListForNav(final)
    
    return (
        <div>
            <p>name</p>
            <div class="dropdown-content" id="ulCategory">
            {catListForNav?.map(x=>{
                return(<li class="sub-menu__item">
                <a target="blank" href="/category/${final[i]}"
                    class="t-link sub-menu__link text-uppercase">
                    ${x[i]}
                </a>
            </li>)
            })}
            </div>
            
        </div>
    )
}

export default Navbar