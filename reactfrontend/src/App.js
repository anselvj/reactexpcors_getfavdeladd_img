import './App.css';
import axios from 'axios';
import { useState,useEffect } from 'react';

const App = () => {

  const [images,setImages] = useState([]);
  const [newImage,setNewImage] = useState('');
  const [isValidUrl, setIsValidUrl] = useState(true);

  
  const isValidImageUrl = (url) => {
    // image file format : /\.(gif|jpe?g|tiff?|png|webp|bmp)$/i
    // http with image format:  /^(https?:\/\/.*\.(jpeg|jpg|gif|png|webp|bmp)(\?.*)?)$/ 
    // data image:  /^data:image\/(jpeg|jpg|gif|png|webp|bmp);base64$/
    // https with tbn query image: /(&|\?)q=tbn.*/  
    // https with search image query result : /(&|\?)q=.*/
    if(url.match(/\.(gif|jpe?g|tiff?|png|webp|bmp)$/i) || 
    url.match(/^(https?:\/\/.*\.(jpeg|jpg|gif|png|webp|bmp)(\?.*)?)$/) ||
    url.match(/^data:image\/(jpeg|jpg|gif|png|webp|bmp);base64,/) ||
    url.match(/(&|\?)q=tbn.*/) || 
    url.match(/(&|\?)q=.*/))
    {
      return true;
    } else {
      return false;
    }
  };

  useEffect(()=> {
    fetchImages();
  },[]);

  const fetchImages = async() => {
    try {
      const response = await axios.get('http://localhost:5000/images');
      setImages(response.data);
    } catch(error) {
      console.error('Error fetching image:',error);
    }
  };

  const handleAddImage = async() => {
    if (isValidUrl) {
      try {
        await axios.post('http://localhost:5000/images', {url:newImage});
        fetchImages();
        setNewImage('');
      } catch(error) {
        console.error('Error adding image:',error);
      }
    } else {
      alert('Invalid image URL. Please enter a valid image URL.');
    } 
  };

  const handleFavorite = async(id) => {
    try {
      await axios.patch(`http://localhost:5000/images/${id}/favorite`);
      fetchImages();
      console.log('test favorite:',id);
    } catch(error) {
      console.error('Error favoriting image:',error);
    }
  };

  const handleDelete = async(id) => {
    try {
      await axios.delete(`http://localhost:5000/images/${id}`);
      fetchImages();
      console.log('test delete:',id);
    } catch(error) {
      console.error('Error deleting image:',error);
    }
  };

  return (
    
    <div className="App">
      <h1>Image Library</h1>
        <input type="text"
        placeholder='Enter image url'
        value={newImage} 
        onChange={(e) =>  {
          const inputValue = e.target.value;
          setNewImage(inputValue);
          setIsValidUrl(isValidImageUrl(inputValue)); 
        }}
      >
        </input><span>    </span>
        <button onClick={handleAddImage} disabled={!newImage}>Add Image</button>
        {!isValidUrl && newImage.trim() !== '' && (
          <span style={{ color: 'red' }}>  Invalid image URL. Please enter a valid image URL.</span>
        )}

        <ul>
          {
            images.map((image) => (
            <li key={image.id}>
              <img src={image.url} alt={image.url!=='' ? "Uploaded" : ""} style={{ width: '200px', height: '200px' }}/>
              <button onClick={()=>handleFavorite(image.id)}>Favorite Image</button>
              <button onClick={()=>handleDelete(image.id)}>Delete Image</button>
            </li>
            ))
          }
        </ul>
    </div>
    
  );
};

export default App;
