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
var db = firebase.firestore();
const firestore = firebase.firestore();
const settings = {timestampsInSnapshots: true};
firestore.settings(settings);

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
  var stellenbezeichnung= document.querySelector("#employeeJobTitle");
  if (stellenbezeichnung.value == ""){
    stellenbezeichnung.value = "-";
  }
  else{

  }
  var raum= document.querySelector("#employeeRoom");
  if (raum.value ==""){
    raum.value = "-";
  }
  else{

  }

// ADD
  db.collection("employee").doc(document.querySelector("#employeeName").value).set({
      name: document.querySelector("#employeeName").value,
      phone: document.querySelector("#employeePhone").value,
      mail: document.querySelector("#employeeMail").value,
      jobtitle: document.querySelector("#employeeJobTitle").value,
      room: document.querySelector("#employeeRoom").value
  })
  .then(function() {
      console.log("Erfolgreich hinzugefügt!");
  })
  .catch(function(error) {
      console.error("Error writing document: ", error);
  });
//timeout alert
  document.querySelector(".alert").style.display ="block";
  setTimeout(function () {
      document.querySelector(".alert").style.display ="none";
  },3000);
  document.getElementById("employee").reset();
}

//GET alphabetisch
    db.collection("employee").orderBy("name").get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            const list_div = document.getElementById("list");
            var info ="<div class='col-lg-4 col-md-4 col-sm-6 col-xs-12'><div class='box' id="+doc.id+"><i class='fas fa-times'onclick='loeschen(this)'></i><a data-toggle='tab' href='#detailseite' onclick='detail(this)'><img src='img/person1.jpg' /><h3>"+doc.data().name+"</h3></a><hr/><p class='email'>E-Mail: <a href= 'mailto:'"+doc.data().mail+">"+doc.data().mail+"</a></p><p class='tel'>Tel.:<a href='tel:"+doc.data().phone+"'>"+doc.data().phone+"</a></p></div></div>" ;
            list_div.innerHTML += info
        });
    });

// detail
function detail(elem){
    let id=elem.parentNode.id;
    var mitarbeiter=db.collection("employee").doc(id);
    mitarbeiter.get().then(function(doc){
    const div = document.getElementById("detail");
    var info ="<div id="+doc.id+"><button data-toggle='tab' href='#bearbeiten' onclick='bearbeite(this)'>Bearbeiten</button><div class='box'><h3>"+doc.data().name+"</h3><hr><p>Tel.:<a href='tel:"+doc.data().phone+"'>"+doc.data().phone+"</a><br>E-Mail: <a href= 'mailto:'"+doc.data().mail+">"+doc.data().mail+"</a><br>Stellenbezeichnung:"+doc.data().jobtitle+" <br> Raum:"+doc.data().room+"</p></div></div>";
            div.innerHTML = info
    })
}

//Bearbeitenseite
function bearbeite(elem){
    let id=elem.parentNode.id;
    var e=db.collection("employee").doc(id);
    e.get().then(function(doc){
    const bearb = document.getElementById("neu");
    var neu ="<div class='box'><form id="+doc.id+"><input type='text' placeholder="+doc.data().name+" id='employeeName'><span id='name-error'></span><input type='tel'placeholder="+doc.data().phone+" id='employeePhone'><span id='tel-error'></span><input type='email'placeholder="+doc.data().mail+" id='employeeMail'><span id='email-error'></span><input type='text'placeholder="+doc.data().jobtitle+" id='employeeJobTitle'><input type='text'placeholder="+doc.data().room+" id='employeeRoom'><input type='submit' value='Daten ändern' onclick='update(this);return false'></form></div>";
    bearb.innerHTML = neu
})
}

function update(elem){
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
    var stellenbezeichnung= document.querySelector("#employeeJobTitle");
    if (stellenbezeichnung.value == ""){
      stellenbezeichnung.value = "-";
    }
    else{

    }
    var raum= document.querySelector("#employeeRoom");
    if (raum.value ==""){
      raum.value = "-";
    }
    else{
    }
    //update funktion
    let id=elem.parentNode.id;
    var e=db.collection("employee").doc(id);
    e.update({
        name: document.querySelector("#employeeName").value,
        phone: document.querySelector("#employeePhone").value,
        mail: document.querySelector("#employeeMail").value,
        jobtitle: document.querySelector("#employeeJobTitle").value,
        room: document.querySelector("#employeeRoom").value
    })
    .then(function() {
        console.log("Document successfully updated!");
    })
    .catch(function(error) {
        // The document probably doesn't exist.
        console.error("Error updating document: ", error);
    });
    //timeout alert
      document.querySelector(".alert_update").style.display ="block";
      setTimeout(function () {
          document.querySelector(".alert_update").style.display ="none";
      },3000);

}
//delete
function loeschen(elem){
    let id=elem.parentNode.id;
    db.collection("employee").doc(id).delete().then(function() {
    console.log("Document successfully deleted!");
}).catch(function(error) {
    console.error("Error removing document: ", error);
});
//timeout alert
  document.querySelector(".alert_delete").style.display ="block";
  setTimeout(function () {
      document.querySelector(".alert_delete").style.display ="none";
  },3000);
}

//Suche
function suchen(){
    var suche=document.querySelector("#suchen").value;
    if(suche == undefined || suche ==null|| suche=="" || suche==!isNaN){
        const suchen = document.getElementById("suche");
        var info ="<h2 id='alert_search'>Der Mitarbeiter wurde nicht gefunden!</h2>";
        suchen.innerHTML = info
    }
    else{
        var docRef = db.collection("employee").doc(suche);
        docRef.get().then(function(doc){
                const suchen = document.getElementById("suche");
                var info ="<div id="+doc.id+"><div class='detail'><img src='img/person1.jpg' /></div><button data-toggle='tab' href='#bearbeiten' onclick='bearbeite(this)'>Bearbeiten</button><div class='box'><h3>"+doc.data().name+"</h3><hr><p>Tel.:<a href='tel:"+doc.data().phone+"'>"+doc.data().phone+"</a><br>E-Mail: <a href= 'mailto:'"+doc.data().mail+">"+doc.data().mail+"</a><br>Stellenbezeichnung:"+doc.data().jobtitle+" <br> Raum:"+doc.data().room+"</p></div></div>";
                suchen.innerHTML = info
            });
    }
}
