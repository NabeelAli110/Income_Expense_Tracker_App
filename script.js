// Select DOM elements
const incomeForm = document.getElementById("income-form");
const expenseForm = document.getElementById("expense-form");
const transactionList = document.getElementById("transaction-list");
const totalIncome = document.getElementById("income");
const totalExpense = document.getElementById("expense");
const balance = document.getElementById("balance");

// Initialize variables for income, expense, and balance
let income = 0;
let expense = 0;

// Function to Update the Summary Section
function updateSummary() {
    totalIncome.textContent = income.toFixed(2);
    totalExpense.textContent = expense.toFixed(2);
    balance.textContent = (income - expense).toFixed(2);
}

// Function to Add a Transaction to the Table
function addTransaction(description, amount, date, type) {
    const row = document.createElement("tr");
    row.innerHTML = `
        <td>${date}</td>
        <td>${description}</td>
        <td>${amount.toFixed(2)}</td>
        <td>${type}</td>
        <td><button class="delete-btn">Delete</button></td>
    `;
    transactionList.appendChild(row);

    // Add event listener to delete the transaction
    row.querySelector(".delete-btn").addEventListener("click", () => {
        transactionList.removeChild(row);
        if (type === "Income") {
            income -= amount;
        } else if (type === "Expense") {
            expense -= Math.abs(amount);
        }
        updateSummary();
    });
}

// Event Listener for Income Form
incomeForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const description = document.getElementById("income-description").value;
    const amount = parseFloat(document.getElementById("income-amount").value);
    const date = document.getElementById("income-date").value;

    if (description && !isNaN(amount) && date) {
        income += amount; // Update income
        addTransaction(description, amount, date, "Income"); // Add transaction to table
        updateSummary(); // Update the summary
        incomeForm.reset(); // Reset the form
    } else {
        alert("Please fill out all fields for income.");
    }
});

// Event Listener for Expense Form
expenseForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const description = document.getElementById("expense-description").value;
    const amount = parseFloat(document.getElementById("expense-amount").value);
    const date = document.getElementById("expense-date").value;

    if (description && !isNaN(amount) && date) {
        expense += Math.abs(amount); // Update expense
        addTransaction(description, -amount, date, "Expense"); // Add transaction to table
        updateSummary(); // Update the summary
        expenseForm.reset(); // Reset the form
    } else {
        alert("Please fill out all fields for expense.");
    }
});
