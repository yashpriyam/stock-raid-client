import React from "react";
const UsersList = ({ users, toggleConnection, connectedTo, connecting }) => {
  return (
      <div>
        <span>Online Users</span>
        <div>
          {(users.length && (
            <div>
              {users.map(({ userName }) => (
                <div key={userName}>
                  <div>
                    <button
                      onClick={() => {
                        toggleConnection(userName);
                      }}
                      disabled={!!connectedTo && connectedTo !== userName}
                      loading={connectedTo === userName ? connecting : undefined}
                    >
                      {connectedTo === userName ? "Disconnect" : "Connect"}
                    </button>
                  </div>
                  <div>
                    <span>{userName}</span>
                  </div>
                </div>
              ))}
            </div>
          )) || <span>There are no users Online</span>}
        </div>
      </div>
  );
};
export default UsersList;