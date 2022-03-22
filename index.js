//Listen for submit
document.getElementById('loan-form').addEventListener('submit', function (e) {
    //hide results
    document.getElementById("results").style.display = "none";
    //show loader
    document.getElementById("loading").style.display = "block";
    setTimeout(calculateResults, 2000);


    e.preventDefault();
});

//calculate result
function calculateResults() {
    console.log("calculating....");

    //UI vars

    const amount = document.getElementById("amount");
    const interest = document.getElementById("interest");
    const years = document.getElementById("years");
    const monthlyPayment = document.getElementById("monthly-payment")
    const totalPayment = document.getElementById("total-payment");
    const totalInterest = document.getElementById("total-interest");

    const principal = parseFloat(amount.value);
    const calculatedInterest = parseInt(interest.value) / 100 / 12;
    const calculatedPayments = parseFloat(years.value) * 12;

    //calculate monthly payment
    const x = Math.pow(1 + calculatedInterest, calculatedPayments);
    const monthly = (principal * x * calculatedInterest) / (x - 1);

    if (isFinite(monthly)) {
        monthlyPayment.value = monthly.toFixed(2);
        totalPayment.value = (monthly * calculatedPayments).toFixed(2);
        totalInterest.value = ((monthly * calculatedPayments) - principal).toFixed(2);

        //show results
        document.getElementById("results").style.display = "block";

        //hide loader
        document.getElementById("loading").style.display = "none";
    }
    else {
        showError("please check your numbers");
    }

}
function showError(error) {
    //hide results
    document.getElementById("results").style.display = "none";

    //hide loader
    document.getElementById("loading").style.display = "none";
    //create a div
    const errorDiv = document.createElement("div");

    //get element
    const card = document.querySelector(".card");
    const heading = document.querySelector(".heading");

    //add class
    errorDiv.className = "alert alert-danger";

    //create text node and append to div
    errorDiv.appendChild(document.createTextNode(error));

    //insert error above heading
    card.insertBefore(errorDiv, heading);

    setTimeout(clearError, 3000);
}
function clearError() {
    document.querySelector(".alert").remove();
}

