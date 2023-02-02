//30-1-2023 ignoring this because extractor can be used directly
// Injects the script that extracts the tables from the page
// alert('Hello, world!');
var script = document.createElement('script');
script.src = chrome.runtime.getURL('extractor.js');
document.body.appendChild(script);

// var tables = document.getElementsByTagName("table");
// var data = [];
// for (var i = 0; i < tables.length; i++) {
//     data.push({
//         data: parseTable(tables[i])
//     });
// }

// chrome.runtime.sendMessage({data: data});