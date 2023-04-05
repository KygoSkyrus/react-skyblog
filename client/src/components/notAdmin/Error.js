import React, { useEffect } from 'react'

const Error = () => {

	useEffect(()=>[
        document.querySelectorAll('.dashboard')[0].style.display="none",

		document.querySelectorAll('.sidebar')[0].style.display="none",
	],[])
	
  return (
    <>

<section class="page_505 d-flex align-items-center justify-content-center text-center h-100vh" style={{background:
"#fff"}}>
            <div class="container">
                <div class="row">
                    <div class="col-sm-12">
                        <div class="four_zero_four_bg">
                        </div>
                        <div class="contant_box_505">
                            <h3 class="h2 font-weight-bold text-monospace">404 Page not pound.</h3>
                            <p>The server encountered something unexpected that didn't allow it to complete the request.<br/>
                                We apologize. You can go back to main page:</p>
                            <a href="index.html" class="btn btn-success mt-3">Dashboard</a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    {/* <div class="t-pt-60 t-pb-60">
		<div class="container">
			<div class="row justify-content-center">
				<div class="col-12 col-md-8 text-center">
					<img src="/assets/img/404.jpg" alt="blog" class="img-fluid"/>
					<h3 class="text-capitalize">
						Oops.... Page Not Found
					</h3>
					<a href="/" class="newsletter__button text-light">
						go home
					</a>
				</div>
			</div>
		</div>
	</div> */}

    </>
  )
}

export default Error