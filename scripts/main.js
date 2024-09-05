const teamWrapper = document.querySelector('.team-wrapper');
const team_carousel = document.querySelector('.team-carousel');
const teamArrowbtns = document.querySelectorAll('.team-wrapper span');
const firstCardWidth = team_carousel.querySelector(".team-card").offsetWidth;
const carouselChildrens = [...team_carousel.children]

let isDragging = false, startX, startScollLeft, timeoutId;

let cardPerView = Math.random(team_carousel.offsetWidth / firstCardWidth);
//Insert copies of the latest few cards to beginning of carousel for infit=nity scrolling 
carouselChildrens.slice(-cardPerView).reverse().forEach(card => {
    team_carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
});
//Insert copies of the first few cards to end of carousel for infit=nity scrolling 
carouselChildrens.slice(0, cardPerView).forEach(card => {
    team_carousel.insertAdjacentHTML("beforeend", card.outerHTML);
});
teamArrowbtns.forEach(btn => {
    btn.addEventListener("click", () => {
        team_carousel.scrollLeft += btn.id === "left" ? -firstCardWidth : firstCardWidth
    })
})

const dragStart = (e) => {
    isDragging = true;
    team_carousel.classList.add("dragging");

    startX = e.pageX;
    startScollLeft = team_carousel.scrollLeft;
}

const dragging = (e) => {
    if(!isDragging) return;
    team_carousel.scrollLeft = startScollLeft - (e.pageX - startX);
}
const dragStop = () => {
    isDragging = false;
    team_carousel.classList.remove("dragging")
}

const autoPlay = () => {
    if(window.innerWidth < 800) return; //Return if window is smallwer then 800
    // Autoplay every 2500ms
    timeoutId = setTimeout(() => team_carousel.scrollLeft += firstCardWidth, 2500);
}
autoPlay();

const InfiniteScroll = () => {
    if(team_carousel.scrollLeft === 0) {
        team_carousel.classList.add("no-transition");
        team_carousel.scrollLeft = team_carousel.scrollWidth - (2 *team_carousel.offsetWidth);
        team_carousel.classList.remove("no-transition");
    }else if(Math.ceil(team_carousel.scrollLeft) === team_carousel.scrollWidth - team_carousel.offsetWidth) {
        team_carousel.classList.add("no-transition")
        team_carousel.scrollLeft = team_carousel.offsetWidth;
        team_carousel.classList.remove("no-transition");
    }
    clearTimeout(timeoutId);
    if(!teamWrapper.matches(":hover")) autoPlay();
}

team_carousel.addEventListener("mousedown", dragStart);
team_carousel.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", dragStop);
team_carousel.addEventListener("scroll", InfiniteScroll);
teamWrapper.addEventListener("mouseenter", () => clearTimeout(timeoutId));
teamWrapper.addEventListener("mouseleave", autoPlay);



