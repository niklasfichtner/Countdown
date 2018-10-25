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

//storeData()
function storeData(){
//validation
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
//Add
  db.collection("employee").doc().set({
      name: document.querySelector("#employeeName").value,
      phone: document.querySelector("#employeePhone").value,
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
//read
    db.collection("employee").get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            const list_div = document.getElementById("list");
            var info ="<div class='col-lg-4 col-md-4 col-sm-6 col-xs-12'><div class='box'><img src='img/person1.jpg' /><h3>"+doc.data().name+"</h3><p class='email'>"+doc.data().mail+"</p><p class='tel'>"+doc.data().phone+"</p></div></div>" ;
            list_div.innerHTML += info
        });
    });
//refresh
function refresh(){
    window.alert("TODO")
}
//delete all
function deleteAll(){
    db.collection("employee").delete().then(function() {
        console.log("Document successfully deleted!");
    }).catch(function(error) {
        console.error("Error removing document: ", error);
    });
}
