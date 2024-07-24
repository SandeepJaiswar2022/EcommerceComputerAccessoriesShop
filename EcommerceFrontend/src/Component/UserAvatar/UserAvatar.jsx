import React from 'react';

const UserAvatar = ({ username }) => {
    const getInitial = (name) => {
        if (!name) return '';
        return name.charAt(0).toUpperCase();
    };

    return (
        <div className="avatar">
            {getInitial(username)}
        </div>
    );
};

export default UserAvatar;
