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
const settings = {timestampsInSnapshots: true};
firestore.settings(settings);

// Initialize Firebase
var db = firebase.firestore();
//Add

function storeData(){

  var name= document.querySelector("#employeeName");
  if (name.value == "" || !isNaN(name.value)) {
    document.getElementById("name-error").innerHTML = "Bitte geben Sie hier Ihren Vor- und Nachname ein. Es sind nur Buchstaben erlaubt! Beispiel: Max Mustermann";
    return false;
  }
  else{
    document.getElementById("name-error").innerHTML = "";
  }
  var tel= document.querySelector("#employeePhone");
  if (tel.value == "" || isNaN(tel.value)){
    document.getElementById("tel-error").innerHTML = "Bitte geben Sie hier Ihre Telefonnumer ein. Es sind nur Zahlen erlaubt! Beispiel:0123456789";
    return false;
  }
  else{
    document.getElementById("tel-error").innerHTML = "";
  }
  var email= document.querySelector("#employeeMail");
  if (email.value == "" || email.value.indexOf("@") <= 0){
    document.getElementById("email-error").innerHTML = "Bitte geben Sie hier Ihre Emailadresse ein. Denken Sie an das @-Zeichen! Beispiel: maxmustermann@gmx.de";
    return false;
  }
  else{
    document.getElementById("email-error").innerHTML = "";
  }

  db.collection("employee").doc(document.querySelector("#employeeName").value).set({
      name: document.querySelector("#employeeName").value,
      Phone: document.querySelector("#employeePhone").value,
      mail: document.querySelector("#employeeMail").value
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
