export const decodeToken = (token) => {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );

      return JSON.parse(jsonPayload);
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  };

export const deleteTweet = async (rows, index) => {
    try {
      console.log(index);
      console.log(rows[index].id);
      const tweetIdToDelete = rows[index].id;
  
      const response = await fetch(process.env.REACT_APP_API_ENDPOINT + `/api/Tweets/${tweetIdToDelete}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('token')
        },
      });
  
      if (response.ok) {
        const updatedRows = [...rows];
        updatedRows.splice(index, 1);
        console.log('The tweet was successfully deleted.');
        return updatedRows;
      } else {
        const errorData = await response.json();
        console.log(errorData.message);
        return rows; // Silme başarısız olursa orijinal rows'u döndür
      }
    } catch (error) {
      console.error('An error occurred while deleting the tweet:', error.message);
      return rows; // Hata olursa orijinal rows'u döndür
    }
  };

  export const checkTokenValidity = () => {
    try {
      const currentTimestamp = Math.floor(new Date().getTime() / 1000);
      let token = decodeToken(localStorage.getItem('token'));
      let tokenTimeStamp = token.exp;

      if(tokenTimeStamp>currentTimestamp){
        return true;
      }else{
        return false;
      }
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  };

  