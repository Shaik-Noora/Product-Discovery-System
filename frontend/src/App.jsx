import { useEffect, useState } from "react";
import AskQuery from "./AskQuery";
import ProductList from "./ProductList";

export default function App() {
  const [products, setProducts] = useState([]);
  const [aiProducts, setAiProducts] = useState(null);
  const [summary, setSummary] = useState("");
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true); // loader state

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/products`)
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleResults = (data) => {
    setAiProducts(data.products);
    setSummary(data.summary);
  };

  const clearResults = () => {
    setAiProducts(null);
    setSummary("");
    setQuery("");
  };

  return (
    <div className="min-h-screen px-4 md:px-12 py-10">

      {/* HERO */}
      <div className="text-center max-w-5xl mx-auto">
        <h1 className="heading-xl">
          Intelligent Product Discovery
        </h1>
        <p className="subtle-text mt-3">
          Ask naturally. Discover instantly. Decide confidently.
        </p>
      </div>

      <AskQuery
        query={query}
        setQuery={setQuery}
        onResults={handleResults}
      />

      {aiProducts && (
        <div className="max-w-5xl mx-auto mt-8 flex justify-between items-center">
          <p className="subtle-text">
            Results for “{query}”
          </p>

          <button className="btn-ghost" onClick={clearResults}>
            ✕ Clear Results
          </button>
        </div>
      )}

      {/* LOADER */}
      {loading ? (
        <div className="flex justify-center items-center mt-20">
          <div className="loader"></div>
        </div>
      ) : (
        <ProductList
          products={aiProducts || products}
          summary={summary}
          aiMode={!!aiProducts}
        />
      )}
    </div>
  );
}
