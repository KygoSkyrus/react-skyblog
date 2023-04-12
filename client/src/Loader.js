import React from 'react'

const Loader = (props) => {
  const { isLoaded } = props
  return (
    <div className={`loader-container ${isLoaded ? "" : "d-none"}`} >
      <div class="loader">
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
  )
}

export default Loader