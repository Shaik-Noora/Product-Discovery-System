import { useEffect, useState } from "react";
import AskQuery from "./AskQuery";
import ProductList from "./ProductList";

export default function App() {
  const [products, setProducts] = useState([]);
  const [aiProducts, setAiProducts] = useState(null);
  const [summary, setSummary] = useState("");
  const [query, setQuery] = useState("");

  useEffect(() => {
    fetch(`${import.meta.env.VITE_URL_API}/api/products`)
      .then(res => res.json())
      .then(data => setProducts(data));
  }, []);

  const handleResults = (data, q) => {
    setAiProducts(data.products);
    setSummary(data.summary);
    setQuery(q);
  };

  const clearResults = () => {
    setAiProducts(null);
    setSummary("");
    setQuery("");
  };

  return (
    <div className="min-h-screen px-6 md:px-16 py-12">

      <div className="text-center max-w-4xl mx-auto">
        <h1 className="heading-xl">
          Intelligent Product Discovery
        </h1>
        <p className="subtle-text mt-3">
          Ask naturally. Discover instantly. Decide confidently.
        </p>
      </div>

      <AskQuery onResults={handleResults} />

      {aiProducts && (
        <div className="max-w-6xl mx-auto mt-8 flex justify-between">
          <p className="subtle-text">
            Results for “{query}”
          </p>

          <button className="btn-ghost" onClick={clearResults}>
            Clear Results
          </button>
        </div>
      )}

      <ProductList
        products={aiProducts || products}
        summary={summary}
        aiMode={!!aiProducts}
      />
    </div>
  );
}