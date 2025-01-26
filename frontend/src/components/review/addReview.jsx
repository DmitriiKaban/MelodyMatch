import React, { useState } from "react";
import newRequest from "../../utils/newRequest"
import "./ReviewModal.scss";

const ReviewModal = ({ gigId, isOpen, onClose }) => {
  const [rating, setRating] = useState("");
  const [comment, setComment] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await newRequest.post(
        `/rating-reviews/add-review/${gigId}`,
        { rating, comment },
        { withCredentials: true }
      );
      setSuccess(true);
      setTimeout(() => {
        onClose(); 
      }, 1500);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong.");
    }
  };

  if (!isOpen) return null; 

  return (
    <div className="review-modal">
      <div className="modal-content">
        <button className="link" onClick={onClose}>
          ×
        </button>
        <h3>Add Your Review</h3>
        <form onSubmit={handleSubmit}>
          <label>
            Rating (1-5):
            <input
              type="number"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              min="1"
              max="5"
              required
            />
          </label>
          <label>
            Comment:
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              required
            />
          </label>
          <button type="submit" className="submit-btn">
            Submit
          </button>
        </form>
        {error && <p className="error">{error}</p>}
        {success && <p className="success">Review added successfully!</p>}
      </div>
    </div>
  );
};

export default ReviewModal;
