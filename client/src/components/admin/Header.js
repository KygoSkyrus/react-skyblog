import React, { useEffect } from 'react'
import { showTime } from './../../utils';

const Header = ({ isGuest }) => {

    console.log('isgiesy', isGuest)

    useEffect(() => {
        showTime()
    }, [])

    return (
        <main className="dashboard justify-content-between align-items-center shadow-sm">
            <div className='position-relative'>
                <h1 className="title theLogo">Admin panel</h1>
                <span className='mx-2'><small>by</small> skyblog</span>
            </div>
            <div className='d-flex' style={{ gap: "10px" }}>

                {isGuest &&
                    <section className='clock text-center' style={{ fontFamily: "unset", color: "#14213d", fontWeight: "bold" }}>Guest Mode</section>}
                <div id="MyClockDisplay" className="clock" ></div>
                {/* <section className='theLogo'>SKYBLOG</section> */}
            </div>
        </main>
    )
}

export default Header