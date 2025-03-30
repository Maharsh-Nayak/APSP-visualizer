import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import nodemailer from 'nodemailer';
import {connect} from 'mongoose';
import mongoose from "mongoose"

const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors({
  // origin: "http://localhost:5173",
  origin: "https://apsp-visualizer-frontend.onrender.com",
  credentials: true,
}));

connect('mongodb+srv://maharshnayak5:hRrrdpfdYFaDfEd9@cluster0.t0bqm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ Connected to MongoDB"))
.catch((err) => console.error("❌ MongoDB Connection Error:", err));

const feedbackSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Feedback = mongoose.model('Feedback', feedbackSchema);

app.post('/api/visualize', (req, res) => {
  
  const { matrix } = req.body;

  console.log(typeof matrix);

  const m1 = matrix.split('\n').map(row => row.trim().split(/\s+/).map(num => ({
    value: (num === 'INF' ? Infinity : Number(num)),
    changed: false
  })));
  
  const size = m1[0].length;

  console.log(m1);

  if (m1.every(row => row.length === size)) {
    console.log("array is proper");

    const matrices = [];

    const deepCloneMatrix = (matrix) => 
      matrix.map(row => row.map(cell => ({ ...cell }))); 

    matrices.push(deepCloneMatrix(m1));  // Add initial state

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

app.post("/api/feedback" , async (req, res) => {
  const {formData} = req.body;
  console.log(formData);

  const name=formData.name;
  const email=formData.email;
  const message=formData.message;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const newFeedback = new Feedback({ name, email, message });
  try{
    await newFeedback.save();
    console.log('Feedback saved to MongoDB');
  }
  catch(err){
    console.log(err);
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',  
    auth: {
      user: 'maharshnayak5@gmail.com', 
      pass: 'zcxz dftu nqpy vnqr'  
    }
  });

  const mailOptions = {
    from: '"PathVisualizer Support" maharshnayak5@gmail.com',
    to: email,
    subject: "Feedback Received ✔️",
    html: `
      <h2>Thank you for your feedback, ${name}!</h2>
      <p>We have received your message and appreciate your input.</p>
      <p><strong>Your Feedback:</strong></p>
      <blockquote>${message}</blockquote>
      <p>We will review it and get back to you if necessary.</p>
      <br>
      <p>Best regards,</p>
      <p>The PathVisualizer Team</p>
    `
  };
  try {
    await transporter.sendMail(mailOptions);
    console.log("Sent !!!");
    res.status(200).json({ message: "Feedback submitted and email sent!" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ error: "Failed to send email" });
  }
});



app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
