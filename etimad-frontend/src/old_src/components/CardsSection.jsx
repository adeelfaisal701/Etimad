import Card from "./Card";
import { useEffect, useState } from "react";
import API from "../../api/axios";
import { Link } from "react-router-dom";

export default function CardsSection() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get("/products")
      .then((res) => setProducts(res.data))
      .catch(() => alert("Failed to load products"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="cards-center">
        <p className="cards-loading">Loading products...</p>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="cards-center">
        <div className="cards-empty-box">
          <div className="cards-icon">🛍️</div>
          <h2 className="cards-title">No Products Found</h2>
          <p className="cards-subtitle">
            Looks like there are no products available right now.
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <style>{`
        .cards-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 30px;
          padding: 30px;
          background: #22666B;
          min-height: 100vh;
        }

        @media (max-width: 1024px) {
          .cards-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 20px;
            padding: 20px;
          }
        }

        @media (max-width: 600px) {
          .cards-grid {
            grid-template-columns: 1fr;
            gap: 16px;
            padding: 16px;
          }
        }

        .cards-center {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 60vh;
          background: #22666B;
        }

        .cards-empty-box {
          text-align: center;
          padding: 40px;
          border-radius: 16px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.1);
        }

        .cards-icon {
          font-size: 50px;
          margin-bottom: 10px;
        }

        .cards-title {
          margin: 10px 0;
          color: #fff;
        }

        .cards-subtitle {
          color: #fff;
        }

        .cards-loading {
          color: #fff;
          font-size: 18px;
        }

        .cards-link {
          text-decoration: none;
        }
      `}</style>

      <div className="cards-grid">
        {products.map((item) => (
          <Link className="cards-link" key={item._id} to={`/product/${item._id}`}>
            <Card
              title={item.name}
              img={`http://localhost:5000${item.image}`}
              price={item.price}
            />
          </Link>
        ))}
      </div>
    </>
  );
}