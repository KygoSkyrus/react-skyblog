import React from 'react'

const Loader = (props) => {
  const { isLoaded } = props
  return (
    <div className={`loader-container ${isLoaded ? "" : "d-none"}`} >
      <div className='overlay'>
        <div className="loader">
          <h1 className='letterHolder'>
            <span className="let1">l</span>
            <span className="let2">o</span>
            <span className="let3">a</span>
            <span className="let4">d</span>
            <span className="let5">i</span>
            <span className="let6">n</span>
            <span className="let7">g</span>
          </h1>
        </div>
        <section className='loading'>SKYBLOG</section>
      </div>
    </div>
  )
}

export default Loader