import React, { useEffect, useState } from 'react'

const Navbar = (props) => {

    const {arrAllCatForNva}=props

//have to in corporate serach thing in navbar
    console.log('arrAllCatForNva',arrAllCatForNva)


   

         let catinnav = ["tech", "lifestyle", "business", "travel"]; //categories that are in navbar
  
          let finalArr = arrAllCatForNva.filter(function (item) {
              return !catinnav.includes(item);
          });
    
   
    return (
        <div>
            <p>name</p>
            <div class="dropdown-content" id="ulCategory">
            {finalArr?.map(x=>{
                return(<li class="sub-menu__item">
                <a target="blank" href="/category/${final[i]}"
                    class="t-link sub-menu__link text-uppercase">
                    {x}
                </a>
            </li>)
            })}
            </div>
            
        </div>
    )
}

export default Navbar