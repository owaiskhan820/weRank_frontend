import React, { useEffect } from 'react';
import { requestFirebaseNotificationPermission } from '../../api/Firebase/firebase';

const UserProfile = () => {

    useEffect(() => {
        requestFirebaseNotificationPermission()
            .then((firebaseToken) => {
                // Send this token to your backend via an API
                // Example: yourAPI.saveDeviceToken(firebaseToken);
            })
            .catch((err) => {
                console.error("Error in Firebase Token reception", err);
            });
    }, []);

    return (
        <div>User Profile Component</div>
    );
};

export default UserProfile;