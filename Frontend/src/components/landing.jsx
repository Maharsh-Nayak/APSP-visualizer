import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import APSPGraph from './graph';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { materialDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

// APSP Code Snippets (moved outside the component)
const apspCodeSnippets = {
  Cpp: `
    #include <iostream>
    #include <vector>
    #include <climits>
    using namespace std;

    #define INF INT_MAX

    void floydWarshall(vector<vector<int>>& dist) {
      int n = dist.size();
      for (int k = 0; k < n; ++k) {
          for (int i = 0; i < n; ++i) {
              for (int j = 0; j < n; ++j) {
                  if (dist[i][k] != INF && dist[k][j] != INF) {
                      dist[i][j] = min(dist[i][j], dist[i][k] + dist[k][j]);
                  }
              }
          }
      }
    }
  `,
  Java: `
    import java.util.Arrays;

    public class APSP {
        final static int INF = 99999;

        void floydWarshall(int graph[][]) {
            int n = graph.length;
            int dist[][] = new int[n][n];

            for (int i = 0; i < n; i++)
                System.arraycopy(graph[i], 0, dist[i], 0, n);

            for (int k = 0; k < n; k++) {
                for (int i = 0; i < n; i++) {
                    for (int j = 0; j < n; j++) {
                        if (dist[i][k] + dist[k][j] < dist[i][j])
                            dist[i][j] = dist[i][k] + dist[k][j];
                    }
                }
            }

            // Print the solution
            for (int[] row : dist) {
                System.out.println(Arrays.toString(row));
            }
        }
    }
  `
};

const LandingPage = () => {
  const [language, setLanguage] = useState("Cpp");
  const [clipboard, setCopySuccess] = useState("");

  // Move the copy function inside the component
  const copyToClipboard = () => {
    navigator.clipboard.writeText(apspCodeSnippets[language])
      .then(() => {
        setCopySuccess("Copied!");
        console.log("Copied!");
        setTimeout(() => setCopySuccess(""), 2000);
      })
      .catch(err => console.error("Failed to copy!", err));
  };

  return (
    <div className="min-h-screen w-screen bg-gradient-to-br from-blue-700 via-purple-800 to-indigo-900 flex flex-col items-center justify-center text-white">

      <main className="text-center px-12 py-16">
        <h1 className="text-7xl font-extrabold leading-tight">
          Visualize <span className="text-yellow-300">All-Pair</span> <br />
          Shortest Path Algorithm
        </h1>

        <p className="text-2xl mt-8 max-w-4xl mx-auto leading-relaxed text-gray-300">
          Gain a deeper understanding of graph algorithms with interactive and dynamic visualizations.
        </p>

        <div className="mt-20 w-full flex flex-col items-center">
          <h2 className="text-5xl font-bold text-yellow-400 mb-10">
            How APSP Works
          </h2>

          <div className="flex flex-wrap justify-center gap-10 items-center">
            <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-[600px] h-[400px] flex justify-center items-center">
              <APSPGraph />
            </div>

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

        <br /><br /><br />

        {/* Centered Code Segment */}
        <div className="flex justify-center items-center min-h-screen">
          <div className="max-w-4xl w-full bg-gray-800 shadow-lg rounded-xl p-8">
            <h1 className="text-3xl font-bold mb-6 text-center">All-Pairs Shortest Path (APSP)</h1>

            <div className="flex justify-center gap-4 mb-6">
              {Object.keys(apspCodeSnippets).map((lang) => (
                <button
                  key={lang}
                  onClick={() => setLanguage(lang)}
                  className={`bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md transition-transform transform hover:scale-105 ${
                    language === lang ? "bg-green-500" : ""
                  }`}
                >
                  {lang}
                </button>
              ))}
            </div>

            {/* Code Display */}
            <div className="relative mt-6 border border-gray-700 rounded-lg overflow-hidden shadow-lg">
              {/* Copy Button */}
              <button
                onClick={copyToClipboard}
                className="absolute top-3 right-3 bg-blue-500 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-600 transition border border-red-500 z-50"
              >
                {clipboard || "Copy"}
              </button>

              {/* Code Block */}
              <SyntaxHighlighter language={language.toLowerCase()} style={materialDark}>
                {apspCodeSnippets[language]}
              </SyntaxHighlighter>
            </div>
          </div>
        </div>

        <div className="mt-20">
          <p className="text-4xl font-bold text-yellow-400 mb-10">
            Compare Different Pathfinding Algorithms
          </p>

          <div className="mt-16">
            <Link
              to="/visualize"
              className="px-16 py-6 bg-yellow-400 text-gray-900 text-3xl font-bold rounded-full shadow-lg hover:bg-yellow-500 transition-all transform hover:scale-110"
            >
              Get Started
            </Link>
          </div>
        </div>
      </main>

      <footer className="mt-20 w-full text-center py-8 text-lg text-gray-300 border-t border-gray-600">
        © {new Date().getFullYear()} PathVisualizer. All Rights Reserved.
      </footer>
    </div>
  );
};

export default LandingPage;
