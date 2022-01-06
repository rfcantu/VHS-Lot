const express = require("express");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "http://vhslot.com/",
};

app.use(cors(corsOptions));

// Parse requests of content type - application/json
app.use(express.json());

// Parse requests of content type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// Simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome welcome welcome" });
});

// Set port and listen for requests
require("../App/Routes/VHS.routes")(app);
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const db = require("../App/Models");
db.sequelize.sync();

// Sync during development
/*db.sequelize.sync(
  { force: true }.then(() => {
    console.log("Drop and resync db");
  })
);*/
