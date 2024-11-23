import React from "react";
import { Link } from "react-router-dom";
import { messages } from "../../data/messages";
import "./Message.scss";

const Message = () => {
  const conversation = messages[messages.length - 1];

  return (
    <div className="message">
      <div className="container">
        <span className="breadcrumbs">
          <Link to="/messages" className="link">
            Messages
          </Link>{" "}
          {">"} {conversation.participants[1].username} {">"}
        </span>
        <hr />

        <div className="messages">
          {conversation.messages.map((msg, index) => {
            const sender = conversation.participants.find(
              (p) => p.id === msg.senderId
            );
            return (
              <div
                key={index}
                className={`item ${sender.isOwner ? "owner" : ""} ${
                  !msg.isRead ? "unread" : ""
                }`}
              >
                <img src={sender.profilePic} alt={sender.username} />
                <p>{msg.content}</p>
              </div>
            );
          })}
        </div>

        <hr />
        <div className="write">
          <textarea type="text" placeholder="write a message" />
          <button>Send</button>
        </div>
      </div>
    </div>
  );
};

export default Message;
