//navi
$(document).ready(function(){
    $('.bar').click(function(){
        $('ul').toggleClass('active')
    })
})
//firebase config
var config = {
  apiKey: "AIzaSyDjKamKLvqE9IAawcoxjDlRsoGI48FzBsQ",
  authDomain: "firmbook-f14da.firebaseapp.com",
  databaseURL: "https://firmbook-f14da.firebaseio.com",
  projectId: "firmbook-f14da",
  storageBucket: "firmbook-f14da.appspot.com",
  messagingSenderId: "1059934067199"
};
firebase.initializeApp(config);

const firestore = firebase.firestore();
  const settings = { timestampsInSnapshots: true};
  firestore.settings(settings);

// Initialize Firebase
var db = firebase.firestore();
function storeData(){
// Add
db.collection("employee").doc(document.getElementById("employeeName").value).set({
    name: document.getElementById("employeeName").value,
    Stellenbezeichnung: document.getElementById("employeeTitel").value,
    Phone: document.getElementById("employeePhone").value,
    mail: document.getElementById("employeeMail").value,
    Standort: document.getElementById("employeeLocation").value
})
.then(function() {
    console.log("Erfolgreich hinzugefügt!");
})
.catch(function(error) {
    console.error("Error writing document: ", error);
});

//show alert with timeout and reset
document.querySelector(".alert").style.display ="block";
setTimeout(function () {
    document.querySelector(".alert").style.display ="none";
},3000);
document.getElementById("employee").reset();
}
