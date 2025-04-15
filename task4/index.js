const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');

// Validate user input
function validateUserInput(user) {
    if (!user.name || !user.email || !user.password) {
        console.log("Invalid input");
        return false;
    }
    return true;
}

// Check if email is already registered (Mock DB check)
function isEmailRegistered(email, users) {
    return users.some(u => u.email === email);
}

// Hash password
async function hashPassword(password) {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
}

// Save user to database (Mock save)
function saveUser(user, hashedPassword) {
    const newUser = { name: user.name, email: user.email, password: hashedPassword };
    console.log("User saved:", newUser);
    return newUser;
}

// Send confirmation email
function sendConfirmationEmail(userEmail) {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: { user: 'dhruvag576@gmail.com', pass: 'your-password' }
    });

    let mailOptions = {
        from: 'your-email@gmail.com',
        to: userEmail,
        subject: 'Welcome!',
        text: 'Thank you for registering!'
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log("Email failed", error);
        } else {
            console.log("Email sent: " + info.response);
        }
    });
}

// Register user function
async function registerUser(user) {
    if (!validateUserInput(user)) return;
    
    const existingUsers = [{ email: "test@example.com" }];
    if (isEmailRegistered(user.email, existingUsers)) {
        console.log("Email already exists");
        return;
    }

    const hashedPassword = await hashPassword(user.password);
    const newUser = saveUser(user, hashedPassword);
    sendConfirmationEmail(newUser.email);
    console.log("User registered successfully!");
}

// Example usage
registerUser({ name: "Alice", email: "alice@example.com", password: "securepassword" });