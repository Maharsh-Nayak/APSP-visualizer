const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors({
  origin: "http://localhost:5173",
  //origin: "https://inquiro-1.onrender.com",
  credentials: true,
}));

app.post('/api/visualize', (req, res) => {
  console.log('Headers:', req.headers);
  console.log('Body:', req.body);
  const {matrix}=req.body;
  console.log(matrix);

  const m1 = matrix.split('\n').map(row => row.trim().split(/\s+/).map(num => (num==='inf' ? Infinity : Number(num))));
  let size=m1[0].length;

  console.log(m1);

  if(m1.every(res => res.length === size)){
    console.log("array is proper");

    const matrices = [];
    matrices.push(m1);

    for (let k = 0; k < size; k++) {
        for (let i = 0; i < size; i++) {
            for (let j = 0; j < size; j++) {
                m1[i][j] = Math.min(m1[i][j], m1[i][k] + m1[k][j]);
            }
        }
        matrices.push(m1);
    }

    res.status(200).json({matrices});
  }
  else{
    console.log("not proper array");
    res.status(500);
  }

})

app.listen(port, () => {
	console.log('server is on');
});
