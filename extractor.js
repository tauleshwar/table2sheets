

// sending message to background script on every 500ms
// setInterval(() => {
// chrome.runtime.sendMessage({type: "message", data: i++});


// }, 500);


function sendTables(){
    // Extracts the tables from the page and sends them to the background script
var tables = [];
var tableElements = document.getElementsByTagName("table");

for (var i = 0; i < tableElements.length; i++) {
    var tableData = [];
    var rows = tableElements[i].getElementsByTagName("tr");
    for (var j = 0; j < rows.length; j++) {
        var rowData = [];
        // Extracting ths from the table
        var headers = rows[j].getElementsByTagName("th");
        if(headers.length>0){
            for (var k = 0; k < headers.length; k++) {
                rowData.push(headers[k].innerText);
            }
        }

        // Storing tds in rowData
        var cells = rows[j].getElementsByTagName("td");
        for (var k = 0; k < cells.length; k++) {
            rowData.push(cells[k].innerText);
        }
        tableData.push(rowData);
    }
    tables.push({ id: i, data: tableData });
}
// 1. Send a message to the service worker requesting the user's data
// chrome.runtime.sendMessage({greeting: "hello"});
// chrome.runtime.sendMessage({type: "message", data: "Hello from popup"});

chrome.runtime.sendMessage({ tables: tables });
chrome.runtime.sendMessage({ currentURI: window.location.href });

}

sendTables()
// setTimeout(() => {
    
// }, 500);