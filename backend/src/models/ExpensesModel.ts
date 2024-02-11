import { Response } from "express";

// import connection
import db from "../config/database";

export const getRecentSpend = (user_id: string, response: Response) => {
    db.query(
        `SELECT expense_type.expense_id, coalesce(b.sum,0) AS expense_last_seven_days
        FROM expense_type
        LEFT JOIN 
            (SELECT expense_id, SUM(expense_amount) AS sum
            FROM expenses
            WHERE expense_date >= '2024-01-28'::timestamp - interval '6 days' AND expenses.user_id = 91235
            GROUP BY expense_id) 
        AS b
        ON expense_type.expense_id = b.expense_id
        ORDER BY expense_id ASC;`,
        (err, results) => {
            if (err) {
                console.log(err)
            } else {
                var data: number[] = []
                results.rows.forEach((row) => {
                    data.push(row.expense_last_seven_days)
                });
                response.json(data)
            }
        }
    );
};

export const getAllAverByWeek = (user_id: string, response: Response) => {
    db.query(
        `SELECT expense_type.expense_id, coalesce(b.aver,0) AS average_all_time_by_week
        FROM expense_type
        LEFT JOIN 
            (SELECT expense_id, ROUND(SUM(expense_amount)/(extract('day' from ('2024-01-28'::timestamp - (select user_joining_date from "user" where user_id = ${user_id})))+1) * 7) AS aver
            FROM expenses
            WHERE user_id = ${user_id}
            GROUP BY expense_id) 
        AS b
        ON expense_type.expense_id = b.expense_id
        ORDER BY expense_id ASC;`,
        (err, results) => {
            if (err) {
                console.log(err)
            } else {
                var data: number[] = []
                results.rows.forEach((row) => {
                    data.push(row.average_all_time_by_week)
                });
                response.json(data)
            }
        }
    );
};

export const getTodaySpend = (user_id: string, response: Response) => {
    db.query(
        `SELECT expense_type.expense_id, coalesce(b.expense_amount,0) AS expense_today
        FROM expense_type
        LEFT JOIN 
            (SELECT expense_id, expense_amount 
            FROM expenses 
            WHERE expense_date = '2024-01-28' AND user_id = ${user_id}) 
        AS b 
        ON expense_type.expense_id = b.expense_id
        ORDER BY expense_type.expense_id ASC;`,
        (err, results) => {
            if (err) {
                console.log(err)
            } else {
                var data: number[] = []
                results.rows.forEach((row) => {
                    data.push(row.expense_today)
                });
                response.json(data)
            }
        }
    );
};


export const getAllTimeSpend = (user_id: string, response: Response) => {
    db.query(
        `SELECT expense_type.expense_id, coalesce(b.sum_amount,0) AS expense_so_far
        FROM expense_type
        LEFT JOIN 
            (SELECT expense_id, SUM(expense_amount) AS sum_amount 
            FROM expenses 
            WHERE user_id = ${user_id} 
            GROUP BY expense_id) 
        AS b 
        ON expense_type.expense_id = b.expense_id
        ORDER BY expense_type.expense_id ASC;`,
        (err, results) => {
            if (err) {
                console.log(err)
            } else {
                var data: number[] = []
                results.rows.forEach((row) => {
                    data.push(row.expense_so_far)
                });
                response.json(data)
            }
        }
    );
};


export const updateTodayExpenses = (user_id: number, expenses: number[]) => {
    db.query(
        `DELETE FROM expenses
        WHERE user_id = ${user_id} AND expense_date = '2024-01-28';`,
        (err, res) => {
            if (err) {
                console.log(err)
            } 
        }
    );

    var queryString: string = ""

    queryString += `INSERT INTO "expenses" (user_id, expense_id, expense_date, expense_amount) VALUES `

    if (expenses[0] > 0) {
        queryString +=  `(${user_id}, 1, '2024-01-28', ${expenses[0]}),`
    }

    if (expenses[1] > 0) {
        queryString +=  `(${user_id}, 2, '2024-01-28', ${expenses[1]}),`
    }

    if (expenses[2] > 0) {
        queryString +=  `(${user_id}, 3, '2024-01-28', ${expenses[2]}),`
    }

    queryString = queryString.slice(0, -1);

    queryString += ";"

    db.query(
        queryString,
        (err, res) => {
            if (err) {
                console.log(err)
            } 
        }
    )
};

