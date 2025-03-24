import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Visu = () => {
  const [matrix, setMatrix] = useState();
  const [ans, setAns] = useState();
  const [gotAns, setGotAns] = useState(false);
  const [error, setError] = useState(null);

  const handleMatrixInput = async () => {
    console.log(matrix);

    // https://apsp-visualizer-backed.onrender.com/

    try {
      const res = await axios.post('https://apsp-visualizer-backed.onrender.com/api/visualize', { matrix }, {
        headers: { 'Content-Type': 'application/json' }
      });

      console.log(res);

      if(res.status == 200){
        setGotAns(true);
        setAns(res.data.matrices);
        setError(null);
      }
      else{
        setError("Invalid matrix format or empty response.");
      }

    } catch (err) {
      console.error("Error occurred:", err);
      setError("Failed to process the matrix. Please check your input.");
    }

    setTimeout(() => setError(null), 3000);
  };

  return (
    <div className="min-h-screen w-screen bg-gray-900 text-white">
      
      {/* Header */}
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

        {/* Error Notification */}
        {error && (
          <div className="absolute top-5 right-5 bg-red-500 text-white px-6 py-4 rounded-lg shadow-lg z-50 animate-fade-in">
            🚫 {error}
          </div>
        )}

        {/* Matrix Input Section */}
        <div className="bg-gray-800 p-8 rounded-lg shadow-lg mb-10">
          <h2 className="text-3xl font-semibold mb-4">Enter Graph Matrix</h2>

          <textarea
            className="w-full h-40 p-4 bg-gray-700 text-white rounded-lg border-2 border-yellow-400 focus:outline-none focus:border-yellow-500"
            placeholder="Enter matrix (space separated rows)"
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

        {/* Matrix Display Section */}
        {gotAns && (
          <div className="space-y-10">
            {ans.map((matrix, matrixIndex) => (
              <div key={matrixIndex} className="bg-gray-800 p-6 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold mb-4 text-yellow-400">Matrix {matrixIndex + 1}</h2>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border border-gray-500">
                    <tbody>
                      {matrix.map((row, rowIndex) => (
                        <tr key={rowIndex} className="hover:bg-gray-700 transition-all">
                          {row.map((num, colIndex) => (
                            <td
                              key={colIndex}
                              className="border border-gray-400 px-6 py-4 text-center text-lg"
                            >
                              {num === Infinity ? "∞" : num}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
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
