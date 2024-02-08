import React from 'react'
import { Link } from 'react-router-dom'

const Dashboard = (props) => {

    const { allCategory, catAndCount } = props
    console.log('dashhh',allCategory, catAndCount )

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
                                <Link to="" className="action-item"><i className="fas fa-refresh"></i></Link>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row" id="boxesHolder">
                    {
                        allCategory?.map(x => {
                            return (
                                <div className="col-md-6 col-lg-3" key={x._id}>
                                    <div className="d-flex flex-column p-3 mb-3 bg-white shadow-sm rounded">
                                        <div className="header-pretitle text-muted fs-11 font-weight-bold text-uppercase mb-2">{x.category}</div>
                                        <div className="d-flex align-items-center text-size-3">
                                            <div className="text-monospace">
                                                <span className="text-size-2 fw-bolder me-2">{catAndCount[x.category] ? catAndCount[x.category] : 0}</span>
                                            </div>
                                            <span className=" text-danger ml-2">Blogs</span>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>

        </>
    )
}

export default Dashboard