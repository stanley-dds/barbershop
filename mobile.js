document.addEventListener("DOMContentLoaded", () => {
    initHeroSection();
    initNavigation();
    initScrollDownButton();
    initServiceCarousel();
    initSectionScrollControl();
});

/* === Появление текста "BARBERGENA" и стрелки вниз === */
function initHeroSection() {
    const barberText = document.querySelector('.barber-gena');
    const scrollDownArrow = document.querySelector('.scroll-down');

    if (barberText && scrollDownArrow) {
        setTimeout(() => {
            barberText.classList.add('show');
            scrollDownArrow.classList.add('show');
        }, 1500);
    }
}

/* === Навигация по кнопкам в `sticky-header` === */
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-buttons a');
    const logoLink = document.querySelector('.logo');

    navLinks.forEach(link => {
        link.addEventListener("click", function (e) {
            e.preventDefault(); // Блокируем стандартное поведение ссылки
            const targetId = this.getAttribute("href");
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                smoothScrollTo(targetElement);
            }
        });
    });

    if (logoLink) {
        logoLink.addEventListener("click", function (e) {
            e.preventDefault();
            smoothScrollTo(document.querySelector("#home"));
        });
    }
}

/* === Скролл вниз при нажатии на стрелку в `#home` === */
function initScrollDownButton() {
    const scrollDownArrow = document.querySelector('.scroll-down');

    if (scrollDownArrow) {
        scrollDownArrow.addEventListener("click", function (e) {
            e.preventDefault();
            smoothScrollTo(document.querySelector("#services"));
        });
    }
}

/* === Плавный скролл по секциям === */
function smoothScrollTo(target) {
    if (!target) return;
    window.scrollTo({
        top: target.offsetTop,
        behavior: "smooth"
    });
}

/* === Блокировка вертикального скролла при свайпе карусели === */
let isCarouselActive = false;

function initServiceCarousel() {
    const carouselContainer = document.querySelector(".carousel-container");
    const carousel = document.querySelector(".carousel");
    const items = document.querySelectorAll(".carousel-item");
    const leftArrow = document.querySelector(".left-arrow");
    const rightArrow = document.querySelector(".right-arrow");

    if (!carousel || !items.length || !leftArrow || !rightArrow || !carouselContainer) {
        console.error("Ошибка: элементы карусели не найдены!");
        return;
    }

    let currentIndex = 0;
    let isAnimating = false;

    function updateCarousel() {
        if (isAnimating) return;
        isAnimating = true;
        const offset = -currentIndex * 100;
        carousel.style.transform = `translateX(${offset}%)`;
        setTimeout(() => {
            isAnimating = false;
        }, 500);
    }

    leftArrow.addEventListener("click", () => {
        if (isAnimating) return;
        currentIndex = (currentIndex === 0) ? items.length - 1 : currentIndex - 1;
        updateCarousel();
    });

    rightArrow.addEventListener("click", () => {
        if (isAnimating) return;
        currentIndex = (currentIndex === items.length - 1) ? 0 : currentIndex + 1;
        updateCarousel();
    });

    // Свайпы для карусели
    let startX, endX;

    carouselContainer.addEventListener("touchstart", (e) => {
        isCarouselActive = true; // Блокируем вертикальный скролл
        startX = e.touches[0].clientX;
    });

    carouselContainer.addEventListener("touchend", (e) => {
        endX = e.changedTouches[0].clientX;
        handleSwipe();
        setTimeout(() => isCarouselActive = false, 300); // Разблокируем после свайпа
    });

    function handleSwipe() {
        if (isAnimating) return;
        if (endX < startX - 50) { // Свайп влево
            currentIndex = (currentIndex === items.length - 1) ? 0 : currentIndex + 1;
        } else if (endX > startX + 50) { // Свайп вправо
            currentIndex = (currentIndex === 0) ? items.length - 1 : currentIndex - 1;
        }
        updateCarousel();
    }
}

/* === Блокировка скроллинга вверх/вниз, пока секция не откроется полностью === */
function initSectionScrollControl() {
    let isScrolling = false;
    let touchStartY = 0;
    let touchEndY = 0;

    document.addEventListener("touchstart", (e) => {
        if (isCarouselActive) return; // Если листаем карусель – не обрабатываем секции
        touchStartY = e.touches[0].clientY;
    });

    document.addEventListener("touchend", (e) => {
        if (isCarouselActive) return; // Если карусель активна – игнорируем
        touchEndY = e.changedTouches[0].clientY;
        handleSectionSwipe();
    });

    function handleSectionSwipe() {
        if (isScrolling) return;

        const sections = document.querySelectorAll('.section');
        let currentIndex = [...sections].findIndex(section =>
            window.scrollY >= section.offsetTop - 50 &&
            window.scrollY < section.offsetTop + section.offsetHeight - 50
        );

        if (touchEndY < touchStartY - 50) { // Свайп вверх
            currentIndex = Math.min(currentIndex + 1, sections.length - 1);
        } else if (touchEndY > touchStartY + 50) { // Свайп вниз
            currentIndex = Math.max(currentIndex - 1, 0);
        }

        smoothScrollTo(sections[currentIndex]);
    }
}
