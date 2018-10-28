//navi jquery(drücken von klasse bar->function(ul(css=display none) ändert klasseauf klassse active(css=display block) geschalten))
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


//drücken von input mit onclick löst function storeData() aus
function storeData(){
//validation wenn namensfeld leer oder ist eine nummer dann infotext
  var name= document.querySelector("#employeeName");
  if (name.value == "" || !isNaN(name.value)) {
    document.getElementById("name-error").innerHTML = "Bitte geben Sie hier Ihren Vor- und Nachname ein. Es sind nur Buchstaben erlaubt! Beispiel: Max Mustermann";
    return false;
  }
  //wenn nicht dann kein info text in span
  else{
    document.getElementById("name-error").innerHTML = "";
  }
  //validation wenn telfeld leer oder ist keine nummer dann infotext
  var tel= document.querySelector("#employeePhone");
  if (tel.value == "" || isNaN(tel.value)){
    document.getElementById("tel-error").innerHTML = "Bitte geben Sie hier Ihre Telefonnumer ein. Es sind nur Zahlen erlaubt! Beispiel:0123456789";
    return false;
  }
  //sonst kein infotext
  else{
    document.getElementById("tel-error").innerHTML = "";
  }
  //validation wenn emailfeld leer oder besitzt kein @ dann infotext
  var email= document.querySelector("#employeeMail");
  if (email.value == "" || email.value.indexOf("@") <= 0){
    document.getElementById("email-error").innerHTML = "Bitte geben Sie hier Ihre Emailadresse ein. Denken Sie an das @-Zeichen! Beispiel: maxmustermann@gmx.de";
    return false;
  }
  //sonst kein infotext
  else{
    document.getElementById("email-error").innerHTML = "";
  }
// ADD nach der validation info an db erzeuge eine collection und setzte doc mit 3 attributen(inhalt holen von inputfeld mit id...)
  db.collection("employee").doc().set({
      name: document.querySelector("#employeeName").value,
      phone: document.querySelector("#employeePhone").value,
      mail: document.querySelector("#employeeMail").value
  })
  //wenn erfolgreich info durch konsole
  .then(function() {
      console.log("Erfolgreich hinzugefügt!");
  })
  //wenn fehler dann info durch konsole
  .catch(function(error) {
      console.error("Error writing document: ", error);
  });
//wenn erledigt ändere die klasse alert von display none auf display block und starte einen timer und setze nach 3 sek wieder auf none
  document.querySelector(".alert").style.display ="block";
  setTimeout(function () {
      document.querySelector(".alert").style.display ="none";
  },3000);
  document.getElementById("employee").reset();
}

//READ info an db collection... get doc mit id...
    db.collection("employee").get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            //ändere den inhalt von list(html) durch innerhtml auf inhalt der jeweiligen person und hole die attribute
            const list_div = document.getElementById("list");
            var info ="<div class='col-lg-4 col-md-4 col-sm-6 col-xs-12'><div class='box' id='box_id'><i class='fas fa-times' id='x'></i><img src='img/person1.jpg' /><h3>"+doc.data().name+"</h3><p class='email'>E-Mail: "+doc.data().mail+"</p><p class='tel'>Tel.: "+doc.data().phone+"</p></div></div>" ;
            list_div.innerHTML += info
        });
    });

//DELETE noch unfertig und keine funktion
function delete(){
db.collection("employee").doc(docRef.id).delete().then(function() {
  console.log("Document successfully deleted!");
}).catch(function(error) {
  console.error("Error removing document: ", error);
});
}
