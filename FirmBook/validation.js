function validation() {
    var name = document.getElementById("employeeName").value;
    var number = document.getElementById("employeePhone").value;
    var email = document.getElementById("employeeMail").value;

    // User Name
    if (name == "") {
        document.getElementById("employeeName").innerHTML = "Please fill the Username";
        return false;
    }
    if ((name.length <= 2) || (name.length > 20)) {
        document.getElementById("name-error").innerHTML = "User lenght must be between 2 and 20 Characters";
        return false;
    }
    if (!isNaN(name)) {
        document.getElementById("name-error").innerHTML = "Only Characters are allowed";
        return false;
    }
    //number
    if (number == "") {
        document.getElementById("employeePhone").innerHTML = "Please fill the Number";
        return false;
    }
    if ((number.length <= 5) || (number.length > 10)) {
        document.getElementById("tel-error").innerHTML = "User lenght must be between 5 and 10 Characters";
        return false;
    }
    if (isNaN(number)) {
        document.getElementById("tel-error").innerHTML = "Only Numbers are allowed";
        return false;
    }
    // Email
    if (email == "") {
        document.getElementById("email-error").innerHTML = "Please fill the Email field";
        return false;
    }
    if (email.indexOf("@") <= 0) {
        document.getElementById("email-error").innerHTML = "@ Invalid Position";
        return false;
    }
    if (email.charAt(email.length - 4) != ".") {
        document.getElementById("email-error").innerHTML = ".Invalid Position";
        return false;
    }
    if (email.charAt(email.length - 3) != ".") {
        document.getElementById("email-error").innerHTML = ".Invalid Position";
        return false;
    }
}
