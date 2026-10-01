const readline = require("readline");


/*
 * Checks the strength of a password.
 */
const checkPasswordStrength = (password) => {

    let score = 0;

    const checks = {
        length: password.length >= 8,
        uppercase: /[A-Z]/.test(password),
        lowercase: /[a-z]/.test(password),
        number: /[0-9]/.test(password),
        special: /[^A-Za-z0-9]/.test(password)
    };


    // Count the number of requirements that are met

    Object.values(checks).forEach((check) => {

        if (check) {
            score++;
        }

    });


    // Determine password strength

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


/*
 * Create a command-line interface.
 */

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


console.log("=================================");
console.log("     PASSWORD STRENGTH CHECKER");
console.log("=================================");


rl.question("Enter your password: ", (password) => {

    try {

        if (password.trim() === "") {
            throw new Error("Password cannot be empty.");
        }


        // Check the password

        const result = checkPasswordStrength(password);


        // Debug information

        console.log("\nDebug information:");
        console.log(result);


        // Display password analysis

        console.log("\nPassword Analysis");
        console.log("-----------------");

        console.log(
            `Length: ${result.checks.length ? "✓" : "✗"}`
        );

        console.log(
            `Uppercase: ${result.checks.uppercase ? "✓" : "✗"}`
        );

        console.log(
            `Lowercase: ${result.checks.lowercase ? "✓" : "✗"}`
        );

        console.log(
            `Number: ${result.checks.number ? "✓" : "✗"}`
        );

        console.log(
            `Special character: ${result.checks.special ? "✓" : "✗"}`
        );

        console.log("\n-----------------");

        console.log(`Score: ${result.score}/5`);

        console.log(`Strength: ${result.strength}`);


    } catch (error) {

        console.error(`\nError: ${error.message}`);

    }


    rl.close();

});