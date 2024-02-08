import { Navigate } from 'react-router-dom'

import Messages from './Messages';
import Dashboard from './Dashboard';
import BlogsManagement from './BlogsManagement';
import UserSubmittedBlogs from './UserSubmittedBlogs';
import EditBlog from './EditBlog';
import LoaderAPI from '../../LoaderAPI';


const ProtectedRoute = ({ isAuthenticated, route }) => {

    console.log('ProtectedRoute')
    if (isAuthenticated === null) {
        // return "LOADER"
        return <LoaderAPI showLoader={true} />
        // return <BagLoader /> // still loading
    }
    if (isAuthenticated) {
        if (route === "dashboard") return <Dashboard />
        if (route === "messages") return <Messages />
        if (route === "edit-blog") return <EditBlog />
        if (route === "blogs-management") return <BlogsManagement />
        if (route === "user-submitted-blogs") return <UserSubmittedBlogs />
    } else {
        return <Navigate to={`/admin/login`} replace={true} />;
    }

};

export default ProtectedRoute