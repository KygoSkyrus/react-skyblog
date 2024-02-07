import { Navigate } from 'react-router-dom'
// import Dashboard from './Dashboard.js';
// import Orders from './Orders.js'
// import Users from './Users.js'


const ProtectedRoute = ({ isAuthenticated, route, children }) => {

    if (isAuthenticated === null) {
        return "LOADER"
        // return <BagLoader /> // still loading
    }
    if (isAuthenticated) {
        return children
        // if (route === "dashboard") return <Dashboard />
        // if (route === "orders") return <Orders />
        // if (route === "users") return <Users />
    } else {
        return <Navigate to={`/admin/login`} replace={true} />;
    }

};

export default ProtectedRoute