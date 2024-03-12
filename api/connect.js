import mysql from "mysql";
import dotenv from "dotenv";
dotenv.config();

console.log(process.env.DB_USER);
export const db = mysql.createConnection({
  host: "sql11.freesqldatabase.com",
  user: "sql11690135",
  password: "EXVvq3iAeX",
  database: "sql11690135",
});

db.connect(function (err) {
  if (err) {
    console.log(err);
  } else {
    console.log("connected");
  }
});
