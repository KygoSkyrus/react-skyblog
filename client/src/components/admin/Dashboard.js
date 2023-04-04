import React from 'react'
import CategoryModal from './CategoryModal'
import ChangePasswordModal from './ChangePasswordModal'

const Dashboard = (props) => {

    const {allCategory,catAndCount}=props

    return (
        <>

    
            <div className="content-wrapper ">
                <div className="main-content">
                    <nav className="navbar-custom-menu navbar navbar-expand-lg m-0">
           
                        {/* <!--/.sidebar toggle icon--> */}
                        <div className="d-flex flex-grow-1">
                            <ul className="navbar-nav flex-row align-items-center ml-auto">
                                <li className="nav-item dropdown user-menu">
                                    <a className="nav-link dropdown-toggle" href="" data-bs-toggle="dropdown" aria-expanded="false">
                                        {/* <!--<img src="/assets/dist/img/user2-160x160.png" alt="">--> */}
                                        <i className="typcn typcn-user-add-outline"></i>
                                    </a>
                                    <div className="dropdown-menu dropdown-menu-right">
                                        <div className="dropdown-header d-sm-none">
                                            <a href="#" className="header-arrow"><i className="icon ion-md-arrow-back"></i></a>
                                        </div>
                                        <div className="user-header">
                                            <div className="img-user">
                                                <img src="/assets/dist/img/avatar5.png" alt="" />
                                            </div>
                                            {/* <!-- img-user --> */}
                                            <h6>Admin</h6>
                                            <section className="adminName" style={{ color: "#28a745 !important" }}></section>
                                            
                                        </div>
                                        {/* <!-- user-header --> */}
                                        <span className="dropdown-item" data-bs-toggle="modal" data-bs-target="#change"
                                            style={{ cursor: "pointer" }}><i className="typcn typcn-edit"></i> Change Password</span>
                                        <span onClick="logout()" className="dropdown-item" style={{ cursor: "pointer" }}><i
                                            className="typcn typcn-key-outline"></i> Sign Out</span>
                                    </div>
                                    {/* <!--/.dropdown-menu --> */}
                                </li>
                            </ul>
                            {/* <!--/.navbar nav--> */}
                            <div className="nav-clock">
                                <div className="time">
                                    <span className="time-hours"></span>
                                    <span className="time-min"></span>
                                    <span className="time-sec"></span>
                                </div>
                            </div>
                            {/* <!-- nav-clock --> */}
                        </div>
                    </nav>

                </div>
            </div>


            <div className="body-content">
                    <div className="card-header mb-3">
                        <div className="d-flex justify-content-between align-items-center">
                            <div>
                                <h6 className="fs-17 font-weight-600 mb-0">CATEGORIES</h6>
                            </div>
                            <div className="text-right">
                                <div className="actions">
                                    <a href="" className="action-item"><i className="ti-reload"></i></a>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row" id="boxesHolder">
                        {
                            allCategory?.map(x=>{
                                return(
                                    <div class="col-md-6 col-lg-3" key={x._id}>
                            <div class="d-flex flex-column p-3 mb-3 bg-white shadow-sm rounded">
                                <div class="header-pretitle text-muted fs-11 font-weight-bold text-uppercase mb-2">{x.category}</div>
                                <div class="d-flex align-items-center text-size-3">
                                    <div class="text-monospace">
                                        <span class="text-size-2 fw-bolder me-2">{catAndCount[x.category] ? catAndCount[x.category] : 0}</span>
                                    </div>
                                    <span class=" text-danger ml-2">Blogs</span>
                                </div>
                            </div>
                        </div>
                                )
                            })
                        }
                    </div>
                </div>


            {/* <main className="dashboard">
        <h1 className="title">Dashboard</h1>
    </main> */}
        </>
    )
}

export default Dashboard