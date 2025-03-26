import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import APSPGraph from './result';

const Visu = () => {
  const [matrix, setMatrix] = useState();
  const [ans, setAns] = useState();
  const [gotAns, setGotAns] = useState(false);
  const [error, setError] = useState(null);

  const handleMatrixInput = async () => {
    console.log(matrix);

    try {
      const res = await axios.post('https://apsp-visualizer-backed.onrender.com/api/visualize', { matrix }, {
        headers: { 'Content-Type': 'application/json' }
      });

      console.log(res);

      if (res.status === 200) {
        setGotAns(true);
        setAns(res.data.matrices);
        setError(null);
      } else {
        setError("Invalid matrix format or empty response.");
      }

    } catch (err) {
      console.error("Error occurred:", err);
      setError("Failed to process the matrix. Please check your input.");
    }

    setTimeout(() => setError(null), 3000);
  };

  return (
    <div className="min-h-screen w-screen bg-gray-900 text-white font-sans">

      <div className="flex justify-between items-center px-10 py-5 bg-gray-800 shadow-lg">
        <h1 className="text-4xl font-bold">APSP Visualization</h1>
        <Link 
          to="/" 
          className="px-6 py-3 bg-yellow-400 text-gray-900 rounded-lg shadow-lg hover:bg-yellow-500 transition-all"
        >
          ← Back to Home
        </Link>
      </div>

      <div className="p-10 relative">

        {error && (
          <div className="absolute top-5 right-5 bg-red-500 text-white px-6 py-4 rounded-lg shadow-lg z-50 animate-fade-in">
            🚫 {error}
          </div>
        )}

        <div className="bg-gray-800 p-8 rounded-lg shadow-lg mb-10">
          <h2 className="text-3xl font-semibold mb-4">Enter Graph Matrix</h2>

          <textarea
            className="w-full h-40 p-4 bg-gray-700 text-white rounded-lg border-2 border-yellow-400 focus:outline-none focus:border-yellow-500"
            placeholder="Enter matrix (space-separated rows)"
            value={matrix}
            onChange={(e) => setMatrix(e.target.value)}
          />

          <button
            onClick={handleMatrixInput}
            className="mt-4 px-6 py-3 bg-yellow-400 text-white-900 rounded-lg shadow-lg hover:bg-yellow-500 transition-all"
          >
            Visualize Graph
          </button>
        </div>

        {gotAns && (
          <div className="space-y-10">
            {ans.map((matrix, matrixIndex) => (
              <div 
                key={matrixIndex} 
                className="bg-gray-800 p-8 rounded-lg shadow-xl"
              >
                <h2 className="text-2xl font-bold mb-4 text-yellow-400">Matrix {matrixIndex + 1}</h2>

                <div className="max-w-full max-h-[400px] border border-gray-700 rounded-lg shadow-inner">
                  <table className="w-full border-collapse">
                    <tbody>
                      {matrix.map((row, rowIndex) => (
                        <tr key={rowIndex} className="hover:bg-gray-700 transition-all">
                          {row.map((num, colIndex) => (
                            <td
                              key={colIndex}
                              className={`border border-gray-500 px-6 py-4 text-center text-lg 
                                transition-all duration-300
                                ${
                                  num.changed 
                                    ? "bg-blue-500 text-white" 
                                    : "bg-gray-700 text-gray-300"
                                }`}
                            >
                              {num.value === Infinity ? "INF" : num.value}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="bg-gray-900 p-10 rounded-lg shadow-xl mt-8">
                  <h3 className="text-xl font-semibold text-yellow-300 mb-4">Graph Visualization</h3>
                  <div className="flex justify-center items-center">
                    <div 
                      className="w-full max-w-[800px] h-[500px] bg-gray-700 border-2 border-yellow-400 rounded-lg shadow-lg transition-transform hover:scale-105"
                    >
                      <APSPGraph matrix={matrix} />
                    </div>
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Visu;