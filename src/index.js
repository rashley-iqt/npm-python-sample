import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import "./index.css";
import App  from "./App";
import configureStore from "./configure-store";

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

if (module.hot) {
  module.hot.accept("./App", () => {
    ReactDOM.render(
      <Provider store={store}>
        <App />
      </Provider>,
      document.getElementById("root")
    );
  });
}


// function fileUpload(evt){
// 	console.log(evt.files[0]);
// 	$.ajax({
// 		url: "localhost:5001/api/v1/points",
// 		type: 'GET',
// 		contentType: false,
// 		processData: false,
// 		data: { file: evt.files[0] },
// 		success: function (result){
// 			$('#results').html(result);
// 		}
// 	});
// }
// const PythonShell = require('python-shell')
// var pyshell = new PythonShell('http://github.com/rashley-iqt/npm-python-sample/blob/master/python-scripts/modify-data.py');

// var args = process.argv.slice(2);
// console.log(args);

// pyshell.send(JSON.stringify(args));

// pyshell.on('message', function (message) {
//     // received a message sent from the Python script (a simple "print" statement)
//     console.log(message);
// });

// // end the input stream and allow the process to exit
// pyshell.end(function (err) {
//     if (err){
//         throw err;
//     };

//     console.log('finished');
// });