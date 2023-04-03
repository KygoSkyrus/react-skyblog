import React from 'react'

const Dashboard = () => {
    return (
        <>

            {/* <!--change password Modal --> */}
            <div class="modal fade" id="change" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered mt-0">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Change Password</h5>
                            <button type="button" id="close" class="btn-close" data-bs-dismiss="modal" aria-label="Close" style={{
                                backgroundColor: "inherit",
                                border: "none",
                                outline: "none",
                                cursor: "pointer"
                            }}>
                                <i class="fa fa-window-close fa-2x"></i>
                            </button>
                        </div>
                        <div class="modal-body">
                            <div class="d-flex align-items-center justify-content-center text-center">
                                <div class="form-wrapper m-auto" style={{ width: "100%" }}>
                                    <div class="form-container my-4" style={{ maxWidth: "unset" }}>
                                        <div class="panel" style={{ border: "none", boxShadow: "none" }}>
                                            <form class="register-form">
                                                <div class="form-group">
                                                    <input type="text" class="form-control" id="uname" placeholder="username" />
                                                </div>
                                                <div class="form-group">
                                                    <input type="password" class="form-control" id="password"
                                                        placeholder="Old Password" />
                                                </div>
                                                <div class="form-group">
                                                    <input type="password" class="form-control" id="newPassword"
                                                        placeholder="New Password" />
                                                </div>
                                                <section class="btn btn-success btn-block" onclick="cpswrd()">
                                                    Change password
                                                </section>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            {/* <!--  manage category Modal --> */}
            <div class="modal fade" id="manageCat" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered mt-0">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Categories</h5>
                            <button type="button" id="close" class="btn-close" data-bs-dismiss="modal" aria-label="Close" style={{
                                backgroundColor: "inherit",
                                border: "none",
                                outline: "none",
                                cursor: "pointer"
                            }}>
                                <i class="fa fa-window-close fa-2x"></i>
                            </button>
                        </div>
                        <div class="modal-body">
                            <div class="d-flex align-items-center justify-content-center text-center">
                                <div class="form-wrapper m-auto" style={{ width: "100%" }}>
                                    <div class="form-container my-4" style={{ maxWidth: "unset" }}>
                                        <div class="panel" style={{ border: "none", boxShadow: "none" }}>
                                            <form class="register-form">
                                                <div class="form-group">
                                                    <input type="text" class="form-control" id="cat"
                                                        placeholder="add category" />
                                                </div>
                                                <section class="btn btn-success btn-block" onclick="addCat()">
                                                    Add category
                                                </section>
                                            </form>
                                        </div>
                                    </div>

                                    <div id="catInModal" class="mb-4 d-flex flex-wrap">
                                        <p>wswfefe</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>



            <div class="content-wrapper">
                <div class="main-content">
                    <nav class="navbar-custom-menu navbar navbar-expand-lg m-0">
                        <div class="sidebar-toggle-icon" id="sidebarCollapse">
                            sidebar toggle<span></span>
                        </div>
                        {/* <!--/.sidebar toggle icon--> */}
                        <div class="d-flex flex-grow-1">
                            <ul class="navbar-nav flex-row align-items-center ml-auto">
                                <li class="nav-item dropdown user-menu">
                                    <a class="nav-link dropdown-toggle" href="" data-toggle="dropdown">
                                        {/* <!--<img src="/assets/dist/img/user2-160x160.png" alt="">--> */}
                                        <i class="typcn typcn-user-add-outline"></i>
                                    </a>
                                    <div class="dropdown-menu dropdown-menu-right">
                                        <div class="dropdown-header d-sm-none">
                                            <a href="#" class="header-arrow"><i class="icon ion-md-arrow-back"></i></a>
                                        </div>
                                        <div class="user-header">
                                            <div class="img-user">
                                                <img src="/assets/dist/img/avatar5.png" alt="" />
                                            </div>
                                            {/* <!-- img-user --> */}
                                            <h6>Admin</h6>
                                            <section class="adminName" style={{ color: "#28a745 !important" }}></section>
                                            
                                        </div>
                                        {/* <!-- user-header --> */}
                                        <span class="dropdown-item" data-bs-toggle="modal" data-bs-target="#change"
                                            style={{ cursor: "pointer" }}><i class="typcn typcn-edit"></i> Change Password</span>
                                        <span onclick="logout()" class="dropdown-item" style={{ cursor: "pointer" }}><i
                                            class="typcn typcn-key-outline"></i> Sign Out</span>
                                    </div>
                                    {/* <!--/.dropdown-menu --> */}
                                </li>
                            </ul>
                            {/* <!--/.navbar nav--> */}
                            <div class="nav-clock">
                                <div class="time">
                                    <span class="time-hours"></span>
                                    <span class="time-min"></span>
                                    <span class="time-sec"></span>
                                </div>
                            </div>
                            {/* <!-- nav-clock --> */}
                        </div>
                    </nav>

                </div>
            </div>


            <div class="body-content">
                    <div class="card-header mb-3">
                        <div class="d-flex justify-content-between align-items-center">
                            <div>
                                <h6 class="fs-17 font-weight-600 mb-0">CATEGORIES</h6>
                            </div>
                            <div class="text-right">
                                <div class="actions">
                                    <a href="" class="action-item"><i class="ti-reload"></i></a>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="row" id="boxesHolder">
                        <div class="col-md-6 col-lg-3">
                            {/* <!--Active users indicator--> */}
                            <div class="p-2 bg-primary text-white rounded mb-3 p-3 shadow-sm text-center">
                                <div class="opacity-50 header-pretitle fs-11 font-weight-bold text-uppercase">
                                    Right now
                                </div>
                                <div class="fs-32 text-monospace">90</div>
                                <small>active users on site</small>
                            </div>
                        </div>
                        <div class="col-md-6 col-lg-3">
                            <div class="d-flex flex-column p-3 mb-3 bg-white shadow-sm rounded">
                                <div class="header-pretitle text-muted fs-11 font-weight-bold text-uppercase mb-2">
                                </div>
                                <div class="d-flex align-items-center text-size-3">
                                    <div class="text-monospace">
                                        <span class="text-size-2"></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


            {/* <main class="dashboard">
        <h1 class="title">Dashboard</h1>
    </main> */}
        </>
    )
}

export default Dashboard