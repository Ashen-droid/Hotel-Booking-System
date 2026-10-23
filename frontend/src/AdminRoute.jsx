import { Navigate } from 'react-router-dom';

function AdminRoute({ children }) {
    const userRole = localStorage.getItem('userRole');

    if (userRole !== 'ADMIN') {
        alert("Access Denied! only Hotel Admin can access this page.");
        return <Navigate to="/" replace />;
    }

    return children;
}

export default AdminRoute;