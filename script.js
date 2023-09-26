document.addEventListener("DOMContentLoaded", function () {
    const calculateButton = document.getElementById("calculate");
    const loanAmountInput = document.getElementById("loan-amount");
    const loanTermInput = document.getElementById("loan-term");
    const interestRateInput = document.getElementById("interest-rate");
    const totalAmountSpan = document.getElementById("total-amount");
    const paymentTable = document.getElementById("payment-table").querySelector("tbody");
    const printButton = document.getElementById("print");

    calculateButton.addEventListener("click", function () {
        const loanAmount = parseFloat(loanAmountInput.value);
        const loanTerm = parseInt(loanTermInput.value);
        const interestRate = parseFloat(interestRateInput.value);
        const monthlyPayment = calculateMonthlyPayment(loanAmount, loanTerm, interestRate);
        const totalAmount = calculateTotalAmount(loanTerm, monthlyPayment);

        totalAmountSpan.innerText = totalAmount.toFixed(2);

        updatePaymentTable(paymentTable, loanTerm, monthlyPayment);
        
        // Store loan data and payment details in sessionStorage for the print view
        const loanData = {
            loanAmount: loanAmount.toFixed(2),
            loanTerm: loanTerm.toString(),
            interestRate: interestRate.toString(),
            totalAmount: totalAmount.toFixed(2),
        };
        const paymentDetails = generatePaymentDetails(loanTerm, monthlyPayment);
        sessionStorage.setItem("loanData", JSON.stringify(loanData));
        sessionStorage.setItem("paymentDetails", JSON.stringify(paymentDetails));
    });

    printButton.addEventListener("click", function () {
        // Open the print view
        const printWindow = window.open("print-view.html", "_blank");
        if (!printWindow) {
            alert("Please allow pop-ups to print the page.");
        }
    });

    // Function to calculate the monthly payment
    function calculateMonthlyPayment(loanAmount, loanTerm, interestRate) {
        const monthlyInterest = (loanAmount * (interestRate / 100)) / 12;
        return (loanAmount / loanTerm) + monthlyInterest;
    }

    // Function to calculate the total amount to be paid
    function calculateTotalAmount(loanTerm, monthlyPayment) {
        return loanTerm * monthlyPayment;
    }

    // Function to generate payment details
    function generatePaymentDetails(loanTerm, monthlyPayment) {
        const paymentDetails = [];
        for (let i = 1; i <= loanTerm; i++) {
            paymentDetails.push({
                month: i,
                paymentAmount: monthlyPayment.toFixed(2),
            });
        }
        return paymentDetails;
    }

    // Function to update the payment table
    function updatePaymentTable(table, loanTerm, monthlyPayment) {
        table.innerHTML = "";
        for (let i = 1; i <= loanTerm; i++) {
            const row = table.insertRow();
            const monthCell = row.insertCell(0);
            const paymentCell = row.insertCell(1);

            monthCell.innerText = i;
            paymentCell.innerText = monthlyPayment.toFixed(2);
        }
    }
});
