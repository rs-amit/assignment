import React, { useState } from "react";
import "./Calculator.css";
import SelectBox from "../SelectBox/SelectBox";
import ClipLoader from "react-spinners/ClipLoader";

const Currency = [{ option: "INR" }, { option: "USD" }];

const filterSelectBox = {
  multiValue: (baseStyles) => ({
    ...baseStyles,
    border: "0.3px solid rgba(0, 0, 0, 0.5)",
    backgroundColor: "#F2F2F2",
    borderRadius: "20px",
  }),
  dropdownIndicator: () => ({
    color: "black",
    margin: "0 7px",
  }),
  indicatorSeparator: () => ({
    display: "none",
  }),
};

function Calculator() {
  const [downPayment, setDownPayment] = useState("");
  const [loanAmount, setLoanAmount] = useState("");
  const [loanTenure, setLoanTenure] = useState("");
  const [monthlyInstallment, setMonthlyInstallment] = useState("");
  const [totalInterest, setTotalInterest] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [selectedTotalInterestCurrency, setSelectedTotalInterestCurrency] =
    useState([{ option: "INR" }]);
  const [
    selectedmonthlyInstallmentCurrency,
    setSelectedmonthlyInstallmentCurrency,
  ] = useState([{ option: "INR" }]);


  const OnSelectHandler = (event, target) => {
    setIsLoading(true)
    var from = "";
    var to = "";
    var api = "";
    if (target?.name === "totalInterest") {
      from = event.option === "INR" ? "USD" : "INR";
      to = event.option;
      api = `https://api.apilayer.com/exchangerates_data/convert?to=${to}&from=${from}&amount=${totalInterest}`;
      setSelectedTotalInterestCurrency(event);
    } else if (target.name === "monthlyInstallment") {
      from = event.option === "INR" ? "USD" : "INR";
      to = event.option;
      api = `https://api.apilayer.com/exchangerates_data/convert?to=${to}&from=${from}&amount=${monthlyInstallment}`;
      setSelectedmonthlyInstallmentCurrency(event);
    }
    var myHeaders = new Headers();
    myHeaders.append("apikey", "6BZFpWWzSd3jjwnq6gIeI6CfaS6G5rfF");

    var requestOptions = {
      method: "GET",
      redirect: "follow",
      headers: myHeaders,
    };

    fetch(api, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (target?.name === "totalInterest") {
          setTotalInterest(res.result);
        } else if (target.name === "monthlyInstallment") {
          setMonthlyInstallment(res.result);
        }
        setIsLoading(false)
      })
      .catch((error) => console.log("error", error));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate form fields
    if (isNaN(downPayment) || isNaN(loanAmount) || isNaN(loanTenure)) {
      alert("Please enter valid numbers for all fields.");
      return;
    }

    const totalLoan = loanAmount - downPayment;
    const monthlyInterest = 0.01;
    const monthlyInstallmentValue =
      (totalLoan / loanTenure) * (1 + monthlyInterest);
    const totalInterestValue = monthlyInstallmentValue * loanTenure - totalLoan;

    setMonthlyInstallment(monthlyInstallmentValue.toFixed(2));
    setTotalInterest(totalInterestValue.toFixed(2));
    setShowResult(true);
  };

  return (
    <div className="loanCalculator">
      <div className="loanCalculator-wrapper">
        <form onSubmit={handleSubmit} className="loanCalculator-form">
          <div className="sections">
            <label htmlFor="downPayment" className="section-label">
              Down Payment:
            </label>
            <input
              className="inputField"
              type="text"
              id="downPayment"
              placeholder="Please enter down payment"
              value={downPayment}
              onChange={(e) => setDownPayment(parseFloat(e.target.value))}
              required
            />
          </div>

          <div className="sections">
            <label htmlFor="loanAmount" className="section-label">
              Loan Amount:
            </label>
            <input
              className="inputField"
              type="text"
              id="loanAmount"
              placeholder="Please enter loan amount"
              value={loanAmount}
              onChange={(e) => setLoanAmount(parseFloat(e.target.value))}
              required
            />
          </div>

          <div className="sections">
            <label htmlFor="loanTenure" className="section-label">
              Loan Tenure (in months):
            </label>
            <input
              className="inputField"
              type="text"
              id="loanTenure"
              placeholder="Please enter loan tenure"
              value={loanTenure}
              onChange={(e) => setLoanTenure(parseInt(e.target.value))}
              required
            />
          </div>
          <div>
            <button type="submit" className="calculateButton">
              Calculate
            </button>
          </div>
        </form>
        <div className="table-container">
          {showResult && (
            <table className="table">
              <thead c>
                <tr>
                  <th>Monthly Installment</th>
                  <th>Total Interest</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <div className="interestValue">
                    {/* <ClipLoader color="white" size={15} />  */}
                      <div>{selectedmonthlyInstallmentCurrency.option === "INR" ? "₹" : "$"} {monthlyInstallment} </div>
                      <SelectBox
                        options={Currency}
                        name="monthlyInstallment"
                        getOptionLabel={(val) => val.option}
                        getOptionValue={(val) => val.option}
                        styles={filterSelectBox}
                        value={selectedmonthlyInstallmentCurrency}
                        onChange={OnSelectHandler}
                        theme={(theme) => ({
                          ...theme,
                          borderRadius: 0,
                          colors: {
                            ...theme.colors,
                            primary25: "#fcded4",
                            primary: "#ff7043",
                          },
                        })}
                      />
                      {/* <select
                          value={selectedCurrency}
                          onChange={(e) => setSelectedCurrency(e.target.value)}
                        >
                          {Currency.map((x, index) => (
                            <option key={`${index}_${x}`} value={x}>
                              {x}
                            </option>
                          ))}
                        </select> */}
                    </div>
                  </td>

                  <td>
                    <div className="interestValue">
                      <div>{selectedTotalInterestCurrency.option === "INR" ? "₹" : "$"} {totalInterest} </div>
                      <SelectBox
                        options={Currency}
                        getOptionLabel={(val) => val.option}
                        getOptionValue={(val) => val.option}
                        styles={filterSelectBox}
                        name="totalInterest"
                        value={selectedTotalInterestCurrency}
                        onChange={OnSelectHandler}
                        theme={(theme) => ({
                          ...theme,
                          borderRadius: 0,
                          colors: {
                            ...theme.colors,
                            primary25: "#fcded4",
                            primary: "#ff7043",
                          },
                        })}
                      />
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          )}
        </div>
      </div>
      {
        isLoading && (
          <div className="loadingContainer" >
            <ClipLoader color="black" size={35} /> 
          </div>
        )
      }
  
    </div>
  );
}

export default Calculator;

// const OnSelectHandler = (event, target) =>{
//   // let option = {...event}
//   // option.name = target.name
//   // if(target.name === "monthlyInstallment"){
//   //   setSelectedmonthlyInstallmentCurrency(option)
//   // }else{
//   //   setSelectedTotalInterestCurrency(option)
//   // }
// }
