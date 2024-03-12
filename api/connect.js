import mysql from "mysql";
import dotenv from "dotenv";
dotenv.config();

console.log(process.env.DB_USER);
export const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect(function (err) {
  if (err) {
    console.log(err);
  } else {
    console.log("connected");
  }
});
