const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cron = require("node-cron");
const userRoutes = require("./routes/user.js");
const {
  router: investmentRoutes,
  dailyProfit,
} = require("./routes/investment.js");

dotenv.config();
const app = express();
const port = process.env.PORT || 3001;
app.use(express.json());
app.use(userRoutes);
app.use(investmentRoutes);

cron.schedule("* * * * *", async () => {
  await dailyProfit();
  //every minute
});

// cron.schedule("0 0,8,16 * * *", async () => {
//   await dailyProfit();
//   // Midnight (UTC time)
//   // 8:00 AM (UTC time)
//   // 4:00 PM (UTC time)
// });

mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(port, () => {
      console.log(`App connected to Port: ${port}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
