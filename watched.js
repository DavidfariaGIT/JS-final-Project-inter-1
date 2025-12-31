const reviewedListDavid = JSON.parse(localStorage.getItem("reviewListDavid"));
const reviewedListAudrey = JSON.parse(localStorage.getItem("reviewListAudrey"));


const mainContainer = document.getElementById('main-container');
const clearButton = document.querySelector('#clear');

function displayWatched(reviewListDavid, reviewedListAudrey) {
    reviewedMedia = reviewListDavid;

    if (!reviewListDavid) {
    const reviewedMedia =  reviewedListAudrey;
    } 

    reviewedMedia.forEach(review => {
        const reviewObject = {};

        const reviewContainer = document.createElement('div');
        const infoContainer = document.createElement("div");
        infoContainer.classList.add("info-container");
        reviewContainer.classList.add("review-container");


        reviewObject.title = review.title;
        reviewObject.poster = review.poster;
        reviewObject.review = review.review;
        reviewObject.stars = review.count;
        reviewObject.reviewBy = review.reviewBy;
        reviewObject.reviewOn = review.reviewOn;
 
        reviewContainer.innerHTML = `
        <div id="title-container">
        <p id="title">${reviewObject.title}</p>
        <hr>
        </div>
        `

        infoContainer.innerHTML = `
        <div id="content-container">
        <div id="image-container">
        <img src="${reviewObject.poster}" id="poster">
        </div>
        <div id="info-container">
        <p id="review">${reviewObject.review}</p>
        <p id="count"><strong>${reviewObject.stars}/5 Rating</strong></p>
        <p id="review-by">Reviewed by: <strong>${reviewObject.reviewBy}</strong></p>
        <p id="review-on">${reviewObject.reviewOn}</p>
        </div>
        </div>
        
        `

        mainContainer.appendChild(reviewContainer);
        reviewContainer.appendChild(infoContainer);

    });
}

displayWatched(reviewedListAudrey);
displayWatched(reviewedListDavid);


clearButton.addEventListener("click", () => {
    localStorage.clear();
    mainContainer.innerHTML = "";
});