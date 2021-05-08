const imageContainer = document.getElementById('image-container');
const loader= document.getElementById('loader')
const error= document.getElementById('error');

let photosArray=[]
let ready=false;
let imageLoaded=0;
let totalImage=0;

// Unsplash API
const initialImageCount=8;
const apiKey="UbXc2ciaLfuxlnPAazlz-tuGvJvASVi40LJp0BbvQHM";
let unsplashAPI=`https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${initialImageCount}`;

function increaseImageCount(increasedImageCount){
    unsplashAPI=`https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${increasedImageCount}`;
}

// Set attribute helper function
function setAttributes(element,attr){
    for (const key in attr){
        element.setAttribute(key,attr[key]);
    }
}

// check if all the image is loaded before calling another getPhotos()
function imageLoad(){
    imageLoaded++;
    // console.log(imageLoaded,totalImage,ready)
    if(imageLoaded===totalImage){
        ready=true;
        increaseImageCount(15);
        removeLoader();
    }

}

// show loading animation
function showLoader(){
    console.log("loading")
    loader.hidden=false;
}

function removeLoader(){
    console.log("finished loading");
    loader.hidden=true;
}


// create elements for the DOM
 function displayPhotos(photosArray){

    imageLoaded=0;
    totalImage=photosArray.length;

    showLoader();
    photosArray.forEach(async (photo)=>{
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
        
        img.addEventListener("load",imageLoad);
        
        // add the img in the <a> and both to the image container
        item.appendChild(img);
        imageContainer.appendChild(item);
    })
}

// get photos from API
async function getPhotos(){
    try{
        error.hidden=true;
        photosArray=[];
        const response = await fetch(unsplashAPI);
        photosArray=await response.json();
        displayPhotos(photosArray);
    }catch(err){
        console.log(err.name)
        error.hidden=false;
    }
    
   
}



getPhotos();
window.addEventListener("scroll",()=>{
    if (window.scrollY+window.innerHeight>= document.body.offsetHeight -1000 && ready){
        console.log("get photos")
        getPhotos();
        ready=false;
        showLoader();
    }
  
})

window.addEventListener('online', () => {error.hidden=true});
window.addEventListener('offline', () => {
    console.log("offline");
    error.hidden=false
});
