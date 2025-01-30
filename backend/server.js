const express = require("express");
const cors = require("cors");
const policyRoutes = require("./routes/policyRoutes");

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api", policyRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`✅ Backend running on http://localhost:${PORT}`);
});