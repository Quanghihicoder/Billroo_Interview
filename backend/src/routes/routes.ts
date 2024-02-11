// import express
import express, { Router } from "express";
import { getAllTime, getAver, getRecent, getToday, updateExpenses } from "../controllers/expenses";
import { getDays } from "../controllers/user";

// init express router
const router: Router = express.Router();

////////////////////////// EXPENSES ////////////////////////////////
router.get("/apis/expenses/recent/:user_id", getRecent)
router.get("/apis/expenses/aver/:user_id", getAver)
router.get("/apis/expenses/today/:user_id", getToday)
router.get("/apis/expenses/all/:user_id", getAllTime)
router.post("/apis/expenses/", updateExpenses)

////////////////////////// USERS ////////////////////////////////
router.get("/apis/user/days/:user_id", getDays)

// export default router
export default router;