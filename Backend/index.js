import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import mysql from "mysql2";
import fs from "fs";
import cron from "node-cron";
import { getMembersWithDuePayments } from "./Controller/memberController.js";
import userRoutes from "./Routes/userRoutes.js";
import memberRoutes from "./Routes/memberRoutes.js";

dotenv.config();

const app = express();
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

app.listen(5000, () => {
    console.log("✅ Server is running on port 5000");
});

app.use("/api/users", userRoutes);
app.use("/api/members", memberRoutes);

// Schedule the function to run every day at 8 AM
cron.schedule("0 8 * * *", () => {
    console.log("Checking for due payments...");
    getMembersWithDuePayments();
  });
// ✅ Read SQL script before using it
const sqlScript = fs.readFileSync('db.sql', 'utf8');

// 🌟 Create MySQL connection pool
export const db = mysql.createPool({
    connectionLimit: 10,
    host: "localhost",
    user: "root",
    password: "",
    database: "gym_db",
    waitForConnections: true,
    queueLimit: 0,
    multipleStatements: true // ✅ Allow executing multiple queries at once
});

// ✅ Properly execute SQL script
db.getConnection((err, connection) => {
    if (err) {
        console.error('❌ Error connecting to MySQL:', err);
        return;
    }
    console.log('✅ Connected to MySQL database');

    connection.query(sqlScript, (err, results) => {
        if (err) {
            console.error('❌ Error executing SQL script:', err);
        } else {
            console.log('✅ Database and tables created successfully.');
        }
        connection.release(); // ✅ Release the connection
    });
});
