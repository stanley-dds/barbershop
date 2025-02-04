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
            e.preventDefault();
            const target = document.querySelector(this.getAttribute("href"));
            if (target) smoothScrollTo(target);
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

/* === Полное открытие секции при скролле (с плавной доводкой) === */
function initSectionScrollControl() {
    let isScrolling = false;
    let isUserHolding = false; // Флаг, если пользователь удерживает палец на экране
    let touchStartY = 0;
    let touchEndY = 0;
    const sections = document.querySelectorAll('.section');

    document.addEventListener("touchstart", (e) => {
        if (isCarouselActive) return;
        isUserHolding = true; // Пользователь удерживает палец
        touchStartY = e.touches[0].clientY;
    });

    document.addEventListener("touchend", (e) => {
        if (isCarouselActive) return;
        isUserHolding = false; // Пользователь отпустил палец
        touchEndY = e.changedTouches[0].clientY;
        handleSectionSwipe();
    });

    document.addEventListener("touchmove", (e) => {
        isUserHolding = true; // Пока пользователь водит пальцем, не доводим секцию
    });

    window.addEventListener("scroll", () => {
        if (isScrolling || isUserHolding) return;
        isScrolling = true;

        setTimeout(() => {
            if (!isUserHolding) snapToNearestSection();
            isScrolling = false;
        }, 300);
    });

    function handleSectionSwipe() {
        if (isScrolling || isUserHolding) return;
        isScrolling = true;

        let currentIndex = findCurrentSection();
        if (touchEndY < touchStartY - 50) { // Свайп вверх
            currentIndex = Math.min(currentIndex + 1, sections.length - 1);
        } else if (touchEndY > touchStartY + 50) { // Свайп вниз
            currentIndex = Math.max(currentIndex - 1, 0);
        }

        smoothScrollTo(sections[currentIndex]);
        setTimeout(() => isScrolling = false, 800);
    }

    function snapToNearestSection() {
        let currentIndex = findCurrentSection();
        smoothScrollTo(sections[currentIndex]);
    }

    function findCurrentSection() {
        return [...sections].findIndex(section =>
            window.scrollY >= section.offsetTop - window.innerHeight / 2 &&
            window.scrollY < section.offsetTop + section.offsetHeight - window.innerHeight / 2
        );
    }
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
        setTimeout(() => isAnimating = false, 500);
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
        isCarouselActive = true;
        startX = e.touches[0].clientX;
    });

    carouselContainer.addEventListener("touchend", (e) => {
        endX = e.changedTouches[0].clientX;
        handleSwipe();
        setTimeout(() => isCarouselActive = false, 300);
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






document.addEventListener("DOMContentLoaded", () => {
    initGallery();
});

/* === Галерея: смена изображений при клике и работа пальца === */
function initGallery() {
    const images = ["style1.jpg", "style3.jpg", "style4.jpg", "style5.jpg"]; // Список изображений
    let currentIndex = 0;
    const galleryImage = document.getElementById("gallery-image");
    const pointer = document.getElementById("pointer");

    if (!galleryImage || !pointer) return;

    // Функция смены изображения при клике
    function changeImage() {
        currentIndex = (currentIndex + 1) % images.length;
        galleryImage.style.opacity = "0";
        setTimeout(() => {
            galleryImage.src = images[currentIndex];
            galleryImage.style.opacity = "1";
        }, 300);
    }

    // Функция случайного появления пальца (несколько раз в одном месте перед сменой)
    function movePointer() {
        const randomX = Math.random() * window.innerWidth * 0.5 + "px";
        const randomY = Math.random() * window.innerHeight * 0.5 + "px";

        pointer.style.left = randomX;
        pointer.style.top = randomY;
        pointer.style.opacity = "1";

        // Имитация нескольких нажатий перед сменой позиции
        setTimeout(() => pointer.classList.add("tap"), 500);
        setTimeout(() => pointer.classList.remove("tap"), 1000);
        setTimeout(() => pointer.classList.add("tap"), 1500);
        setTimeout(() => pointer.classList.remove("tap"), 2000);
        setTimeout(() => pointer.style.opacity = "0", 3000);
    }

    // Запускаем анимацию появления пальца каждые 5 секунд
    setInterval(movePointer, 5000);

    // Смена изображения при нажатии
    galleryImage.addEventListener("click", changeImage);
}


