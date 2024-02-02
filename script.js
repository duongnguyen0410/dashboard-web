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
const btnDiv = document.getElementById("btn-div");

function writeUserData(name, email, imageUrl) {
    set(ref(database, 'users/' + userId), {
        username: name,
        email: email,
        profile_picture: imageUrl
    });
}

function pushUserData(name, email, imageUrl) {
    const usersRef = ref(database, 'users');
    const newUserRef = push(usersRef);
    set(newUserRef, {
        username: name,
        email: email,
        profile_picture: imageUrl
    });
}

function login(email, password){
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential.user.uid);
        const user = userCredential.user;
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
}

loginButton.addEventListener("click", function () {

    const email = emailInput.value;
    const password = passwordInput.value;

    if(email && password){
        //window.location.href = '/dashboard.html';
        login(email, password);
    }
    else{
        if(email === ""){
            console.log("Please enter your email");
        }
        if(password === ""){
            console.log("Please enter your password");
        }
    }

    //pushUserData('Duong Nguyen', 'nxduong410@gmail.com', 'image1');
}); 