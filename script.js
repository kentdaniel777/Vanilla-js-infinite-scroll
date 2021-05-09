const imageContainer = document.getElementById('image-container');
const error= document.getElementById('error');
const errorBtn= document.getElementById('error-btn');

let finishLoading=false;
let imageLoaded=0;
let totalImage=0;


function removeErrorMessage(){
    error.style.visibility="hidden";
}
function showErrorMessage(){
    error.style.visibility="visible";
}
function createEmptytags(imageCount){
    const arr=[]
    for (let i=0; i<imageCount;i++){
        const item=document.createElement("div");
        item.classList.add("item-container","image-loading")
        imageContainer.appendChild(item);
        arr.push(item)
    }
    return arr;
}

function fillPhoto(item,photo){
    
    
    item.style.cssText+=`
        background: url(${photo.url});
        background-position: center center;
        background-size:cover;
    `;
    item.classList.remove("image-loading")

 
}

async function getPhotos(imageCount=18){
    const photosArray=createEmptytags(imageCount);
    finishLoading=false;
  
    for(let i = 0;i<imageCount;i++){
        const collections=(min,max)=>{return Math.floor(min+Math.random()*(max-min))};

        let URL=`https://source.unsplash.com/collection/${collections(300,500)}/${i}/`;
       
        const photo =await fetch(URL);
        
        fillPhoto(photosArray[i],photo)
        

    }
    finishLoading=true;
    
   
   
}
getPhotos()

errorBtn.addEventListener("click",()=>{
    removeErrorMessage();
})

window.addEventListener("scroll",()=>{
    if (window.scrollY+window.innerHeight>= document.body.offsetHeight -500 && finishLoading){
        getPhotos()
    }
})

window.addEventListener("online",()=>{
    removeErrorMessage();
})
window.addEventListener("offline",()=>{
    showErrorMessage();
})