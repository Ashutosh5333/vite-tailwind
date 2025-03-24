import React, { useEffect, useState, useRef } from 'react';

export default function BrowserIndex() {
  const dbName = "CartDB";
  const dbVersion = 1;
  const db = useRef(null); 

  const [cartItems, setCartItems] = useState([]);
  
  useEffect(() => {
    const request = indexedDB.open(dbName, dbVersion);

    request.onupgradeneeded = (event) => {
      db.current = event.target.result;
      if (!db.current.objectStoreNames.contains("cart")) {
        db.current.createObjectStore("cart", { keyPath: "id" });
      }
    };

    request.onsuccess = (event) => {
      db.current = event.target.result;
      loadCartItems();
    };

    request.onerror = (event) => {
      console.error("IndexedDB error:", event.target.errorCode);
    };
  }, []);

  const loadCartItems = () => {
    if (!db.current) return;
    const transaction = db.current.transaction(["cart"], "readonly");
    const store = transaction.objectStore("cart");
    const request = store.getAll();

     console.log("===store===",store)
    //   console.log("resulttt====",request.result)

    request.onsuccess = () => {
      setCartItems(request.result);
    };
  };

  console.log("----cartttitems====",cartItems)

  // Sample hardcoded products
  const sampleProducts = [
    { id: 1, name: "iPhone 14", price: 799, quantity: 1 },
    { id: 2, name: "Samsung Galaxy S23", price: 699, quantity: 1 },
    { id: 3, name: "MacBook Air M2", price: 1199, quantity: 1 },
  ];

  const addSampleProductsToCart = () => {
    if (!db.current) return;
    const transaction = db.current.transaction(["cart"], "readwrite");
    const store = transaction.objectStore("cart");

    sampleProducts.forEach((product) => {
      store.put(product);
    });

    setCartItems([...cartItems, ...sampleProducts]);
  };

  const removeItemFromCart = (id) => {
    if (!db.current) return;
    const transaction = db.current.transaction(["cart"], "readwrite");
    const store = transaction.objectStore("cart");
    store.delete(id);
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-xl font-bold mb-4 text-center">IndexedDB Cart</h2>
      
      <button
        onClick={addSampleProductsToCart}
        className="w-full mb-4 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
      >
        Add Sample Products
      </button>

      <ul className="space-y-2">
        {cartItems.map((item) => (
          <li
            key={item.id}
            className="flex justify-between items-center p-3 bg-gray-100 rounded-lg"
          >
            <span>{item.name} - ${item.price} x {item.quantity}</span>
            <button
              onClick={() => removeItemFromCart(item.id)}
              className="px-2 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}




// import React, { useEffect, useState, useRef } from 'react';

// export default function BrowserIndex() {
//   const dbName = "CartDB";
//   const dbVersion = 1;
//   const db = useRef(null); // Use a ref to persist db instance

//   const [cartItems, setCartItems] = useState([]);
//   const [input, setInput] = useState('');

//   useEffect(() => {
//     const request = indexedDB.open(dbName, dbVersion);

//     request.onupgradeneeded = (event) => {
//       db.current = event.target.result;
//       if (!db.current.objectStoreNames.contains("cart")) {
//         db.current.createObjectStore("cart", { keyPath: "id" });
//       }
//     };

//     request.onsuccess = (event) => {
//       db.current = event.target.result;
//       loadCartItems();
//     };

//     request.onerror = (event) => {
//       console.error("IndexedDB error:", event.target.errorCode);
//     };
//   }, []);

//   const loadCartItems = () => {
//     if (!db.current) return; // Ensure db is initialized
//     const transaction = db.current.transaction(["cart"], "readonly");
//     const store = transaction.objectStore("cart");
//     const request = store.getAll();

//     request.onsuccess = () => {
//       setCartItems(request.result);
//     };
//   };

//   const addItemToCart = () => {
//     console.log("cartttttttt addd");
//     if (!input.trim() || !db.current) return;

//     const transaction = db.current.transaction(["cart"], "readwrite");
//     const store = transaction.objectStore("cart");
//     const newItem = { id: Date.now(), name: input };

//     store.put(newItem);
//     setInput('');
//     setCartItems([...cartItems, newItem]);
//   };

//   const removeItemFromCart = (id) => {
//     if (!db.current) return;
//     const transaction = db.current.transaction(["cart"], "readwrite");
//     const store = transaction.objectStore("cart");
//     store.delete(id);
//     setCartItems(cartItems.filter(item => item.id !== id));
//   };

//   return (
//     <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow-md">
//       <h2 className="text-xl font-bold mb-4 text-center">IndexedDB Cart</h2>
//       <div className="flex gap-2 mb-4">
//         <input
//           type="text"
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//           placeholder="Enter item name"
//         />
//         <button
//           onClick={addItemToCart}
//           className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
//         >
//           Add
//         </button>
//       </div>

//       <ul className="space-y-2">
//         {cartItems.map((item) => (
//           <li
//             key={item.id}
//             className="flex justify-between items-center p-3 bg-gray-100 rounded-lg"
//           >
//             <span>{item.name}</span>
//             <button
//               onClick={() => removeItemFromCart(item.id)}
//               className="px-2 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600"
//             >
//               Remove
//             </button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }
