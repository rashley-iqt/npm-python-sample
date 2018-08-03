import { createAction, handleActions } from "redux-actions";
import { map,catchError } from 'rxjs/operators';

const defaultState = {
  fileData: null,
  modifiedData: null
};

const setFileContent = createAction("SET_FILE_CONTENT");
const setModifiedData = createAction("SET_MODIFIED_DATA")

// REDUCERS
const reducer = handleActions(
  {
    [setFileContent]: (state, { payload }) => {
		const fileData = payload;
		return { ...state, fileData };
    },
    [setModifiedData]: (state, { payload }) => {
   		const modifiedData = payload;
   		return { ...state, modifiedData };
    }
  },
  defaultState
);

// SELECTORS

const getFileContent = (state) => state.file.fileData;
const getModifiedData = (state) => state.file.modifiedData;


export default reducer;
export { setFileContent, getFileContent, setModifiedData, getModifiedData}