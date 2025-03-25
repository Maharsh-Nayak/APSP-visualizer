const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors({
  // origin: "http://localhost:5173",
  origin: "https://apsp-visualizer-frontend.onrender.com",
  credentials: true,
}));

app.post('/api/visualize', (req, res) => {
  
  const { matrix } = req.body;

  console.log(typeof matrix);

  // Parsing matrix input into object array with { value, changed }
  const m1 = matrix.split('\n').map(row => row.trim().split(/\s+/).map(num => ({
    value: (num === 'INF' ? Infinity : Number(num)),
    changed: false
  })));
  
  const size = m1[0].length;

  console.log(m1);

  if (m1.every(row => row.length === size)) {
    console.log("array is proper");

    const matrices = [];

    // Correct deep clone function
    const deepCloneMatrix = (matrix) => 
      matrix.map(row => row.map(cell => ({ ...cell }))); 

    matrices.push(deepCloneMatrix(m1));  // Add initial state

    // Apply APSP (Floyd-Warshall) algorithm
    for (let k = 0; k < size; k++) {
      for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
          let newv = m1[i][k].value + m1[k][j].value;
          if (m1[i][j].value > newv) {
            m1[i][j].value = newv;
            m1[i][j].changed = true;
          }
        }
      }
      matrices.push(deepCloneMatrix(m1));  // Add clone at each step
    }

    console.log("Final matrices:", matrices);

    // Replace Infinity with 'INF' for the response
    const replaceInfinity = (matrix) => 
      matrix.map(row => 
        row.map(cell => ({
          ...cell,
          value: cell.value === Infinity ? 'INF' : cell.value
        }))
      );

    const matricesWithINF = matrices.map(replaceInfinity);

    res.status(200).json({ matrices: matricesWithINF });

  } else {
    console.log("Invalid matrix format");
    res.status(500).send("Invalid matrix format");
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
