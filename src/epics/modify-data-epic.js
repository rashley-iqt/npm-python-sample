import { createAction } from "redux-actions";
import { of, empty } from "rxjs";
import { ajax } from 'rxjs/ajax';
import { catchError, debounceTime, mergeMap, map, mapTo, take, startWith } from 'rxjs/operators';

import { uploadFile } from "./upload-file-epic"
import { setModifiedData } from "../controls/file"

// ACTIONS
const MODIFY_DATA = "MODIFY_DATA";
//const modifyData = (payload) => ({'type': MODIFY_DATA, 'payload': payload })
const modifyData = createAction("MODIFY_DATA");

const url = "http://localhost:5001/api/v1/points"
// EPIC
const modifyDataEpic = (action$, store) => {
  return action$
	.ofType(modifyData.toString()).pipe(
		take(1)
	 	,mergeMap((action) => {
		  const fileData = action.payload;
		  return ajax({ 
		  		url: url, 
		  		crossDomain: true, 
		  		responseType: 'json',
		  		method: "POST", 
				headers:{'Content-Type': 'application/json'}, 
				responseType: 'json', 
				body: JSON.stringify({"points":fileData})
		  	}).pipe(
				map((result) => { 
				  return setModifiedData(result.response);
				})
				//,map(setModifiedData)
				,catchError((error) => {
				  alert("Failed to transorm data. Please try again later.");
				  return empty();
				})
			);
		})
	);
};

export default modifyDataEpic;
export { modifyData };