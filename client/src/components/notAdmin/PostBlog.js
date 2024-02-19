import React, { useState, useEffect } from 'react'
import { useGoogleLogin } from '@react-oauth/google';
import Cookies from 'js-cookie';

import Banner from './Banner';
import BlogForm from '../admin/BlogForm';
import LoaderAPI from '../../LoaderAPI';
import { useToast } from '../ToastContext';

const PostBlog = () => {

    const [showLoader, setShowLoader] = useState(false)
    const [user, setUser] = useState();
    const { showToast } = useToast();

    const login = useGoogleLogin({
        onSuccess: (codeResponse) => {
            showToast("Logged in successfully")
            setUser(codeResponse);
        },
        onError: (error) => {
            showToast("Something went wrong")
            console.log('Login Failed:', error)
        },
    });

    useEffect(() => {
        let userId = Cookies.get('userid');
        if (userId) {
            setUser(true)
            if (document.getElementById('email'))
                document.getElementById('email').value = userId
        } else if (user) {
            fetch(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
                headers: {
                    Authorization: `Bearer ${user.access_token}`,
                    Accept: 'application/json'
                }
            })
                .then(response => response.json())
                .then((res) => {
                    Cookies.set('userid', res.email, { httpOnly: false, expires: 0.5 })
                    document.getElementById('email').value = res.email
                })
                .catch((err) => console.log(err));
        }
    }, [user]);

    // log out function to log the user out of google 
    // const logOut = () => {
    //     googleLogout();
    // };

    return (
        <>
            {/* <!-- Banner  --> */}
            <Banner text={"post a blog"} />
            {/* <!-- Banner End --> */}

            {!user ?
                <div className='d-flex flex-column justify-content-center align-items-center' style={{ height: "50vh" }}>
                    <section>Sign in to post your blog to us</section>
                    <button onClick={() => login()} className='d-flex googleLogin mt-3'>
                        <span>
                            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="LgbsSe-Bz112c" style={{ width: "20px" }}><g><path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path><path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path><path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path><path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path><path fill="none" d="M0 0h48v48H0z"></path></g></svg>
                        </span>
                        <section>&nbsp;&nbsp;Sign in with Google</section></button>
                </div>
                :
                <div className="t-pt-70 t-pb-70 dnone" id="content">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12 t-mb-30 mb-lg-0">
                                <div className="row">

                                    <div className="col-12">
                                        <div className="row d-flex justify-content-center" id="data">

                                            <div className="col-9  c12">
                                                <BlogForm
                                                    apiEndpoint="/adduserblog"
                                                    setShowLoader={setShowLoader}
                                                    componentName="submit"
                                                    isGuest={false}
                                                />
                                            </div>

                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
            <LoaderAPI showLoader={showLoader} />
        </>
    )
}

export default PostBlog