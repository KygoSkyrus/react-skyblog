import React from 'react'

const Login = () => {

  return (
   <>
 <div
      class="d-flex align-items-center justify-content-center text-center h-100vh"
    >
      <div class="form-wrapper m-auto" style={{width: "30%"}}>
        <div class="form-container my-4" style={{maxWidth: "unset"}}>
          <div class="register-logo text-center mb-4">
            <img
              src=""
              width="150px"
              alt=""
            />
          </div>

          <div class="panel">
            <form class="register-form p-4" action="/admin/login" method="POST">
              <div class="form-group">
                <input
                  type="text"
                  class="form-control"
                  id="userName"
                  name="userName"
                  placeholder="Username"
                />
              </div>
              <div class="form-group">
                <input
                  type="password"
                  class="form-control"
                  id="userName"
                  name="password"
                  placeholder="Password"
                />
              </div>

              <button type="submit" class="btn btn-block">
                Sign in
              </button>
            </form>
          </div>
          <p style={{padding: "20px 0",color: "red"}}>{"<%= text %>"}</p>
          {/* <!-- <div class="bottom-text text-center my-3">
                        Don't have an account? <a href="register.html" class="font-weight-500">Sign Up</a><br>
                        Remind <a href="forget_password.html" class="font-weight-500">Password</a>
                    </div> --> */}
        </div>
      </div>
    </div>   </>
  )
}

export default Login