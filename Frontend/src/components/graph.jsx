import React, { useRef, useEffect } from "react";
import { Network } from "vis-network";
// import "./graph.css"

const GraphComponent = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      const data = {
        nodes: [
          { id: 1, label: "A" },
          { id: 2, label: "B" },
          { id: 3, label: "C" },
        ],
        edges: [
          { from: 1, to: 2, label: "5" },
          { from: 1, to: 3, label: "3" },
          { from: 2, to: 3, label: "2" },
        ],
      };

      const options = {
        layout: {
          hierarchical: false,
        },
        edges: {
          color: "#ffffff",
          arrows: { to: true },
        },
        nodes: {
          font: {
            size: 20,
            color: "#fff",
          },
        },
      };

      new Network(containerRef.current, data, options);
    }
  }, []);

  return (
    <div className="example">
      <div
        ref={containerRef}
        className="graph-container"
        style={{ width: "100%", height: "500px" }}
      />
    </div>
  );
};

export default GraphComponent;
