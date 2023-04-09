import React from 'react'

const Footer = (props) => {

	const {finalArr}=props;

  return (
    <>
    <footer className="t-bg-secondary footer">
		<div className="container">
			<div className="footer-top t-pt-40 t-pb-40">
				<div className="row align-items-center justify-content-center justify-content-md-between">
					<div className="col-md-4 t-mb-30 mb-md-0">
						<div className="brand mx-auto mr-md-auto ml-md-0">
							<a href="" className="t-link">
							    <section className='theLogo'>SOMETHING</section>
							</a>
						</div>
					</div>
					<div className="col-md-6 text-center">
						<div className="d-flex align-items-center justify-content-center justify-content-md-end">
							<div className="t-text-primary t-mr-16 t-h1">
								<i className="las la-headset"></i>
							</div>
							<div className="text-left">
								<div className="text-capitalize text-light ex-sm-text">
									24/7 help center
								</div>
								<h5 className="t-mt-10 mb-0 t-text-light">+12-2345678966</h5>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="footer-mid t-pt-40 t-pb-40">
				<div className="row">
					<div className="col-md-4 col-lg-2 t-mb-30 mb-lg-0">
						<h5 className="t-text-light mt-0 text-capitalize">quick links</h5>
						<ul className="list">
							<li className="t-mb-10">
								<a href="/" className="t-link text-capitalize t-link--light sm-text">
									home
								</a>
							</li>
							<li className="t-mb-10">
								<a href="/contact" className="t-link text-capitalize t-link--light sm-text">
									contact
								</a>
							</li>
							<li className="t-mb-10">
								<a href="/post-your-blog" className="t-link text-capitalize t-link--light sm-text">
									post a blog
								</a>
							</li>
						</ul>
					</div>
					<div className="col-md-4 col-lg-2 t-mb-30 mb-lg-0">
						<h5 className="t-text-light mt-0 text-capitalize">top picks</h5>
						<ul className="list">
							<li className="t-mb-10">
								<a href="/category/tech" className="t-link text-capitalize t-link--light sm-text">
									tech
								</a>
							</li>
							<li className="t-mb-10">
								<a href="/category/travel" className="t-link text-capitalize t-link--light sm-text">
									travel
								</a>
							</li>
							<li className="t-mb-10">
								<a href="/category/lifestyle" className="t-link text-capitalize t-link--light sm-text">
									lifestyle
								</a>
							</li>
							<li className="t-mb-10">
								<a href="/category/business" className="t-link text-capitalize t-link--light sm-text">
									business
								</a>
							</li>
						</ul>
					</div>
					<div className="col-md-4 col-lg-2 t-mb-30 mb-lg-0">
						<h5 className="t-text-light mt-0 text-capitalize">categories</h5>
						<ul className="list" id="footerCat">
							{/* <li className="t-mb-10">
								<a href="#" className="t-link text-capitalize t-link--light sm-text">
								</a>
							</li> */}
							{finalArr?.map((x,index)=>{
								return(
                                <li className="t-mb-10" key={index}>
								<a href={"/category/"+x} className="t-link text-capitalize t-link--light sm-text">
									{x}
								</a>
							    </li>
								)
							})
							}
						</ul>
					</div>
					<div className="col-md-6 col-lg-3 t-mb-30 mb-lg-0">
						<h5 className="t-text-light mt-0 text-capitalize">get in touch</h5>
						<p className="text-light sm-text">
							1313 Broadway, New York NY-10001, United States of America
						</p>
						<p className="text-light sm-text">+12-2345687966 (For Ads)</p>
						<p className="text-light sm-text mb-0">info@example.com</p>
					</div>
					<div className="col-md-6 col-lg-3 t-mb-30 mb-lg-0">
						<h5 className="t-text-light mt-0 text-capitalize">follow us</h5>
						<ul className="list d-flex justify-content-between mt-3"> 
							<li>
								<a href="#" className="t-follow-link">
									<span className="social-counter__icon social-counter__icon--be t-mr-8">
										<span className="social-counter__icon-is">
											<i className="fa-brands fa-github"></i>
										</span>
									</span>
								</a>
							</li>
							<li>
								<a href="#" className="t-follow-link">
									<span className="social-counter__icon social-counter__icon--fb t-mr-8">
										<span className="social-counter__icon-is">
										   <i class="fa-brands fa-linkedin-in"></i>
										</span>
									</span>
								</a>
							</li>
							<li>
								<a href="#" className="t-follow-link">
									<span className="social-counter__icon social-counter__icon--tw t-mr-8">
										<span className="social-counter__icon-is">
										   <i class="fa-brands fa-twitter"></i>										
										</span>
									</span>
								</a>
							</li>
							<li>
								<a href="#" className="t-follow-link">
									<span className="social-counter__icon social-counter__icon--ins t-mr-8">
										<span className="social-counter__icon-is">
										<i class="fa-brands fa-instagram"></i>
										</span>
									</span>
								</a>
							</li>
							<li>
								<a href="#" className="t-follow-link">
									<span className="social-counter__icon social-counter__icon--in t-mr-8">
										<span className="social-counter__icon-is">
										<i class="fa-brands fa-facebook"></i>										</span>
									</span>
								</a>
							</li>
						</ul>
						{/* <div className="t-mt-30">
							<h6 className="t-text-light text-capitalize">download app</h6>
							<ul className="list row">
								<li className="t-mr-8 t-mb-10 mb-xl-0">
									<a href="#" className="t-link">
										<img src="assets/img/g-play.png" alt="blog" className="img-fluid" />
									</a>
								</li>
								<li>
									<a href="#" className="t-link">
										<img src="assets/img/i-store.png" alt="blog" className="img-fluid" />
									</a>
								</li>
							</ul>
						</div> */}
					</div>
				</div>
			</div>
			<div className="footer-bottom t-pb-40 t-pt-40">
				<div className="row">
					<div className="col-12 text-center">
						<p className="mb-0 t-text-light sm-text">
							<i class="fa-sharp fa-regular fa-copyright"></i> 2023, SKYBLOG. Designed by
							<a href="#" className="t-link t-link--primary text-light">&nbsp;DHEERAJ GUPTA&nbsp;</a>
							. All Rights Reserved.
						</p>
					</div>
				</div>
			</div>
		</div>
	</footer>
    </>
  )
}

export default Footer