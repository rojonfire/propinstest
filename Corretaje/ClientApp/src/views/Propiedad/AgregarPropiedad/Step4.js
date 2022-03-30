/** @format */

import React, { useEffect, useState } from 'react';
import Dropzone from 'react-dropzone';

import { Col, Row, Container } from 'shards-react';
import './Step4.css';

import Sortable from 'sortablejs';

const Step4 = ({ imagenesProp, values, errors, touched }) => {
  const [value, setValue] = useState(true);
  const [images, setImages] = useState([]);

  const [classDestacar] = useState('destacar');

  const SortFunc = () => {
    if (document.getElementById('items')) {
      let sort = document.getElementById('items');

      Sortable.create(sort, {
        animation: 150,
        onChange: function(evt) {
          //evt.newIndex // most likely why this event is used is to get the dragging element's current index
          console.log('evt.newIndex: ', evt.newIndex);
          // same properties as onEnd
        }
      });
    }
  };

  const deleteImage = name => {
    let imagenesProp = values.txtImages.filter(img => img.name !== name);

    values.txtImages = imagenesProp;
    setImages(values.txtImages);
  };

  const setPortadaImage = name => {
    let imageschange = [];
    values.txtImages.map(image => {
      if (image.name === name) {
        image.esPortada = true;
      } else {
        image.esPortada = false;
      }
      imageschange.push(image);
      return null;
    });
    values.txtImages = imageschange;
    setImages(values.txtImages);
  };

  SortFunc();

  const fileToBase64 = file => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  };

  const selectImage = file => {
    const fileError = fileValidator(file);

    if (!fileError) {
      handleSelectedFile(file);
    } else {
      errors.txtImages = fileError;
      setValue(!value);
    }
  };

  const fileValidator = file => {
    let { type, size } = file;

    size = size / 1024;
    if (!UPLOAD_MIME_TYPES.includes(type)) {
      return 'El tipo de archivo es inválido!';
    } else if (size > 5000) {
      return 'El archivo es muy pesado!';
    }
    return null;
  };

  const handleSelectedFile = selectedFile => {
    let isAlreadySelected = false;

    if (values.txtImages.length > 0) {
      isAlreadySelected = values.txtImages.find(image => {
        return image.name === selectedFile.name;
      });
    }

    if (!isAlreadySelected) {
      fileToBase64(selectedFile).then(file64 => {
        file64 = {
          name: selectedFile.name,
          value: file64,
          esPortada: false
        };
        values.txtImages = [...values.txtImages, file64];
        setImages(values.txtImages);
      });
    }
  };

  const thumbs = values.txtImages.map(file => (
    <Col key={file.name} md={4} className={file.esPortada ? classDestacar : ''}>
      {file.esPortada ? (
        <div className="destacar">
          <Col>
            <img
              width="100%"
              height="100%"
              alt="imagen"
              src={file.value ? file.value : file.downloadLink}
            />
          </Col>
          <Col>
            <input
              type="button"
              className="btn btn-danger"
              onClick={() => deleteImage(file.name)}
              value="Borrar Imagen"
            />
            {!file.esPortada && (
              <input
                type="button"
                className="btn btn-success"
                onClick={() => setPortadaImage(file.name)}
                value="Destacar"
              />
            )}
          </Col>
        </div>
      ) : (
        <div>
          <Col>
            <img
              width="100%"
              height="100%"
              alt="imagen"
              src={file.value ? file.value : file.downloadLink}
            />
          </Col>
          <Col>
            <input
              type="button"
              className="btn btn-danger"
              onClick={() => deleteImage(file.name)}
              value="Borrar Imagen"
            />
            {!file.esPortada && (
              <input
                type="button"
                className="btn btn-success"
                onClick={() => setPortadaImage(file.name)}
                value="Destacar"
              />
            )}
          </Col>
        </div>
      )}
    </Col>
  ));

  const UPLOAD_MIME_TYPES = [
    'image/png',
    'image/x-citrix-png',
    'image/x-png',
    'image/jpeg',
    'image/x-citrix-jpeg',
    'image/pjpeg'
  ];

  useEffect(
    () => () => {
      // Make sure to revoke the data uris to avoid memory leaks
      images.forEach(file => URL.revokeObjectURL(file.preview));
    },
    [images]
  );

  return (
    <Container fluid className="main-content-container px-4">
      <Dropzone
        name="txtImages"
        onDrop={acceptedFiles => {
          acceptedFiles.map(file => {
            selectImage(file);
            return null;
          });
        }}
      >
        {({ getRootProps, getInputProps }) => (
          <section>
            <div {...getRootProps({ className: 'dropzonenew' })}>
              <input {...getInputProps()} />
              <p>Arrastre los archivos aqui o haga click para seleccionar</p>
            </div>
          </section>
        )}
      </Dropzone>
      <br />
      <br />
      <Container>
        <Row id="items">{thumbs}</Row>
      </Container>
    </Container>
  );
};

export default Step4;
