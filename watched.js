const reviewedListDavid = JSON.parse(localStorage.getItem("reviewListDavid"));
const reviewedListAudrey = JSON.parse(localStorage.getItem("reviewListAudrey"));
console.log(reviewedListDavid);

const mainContainer = document.getElementById('main-container');

function displayWatched(reviewedListDavid) {
    const reviewedMedia = reviewedListDavid;


    reviewedMedia.forEach(review => {
        const reviewObject = {};

        const reviewContainer = document.createElement('div');
        reviewContainer.classList.add("review-container");


        reviewObject.title = review.title;
        reviewObject.poster = review.poster;
        reviewObject.review = review.review;
        reviewObject.stars = review.count;
        reviewObject.reviewBy = review.reviewBy;
        reviewObject.reviewOn = review.reviewOn;

        reviewContainer.innerHTML = `
        <p id="title">${reviewObject.title}</p>
        <img src="${reviewObject.poster}" id="poster">
        <p id="review">${reviewObject.review}</p>
        <p id="count">${reviewObject.stars}</p>
        <p id="review-by"> ${reviewObject.reviewBy}</p>
        <p id="review-on">${reviewObject.reviewOn}</p>
        `

        mainContainer.appendChild(reviewContainer);

    });
}

displayWatched(reviewedListDavid);