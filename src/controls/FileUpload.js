import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { isNil } from "ramda";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";

import styles from "./Controls.module.css"

import { uploadFile } from "../epics/upload-file-epic";

const defaultState = {
  selectedFile: null
};

class FileUpload extends React.Component {

  constructor(props) {
    super(props);

    this.state = defaultState;
  }

  onUpload = (file) => {
    this.props.uploadFile(file);
    this.setState({
      selectedFile: file.name
    });
  };

  render () {
    return (
      <span className={ styles.fileUpload }>
        <input
          type="file"
          id="file-input"
          value=''
          selected={this.state.selectedFile}
          onChange={(evt) => this.onUpload(evt.target.files[0])}
        />

      <span>
        { isNil(this.state.selectedFile) ? "No file selected" : this.state.selectedFile }
      </span>

        <label htmlFor="file-input" className="button">
          <FontAwesomeIcon icon={faUpload} />
        </label>
      </span>
    );
  }
}

FileUpload.propTypes = {
  uploadFile: PropTypes.func.isRequired
};

const mapStateToProps = (state, ownProps) => {
  return {
    //dataset: selectDataset(state),
  };
}

const mapDispatchToProps = {
  uploadFile,
};

export default connect(null, mapDispatchToProps)(FileUpload);