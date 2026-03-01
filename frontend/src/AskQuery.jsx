import { useState } from "react";

export default function AskQuery({ onResults }) {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);

  const askAI = async () => {
    if (!query.trim()) return;

    setLoading(true);

    const res = await fetch(`${import.meta.env.VITE_URL_API}/api/ask`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ query })
    });

    const data = await res.json();

    onResults(data, query);

    setLoading(false);
  };

  return (
    <div className="glass p-4 mt-8 max-w-3xl mx-auto flex gap-3">
      <input
        className="ai-input"
        placeholder="Ask something like — college laptop or gaming keyboard"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && askAI()}
      />

      <button className="btn-primary" onClick={askAI}>
        {loading ? "Thinking..." : "Ask"}
      </button>
    </div>
  );
}