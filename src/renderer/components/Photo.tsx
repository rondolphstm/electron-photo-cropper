import { useState, useCallback} from 'react';
import Cropper from 'react-easy-crop';
import { readFile , cropImageData } from '../../helpers/images';
import { Area } from '../../helpers/images'

export default function Photo() {
  const [imageSrc, setImageSrc] = useState(null); // file date
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [fileName, setFilename] = useState(null); // file address

  const[croppedAreaPixels, setCroppedAreaPixles] = useState<Area>();
  const onCropComplete = useCallback((_croppedArea: Area, currentCroppedAreaPixels: Area )=>{
 setCroppedAreaPixles(currentCroppedAreaPixels);
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
  const handleSave = async () => {
    // first save the cropped image
//  first create thr cropped image data using a canvas....
const base64data= await cropImageData (imageSrc, croppedAreaPixels!)
.catch(console.error);
//  create a new filename
const newFileName = fileName + '-cropped.png';
// then send those results to saveImage via ipc Render event
window.electron.saveCroppedImage([newFileName, base64data])
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
        onCropComplete={onCropComplete}
      />
    <button className='save-btn'> </button>
    </>
  );
}
