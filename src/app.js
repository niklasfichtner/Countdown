window.addEventListener("load", () => {
    let newButton = document.getElementById("Hinzufügen")
    let memoList = document.querySelector("ansprechpartner");

    let insertMemo = text => {
        let liElement = document.createElement("card");
        memoList.appendChild(liElement);

        let memoTextElement = document.createElement("p");
        memoTextElement.textContent = text;
        liElement.appendChild(memoTextElement);
};

    insertMemo("Klicke auf „Hinzufügen”, um neuen Mitarbeiter anzulegen …")

    // Event Handler für Anlage einer Notiz
    newButton.addEventListener("hinzufuegen", () => {
        // Memotext vom Anwender abfragen
        let text = prompt("Geben Sie den Notiztext ein");
        if (text === null) return;

        // Neues Element in die HTML-Liste einfügen
        insertMemo(text);
    });
});
