import { combineEpics } from 'redux-observable';
import uploadFileEpic from './upload-file-epic';
import modifyDataEpic from './modify-data-epic';

const rootEpic = combineEpics(
  uploadFileEpic,
  modifyDataEpic
);

export default rootEpic;