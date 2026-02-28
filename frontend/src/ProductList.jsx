import { useState } from "react";

export default function ProductList({ products, summary, aiMode }) {
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = [
    "All",
    ...new Set(products.map(p => p.category))
  ];

  const filtered =
    activeCategory === "All"
      ? products
      : products.filter(p => p.category === activeCategory);

  if (!products?.length) {
    return (
      <p className="text-center mt-16 subtle-text">
        No products found.
      </p>
    );
  }

  return (
    <div className="max-w-6xl mx-auto mt-10">

      {/* SUMMARY */}
      {aiMode && summary && (
        <div className="glass p-5 mb-8">
          {summary}
        </div>
      )}

      {/* CATEGORY TABS */}
      {!aiMode && (
        <div className="flex gap-2 flex-wrap mb-8">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-sm border
              ${
                activeCategory === cat
                  ? "bg-blue-500 text-white border-blue-500"
                  : "bg-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      {/* GRID */}
      <div className="grid gap-5
        grid-cols-1
        sm:grid-cols-2
        lg:grid-cols-3">

        {filtered.map(product => (
          <div key={product.id} className="product-card">

            {/* IMAGE FIX */}
            <div className="h-40 bg-gray-50 flex items-center justify-center">
              <img
                src={`http://localhost:5000${product.image}`}
                alt={product.name}
                className="max-h-full object-contain p-4"
              />
            </div>

            <div className="p-4">

              <h3 className="font-semibold text-base">
                {product.name}
              </h3>

              <p className="text-sm subtle-text">
                {product.category}
              </p>

              <p className="text-sm mt-2 text-gray-600 line-clamp-2">
                {product.description}
              </p>

              {/* TAGS */}
              {product.tags && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {product.tags.map(tag => (
                    <span key={tag} className="tag">
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              <div className="mt-4 font-semibold text-blue-600">
                ${product.price}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}