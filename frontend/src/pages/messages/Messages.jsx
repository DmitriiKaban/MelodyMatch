import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Messages.scss";

const Messages = () => {
  const currentUser = {
    id: 1,
    username: "Matei",
    isSeller: true,
  };

  const message = `Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident
  maxime cum corporis esse aspernatur laborum dolorum? Animi
  molestias aliquam, cum nesciunt, aut, ut quam vitae saepe repellat
  nobis praesentium placeat.`;

  const [readMessages, setReadMessages] = useState(new Array(5).fill(false));

  const markAsRead = (index) => {
    const updatedReadMessages = [...readMessages];
    updatedReadMessages[index] = true;
    setReadMessages(updatedReadMessages);
  };

  return (
    <div className="messages">
      <div className="container">
        <div className="title">
          <h1>Messages</h1>
        </div>
        <table>
          <thead>
            <tr>
              <th>{currentUser.isSeller ? "Buyer" : "Seller"}</th>
              <th>Last Message</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {[...Array(5)].map((_, index) => (
              <tr key={index} className={readMessages[index] ? "" : "active"}>
                <td>{`User ${index + 1}`}</td>
                <td>
                  {readMessages[index] ? (
                    <span>{message.substring(0, 100)}...</span>
                  ) : (
                    <Link to={`/message/${index}`} className="link">
                      {message.substring(0, 100)}...
                    </Link>
                  )}
                </td>
                <td>{`${index + 1} hour${index + 1 > 1 ? "s" : ""} ago`}</td>
                <td>
                  <button onClick={() => markAsRead(index)}>
                    Mark as Read
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Messages;
