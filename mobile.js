document.addEventListener("DOMContentLoaded", () => {
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav-buttons a');
    const logoLink = document.querySelector('.logo');

    // Плавный скролл к секции при нажатии на кнопку
    navLinks.forEach(link => {
        link.addEventListener("click", function (e) {
            e.preventDefault();
            const targetId = this.getAttribute("href");

            // Проверяем, есть ли элемент с этим ID
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop,
                    behavior: "smooth"
                });
            }
        });
    });

    // Плавный переход на главную при нажатии на логотип
    if (logoLink) {
        logoLink.addEventListener("click", function (e) {
            e.preventDefault();
            const homeSection = document.getElementById("home");
            if (homeSection) {
                window.scrollTo({
                    top: homeSection.offsetTop,
                    behavior: "smooth"
                });
            }
        });
    }

    // Обнаружение свайпа для перелистывания секций
    let startY, endY;
    
    document.addEventListener("touchstart", (e) => {
        startY = e.touches[0].clientY;
    });

    document.addEventListener("touchend", (e) => {
        endY = e.changedTouches[0].clientY;
        handleSwipe();
    });

    function handleSwipe() {
        let currentIndex = [...sections].findIndex(section => 
            window.scrollY >= section.offsetTop - 50 && 
            window.scrollY < section.offsetTop + section.offsetHeight - 50
        );

        if (endY < startY - 50) { // Свайп вверх
            currentIndex = Math.min(currentIndex + 1, sections.length - 1);
        } else if (endY > startY + 50) { // Свайп вниз
            currentIndex = Math.max(currentIndex - 1, 0);
        }

        window.scrollTo({
            top: sections[currentIndex].offsetTop,
            behavior: "smooth"
        });
    }
});
