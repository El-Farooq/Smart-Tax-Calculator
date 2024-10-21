document.getElementById("taxForm").addEventListener("submit", function(event) {
    event.preventDefault();
    const taxConstraint = document.getElementById("taxConstraint").value;
    const resultsBox = document.getElementById("results");
    let result = '';

    // Calculate based on the selected tax constraint
    if (taxConstraint === "paye") {
        const income = parseFloat(document.getElementById("income").value);
        result = `<p><strong>PAYE Tax:</strong> ₦${calculatePAYE(income).toFixed(2)}</p>`;
    } else if (taxConstraint === "vat") {
        const value = parseFloat(document.getElementById("value").value);
        result = `<p><strong>VAT (7.5%):</strong> ₦${(value * 0.075).toFixed(2)}</p>`;
    } else if (taxConstraint === "cit") {
        const income = parseFloat(document.getElementById("income").value);
        const companyType = document.getElementById("companyType").value;
        result = `<p><strong>CIT:</strong> ₦${calculateCIT(income, companyType).toFixed(2)}</p>`;
    } else if (taxConstraint === "tet") {
        const profit = parseFloat(document.getElementById("profit").value);
        result = `<p><strong>TET (2.5%):</strong> ₦${(profit * 0.025).toFixed(2)}</p>`;
    } else if (taxConstraint === "wht") {
        const amount = parseFloat(document.getElementById("amount").value);
        result = `<p><strong>WHT (5%):</strong> ₦${(amount * 0.05).toFixed(2)}</p>`;
    }

    resultsBox.innerHTML = result; // Display the result
});

// Dynamically display fields based on selected tax constraint
document.getElementById("taxConstraint").addEventListener("change", function() {
    const taxConstraint = this.value;
    const taxOptions = document.getElementById("taxOptions");
    taxOptions.innerHTML = ''; // Clear previous inputs

    if (taxConstraint === "paye" || taxConstraint === "cit") {
        taxOptions.innerHTML = `
            <label for="income">Enter Income (₦):</label>
            <input type="number" id="income" name="income" required>
        `;
    }
    if (taxConstraint === "cit") {
        taxOptions.innerHTML += `
            <label for="companyType">Select Company Type:</label>
            <select id="companyType" name="companyType" required>
                <option value="small">Small (₦0 - ₦25 million)</option>
                <option value="medium">Medium (₦25 million - ₦100 million)</option>
                <option value="large">Large (₦100 million +)</option>
            </select>
        `;
    }
    if (taxConstraint === "vat") {
        taxOptions.innerHTML = `
            <label for="value">Enter Value of Goods/Services (₦):</label>
            <input type="number" id="value" name="value" required>
        `;
    }
    if (taxConstraint === "tet") {
        taxOptions.innerHTML = `
            <label for="profit">Enter Assessable Profit (₦):</label>
            <input type="number" id="profit" name="profit" required>
        `;
    }
    if (taxConstraint === "wht") {
        taxOptions.innerHTML = `
            <label for="amount">Enter Transaction Amount (₦):</label>
            <input type="number" id="amount" name="amount" required>
        `;
    }
});

// Clear button functionality
document.getElementById("clearBtn").addEventListener("click", function() {
    document.getElementById("taxForm").reset();
    document.getElementById("results").innerHTML = ''; // Clear results display
});

// Example calculation functions
function calculatePAYE(income) {
    // Example logic for PAYE tax calculation
    if (income <= 300000) return 0;
    else if (income <= 600000) return income * 0.07;
    else if (income <= 1000000) return income * 0.11;
    else if (income <= 1600000) return income * 0.15;
    else if (income <= 3200000) return income * 0.19;
    else return income * 0.24; // Above 3.2 million
}

function calculateCIT(income, companyType) {
    // Example logic for CIT tax calculation based on company type
    let rate = 0.3; // Default rate for large companies
    if (companyType === "small") rate = 0.2;
    else if (companyType === "medium") rate = 0.25;

    return income * rate;
}
