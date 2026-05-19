document.addEventListener("DOMContentLoaded", () => {
    
    // TYPEWRITER ANIMATION LOGIC
    const lines = [
        "Crafting Your Visual Identity",
        "With Malyx Designs"
    ];

    async function typeLine(elementId, text) {
        const el = document.getElementById(elementId);
        if (!el) return;
        for (let i = 0; i < text.length; i++) {
            el.textContent += text.charAt(i);
            await new Promise(resolve => setTimeout(resolve, 80));
        }
    }

    async function startTyping() {
        await typeLine('line1', lines[0]);
        await typeLine('line2', lines[1]);
    }

    startTyping();

    // 1. MOBILE MENU TOGGLE
    const menuToggle = document.getElementById('menuToggle');
    const navLinksContainer = document.getElementById('navLinks');

    if (menuToggle && navLinksContainer) {
        menuToggle.addEventListener('click', () => {
            navLinksContainer.classList.toggle('active');
        });
    }

    // 2. BACK TO TOP BUTTON LOGIC
    const backToTopBtn = document.getElementById('backToTop');

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });

    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // 3. LIVE PORTFOLIO FILTER LOGIC
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            document.querySelector('.filter-btn.active').classList.remove('active');
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            portfolioItems.forEach(item => {
                const itemCategory = item.getAttribute('data-category');
                
                if (filterValue === 'all' || filterValue === itemCategory) {
                    item.classList.remove('hide');
                    item.classList.add('show');
                } else {
                    item.classList.remove('show');
                    item.classList.add('hide');
                }
            });
        });
    });

    // 4. IMAGE LIGHTBOX LOGIC
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxClose = document.querySelector('.lightbox-close');

    document.querySelectorAll('.portfolio-item img').forEach(img => {
        img.addEventListener('click', () => {
            if (lightbox && lightboxImg) {
                lightbox.style.display = 'flex';
                lightboxImg.src = img.src;
            }
        });
    });

    if (lightboxClose && lightbox) {
        lightboxClose.addEventListener('click', () => {
            lightbox.style.display = 'none';
        });
    }

    if (lightbox) {
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                lightbox.style.display = 'none';
            }
        });
    }

    // 5. CONTACT FORM VALIDATION & WEB3FORMS SUBMISSION
    const contactForm = document.getElementById('contactForm');
    const formName = document.getElementById('name');
    const formEmail = document.getElementById('email');
    const formWhatsapp = document.getElementById('whatsapp');
    const formCity = document.getElementById('city');
    const formMessage = document.getElementById('message');
    const successBox = document.getElementById('successBox');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            let isValid = true;

            if (formName.value.trim() === '') {
                formName.parentElement.classList.add('invalid');
                document.getElementById('nameError').style.display = 'block';
                isValid = false;
            } else {
                formName.parentElement.classList.remove('invalid');
                document.getElementById('nameError').style.display = 'none';
            }

            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(formEmail.value.trim())) {
                formEmail.parentElement.classList.add('invalid');
                document.getElementById('emailError').style.display = 'block';
                isValid = false;
            } else {
                formEmail.parentElement.classList.remove('invalid');
                document.getElementById('emailError').style.display = 'none';
            }

            const phonePattern = /^[0-9]{9,11}$/;
            const cleanPhone = formWhatsapp.value.trim().replace(/[\s\-\+]/g, '');
            
            if (!phonePattern.test(cleanPhone)) {
                formWhatsapp.parentElement.classList.add('invalid');
                document.getElementById('whatsappError').style.display = 'block';
                isValid = false;
            } else {
                formWhatsapp.parentElement.classList.remove('invalid');
                document.getElementById('whatsappError').style.display = 'none';
            }

            if (formCity.value.trim() === '') {
                formCity.parentElement.classList.add('invalid');
                document.getElementById('cityError').style.display = 'block';
                isValid = false;
            } else {
                formCity.parentElement.classList.remove('invalid');
                document.getElementById('cityError').style.display = 'none';
            }

            if (formMessage.value.trim() === '') {
                formMessage.parentElement.classList.add('invalid');
                document.getElementById('messageError').style.display = 'block';
                isValid = false;
            } else {
                formMessage.parentElement.classList.remove('invalid');
                document.getElementById('messageError').style.display = 'none';
            }

            if (isValid) {
                const formData = new FormData(contactForm);

                fetch('https://api.web3forms.com/submit', {
                    method: 'POST',
                    body: formData
                })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        successBox.style.display = 'block';
                        contactForm.reset();
                        setTimeout(() => { successBox.style.display = 'none'; }, 5000);
                    } else {
                        alert('Something went wrong. Please try again!');
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                    alert('Connection error. Please check your internet!');
                });
            }
        });
    }

    // 6. SMOOTH NAVIGATION LINK HIGHLIGHTS
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let currentSectionId = '';
        const scrollPosition = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    });

    // 7. RATING SYSTEM
    const stars = document.querySelectorAll('.star');
    const ratingText = document.getElementById('rating-text');

    stars.forEach(star => {
        star.addEventListener('click', () => {
            let value = star.getAttribute('data-value');
            ratingText.textContent = "You rated us " + value + " stars!";
            
            stars.forEach(s => s.classList.remove('active'));
            for(let i=0; i<value; i++) {
                stars[i].classList.add('active');
            }
        });
    });

});


