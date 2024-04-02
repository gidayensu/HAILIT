export const fetchPost = async (url: string, userData: object)=>{
    try {
    const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      
    },
    body: JSON.stringify(userData)
  })

  if (!response.ok) {
  const errorData = await response.json();
  const errorMessage = errorData.message || 'Unknown Error Occurred';
  return {message: errorMessage}
  } 

  const data = await response.json();
  
  return data;}
  catch (error) {
    return {message: 'Failed to fetch'}
  }
}