//navi
$(document).ready(function(){
    $('.bar').click(function(){
        $('ul').toggleClass('active')
    })
})
//firebase-add
const firestore = firebase.firestore();
  const settings = { timestampsInSnapshots: true};
  firestore.settings(settings);

// Initialize Firebase
var db = firebase.firestore();
function storeData(){
    // Add a new document in collection "cities"
db.collection("employee").doc(document.getElementById("employeeName").value).set({
    name: document.getElementById("employeeName").value,
    Stellenbezeichnung: document.getElementById("employeeTitel").value,
    Phone: document.getElementById("employeePhone").value,
    mail: document.getElementById("employeeMail").value,
    Standort: document.getElementById("employeeLocation").value
})
.then(function() {
    console.log("Document successfully written!");
    window.alert("Ihre Eingaben wurden erfolgreich versendet!")
})
.catch(function(error) {
    console.error("Error writing document: ", error);
});
}

const auflistung = document.querySelector("#auflistung");

db.collection("employee").get().then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {

      auflistung.innerHTML += "<div class='box'><h3>" + doc.data().employeeName +"</h3></div>"

    });
});
