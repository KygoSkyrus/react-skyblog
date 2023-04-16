import React from 'react'

const Loader = (props) => {
  const { isLoaded } = props
  return (
    <div className={`loader-container ${isLoaded ? "" : "d-none"}`} >
      <div className='overlay'>
      <div className="loader">
        <span>S</span>
        <span>K</span>
        <span>Y</span>
        <span>B</span>
        <span>L</span>
        <span>O</span>
        <span>G</span>
      </div>
      <section className='loading'>LOADING</section>
      </div>
    </div>
  )
}

export default Loader