import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/home.css";
import axios from "axios";

const Home = () => {
  const [userID, setUserID] = useState<number>(1);
  const [userDays, setUserDays] = useState<number>(1);

  const [headerBtnText, setHeaderBtnText] = useState<string>("Add expenses");

  // Recent
  const [coffeeRecent, setCoffeeRecent] = useState<number>(0);
  const [foodRecent, setFoodRecent] = useState<number>(0);
  const [alchoholRecent, setAlchoholRecent] = useState<number>(0);

  // Compare %
  const [coffeeCom, setCoffeeCom] = useState<number>(0);
  const [foodCom, setFoodCom] = useState<number>(0);
  const [alchoholCom, setAlchoholCom] = useState<number>(0);

  // today
  const [coffeeToday, setCoffeeToday] = useState<number>(0);
  const [foodToday, setFoodToday] = useState<number>(0);
  const [alchoholToday, setAlchoholToday] = useState<number>(0);

  useEffect(() => {
    const getTodayExpense = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/apis/expenses/today/${userID}`
        );
        setCoffeeToday(parseInt(response.data[0]));
        setFoodToday(parseInt(response.data[1]));
        setAlchoholToday(parseInt(response.data[2]));

        if (
          response.data[0] == 0 &&
          response.data[1] == 0 &&
          response.data[2] == 0
        ) {
          setHeaderBtnText("Add expenses");
        } else {
          setHeaderBtnText("Edit expenses");
        }
      } catch (error) {
        console.error(error);
      }
    };

    getTodayExpense();

    const getUserDays = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/apis/user/days/${userID}`
        );
        setUserDays(parseInt(response.data));
      } catch (error) {
        console.error(error);
      }
    };

    getUserDays();
  }, [userID]);

  useEffect(() => {
    const getAllTimeExpense = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/apis/expenses/all/${userID}`
        );
        setCoffeeRecent(parseInt(response.data[0]));
        setFoodRecent(parseInt(response.data[1]));
        setAlchoholRecent(parseInt(response.data[2]));
      } catch (error) {
        console.error(error);
      }
    };

    const getAverExpense = async () => {
      try {
        const response1 = await axios.get(
          `http://localhost:8000/apis/expenses/recent/${userID}`
        );

        const response2 = await axios.get(
          `http://localhost:8000/apis/expenses/aver/${userID}`
        );

        setCoffeeRecent(parseInt(response1.data[0]));
        setFoodRecent(parseInt(response1.data[1]));
        setAlchoholRecent(parseInt(response1.data[2]));

        if (parseInt(response2.data[0]) > 0) {
          setCoffeeCom(
            Math.round((response1.data[0] / parseInt(response2.data[0])) * 100)
          );
        } else {
          setCoffeeCom(0);
        }

        if (parseInt(response2.data[1]) > 0) {
          setFoodCom(
            Math.round((response1.data[1] / parseInt(response2.data[1])) * 100)
          );
        } else {
          setFoodCom(0);
        }

        if (parseInt(response2.data[2]) > 0) {
          setAlchoholCom(
            Math.round((response1.data[2] / parseInt(response2.data[2])) * 100)
          );
        } else {
          setAlchoholCom(0);
        }
      } catch (error) {
        console.error(error);
      }
    };

    if (1 < userDays && userDays <= 7) {
      getAllTimeExpense();
    }

    if (userDays > 7) {
      getAverExpense();
    }
  }, [userDays]);

  return (
    <div className="Container">
      <div className="Container__Content">
        <div className="Container__Header">
          <p>Am I spending too much? </p>

          <Link
            to="/add"
            className="Container__Header__Button"
            state={{ user_id: userID }}
          >
            {headerBtnText}
          </Link>
        </div>

        <div className="Container__Body">
          <div className="Home__Item">
            <div className="Home__Item__Title">
              <p>Coffee ☕️</p>
            </div>

            {userDays == 1 && (
              <div className="Home__Item__Detail">
                <p className="Home__Item__Detail__Aver">${coffeeToday} today</p>
              </div>
            )}

            {1 < userDays && userDays <= 7 && (
              <div className="Home__Item__Detail">
                <p className="Home__Item__Detail__Aver">
                  ${coffeeRecent} in the last {userDays} days
                </p>
              </div>
            )}

            {userDays > 7 && (
              <div className="Home__Item__Detail">
                {coffeeCom == 0 ? (
                  <div>
                    <p className="Home__Item__Detail__Aver">${coffeeCom}</p>
                  </div>
                ) : (
                  <div>
                    <p className="Home__Item__Detail__Aver">
                      ${coffeeRecent} / week (last 7 days)
                    </p>
                    {coffeeCom == 100 ? (
                      <p className="Home__Item__Detail__Compare Stay">
                        Unchange
                      </p>
                    ) : (
                      <p
                        className={`Home__Item__Detail__Compare ${
                          coffeeCom - 100 < 0 ? "Down" : "Up"
                        }`}
                      >
                        {Math.abs(coffeeCom - 100)}%{" "}
                        {coffeeCom - 100 < 0 ? "below" : "above"} average since
                        joining app
                      </p>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
          <div className="Home__Item">
            <div className="Home__Item__Title">
              <p>Food 🍔</p>
            </div>

            {userDays == 1 && (
              <div className="Home__Item__Detail">
                <p className="Home__Item__Detail__Aver">${foodToday} today</p>
              </div>
            )}

            {1 < userDays && userDays <= 7 && (
              <div className="Home__Item__Detail">
                <p className="Home__Item__Detail__Aver">
                  ${foodRecent} in the last {userDays} days
                </p>
              </div>
            )}

            {userDays > 7 && (
              <div className="Home__Item__Detail">
                {foodCom == 0 ? (
                  <div>
                    <p className="Home__Item__Detail__Aver">${foodCom}</p>
                  </div>
                ) : (
                  <div>
                    <p className="Home__Item__Detail__Aver">
                      ${foodRecent} / week (last 7 days)
                    </p>
                    {foodCom == 100 ? (
                      <p className="Home__Item__Detail__Compare Stay">
                        Unchange
                      </p>
                    ) : (
                      <p
                        className={`Home__Item__Detail__Compare ${
                          foodCom - 100 < 0 ? "Down" : "Up"
                        }`}
                      >
                        {Math.abs(foodCom - 100)}%{" "}
                        {foodCom - 100 < 0 ? "below" : "above"} average since
                        joining app
                      </p>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
          <div className="Home__Item">
            <div className="Home__Item__Title">
              <p>Alchohol 🍷</p>
            </div>

            {userDays == 1 && (
              <div className="Home__Item__Detail">
                <p className="Home__Item__Detail__Aver">
                  ${alchoholToday} today
                </p>
              </div>
            )}

            {1 < userDays && userDays <= 7 && (
              <div className="Home__Item__Detail">
                <p className="Home__Item__Detail__Aver">
                  ${alchoholRecent} in the last {userDays} days
                </p>
              </div>
            )}

            {userDays > 7 && (
              <div className="Home__Item__Detail">
                {alchoholCom == 0 ? (
                  <div>
                    <p className="Home__Item__Detail__Aver">${alchoholCom}</p>
                  </div>
                ) : (
                  <div>
                    <p className="Home__Item__Detail__Aver">
                      ${alchoholRecent} / week (last 7 days)
                    </p>
                    {alchoholCom == 100 ? (
                      <p className="Home__Item__Detail__Compare Stay">
                        Unchange
                      </p>
                    ) : (
                      <p
                        className={`Home__Item__Detail__Compare ${
                          alchoholCom - 100 < 0 ? "Down" : "Up"
                        }`}
                      >
                        {Math.abs(alchoholCom - 100)}%{" "}
                        {alchoholCom - 100 < 0 ? "below" : "above"} average
                        since joining app
                      </p>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
