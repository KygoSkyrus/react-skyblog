import React, { useEffect } from 'react'
import { showTime } from './../../utils';

const Header = ({ isGuest }) => {

    console.log('isgiesy', isGuest)

    useEffect(() => {
        showTime()
    }, [])

    return (
        <main className="dashboard justify-content-between align-items-center">
            <h1 className="title">Dashboard</h1>
            <div className='d-flex' style={{ gap: "10px" }}>

                {isGuest &&
                    <section className='clock text-center' style={{ fontFamily: "unset", color: "#2a2a2a", fontWeight: "bold" }}>Guest Mode</section>}
                <div id="MyClockDisplay" className="clock" ></div>
            </div>
        </main>
    )
}

export default Header