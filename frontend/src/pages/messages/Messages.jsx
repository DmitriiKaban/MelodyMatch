import { messages } from "../../data/messages";
import React, { useState } from "react";
import { Link } from "react-router-dom";

import "./Messages.scss";

const Messages = () => {
  const currentUser = {
    id: 1,
    username: "Matei",
    isSeller: true,
  };

  const [readMessages, setReadMessages] = useState(
    messages.map((msg) => msg.messages[msg.messages.length - 1].isRead)
  );

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
            {messages.map((msg, index) => {
              const lastMessage = msg.messages[msg.messages.length - 1];
              const participant = msg.participants.find(
                (participant) => participant.id !== currentUser.id
              );

              return (
                <tr
                  key={msg.id}
                  className={readMessages[index] ? "" : "active"}
                >
                  <td>{participant.username}</td>
                  <td>
                    {readMessages[index] ? (
                      <span>{lastMessage.content.substring(0, 100)}...</span>
                    ) : (
                      <Link to={`/message/${msg.id}`} className="link">
                        {lastMessage.content.substring(0, 100)}...
                      </Link>
                    )}
                  </td>
                  <td>{lastMessage.date}</td>
                  <td>
                    <button
                      onClick={() => !readMessages[index] && markAsRead(index)}
                      disabled={readMessages[index]}
                    >
                      {readMessages[index] ? "Read" : "Mark as Read"}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Messages;
