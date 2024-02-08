import React from 'react'

function LoaderAPI(props) {
    const { showLoader } = props
    return (
        <div className={`api-loader-container ${!showLoader ? "d-none" : ""}`}>
            <div className='overlay'>
                <div className="loader">
                    <h1 className='letterHolder'>
                        <span className="let1">s</span>
                        <span className="let2">k</span>
                        <span className="let3">y</span>
                        <span className="let4">b</span>
                        <span className="let5">l</span>
                        <span className="let6">o</span>
                        <span className="let7">g</span>
                    </h1>
                </div>
            </div>
        </div>
    )
}

export default LoaderAPI