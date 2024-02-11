import React, { useEffect, useState } from "react";
import "../styles/add.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const Add = () => {
  const location = useLocation();
  const navigate = useNavigate();

  var userID = 1;

  if (location.state.user_id) {
    userID = parseInt(location.state.user_id);
  }

  const [coffee, setCoffee] = useState(0);
  const [food, setFood] = useState(0);
  const [alchohol, setAlchohol] = useState(0);

  const [addBtnText, setAddBtnText] = useState("Add expenses");

  const handleSubmit = () => {
    const userData = {
      user_id: userID,
      expenses: [coffee, food, alchohol],
    };

    axios
      .post("http://localhost:8000/apis/expenses/", userData)
      .catch((error) => {
        console.error("Error:", error);
      });

    navigate("/");
  };

  useEffect(() => {
    const getTodayExpense = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/apis/expenses/today/${userID}`
        );
        setCoffee(parseInt(response.data[0]));
        setFood(parseInt(response.data[1]));
        setAlchohol(parseInt(response.data[2]));

        if (
          response.data[0] > 0 &&
          response.data[1] > 0 &&
          response.data[2] > 0
        ) {
          setAddBtnText("Edit expenses");
        }
      } catch (error) {
        console.error(error);
      }
    };

    getTodayExpense();
  }, []);

  return (
    <div className="Container">
      <div className="Container__Content">
        <div className="Container__Header">
          <p>How much did I spend today?</p>
        </div>

        <div className="Container__Body">
          <div className="Add__Item">
            <div className="Add__Item__Title">
              <p>Coffee ☕️</p>
            </div>
            <div className="Add__Item__Detail">
              $
              <input
                type="number"
                min={1}
                max={100}
                value={coffee}
                onChange={(e) => {
                  if (parseInt(e.target.value) > 100) {
                    setCoffee(100);
                  } else {
                    setCoffee(parseInt(e.target.value));
                  }
                }}
              />
              <p className="Add__Error">Error</p>
            </div>
          </div>
          <div className="Add__Item">
            <div className="Add__Item__Title">
              <p>Food 🍔</p>
            </div>
            <div className="Add__Item__Detail">
              ${" "}
              <input
                type="number"
                min={1}
                max={100}
                value={food}
                onChange={(e) => {
                  if (parseInt(e.target.value) > 100) {
                    setFood(100);
                  } else {
                    setFood(parseInt(e.target.value));
                  }
                }}
              />
              <p className="Add__Error">Error</p>
            </div>
          </div>
          <div className="Add__Item">
            <div className="Add__Item__Title">
              <p>Alchohol 🍷</p>
            </div>
            <div className="Add__Item__Detail">
              ${" "}
              <input
                type="number"
                min={1}
                max={100}
                value={alchohol}
                onChange={(e) => {
                  if (parseInt(e.target.value) > 100) {
                    setAlchohol(100);
                  } else {
                    setAlchohol(parseInt(e.target.value));
                  }
                }}
              />{" "}
              <p className="Add__Error">Error</p>
            </div>
          </div>
        </div>

        <div className="Container__Bottom">
          <Link to="/" className="Container__Bottom__Back">
            Back
          </Link>

          <Link
            to="/"
            className="Container__Bottom__Add"
            onClick={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            {addBtnText}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Add;
