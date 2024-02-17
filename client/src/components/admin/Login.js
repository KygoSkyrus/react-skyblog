import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = ({isAuthenticated}) => {

  const [error, setError] = useState()
  const navigate = useNavigate()

  useEffect(()=>{
    if (isAuthenticated) navigate('/admin/dashboard')
  },[isAuthenticated])

  async function login(e) {
    let username = document.getElementById('username').value
    let password = document.getElementById('passWord').value

    fetch("/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username, password
      }),
    })
      .then(response => response.json())
      .then(data => {
        if (data.matched === true) {
          navigate("/admin/dashboard")
          window.location.reload()
        } else if (data.matched === false) {
          setError('Incorrect credentials')
        }
      })
      .catch(err => console.log(err))
  }

  return (
    <>
      <div className="d-flex align-items-center justify-content-center text-center h-100vh" >
        <div className="form-wrapper m-auto" style={{ width: "30%", minWidth: "300px" }}>
          <div className="form-container my-4" style={{ maxWidth: "unset" }}>
            <div className="d-flex justify-content-center flex-column align-items-center mb-4">
              <section className='theLogo'>SKYBLOG</section>
              <section style={{ letterSpacing: "6px", lineHeight: "10px", fontSize: "12px", color: "#a7a7a7" }}>Admin</section>
            </div>

            <div className="panel">
              <div className="register-form p-4"  >
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    name="username"
                    placeholder="Username"
                  />
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className="form-control"
                    id="passWord"
                    name="password"
                    placeholder="Password"
                  />
                </div>

                <button className="btn btn-block" onClick={e => login(e)}>
                  Sign in
                </button>
              </div>
            </div>
            <p style={{ padding: "20px 0", color: "red" }}>{error}</p>
          </div>
        </div>

        <div className="toast bg-dark show mt-4 shadow-sm position-absolute" role="alert" aria-live="assertive" aria-atomic="true" style={{ right: "12px", bottom: "12px" }}>
          <div className="toast-header">
            {/* <img src={theBagLogo} className="rounded me-2" width="20px" alt="" /> */}
            <strong className="me-auto">Skyblog</strong>
            {/* <button type="button" class="ml-2 mb-1 close" data-bs-dismiss="toast" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button> */}
          </div>
          <div className="toast-body text-center text-light">
            Use <span className='highlight'>Guest Admin credentials</span> to explore admin panel
            <section>
              <span className='highlight'>Email</span>:&nbsp;
              <span className='cursor-pointer' onClick={e => navigator?.clipboard.writeText(e.target.innerText)}>guestuser@email.com</span>
            </section>
            <section>
              <span className='highlight'>Password</span>:&nbsp;
              <span className='cursor-pointer' onClick={e => navigator?.clipboard.writeText(e.target.innerText)}>guest#7</span>
            </section>
          </div>
        </div>

      </div>
    </>
  )
}

export default Login