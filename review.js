const displayData = JSON.parse(localStorage.getItem("selectedMedia"));


const reviewedListDavid = JSON.parse(localStorage.getItem("reviewListDavid")) || "no reviews yet";
const reviewedListAudrey = JSON.parse(localStorage.getItem("reviewListAudrey")) || "no reviews yet";
console.log(displayData);



async function loadReviewData() {
    reviewedMedia = [];

    const data = await displayData;

    const posterImage = document.querySelector('#poster-img');
    const mediaTitle = document.querySelector('#media-title');
    posterImage.src = data.image;
    mediaTitle.textContent = data.title;

    reviewedMedia.push(data);

}

loadReviewData();


let davidReviews = [];
let audreyReviews = [];


if (reviewedListAudrey !== "no reviews yet") {
    audreyReviews = reviewedListAudrey;
    console.log(audreyReviews);
}

if (reviewedListDavid !== "no reviews yet") {
    davidReviews = reviewedListDavid;
    console.log(davidReviews);
}


function saveReview() {
    const reviewTitle = document.querySelector("#media-title");
    const reviewPoster = document.querySelector('#poster-img');
    const saveButton = document.querySelector("#save-button");
    const reviewBox = document.querySelector('#review-box');
    const userSelect = document.querySelector("#user-select");
    const reviewDate = document.querySelector("#date-picker");

    saveButton.addEventListener('click', () => {
        const reviewedMedia = {};

        const userReview = reviewBox.value;
        const userSelectValue = userSelect.value;
        const reviewOn = reviewDate.value;

        reviewedMedia.title = reviewTitle.textContent;
        reviewedMedia.poster = reviewPoster.src;
        reviewedMedia.reviewBy = userSelectValue;
        reviewedMedia.reviewOn = reviewOn;
        reviewedMedia.review = userReview;
        reviewedMedia.count = starCount;


        userSelectValue === "David" ? davidReviews.push(reviewedMedia) : audreyReviews.push(reviewedMedia);
        localStorage.setItem('reviewListDavid', JSON.stringify(davidReviews));
        localStorage.setItem('reviewListAudrey', JSON.stringify(audreyReviews));

        starCount = 0;

        console.log(davidReviews);
    })
}

saveReview();

let starCount = 0;

function checkStarRating() {
    const stars = document.querySelectorAll('.fa-star');

    for (let i = 0; i < stars.length; i++) {
        stars[i].addEventListener('click', () => {
            const alreadyChecked = stars[i].classList.contains('checked');

            if (alreadyChecked) {
                for (let s = 0; s < stars.length; s++) {
                    stars[s].classList.remove('checked');
                }
            } else {
                for (let c = 0; c <= i; c++) {
                    stars[c].classList.add('checked');
                    starCount++;
                }
            }

        });


    };
}

checkStarRating();

