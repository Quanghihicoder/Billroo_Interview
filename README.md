## Set-Up

### Installation:
1) Pull the code.
2) MANUALLY create a database in POSTGRES (e.g., pgAdmin 4).
3) Paste the initialization SQL script in ./backend/init_script/initTable.sql and run it.
4) Perform the npm install command.
5) Change the db config to your setting
6) Open two terminals for frontend and backend: in the frontend terminal, run "npm start," and in the backend terminal, run "npm run start."
7) Enjoy!

### Test Data:
1) Switch to the branch named "test."
2) Make sure to DROP all tables, then run the SQL script again: ./backend/init_script/initTable.sql.
3) I made some configurations to work with test data, but there were no major algorithm changes. Check the commit "951a5e6" if you want to see it.
4) Change the user ID at line 7 in ./billroo/src/pages/Home.tsx.

## Note:
### IMPORTANT:
1) I did not use Redux to store the user_id between the "home" and "add" pages. It is sent via the router/link. So please DO NOT reload the "add" page or use the back button on the browser or your mouse. Use the buttons on the web, and everything will be good.
2) It is not a bug; it is a feature. Feel free to enter $0 for "add expenses" because it will never be saved to the system. Only the row that has data will be saved. The user should not be forced to enter $1 :). For example, some days I don't buy any drinks.
3) My app uses real-time data, so the average should be calculated from the day the user joins the app.
4) I did not store any useless data like 0 expense amount. If the data is missing/null, the backend will understand it as 0 and perform the calculation normally. Real users do not add expenses every day.
5) When you read the backend query, you only need to read from the "LEFT JOIN" to "AS b" because I want the backend to always respond with [coffee, food, alcohol], even if one of them is 0. The handling is reduced in the frontend.

## MORE TEST:
### BACK TO MASTER, DROP ALL TABLES, RUN SQL AGAIN:
1) user_id: 1 - scenario: the user never drinks, so handle the case to show $0.
2) user_id: 2 - scenario: brand new user with no data, it will only show "today."
3) user_id: 3 - scenario: created on 10 Feb, at your test time the user may not have 7 days of data, but the app still works fine without any issues.

## SOME EXPLANATION:
The main feature is calculated as follows:

AVERAGE ALL TIME = (SUM OF ALL TIME / (NOW - DATE JOINED)) * 7 (inclusive)

PERCENTAGE = SUM OF NOW TO LAST 7 DAYS / AVERAGE ALL TIME * 100

IF PERCENTAGE = 105, it means an increase of 5%. 95% means a decrease of 5%. 100 means no change.




