import { createAction } from "redux-actions";
import { Observable, empty, of } from "rxjs";
import { catchError, debounceTime, mergeMap, map, mapTo } from 'rxjs/operators';
import { setFileContent } from "../controls/file"
import { modifyData } from "../epics/modify-data-epic"

// ACTIONS
const uploadFile = createAction("UPLOAD_FILE");

// EPIC
const uploadFileEpic = (action$, store) => {
  return action$
    .ofType(uploadFile.toString()).pipe(
      mergeMap((action) => {
        const file = action.payload;
        return fromReader(file).pipe(
            debounceTime(500)
            ,map(JSON.parse)
            ,mergeMap((payload) => {
              return of(
                setFileContent(payload)
                ,modifyData(payload)
              );
            })
            ,catchError((error) => {
              if (error instanceof SyntaxError) {
                alert("Invalid JSON.");
                return empty();
              } else {
                throw error;
              }
            })
          )
      })
    );
};

/**
 * Little function to create an observable to read local files.
 * RxJS DOM v5 doesn't have it!?
 */
const fromReader = (file) => {
  return Observable.create((observer) => {
    const reader = new window.FileReader();

    reader.addEventListener('load', () => {
      observer.next(reader.result);
      observer.complete();
    });

    reader.addEventListener('error', () => {
      observer.error(reader.error);
      observer.complete();
    });

    reader.readAsText(file)
  });
}

export default uploadFileEpic;
export { uploadFile };
