import React from 'react'
import { Link } from 'react-router-dom'

const Error = () => {

    return (
        <>

            <section className="page_505 d-flex align-items-center justify-content-center text-center h-100vh" style={{
                background:
                    "#fff"
            }}>
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="four_zero_four_bg">
                            </div>
                            <div className="contant_box_505">
                                <h3 className="h2 font-weight-bold text-monospace">OOPS... Page not pound.</h3>
                                <p>The server encountered something unexpected that didn't allow it to complete the request.<br/>
                                </p>
                                <Link to={"/"} className="btn btn-outline-success mt-3">HOME</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* 
            <div className="t-pt-60 t-pb-60">
		<div className="container">
			<div className="row justify-content-center">
				<div className="col-12 col-md-8 text-center">
					<img src="/assets/img/404.jpg" alt="blog" className="img-fluid"/>
					<h3 className="text-capitalize">
						Oops.... Page Not Found
					</h3>
					<a href="/" className="newsletter__button text-light">
						go home
					</a>
				</div>
			</div>
		</div>
	</div> 
    */}
        </>
    )
}

export default Error