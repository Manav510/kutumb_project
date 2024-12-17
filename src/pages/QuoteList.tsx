import  { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getQuotes } from "../services/api";
import { Quote } from "../types/quote";

export const QuoteList: React.FC = () => {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchQuotes();
  }, [offset]);

  const fetchQuotes = async () => {
    if (!hasMore || loading) return;

    setLoading(true);
    try {
      const fetchedQuotes = await getQuotes(20, offset);

      if (fetchedQuotes.length === 0) {
        setHasMore(false);
      } else {
        setQuotes((prev) => [...prev, ...fetchedQuotes]);
      }
    } catch (error) {
      console.error("Failed to fetch quotes", error);
      alert("Failed to fetch quotes");
    } finally {
      setLoading(false);
    }
  };

  const loadMore = () => {
    setOffset((prev) => prev + 20);
  };

  const handleCreateQuoteClick = () => {
    navigate("/create-quote");
  };

  return (
    <div style={styles.container}>
      <div style={styles.cardContainer}>
        <h2 style={styles.title}>Quotes</h2>

        {quotes.length === 0 && !loading && (
          <div style={styles.noQuotesText}>No quotes found. Create your first quote!</div>
        )}

        <div style={styles.quoteGrid}>
          {quotes.map((quote, index) => (
            <div
              key={index}
              style={styles.quoteCard}
              onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.05)"}
              onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
            >
              <div style={styles.imageContainer}>
                <img src={quote.mediaUrl} alt="Quote" style={styles.image} />
                <div style={styles.quoteText}>{quote.text}</div>
              </div>
              <div style={styles.quoteInfo}>
                <span>{quote.username}</span>
                <span>{new Date(quote.created_at).toLocaleString()}</span>
              </div>
            </div>
          ))}
        </div>

        {hasMore && (
          <div style={styles.loadMoreContainer}>
            <button
              onClick={loadMore}
              disabled={loading}
              style={styles.loadMoreButton(loading)}
            >
              {loading ? "Loading..." : "Load More"}
            </button>
          </div>
        )}
      </div>

      <button
        onClick={handleCreateQuoteClick}
        style={styles.createQuoteButton}
      >
        +
      </button>
    </div>
  );
};

const styles = {
  container: {
    minHeight: "100vh",
    minWidth: "100vw",
    background: "linear-gradient(to bottom, #e0f2fe, #ffffff)",
    padding: "1rem",
    boxSizing: "border-box" as const,
  },
  cardContainer: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "1rem",
    backgroundColor: "#ffffff",
    borderRadius: "1rem",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
  },
  title: {
    textAlign: "center" as const,
    marginBottom: "1rem",
    fontSize: "1.5rem",
    color: "#1e3a8a",
  },
  noQuotesText: {
    textAlign: "center" as const,
    color: "#888",
    marginTop: "1rem",
  },
  quoteGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "1rem",
  },
  quoteCard: {
    backgroundColor: "#f9fafb",
    borderRadius: "0.75rem",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    overflow: "hidden",
    transition: "transform 0.3s ease-in-out",
  },
  imageContainer: {
    position: "relative" as const,
  },
  image: {
    width: "100%",
    height: "200px",
    objectFit: "cover" as const,
  },
  quoteText: {
    position: "absolute" as const,
    top: "0",
    left: "0",
    right: "0",
    backgroundColor: "rgba(0,0,0,0.5)",
    color: "white",
    padding: "0.5rem",
    fontWeight: "bold",
    textAlign: "center" as const,
  },
  quoteInfo: {
    padding: "0.75rem",
    display: "flex",
    justifyContent: "space-between",
    fontSize: "0.9rem",
    color: "#555",
  },
  loadMoreContainer: {
    textAlign: "center" as const,
    marginTop: "1.5rem",
  },
  loadMoreButton: (loading: boolean) => ({
    padding: "0.75rem 1.5rem",
    borderRadius: "0.5rem",
    backgroundColor: loading ? "#ccc" : "#1e40af",
    color: "white",
    border: "none",
    cursor: loading ? "not-allowed" : "pointer",
  }),
  createQuoteButton: {
    position: "fixed" as const,
    bottom: "1.5rem",
    right: "1.5rem",
    backgroundColor: "#28a745",
    color: "white",
    width: "50px",
    height: "50px",
    borderRadius: "50%",
    boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "1.5rem",
    border: "none",
    cursor: "pointer",
  },
};
