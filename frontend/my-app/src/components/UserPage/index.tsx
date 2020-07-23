import React from 'react'
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import CustomerUserPage from './CustomerUserPage';
import { AdminPage } from './AdminUserPage';
import GuideUserPage from './GuideUserPage';



const UserPage: React.FC = () => {
    const user = useSelector((state: RootState) => state.users.users[state.login._id]);
    if(!user) {
        return null;
    }

    if(user.type === "Customer") {
        return <CustomerUserPage />
    }

    if(user.type === "Admin") {
        return <AdminPage />
    }

    if(user.type === "Guide") {
        return <GuideUserPage />
    }

    return null;
}

export default UserPage;