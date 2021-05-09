const imageContainer = document.getElementById('image-container');
const loader= document.getElementById('loader')
const error= document.getElementById('error');


let ready=false;
let imageLoaded=0;
let totalImage=0;


function createEmptytags(imageCount){
    const arr=[]
    for (let i=0; i<imageCount;i++){
        const item=document.createElement("div");
        item.classList.add("item-container","loading")
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
    item.classList.remove("loading")

 
}

async function getPhotos(imageCount=10){
    const photosArray=createEmptytags(imageCount);

    for(let i = 0;i<imageCount;i++){
        const collections=(min,max)=>{return Math.floor(min+Math.random()*(max-min))};

        let URL=`https://source.unsplash.com/collection/${collections(300,500)}/${i}/`;
       
        const photo =await fetch(URL);
        
        fillPhoto(photosArray[i],photo)
        

    }
    
   
}
getPhotos(50)