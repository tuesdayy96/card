import splitting from "https://cdn.skypack.dev/splitting";

const fullEl = document.querySelector('.wrap');
const fullpageEl = fullEl.querySelector('.fullpage');
const contentEl = fullEl.querySelectorAll('.swiper .content');
const contentFullEl = Array.from(contentEl,(el)=>{
    const clone = el.cloneNode(true);
    splitting({target:clone, by:"words"});
    clone.classList.add(
        'fullpage_content',
        'fullpage_content--hidden',
        'content_full');
    clone.classList.remove('content_slide');
    return clone;
});

contentFullEl.forEach((el) => fullpageEl.appendChild(el));

const state = {
    topContent : null,
    bottomContent : null
};

function slideChange(swiper){
    const total = swiper.slides.length - swiper.loopedSlides * 2;
    const contentIdx = (swiper.activeIndex - swiper.loopedSlides) % total;

    const content  = contentFullEl[contentIdx];
    if(!content) return;

    if(state.bottomContent){
        state.bottomContent.classList.remove('fullpage_content--bottom');
        state.bottomContent.classList.add('fullpage_content--hidden');
    }
    if(state.topContent){
        state.topContent.classList.remove('fullpage_content--top');
        state.topContent.classList.add('fullpage_content--bottom');
    }
    state.bottomContent = state.topContent;
    state.topContent = content;

    const slidetRect = swiper.slides[swiper.activeIndex].getBoundingClientRect();
    const parentRect = fullEl.getBoundingClientRect();

    content.style.transition = 'none';
    content.style.left = slidetRect.left - parentRect.left + 'px';
    content.style.top = slidetRect.top - parentRect.left + 'px';
    content.style.width = slidetRect.width + 'px';
    content.style.height = slidetRect.height + 'px';
    content.style.borderRadius = 'var(--border-radius,0)';

    content.getBoundingClientRect();

    content.classList.remove('fullpage_content--hidden');
    content.classList.add('fullpage_content--top','fullpage_content--grow');

    content.style.transition = '';
    content.style.left = '';
    content.style.top = '';
    content.style.width = '';
    content.style.height = '';
    content.style.borderRadius = '';

    const onShowTextEnd = (event) => {
        if(event.target !== event.currentTarget){
            event.currentTarget.classList.remove('fullpage_content--text');
            event.currentTarget.removeEventListener('transitionend',onShowTextEnd);
        }
    };
    const onGrowEnd = (event) => {
        event.currentTarget.classList.remove('fullpage_content--grow');
        event.currentTarget.classList.add('fullpage_content--text');
        event.currentTarget.addEventListener('transitionend',onShowTextEnd);
    };

    content.addEventListener('transitionend',onGrowEnd,{ once: true });

}

function swiperInit(swiper){
    const total = swiper.slides.length - swiper.loopedSlides * 2;
    const contentIdx = (swiper.activeIndex - swiper.loopedSlides) % total;

    const content = contentFullEl[contentIdx];
    if(!content) return;

    content.classList.remove('fullpage_content--hidden');
    content.classList.add('fullpage_content--top');
    state.topContent = content;
}

const swiper = new Swiper(".swiper", {
    slidesPerView: 3.5,
    spaceBetween: 25,
    loop: true,
    speed: 1000,
    simulateTouch: false,

    autoplay: {
        delay:1000
    },

    navigation:{
        nextEl: "#next",
        prevEl: "#prev"
    },
    on:{realIndexChange: slideChange, init: swiperInit}
});

function progressor(){
    const idxBar = document.getElementById('idx');
    const btn = document.querySelector('.btns');
    var btn_left = parseInt(btn.style.left);
    idxBar.style.left = btn_left + 2 + '%';
}
progressor();