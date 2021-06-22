import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';

const UplaodPhoto = (props) => {
  const [files, setFiles] = useState([]);
  const [images, setImages] = useState([]);
  return (
    <>
      <Form.Label>Upload Photos Only 5 Allowed</Form.Label>
      <p>Click a photo to delete it from upload list</p>
      <br></br>
      <div className="answer-images">
        {images.map((image, i, arr) => {
          return (
            <img
              src={images[i]}
              key={images[i]}
              style={{ maxHeight: '100px', maxWidth: '100px' }}
              onClick={() => {
                let newarr = [...images];
                newarr[i] = '';
                setImages(newarr);
              }}
            />
          );
        })}
      </div>
      <br></br>
      {images.length < 5 ? (
        <input
          id="custom-file"
          type="file"
          accept="image/*"
          name="Add Photo"
          onChange={(e) => {
            let newArr = [...files];
            newArr.push = e.target.files[0];
            setFiles(newArr);
            let imagesArr = [...images];
            imagesArr.push(URL.createObjectURL(e.target.files[0]));
            setImages(imagesArr);
            props.setPhoto(imagesArr);
          }}
        />
      ) : (
        ''
      )}
    </>
  );
};

export default UplaodPhoto;
