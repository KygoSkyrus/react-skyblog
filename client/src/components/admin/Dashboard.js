import React from 'react'

const Dashboard = (props) => {

    const {allCategory,catAndCount}=props

    return (
        <>


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