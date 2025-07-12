import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const NewArrivals = () => {
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNewArrivals = async () => {
      try {
        setLoading(true);
        // Replace with your actual endpoint for new medicines or latest added
        const res = await axios.get(
          "https://medikart-server-pjna.onrender.com/api/medicines?limit=10&sort=createdAt&order=desc"
        );
        setMedicines(res.data.slice(0, 12));
      } catch (error) {
        console.error("Failed to fetch new arrivals:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchNewArrivals();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-32">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );

  return (
    <section className="p-6 max-w-7xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6 text-primary">New Arrivals</h2>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6"
      >
        {medicines.map((med) => (
          <motion.div
            key={med._id}
            whileHover={{ scale: 1.05 }}
            className="rounded-lg shadow p-4 flex flex-col items-center"
          >
            <img
              src={med.image || "/default-product.png"}
              alt={med.name}
              className="w-32 h-32 object-cover rounded-md mb-4"
            />
            <h3 className="font-semibold text-lg">{med.name}</h3>
            <p className="text-sm text-gray-600">{med.category}</p>
            <p className="mt-2 font-bold">${med.pricePerUnit.toFixed(2)}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default NewArrivals;
