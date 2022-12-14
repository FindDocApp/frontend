
// Uploads the received image to cloudinary and 
// returns the image url that is hosted on cloudinary CDN
export const getImageUrlFromCloudinary = async image => {
    const cloudName = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME;

    const formData = new FormData()
    formData.append('upload_preset', process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET)
    formData.append('file', image)

    const requestURL = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;
    const response = await fetch(requestURL, {
        method: 'POST',
        body: formData
    });
    
    const data = await response.json();

    const imageUrl = data.secure_url

    return imageUrl
}