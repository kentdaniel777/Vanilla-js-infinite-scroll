const imageContainer = document.getElementById('image-container');
const loader= document.getElementById('loader')

let photosArray=[]
// Unsplash API
const count=10
const apiKey="UbXc2ciaLfuxlnPAazlz-tuGvJvASVi40LJp0BbvQHM";
const unsplashAPI=`https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;


// create elements for the DOM
function displayPhotos(photosArray){
    photosArray.forEach((photo)=>{
        // add the <a> tag
        const item = document.createElement("a");
        item.setAttribute("href", photo.links.html);
        item.setAttribute("target","_blank");
        // add the img
        const img = document.createElement('img');
        img.setAttribute("src",photo.urls.regular);
        img.setAttribute("title",photo.alt_description);
        img.setAttribute("alt",photo.alt_description);

        // add the img in the <a> and both to the image container
        item.appendChild(img);
        imageContainer.appendChild(item);
    })
}

// get photos from API
async function getPhotos(){
    try{
        const response = await fetch(unsplashAPI);
        photosArray=await response.json();
        displayPhotos(photosArray);
    }catch(err){
        console.log(err)
    }
    
   
}

