import React from "react";


const UserCard = (props) => {
    return (
        <div className="card userCard">
            <div className="card-body text-center">
                <h5 className="card-title card-text">{props.username}</h5>
                <button className="edit-user" onClick={() => props.editUser(props._id)}>Edit User</button>
                <button className="delete-user" onClick={() => props.deleteUser(props._id)}>Delete User</button>
            </div>
        </div>
    )
}
export default UserCard;