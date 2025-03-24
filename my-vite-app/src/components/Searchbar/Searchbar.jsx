import { useState } from "react";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`http://localhost:9004/search?query=${query}`);
      if (!response.ok) throw new Error("Failed to fetch");

      const data = await response.json();

       console.log("----dattaaa",data)
      setResults(data);
    } catch (err) {
      setError("Error fetching data");
    } finally {
      setLoading(false);
    }
  };

   console.log("queryyyy=>>..",query)

  return (
    <div className="flex flex-col items-center p-6">
      <form onSubmit={handleSearch} className="w-full max-w-md">
        <div className="relative">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Search..."
          />
          <button
            type="submit"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white px-4 py-1 rounded-lg hover:bg-blue-600"
          >
            Search
          </button>
        </div>
      </form>

      {loading && <p className="mt-4 text-gray-500">Loading...</p>}
      {error && <p className="mt-4 text-red-500">{error}</p>}

      <ul className="mt-4 w-full max-w-md bg-white shadow-lg rounded-lg">
        {results.map((item) => (
          <li key={item._id} className="px-4 py-2 border-b last:border-b-0">
            {item.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
