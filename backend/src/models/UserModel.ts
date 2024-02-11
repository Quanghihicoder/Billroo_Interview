import { Response } from "express";
// import connection
import db from "../config/database";

export const getDaysSinceJoin = (user_id: string, response: Response) => {
    db.query(
        `SELECT extract('day' from (CURRENT_TIMESTAMP - (select user_joining_date from "user" where user_id = ${user_id})))+1 AS days_since_join;`,
        (err, results) => {
            if (err) {
                console.log(err)
            } else {
                response.json(results.rows[0].days_since_join)
            }
        }
    );
};
