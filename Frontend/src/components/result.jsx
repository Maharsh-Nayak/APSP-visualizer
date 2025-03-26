import React, { useRef, useEffect } from "react";
import { Network } from "vis-network";

const APSPGraph = ({ matrix }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current && matrix) {
      const nodes = [];
      const edges = [];

      // Create nodes
      matrix.forEach((row, rowIndex) => {
        nodes.push({
          id: rowIndex,
          label: String.fromCharCode(65 + rowIndex),
        });

        row.forEach((col, colIndex) => {
          if (col.value !== Infinity && rowIndex !== colIndex) {
            edges.push({
              from: rowIndex,
              to: colIndex,
              label: `${col.value}`,
              color: col.changed ? "#00ff00" : "#ffffff",
              arrows: "to",
              font: { align: "middle" }
            });
          }
        });
      });

      const data = { nodes, edges };

      const options = {
        layout: {
        	improvedLayout: true,
          	hierarchical: {
	        enabled: false,
	        nodeSpacing: 10000,
	        treeSpacing: 500,
            levelSeparation: 250
	    }
        },
        edges: {
          smooth: {
            type: "dynamic"
          },
          shadow: true
        },
        nodes: {
          shape: "circle",
          size: 20,
          color: "#ffd700",
          font: {
            size: 18,
            color: "#ffffff"
          }
        },
        physics: {
          enabled: true,
          stabilization: { iterations: 1000 }
        }
      };

      const network = new Network(containerRef.current, data, options);

      return () => {
        network.destroy();
      };
    }
  }, [matrix]);

  return (
    <div
      ref={containerRef}
      style={{ width: "100%", height: "500px", background: "#333" }}
    />
  );
};

export default APSPGraph;
