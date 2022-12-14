export const post = async (url, formData) => {
    const response = await fetch(url , {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
    });

    const data = await response.json()

    return data
}

export const get = async (url) => {
  const response = await fetch(url, {
      headers:{
          'x-access-token': localStorage.getItem('token')
      }
  });
  
  const data = await response.json()
  return data
}