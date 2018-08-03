import React, { Component} from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import style from './App.module.css';

import FileUpload from "./controls/FileUpload";
import { getFileContent, getModifiedData} from "./controls/file"

class App extends React.Component{

  
  constructor(props) {
    super(props);
  }


  render(){
    return(
      <div className={style.appContainer}>
        <div className={style.uploadContainer}>
          <span className={style.label}>Upload: </span>
          <FileUpload />
        </div>
        { this.props.fileContent &&
          <div>
            <span>File Content:</span><br/>
            <span>{this.props.fileContent}</span><br/>
          </div>
        }
        { this.props.modifiedData &&
          <div>
            <span>File Content:</span><br/>
            <span>{this.props.modifiedData}</span><br/>
          </div>
        }
      </div>
    );
  }
}

App.propTypes = {
  fileContent: PropTypes.array,
  modifiedData: PropTypes.array
};

const mapStateToProps = (state, ownProps) => {
  return {
    fileContent: getFileContent(state),
    modifiedData: getModifiedData(state)
  };
}


export default connect(mapStateToProps, null)(App);