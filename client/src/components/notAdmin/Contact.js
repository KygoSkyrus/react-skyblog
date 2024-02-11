import React from 'react'
import Banner from './Banner'

const Contact = (props) => {

    return (
        <>
            {/* <!-- Banner  --> */}
            <Banner text={"get in touch"} />
            {/* <!-- Banner End --> */}

            <div className="t-pt-70 t-pb-70">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 t-mb-30 mb-lg-0">
                            <div className="row">

                                <div className="col-12 t-mb-60">
                                    <div className="row d-flex justify-content-center">

                                        <div className="col-9 c12">

                                            <form action="/addmessage" method="post" className="st-comments__form">
                                                <div className="row d-flex">
                                                    <div className="col-lg-6">
                                                        <input type="text" name="name" id="name" className="form-control t-mb-15 "
                                                            placeholder="Enter Your Name" />
                                                    </div>
                                                    <div className="col-lg-6">
                                                        <input type="number" name="phone" id="phone"
                                                            className="form-control t-mb-15 " placeholder="Enter Your Number" />
                                                    </div>
                                                </div>
                                                <input type="text" name="mail" id="mail" className="form-control t-mb-15"
                                                    placeholder="Enter Your Email" />
                                                <textarea name="textarea" id="textarea" cols="30" rows="10"
                                                    placeholder="Write your text" className="form-control t-mb-15"></textarea>
                                                <div className="d-flex justify-content-center">
                                                    <button className="newsletter__button " type="submit">
                                                        send message
                                                        <span className="st-btn-icon">
                                                            <span className="las la-arrow-right"></span>
                                                        </span>
                                                    </button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>



        </>
    )
}

export default Contact