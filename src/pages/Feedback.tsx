import { useState } from "react";
import "../assets/css/feedback.css";

const Feedback = () => {
  const [rating, setRating] = useState(5);
  const [category, setCategory] = useState("General");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      rating,
      category,
      message,
    };

    console.log(payload);

    alert("Thank you for your feedback!");

    setRating(5);
    setCategory("General");
    setMessage("");
  };

  return (
    <div className="feedback-page">
      <div className="feedback-card">
        <h1>We Value Your Feedback</h1>
        <p>
          Help us improve LensMarket and make product comparison even better.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="feedback-group">
            <label>Rating</label>
            <select
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
            >
              <option value={5}>⭐⭐⭐⭐⭐ Excellent</option>
              <option value={4}>⭐⭐⭐⭐ Good</option>
              <option value={3}>⭐⭐⭐ Average</option>
              <option value={2}>⭐⭐ Poor</option>
              <option value={1}>⭐ Very Poor</option>
            </select>
          </div>

          <div className="feedback-group">
            <label>Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option>General</option>
              <option>Bug Report</option>
              <option>Feature Request</option>
              <option>Price Issue</option>
              <option>Product Data</option>
            </select>
          </div>

          <div className="feedback-group">
            <label>Your Feedback</label>
            <textarea
              rows={6}
              placeholder="Tell us how we can improve LensMarket..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            />
          </div>

          <button className="feedback-submit" type="submit">
            Submit Feedback
          </button>
        </form>
      </div>
    </div>
  );
};

export default Feedback;