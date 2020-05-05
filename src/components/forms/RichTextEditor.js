import React, { Component } from "react";
import { EditorState, covertToRaw, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";

export default class RichTextEditor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editorState: EditorState.createEmpty(),
    };
    this.onEditorStateChange = this.onEditorStateChange.bind(this);
  }
  onEditorStateChange(editorState) {
    this.setState({ editorState: editorState }, this.props.handleRichTextEditorChange(draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()))));
  }

  uploadFile = (file) => {
    return new Promise((resolve, reject) => this.getBase64(file, (data) => resolve({ data: { link: data } })));
  };

  getBase64 = (file, callback) => {
    // this will help convert the image to text that can be rendered
    let reader = new FileReader();
    reader.readAsDataURL(file);
    // the result comes from data as URL
    reader.onload = () => callback(reader.result);
    reader.onerror = (error) => {};
  };
  render() {
    return (
      <div>
        <Editor toolbar={{ inline: { inDropdown: true }, list: { inDropdown: true }, testAlign: { inDropdown: true }, link: { inDropdown: true }, inline: { inDropdown: true }, image: { uploadCallback: this.uploadFile, alt: { present: true, mandatory: false }, previewImage: true, inputAccept: "image/gif,image/jpeg,image/jpg,image/png,image/svg" } }} onEditorStateChange={this.onEditorStateChange} editorState={this.state.editorState} wrapperClassName="demo-wrapper" editorClassName="demo-editor" />
      </div>
    );
  }
}
