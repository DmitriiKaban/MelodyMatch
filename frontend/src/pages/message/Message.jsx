import React, { useState } from "react";
import { Link } from "react-router-dom";
import { messages } from "../../data/messages";
import { sanitizeInput } from "../../utils/sanitize";
import "./Message.scss";

const Message = () => {
  const [conversation, setConversation] = useState(
    messages[messages.length - 1]
  );
  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = () => {
    // Sanitize the input before processing
    const sanitizedMessage = sanitizeInput(newMessage.trim());

    if (sanitizedMessage === "") return;

    const messageToSend = {
      id: conversation.messages.length + 1,
      senderId: 1,
      content: sanitizedMessage,
      isRead: true,
      timestamp: new Date().toISOString(),
    };

    setConversation((prevConversation) => ({
      ...prevConversation,
      messages: [...prevConversation.messages, messageToSend],
    }));

    setNewMessage("");
  };

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
          <textarea
            type="text"
            placeholder="write a message"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <button onClick={handleSendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
};

export default Message;
