import React from 'react'

const Contact = (props) => {

    

  return (
   <>

{/* <!-- Banner  --> */}
    <div class="container">
        <div class="row">
            <div class="col-12">
                <div class="t-pt-70 t-pb-70 t-bg-secondary">
                    <h4 class="mt-0 t-text-light text-capitalize text-center">
                        Contact
                    </h4>
                </div>
            </div>
        </div>
    </div>
    {/* <!-- Banner End --> */}



    <div class="t-pt-70 t-pb-70">
        <div class="container">
            <div class="row">
                <div class="col-lg-12 t-mb-30 mb-lg-0">
                    <div class="row">

                        <div class="col-12 t-mb-60">
                            <div class="row d-flex justify-content-center">

                                <div class="col-9 mt-5 c12">
                                    <h4 class="mt-0 text-capitalize text-center">
                                        get in touch
                                    </h4>
                                    <form action="/message" method="post" class="st-comments__form mt-4">
                                        <div class="row d-flex">
                                            <div class="col-lg-6">
                                                <input type="text" name="name" id="name" class="form-control t-mb-15 "
                                                    placeholder="Enter Your Name"/>
                                            </div>
                                            <div class="col-lg-6">
                                                <input type="number" name="phone" id="phone"
                                                    class="form-control t-mb-15 " placeholder="Enter Your Number"/>
                                            </div>
                                        </div>
                                        <input type="text" name="mail" id="mail" class="form-control t-mb-15"
                                            placeholder="Enter Your Email"/>
                                        <textarea name="textarea" id="textarea" cols="30" rows="10"
                                            placeholder="Write your text" class="form-control t-mb-15"></textarea>
                                        <div class="d-flex justify-content-center">
                                            <button class="newsletter__button " type="submit">
                                                send message
                                                <span class="st-btn-icon">
                                                    <span class="las la-arrow-right"></span>
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