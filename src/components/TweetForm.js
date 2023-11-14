import React, { useState, useEffect } from 'react';
import { decodeToken } from '../util/Util';

const TweetForm = () => {
    const [tweetContent, setTweetContent] = useState('');
    const [userName, setUserName] = useState('');
    const [image, setImage] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);

    let token = null;
    if(localStorage.getItem('token')){
      token = decodeToken(localStorage.getItem('token'));
    }
    
    useEffect(() => {
      if (token) {
        setUserName(token["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"]);
      }    
    }, [token]);
    
      const sendTweet = async () => {
        try {
          const data = new FormData();
          data.append('username', userName);
          data.append('text', tweetContent);
          data.append('image', image);
          
          const response = await fetch(process.env.REACT_APP_API_ENDPOINT+"/api/tweets/CreateTweet", {
            method: 'POST',
            headers: {
              Authorization: 'Bearer ' + localStorage.getItem('token')
            },
            body: data
          });
          if(response.ok){
            console.log("Tweet Created.");
          }
        } catch (error) {
          console.log(error.message);
        }
      
      };

      const handleImageChange = (event) => {
        const file = event.target.files[0];
    
        setImage(file)
        if (file) {
          // Resmi önizleme yapmak için Base64'e dönüştür
          const reader = new FileReader();
          reader.onloadend = () => {
            setSelectedImage(reader.result);
          };
          reader.readAsDataURL(file);
        } else {
          setSelectedImage(null);
        }
      };

  return (
    <div className="tweet-form-container">
    <label htmlFor="userName">Kullanıcı Adı: {userName}</label>

    <label htmlFor="tweetContent">Tweet İçeriği:</label>
    <textarea
      id="tweetContent"
      name="tweetContent"
      value={tweetContent}
      onChange={(e) => setTweetContent(e.target.value)}
      rows="4"
      required
    ></textarea>

    {selectedImage || 1 ? (
      <div><div>
        <img src={selectedImage} alt="Seçilen Resim" style={{ maxWidth: '100%' }} />
      </div>
      <label htmlFor="image">Resim Ekle: 
        <input type="file" id="image" accept="image/*" onChange={handleImageChange} />
      </label></div>
    ):(
      <label>asd</label>
    )}

    <button type="button" className="send-button" onClick={sendTweet}>
      Tweet Gönder
    </button>
  </div>
  );
};

export default TweetForm;