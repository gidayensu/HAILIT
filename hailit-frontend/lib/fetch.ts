export const postFetch = async ({data, url, bearerToken}: {data:Object, url:string, bearerToken: string})=> {
    try {
        const response = await fetch(url, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          authorization: bearerToken
        }, 
        body: JSON.stringify({
            ...data
          })
      });
    
      if (!response.ok) {
        throw new Error('Failed to fetch data')
      }
      const returnedData = await response.json();
      return returnedData;
    } catch (err) {
      return {error: `Error occurred loading data: ${err}`}  
    }
}

export const getFetch = async ({url, bearerToken}: {url:string, bearerToken: string})=> {

  try {
        const response = await fetch(url, {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          authorization: bearerToken
        }
      });

      console.log('response:', response)
    
      if (!response.ok) {
        
        throw new Error('Failed to fetch data')
      }
      const returnedData = await response.json();
      
      
      return returnedData;
    } catch (err) {
      return {error: `Error occurred loading data: ${err}`}  
    }
}


export const putFetch = async ({data, url, bearerToken}: {data:Object, url:string, bearerToken: string})=> {
    try {
        const response = await fetch(url, {
        method: 'PUT',
        headers: {
          "Content-Type": "application/json",
          authorization: bearerToken
        }, 
        body: JSON.stringify({
            ...data
          })
      });
    
      if (!response.ok) {
        return {
            error: "Failed to update data"
        }
        
      }
      const returnedData = await response.json();
      return returnedData;
    } catch (err) {
      return {error: `Error occurred updating data: ${err}`}  
    }
}


