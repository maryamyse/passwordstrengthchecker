const checkPasswordStrength = (password) => {


let score = 0;

const checks = {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /[0-9]/.test(password),
    special: /[^A-Za-z0-9]/.test(password)
};

Object.values(checks).forEach((check) => {

    if (check) {
        score++;
    }

});

let strength;

if (score <= 2) {
    strength = "Weak";
} else if (score <= 4) {
    strength = "Medium";
} else {
    strength = "Strong";
}

return {
    score,
    strength,
    checks
};

};

// Get elements from the webpage

const passwordInput = document.getElementById("password");
const checkButton = document.getElementById("checkButton");
const resetButton = document.getElementById("resetButton");
const toggleButton = document.getElementById("toggleButton");
const result = document.getElementById("result");

// Get requirement elements

const lengthCheck = document.getElementById("lengthCheck");
const uppercaseCheck = document.getElementById("uppercaseCheck");
const lowercaseCheck = document.getElementById("lowercaseCheck");
const numberCheck = document.getElementById("numberCheck");
const specialCheck = document.getElementById("specialCheck");

// Check password button

checkButton.addEventListener("click", () => {

const password = passwordInput.value.trim();

try {

    if (password === "") {
        throw new Error("Please enter a password.");
    }

    const resultData = checkPasswordStrength(password);

    console.log("Debug information:", resultData);


    // Update requirement indicators

    lengthCheck.textContent =
        `${resultData.checks.length ? "✓" : "✗"} At least 8 characters`;

    uppercaseCheck.textContent =
        `${resultData.checks.uppercase ? "✓" : "✗"} An uppercase letter`;

    lowercaseCheck.textContent =
        `${resultData.checks.lowercase ? "✓" : "✗"} A lowercase letter`;

    numberCheck.textContent =
        `${resultData.checks.number ? "✓" : "✗"} A number`;

    specialCheck.textContent =
        `${resultData.checks.special ? "✓" : "✗"} A special character`;


    // Display result

    result.innerHTML = `
        <h2>Password Analysis</h2>

        <p><strong>Score:</strong> ${resultData.score}/5</p>

        <p>
            <strong>Strength:</strong>
            <span class="strong">${resultData.strength}</span>
        </p>
    `;

} catch (error) {

    console.error("Error:", error.message);

    result.innerHTML = `
        <p class="error">Error: ${error.message}</p>
    `;

}

});

// Show and hide password

toggleButton.addEventListener("click", () => {


if (passwordInput.type === "password") {

    passwordInput.type = "text";
    toggleButton.textContent = "Hide";

} else {

    passwordInput.type = "password";
    toggleButton.textContent = "Show";
}


});

// Reset button

resetButton.addEventListener("click", () => {

```
passwordInput.value = "";

lengthCheck.textContent = "✗ At least 8 characters";
uppercaseCheck.textContent = "✗ An uppercase letter";
lowercaseCheck.textContent = "✗ A lowercase letter";
numberCheck.textContent = "✗ A number";
specialCheck.textContent = "✗ A special character";

result.innerHTML = "";

console.log("Password checker has been reset.");
```

});
