const imageContainer = document.getElementById('image-container');
const loader= document.getElementById('loader')

let photosArray=[]
// Unsplash API
const count=10
const apiKey="UbXc2ciaLfuxlnPAazlz-tuGvJvASVi40LJp0BbvQHM";
const unsplashAPI=`https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;


// Set attribute helper function
function setAttributes(element,attr){
    for (const key in attr){
        element.setAttribute(key,attr[key]);
    }
}

// create elements for the DOM
function displayPhotos(photosArray){
    photosArray.forEach((photo)=>{
        // add the <a> tag
        const item = document.createElement("a");
        setAttributes(item,{
            "href":photo.links.html,
            "target":"_blank"
        });
        
        // add the img
        const img = document.createElement('img');
        setAttributes(img,{
            "src":photo.urls.regular,
            "title":photo.alt_description,
            "alt":photo.alt_description,
        });

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

