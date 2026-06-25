import { useEffect, useState } from "react";
import API from "../../api/axios";
import { useAuth } from "../../context/AuthContext";
import { useTranslation } from "react-i18next";

export default function Reviews() {
  const { t } = useTranslation();
  const { user } = useAuth();

  const [reviews, setReviews] = useState([]);
  const [reviewText, setReviewText] = useState("");
  const [loading, setLoading] = useState(false);

  const loadReviews = async () => {
    const res = await API.get("/reviews");
    setReviews(res.data);
  };

  useEffect(() => {
    loadReviews();
  }, []);

  const submitReview = async () => {
    if (!reviewText.trim()) {
      return alert("Please enter review");
    }

    try {
      setLoading(true);

      await API.post("/reviews", {
        review: reviewText,
      });

      setReviewText("");

      loadReviews();

      alert("Review submitted successfully");
    } catch (err) {
      alert("Failed to submit review");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-16 px-4">
      <h1 className="text-4xl font-bold text-[#2f6f6f] mb-10">
        Customer Reviews
      </h1>

        {/* REVIEW LIST */}
      <div className="grid md:grid-cols-3 gap-6">
        {reviews.map((review) => (
          <div
            key={review._id}
            className="bg-white rounded-3xl shadow p-6"
          >
            <h2 className="text-xl font-semibold text-[#2f6f6f] mb-3">
              {review.name}
            </h2>

            <p className="text-gray-600 leading-7">
              "{review.review}"
            </p>

            <p className="text-sm text-gray-400 mt-4">
              {new Date(
                review.createdAt
              ).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
      <br/>

      {/* ADD REVIEW */}
      {user && (
        <div className="bg-white rounded-3xl shadow p-6 mb-10">
          <h2 className="text-xl font-bold mb-4">
            Write a Review
          </h2>

          <textarea
            rows="4"
            value={reviewText}
            onChange={(e) =>
              setReviewText(e.target.value)
            }
            placeholder="Share your experience..."
            className="w-full border rounded-xl p-4"
          />

          <button
            onClick={submitReview}
            disabled={loading}
            className="mt-4 bg-[#22666B] text-white px-8 py-3 rounded-xl"
          >
            {loading
              ? "Submitting..."
              : "Submit Review"}
          </button>
        </div>
      )}

    
    </div>
  );
}