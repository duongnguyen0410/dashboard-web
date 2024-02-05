import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.2/firebase-app.js'
import { getDatabase, ref, set, push } from 'https://www.gstatic.com/firebasejs/10.7.2/firebase-database.js';
import { getAuth, createUserWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/10.7.2/firebase-auth.js';

const firebaseConfig = {
    apiKey: "AIzaSyB54O2YRBYNrtVMWZabHZzxU-JWefngtjc",
    authDomain: "web-dashboard-3d7be.firebaseapp.com",
    projectId: "web-dashboard-3d7be",
    storageBucket: "web-dashboard-3d7be.appspot.com",
    messagingSenderId: "716373971436",
    appId: "1:716373971436:web:e2d216e937911cc1b9f0c9",
    measurementId: "G-GLG60DX5SF",
    databaseURL: "https://web-dashboard-3d7be-default-rtdb.asia-southeast1.firebasedatabase.app/",
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth(app);

const firstNameInput = document.getElementById("firstName");
const lastNameInput = document.getElementById("lastName");
const emailInput = document.getElementById("email");
const dobInput = document.getElementById("dateOfBirth");
const passwordInput = document.getElementById("password");
const confirmPasswordInput = document.getElementById("confirmPassword");
const signUpForm = document.querySelector('.registration-form')
const loginLink = document.querySelector(".log-in-label");
const btn = document.querySelector(".button");
const errorMessageElement = document.getElementById("error-message");

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function validateInput(firstName, lastName, email, dob, password, confirmPassword) {
    if (
        firstName.trim() === '' ||
        lastName.trim() === '' ||
        email.trim() === '' ||
        dob.trim() === '' ||
        password.trim() === '' ||
        confirmPassword.trim() === ''
    ) {
        return false;
    }
    return true;
}

async function signUp(email, password) {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        return userCredential.user.uid;
    } catch (error) {
        if (error.code = "auth/email-already-in-use") {
            errorMessageElement.innerText = "Email already existed.";
            errorMessageElement.style.visibility = "visible";
        }
        console.log(error.code);
        console.log(error.message);
        return "";
    }
}

function pushUserData(uid, firstName, lastName, email, dob) {
    const usersRef = ref(database, `users/${uid}`);
    set(usersRef, {
        first_name: firstName,
        last_name: lastName,
        email: email,
        dob: dob,
    })
        .then(async () => {
            console.log("User data pushed to database successfully.");
            await sleep(2000);
            window.location.href = "/login.html";
        })
        .catch(async (error) => {
            console.error("Error pushing user data to database: ", error);
            await sleep(2000);
            btn.classList.remove("button-loading");
        });
}

signUpForm.addEventListener("submit", async event => {

    event.preventDefault();

    btn.classList.add("button-loading");

    const firstName = firstNameInput.value.trim();
    const lastName = lastNameInput.value.trim();
    const email = emailInput.value.trim();
    const dob = dobInput.value.trim();
    const password = passwordInput.value.trim();
    const confirmPassword = confirmPasswordInput.value.trim();

    if (!validateInput(firstName, lastName, email, dob, password, confirmPassword)) {
        errorMessageElement.innerText = "All fields must be filled out.";
        errorMessageElement.style.visibility = "visible";
        console.log("All fields must be filled out.");
        await sleep(2000);
        btn.classList.remove("button-loading");
        return;
    }

    if (password !== confirmPassword) {
        errorMessageElement.innerText = "Passwords do not match.";
        errorMessageElement.style.visibility = "visible";
        console.log("Passwords do not match.");
        await sleep(2000);
        btn.classList.remove("button-loading");
        return;
    }

    const uid = await signUp(email, password);
    if (uid) {
        console.log(`User created with UID: ${uid}`);
        pushUserData(uid, firstName, lastName, email, dob);
    } else {
        console.log("User creation failed.");
        await sleep(2000);
        btn.classList.remove("button-loading");
    }
})

loginLink.addEventListener("click", function () {
    window.location.href = "/login.html";
})