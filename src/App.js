import './App.css';
import { useState, useRef } from 'react';
import axios from 'axios'
import Error from './errors/error';
import ImageColors from './colorHandler/colorHandler';

function App() {
  let [file, setFile] = useState()
  let [image, setimage] = useState()
  let [style1, setImgStyle] = useState({ display: 'none' })
  let [imgColors, setImgColors] = useState()
  let [error, setError] = useState()

  function handleChange(e) {
    setimage(URL.createObjectURL(e.target.files[0]))
    setFile(e.target.files[0])
    const imageStyle = {
      display: 'inline',
      borderRadius: '20px',
      padding: '1%'
    }
    setImgStyle(imageStyle)
  }

  let handleUpload = useRef(null)
  function handleUploadClick() {
    handleUpload.current.click()
    setImgColors(null)
  }

  async function getImageColor() {
    try {
      let formData = new FormData()
      formData.append('image', file)

      const options = {
        method: 'post',
        url: 'http://localhost:3001/imageToColor',
        data: formData,
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
      let data = await axios(options)
      const colors = data.data.colors
      setImgColors(<ImageColors colors={colors} />)
    }
    catch (error) {
      const errorData = error.response.data
      setError(<Error error={errorData} />)
      setTimeout(() => {
        setError(null)
      }, 20000)
    }
  }


  return (
    <div className='App'>
      <h1>Image Color Extractor</h1>
      <div className='imagePad'>
        <h1>Image</h1>
        <div className='uploadButton' onClick={handleUploadClick}>
          <button>
            <p>Click to Upload Image</p>
          </button>
          <input type="file" onChange={handleChange} ref={handleUpload} style={{ display: 'none' }} />
        </div>
        <img src={image} alt='filePreView' id='imagePreview' style={style1} />
      </div>
      {error}
      <div className='colorPad'>
        <h1>Colors</h1>
        <button onClick={getImageColor} id='colorConverterButton'>Click to See Color</button>
        {imgColors}
      </div>
    </div>
  )
}

export default App;
