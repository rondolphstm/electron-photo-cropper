import { useState, useCallback} from 'react';
import Cropper from 'react-easy-crop';
import { readFile } from '../../helpers/images';
import { Area } from '../../helpers/images'

export default function Photo() {
  const [imageSrc, setImageSrc] = useState(null); // file date
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [fileName, setFilename] = useState(null); // file address
  const[croppedAreaPixels, setCroppedAreaPixles] = useState(null)
  const onCropComplete = useCallback((croppedArea: Area, _croppedAreaPixels: Area )=>{
 setCroppedAreaPixles(_croppedAreaPixels);
  },[]);
  const handleFileChange = async (e: any) => {
    if (e.target.files && e.target.file.length) {
      // we got a file ...
      const file = e.target.files[0];
      setFilename(file.path);
      // get the image date from the file
      const imageData: any = await readFile(file);
      // setImageSrc to that image data
      setImageSrc(imageData);
    }
  }
  const handleSave =() => {
    // first save the cropped image

    // then reset the interface
    setImageSrc(null);
    setZoom(1);
    setCrop( {x: 0, y: 0});
  }


  if (!imageSrc) {
    return (
      <>
        <h1>Please choose phototo crop</h1>
        <input type="file" accept="image/*" onChange={handleFileChange} />
      </>
    );
  }
  return (
    <>
      <Cropper
        image={imageSrc}
        crop={crop}
        zoom={zoom}
        onCropChange={setCrop}
        onZoomChange={setZoom}
        onCropComplete=
      />
    <button className='save-btn'> </button>
    </>
  );
}
