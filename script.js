const imageContainer = document.getElementById('image-container');
const error = document.getElementById('error');
const errorBtn = document.getElementById('error-btn');
const searchBtn = document.getElementById("search-btn");
const searchBox = document.getElementById("search-box")

let finishLoading = false;
let imageLoaded = 0;
let totalImage = 0;


let imagePage = 1;
const apiKey = "UbXc2ciaLfuxlnPAazlz-tuGvJvASVi40LJp0BbvQHM";
let query = "dog" // default query
let unsplashAPI = `https://api.unsplash.com/search/photos/?client_id=${apiKey}&query=${query}&page=${imagePage}`;



// MAIN FUNCTIONS
function createEmptytags(imageCount = 10) {
    const arr = []
    for (let i = 0; i < imageCount; i++) {
        const item = document.createElement("div");
        item.classList.add("item-container", "image-loading")
        imageContainer.appendChild(item);
        arr.push(item)
    }
    return arr;
}

function fillPhoto(photosArray, photos) {

    let photosIndex = 0
    photosArray.map((item) => {
        item.style.cssText += `
        background: url(${photos[photosIndex].urls.small});
        background-position: center center;
        background-size:cover;
    `;
        item.classList.remove("image-loading")
        photosIndex++;
    })

}

async function getPhotos(query) {
    const photosArray = createEmptytags();
    finishLoading = false;
    let unsplashAPI = `https://api.unsplash.com/search/photos/?client_id=${apiKey}&query=${query}&page=${imagePage}`;

    const response = await fetch(unsplashAPI);
    const data = await response.json()
    const photos = data.results;

    fillPhoto(photosArray, photos)

    finishLoading = true;
    imagePage++;


}

function clearSearchResults() {
    imageContainer.innerHTML = "";
}

function returnResults(query){
    if (query) {
        clearSearchResults();
        getPhotos(query)
    }
}

// MISC

// error messages
function removeErrorMessage() {
    error.style.visibility = "hidden";
}

function showErrorMessage() {
    error.style.visibility = "visible";
}
errorBtn.addEventListener("click", () => {
    removeErrorMessage();
})

// inform connection status if offline
window.addEventListener("online", () => {
    removeErrorMessage();
})
window.addEventListener("offline", () => {
    showErrorMessage();
})



// search DOMS
searchBtn.addEventListener("click", () => {
    query = searchBox.value;
    returnResults(query)
})
searchBox.addEventListener("keyup",(e)=>{
    if (e.key === "Enter"){// the ENTER key
        console.log("clicked")
        searchBtn.click();
    }
})


// INFINITE SCROLL TRIGGER
window.addEventListener("scroll", () => {
    if (window.scrollY + window.innerHeight >= document.body.offsetHeight - 500 && finishLoading) {
        getPhotos(query)
    }
})