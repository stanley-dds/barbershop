// Слайдер изображений
let currentIndex = 0;

function showSlide(index) {
    const slides = document.querySelectorAll('.slider img');
    const totalSlides = slides.length;

    slides.forEach(slide => slide.classList.remove('active'));
    currentIndex = index >= totalSlides ? 0 : index < 0 ? totalSlides - 1 : index;
    slides[currentIndex].classList.add('active');
}

// Автоматическое переключение изображений каждые 3 секунды
setInterval(() => {
    showSlide(currentIndex + 1);
}, 3000);

// Инициализация слайдера при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    showSlide(currentIndex);
});






// Прокрутка услуг
const slider = document.querySelector('.services-slider');
const leftArrow = document.querySelector('.left-arrow');
const rightArrow = document.querySelector('.right-arrow');
const dots = document.querySelectorAll('.dot');

let serviceIndex = 0;

function updateServiceSlider() {
    const serviceCards = document.querySelectorAll('.service-card');
    const visibleCards = 3; // Количество видимых карточек
    const totalCards = serviceCards.length;
    const maxIndex = totalCards - visibleCards;

    // Сдвигаем слайдер
    const offset = -(serviceIndex * (100 / visibleCards));
    slider.style.transform = `translateX(${offset}%)`;

    // Обновляем активные точки
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === serviceIndex);
    });

    // Управляем видимостью стрелок
    leftArrow.style.visibility = serviceIndex > 0 ? 'visible' : 'hidden';
    rightArrow.style.visibility = serviceIndex < maxIndex ? 'visible' : 'hidden';
}

// Инициализация слайдера
updateServiceSlider();

leftArrow.addEventListener('click', () => {
    serviceIndex = Math.max(serviceIndex - 1, 0);
    updateServiceSlider();
});

rightArrow.addEventListener('click', () => {
    const serviceCards = document.querySelectorAll('.service-card');
    const visibleCards = 3;
    const maxIndex = serviceCards.length - visibleCards;

    serviceIndex = Math.min(serviceIndex + 1, maxIndex);
    updateServiceSlider();
});





// Плавный скролл для всех ссылок в sticky header
document.querySelectorAll('.navbar nav a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href'); // Получаем ID секции
        const targetElement = document.querySelector(targetId); // Находим секцию

        if (targetElement) {
            const headerHeight = document.querySelector('.sticky-header').offsetHeight; // Высота шапки
            const targetPosition = targetElement.offsetTop - headerHeight; // Смещение с учетом шапки

            // Плавный скролл
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth',
            });

            // Убираем активный класс у всех ссылок
            document.querySelectorAll('.navbar nav a').forEach(link => link.classList.remove('active'));
            // Добавляем активный класс к текущей ссылке
            this.classList.add('active');
        }
    });
});


// Подсвечивание активной секции при прокрутке
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.navbar nav a');

function highlightActiveSection() {
    const headerHeight = document.querySelector('.sticky-header').offsetHeight;
    const scrollPosition = window.scrollY + headerHeight;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => link.classList.remove('active'));
            const activeLink = document.querySelector(`.navbar nav a[href="#${sectionId}"]`);
            if (activeLink) {
                activeLink.classList.add('active');
            }
        }
    });
}

// Слушаем событие прокрутки
window.addEventListener('scroll', highlightSection);

// Инициализация подсветки
highlightSection();






/// Галерея работ
const gallerySlider = document.querySelector('.gallery-slider');
const galleryLeftArrow = document.querySelector('.gallery-section .left-arrow');
const galleryRightArrow = document.querySelector('.gallery-section .right-arrow');
const galleryDots = document.querySelectorAll('.gallery-section .dot');

let galleryIndex = 0; // Текущий индекс видимого слайда
const visibleCards = 3; // Количество видимых карточек
const totalCards = document.querySelectorAll('.gallery-card').length; // Общее количество карточек
const maxIndex = totalCards - visibleCards; // Максимальный индекс для сдвига

// Функция обновления состояния галереи
function updateGallerySlider() {
    // Рассчитываем смещение
    const offset = -(galleryIndex * (100 / visibleCards));
    gallerySlider.style.transform = `translateX(${offset}%)`;

    // Обновляем активные точки
    galleryDots.forEach((dot, index) => {
        dot.classList.toggle('active', index === galleryIndex);
    });

    // Управляем видимостью стрелок
    galleryLeftArrow.style.visibility = galleryIndex > 0 ? 'visible' : 'hidden';
    galleryRightArrow.style.visibility = galleryIndex < maxIndex ? 'visible' : 'hidden';
}

// Обработчики событий для стрелок
galleryLeftArrow.addEventListener('click', () => {
    galleryIndex = Math.max(galleryIndex - 1, 0);
    updateGallerySlider();
});

galleryRightArrow.addEventListener('click', () => {
    galleryIndex = Math.min(galleryIndex + 1, maxIndex);
    updateGallerySlider();
});

// Обработчики событий для точек
galleryDots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        galleryIndex = index;
        updateGallerySlider();
    });
});

// Инициализация
updateGallerySlider();

