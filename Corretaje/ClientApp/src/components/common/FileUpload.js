import React, {Component} from 'react';
import Dropzone from 'react-dropzone';

class FileUpload extends Component {
  constructor() {
    super();
    this.onDrop = (files) => {
      this.setState({files})
    };
    this.state = {
      files: []
    };
  }

  render() {
    const files = this.state.files.map(file => (
      <li key={file.name}>
        {file.name} - {file.size} bytes
      </li>
    ));

    return (
      <Dropzone 
        accept={["application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"]}
        onDropRejected={() => this.props.onDrop(false)} 
        onDropAccepted={(file) => this.props.onDrop(true, file)} 
        maxFiles={this.props.maxFiles}
        onDrop={this.onDrop}
        maxSize={this.props.sizeLimit}
      >
        {({getRootProps, getInputProps}) => (
          <section>
            <div {...getRootProps({className: 'dropzonenew'})}>
              <input {...getInputProps()} />
              <p>
                Arrastre el archivo hasta aquí o haga click para seleccionarlo
              </p>
            </div>
            <aside>
              <h4>Archivo seleccionado</h4>
              <ul>{files}</ul>
            </aside>
          </section>
        )}
      </Dropzone>
    );
  }
}

export default FileUpload;