import { Navigate } from 'react-router-dom'

import Messages from './Messages';
import Dashboard from './Dashboard';
import BlogsManagement from './BlogsManagement';
import UserSubmittedBlogs from './UserSubmittedBlogs';
import EditBlog from './EditBlog';
import LoaderAPI from '../../LoaderAPI';


const ProtectedRoute = (props) => {

    const {isAuthenticated, route, state} = props;
    console.log('ProtectedRoute',props)
    if (isAuthenticated === null) {
        // return "LOADER"
        return <LoaderAPI showLoader={true} />
    }
    if (isAuthenticated) {
        if (route === "dashboard") return <Dashboard state={state} />
        if (route === "messages") return <Messages state={state} />
        if (route === "edit-blog") return <EditBlog state={state} />
        if (route === "blogs-management") return <BlogsManagement state={state} />
        if (route === "user-submitted-blogs") return <UserSubmittedBlogs state={state} />
    } else {
        return <Navigate to={`/admin/login`} replace={true} />;
    }

};

export default ProtectedRoute