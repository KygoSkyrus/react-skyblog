import React from 'react'
import Header from './Header'
import Sidebar from './Sidebar'

const AdminTemplate = (props) => {
    return (
        <div id='adminView'>
            <Sidebar isGuest={props?.isGuest} />
            <div className='dynamicAdminContent'>
                <Header isGuest={props?.isGuest} />
                {props?.children}
            </div>
        </div>
    )
}

export default AdminTemplate