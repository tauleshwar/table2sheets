// Showing the current domain name
let currentDomain;

chrome.storage.local.get(['currentURI'], function (result) {
    // console.log(result);
    currentDomain = new URL(result.currentURI).hostname;
    document.getElementById("current-domain").innerHTML = currentDomain;
});

// Fills the select element with the tables and handles the download buttons
function maxColumnLength(array) {
    var max = 0;
    for (var i = 0; i < array.length; i++) {
        if (array[i].length > max) {
            max = array[i].length;
        }
    }
    return max;
}

chrome.storage.local.get(['tables'], function (result) {
    // console.log(result);

    var select = document.getElementById("table-select");
    if (result.tables.length > 0) {
        for (var i = 0; i < result.tables.length; i++) {
            var option = document.createElement("option");
            option.value = result.tables[i].id;
            option.text = (i + 1) + ". Table " + " (" + result.tables[i].data.length + " X " + maxColumnLength(result.tables[i].data) + " )";

            select.appendChild(option);
            fillPreviewTable();

        }
    } else {
        var option = document.createElement("option");
        option.value = 0;
        option.text = "No Tables";
        select.appendChild(option);
    }

});
document.getElementById("table-select").addEventListener("change", function () {
    fillPreviewTable();
}
);
function fillPreviewTable() {

    var previewTable = document.getElementById("preview-table");
    previewTable.innerHTML = "";


    var select = document.getElementById("table-select");
    var table = select.options[select.selectedIndex].value;

    chrome.storage.local.get(['tables'], function (result) {
        console.log(result.tables[table].data)
        for (var i = 0; i < result.tables[table].data.length; i++) {
            if (i >= 5) {
                break;
            }
            var row = document.createElement("tr");
            for (var j = 0; j < result.tables[table].data[i].length; j++) {
                if (j >= 5) {
                    break;
                }
                var cell = document.createElement("td");
                cell.textContent = result.tables[table].data[i][j];
                row.appendChild(cell);
            }
            previewTable.appendChild(row);
        }


    });
}

document.getElementById("download-csv").addEventListener("click", function () {
    var select = document.getElementById("table-select");
    var table = select.options[select.selectedIndex].value;

    chrome.storage.local.get(['tables'], function (result) {
        console.log(result.tables[table].data)
        var csv = arrayToCsv(result.tables[table].data);
        downloadCsv(csv);
    });
});




document.getElementById("download-excel").addEventListener("click", function () {
    var select = document.getElementById("table-select");
    var table = select.options[select.selectedIndex].value;

    chrome.storage.local.get(['tables'], function (result) {
        convertArrayToExcel(result.tables[table].data);

        // downloadExcel(worksheet);
    });
});


function arrayToCsv(array) {
    // Converts a 2D array to a CSV string
    var csv = "";
    for (var i = 0; i < array.length; i++) {
        csv += array[i].join(",");
        csv += "\n";
    }
    return csv;
}

function downloadCsv(csv) {
    // Downloads a CSV file with the given data
    var blob = new Blob([csv], { type: 'text/csv' });
    var url = URL.createObjectURL(blob);
    var a = document.createElement("a");
    a.href = url;
    a.download = `${currentDomain}-table2sheet.csv`;
    a.click();
}

function convertArrayToExcel(array) {
    /* convert array to workbook */
    var ws = XLSX.utils.aoa_to_sheet(array);
    var wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

    /* create a buffer */
    var wbout = XLSX.write(wb, { bookType: "xlsx", type: "array" });

    /* create a blob */
    var blob = new Blob([wbout], { type: "application/octet-stream" });

    /* trigger a download */
    var link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${currentDomain}-table2sheet.xlsx`;;
    link.click();
}


