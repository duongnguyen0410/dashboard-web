import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.2/firebase-app.js'
import { getDatabase, ref, set , push} from 'https://www.gstatic.com/firebasejs/10.7.2/firebase-database.js';
import { getAuth, signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/10.7.2/firebase-auth.js';

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

const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const loginButton = document.getElementById("login-btn");
const signUpLink = document.querySelector(".sign-up-link");
const btn = document.querySelector(".button");

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function validateInput(email, password){
    if (
        email.trim() === '' ||
        password.trim() === ''
    ) {
        return false;
    }
    return true;
}

async function login(email, password){

    if (!validateInput(email, password)) {
        console.log("All fields must be filled out.");
        btn.classList.remove("button-loading");
        return;
    }

    signInWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const uid = userCredential.user.uid;
        console.log(`Login successfull with uid: ${uid}`);
        await sleep(2000);
        btn.classList.remove("button-loading");
        
      })
      .catch((error) => {
        console.log(error.code);
        console.log(error.message);
        btn.classList.remove("button-loading");
      });
}

loginButton.addEventListener("click", async function(){

    btn.classList.add("button-loading");

    const email = emailInput.value;
    const password = passwordInput.value;

    await login(email, password);
}); 

signUpLink.addEventListener("click", function(){
    window.location.href="/signup.html";
})