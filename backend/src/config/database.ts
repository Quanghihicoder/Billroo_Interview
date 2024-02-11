import {Client} from "pg";

const db: Client = new Client({
    database: "billroo",
    host: "localhost",
    port: 5432,
    user: "postgres",
    password: "2508"
})

db.connect((err) => {
    if (err) throw err;
})

export default db

