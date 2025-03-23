import React from 'react';
import { Link } from 'react-router-dom';
import APSPGraph from './graph';

const LandingPage = () => {
  return (
    <div className="min-h-screen w-screen bg-gradient-to-br from-blue-700 via-purple-800 to-indigo-900 flex flex-col items-center justify-center text-white">

      {/* Main Content */}
      <main className="text-center px-12 py-16">

        {/* Hero Section */}
        <h1 className="text-7xl font-extrabold leading-tight">
          Visualize <span className="text-yellow-300">All-Pair</span> <br />
          Shortest Path Algorithm
        </h1>

        <p className="text-2xl mt-8 max-w-4xl mx-auto leading-relaxed text-gray-300">
          Gain a deeper understanding of graph algorithms with interactive and dynamic visualizations.
        </p>

        {/* APSP Showcase Section */}
        <div className="mt-20 w-full flex flex-col items-center">
          <h2 className="text-5xl font-bold text-yellow-400 mb-10">
            How APSP Works
          </h2>

          <div className="flex flex-wrap justify-center gap-10 items-center">
            {/* Graph Visualization (Static for Now) */}
            <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-[600px] h-[400px] flex justify-center items-center">
              {/*<p className="text-3xl text-gray-300">*/}
                <div className="flex justify-center">
                  <APSPGraph />
                </div>
              {/*</p>*/}
            </div>

            {/* Explanation */}
            <div className="max-w-2xl text-left text-lg leading-relaxed">
              <p className="mb-6">
                The **All-Pair Shortest Path (APSP)** algorithm calculates the 
                shortest paths between all pairs of nodes in a weighted graph. 
                It finds the most efficient routes by iteratively considering 
                all possible paths between every pair of vertices.
              </p>

              <h3 className="text-2xl font-semibold text-yellow-300 mb-4">🔍 Steps Involved:</h3>
              <ul className="list-disc list-inside space-y-4">
                <li>Initialize the **distance matrix** with edge weights.</li>
                <li>Iterate over intermediate nodes and update paths.</li>
                <li>Use algorithms like **Floyd-Warshall** or **Johnson’s** to find the optimal paths.</li>
                <li>Update the distance table iteratively.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Comparison Section */}
        <div className="mt-20">
          <p className="text-4xl font-bold text-yellow-400 mb-10">
            Compare Different Pathfinding Algorithms
          </p>

          <div className="overflow-x-auto">
            <table className="table-auto w-full border-collapse border border-gray-500 rounded-lg shadow-lg text-lg">
              <thead className="bg-gray-700 text-gray-300">
                <tr>
                  <th className="py-4 px-8">Algorithm</th>
                  <th className="py-4 px-8">Time Complexity</th>
                  <th className="py-4 px-8">Space Complexity</th>
                  <th className="py-4 px-8">Graph Type</th>
                  <th className="py-4 px-8">Optimal For</th>
                  <th className="py-4 px-8">Drawbacks</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Floyd-Warshall", "O(V³)", "O(V²)", "Weighted/Unweighted", "Dense Graphs", "Inefficient for sparse graphs"],
                  ["Dijkstra", "O(V²) or O((V + E) log V)", "O(V²) or O(E + V)", "Weighted (non-negative)", "Single-source SP on dense graphs", "Fails with negative weights"],
                  ["Bellman-Ford", "O(VE)", "O(V)", "Weighted (negative edges allowed)", "Single-source SP on sparse graphs", "Slower for dense graphs"],
                  ["Johnson's Algorithm", "O(V² log V + VE)", "O(V²)", "Weighted (negative edges allowed)", "All-pairs SP on sparse graphs", "Complex to implement"],
                  ["BFS (Breadth-First Search)", "O(V + E)", "O(V)", "Unweighted", "Unweighted graphs", "Cannot handle weights"],
                  ["A* (A-star)", "O(E) (depends on heuristic)", "O(V)", "Weighted (non-negative)", "Fast pathfinding (heuristic-based)", "Needs a good heuristic"]
                ].map((row, index) => (
                  <tr key={index} className={`text-center ${index % 2 === 0 ? "bg-gray-800" : "bg-gray-700"} hover:bg-gray-600 transition-all`}>
                    {row.map((cell, i) => (
                      <td key={i} className="py-5 px-8 border border-gray-600">{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* CTA Button */}
        <div className="mt-16">
          <Link
            to="/visualize"
            className="px-16 py-6 bg-yellow-400 text-gray-900 text-3xl font-bold rounded-full shadow-lg hover:bg-yellow-500 transition-all transform hover:scale-110"
          >
            Get Started
          </Link>
        </div>

      </main>

      {/* Footer */}
      <footer className="mt-20 w-full text-center py-8 text-lg text-gray-300 border-t border-gray-600">
        © {new Date().getFullYear()} PathVisualizer. All Rights Reserved.
      </footer>
    </div>
  );
};

export default LandingPage;
