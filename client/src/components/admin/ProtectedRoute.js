import { Navigate } from 'react-router-dom'
import Messages from './Messages';
// import Dashboard from './Dashboard.js';
// import Orders from './Orders.js'
// import Users from './Users.js'


const ProtectedRoute = ({ isAuthenticated, route }) => {

    console.log('ProtectedRoute')
    if (isAuthenticated === null) {
        return "LOADER"
        // return <BagLoader /> // still loading
    }
    if (isAuthenticated) {
        // if (route === "dashboard") return <Dashboard />
        if (route === "messages") return <Messages />
        // if (route === "users") return <Users />
    } else {
        return <Navigate to={`/admin/login`} replace={true} />;
    }

};

export default ProtectedRoute