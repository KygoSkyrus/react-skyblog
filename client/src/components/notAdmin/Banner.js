import React from 'react'
import skyBg from "../../assets/images/skyVidCrop2.mp4"

const Banner = (props) => {
    const { text } = props
    return (
        <div className="container">
            <div className="row position-relative">
                <video autoPlay muted loop width={"100%"} >
                    <source src={skyBg} type="video/mp4" />
                </video>
                <div className="t-pt-70 t-pb-70 skyVidBG">
                    <h4 className="mt-0 text-capitalize text-center" id="catHead">
                        {text}
                    </h4>
                </div>
            </div>
        </div>
    )
}

export default Banner