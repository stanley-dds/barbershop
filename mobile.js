document.addEventListener("DOMContentLoaded", () => {
    initHeroSection();
    initNavigation();
    initScrollDownButton();
    initServiceCarousel();
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
            e.preventDefault();
            smoothScrollTo(this.getAttribute("href"));
        });
    });

    if (logoLink) {
        logoLink.addEventListener("click", function (e) {
            e.preventDefault();
            smoothScrollTo("#home");
        });
    }
}

/* === Скролл вниз при нажатии на стрелку === */
function initScrollDownButton() {
    const scrollDownArrow = document.querySelector('.scroll-down');

    if (scrollDownArrow) {
        scrollDownArrow.addEventListener("click", function (e) {
            e.preventDefault();
            smoothScrollTo("#services");
        });
    }
}

/* === Функция плавного скроллинга === */
function smoothScrollTo(targetSelector) {
    const target = document.querySelector(targetSelector);
    if (target) {
        window.scrollTo({
            top: target.offsetTop,
            behavior: "smooth"
        });
    }
}




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
        console.log("Левая стрелка нажата");
        if (isAnimating) return;
        currentIndex = (currentIndex === 0) ? items.length - 1 : currentIndex - 1;
        updateCarousel();
    });

    rightArrow.addEventListener("click", () => {
        console.log("Правая стрелка нажата");
        if (isAnimating) return;
        currentIndex = (currentIndex === items.length - 1) ? 0 : currentIndex + 1;
        updateCarousel();
    });

    // Обработчик свайпов
    let startX, endX;

    carouselContainer.addEventListener("touchstart", (e) => {
        startX = e.touches[0].clientX;
    });

    carouselContainer.addEventListener("touchend", (e) => {
        endX = e.changedTouches[0].clientX;
        handleSwipe();
    });

    function handleSwipe() {
        if (isAnimating) return;
        if (endX < startX - 50) {
            currentIndex = (currentIndex === items.length - 1) ? 0 : currentIndex + 1;
        } else if (endX > startX + 50) {
            currentIndex = (currentIndex === 0) ? items.length - 1 : currentIndex - 1;
        }
        updateCarousel();
    }
}








