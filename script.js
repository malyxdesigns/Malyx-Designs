document.addEventListener('DOMContentLoaded', () => {
    
   // ==========================================
    // 1. DYNAMIC TYPEWRITER EFFECT (FIXED BLINK)
    // ==========================================
    const typewriterElement = document.getElementById('typewriter-text');
    const textToType = "Crafting Your Visual Identity";
    
    function typeEffect(element, text, speed = 80) {
        if (!element) return;
        element.innerHTML = ""; // මුලින්ම ක්ලියර් කරනවා
        
        let index = 0;
        
        // අකුරු ටයිප් වෙන Function එක
        function type() {
            if (index < text.length) {
                // Cursor එකට කලින් අකුර එකතු කරනවා
                element.innerHTML = text.substring(0, index + 1) + '<span class="typing-cursor">|</span>';
                index++;
                setTimeout(type, speed);
            } else {
                // ටයිප් වෙලා ඉවර වුණාම Cursor එක විතරක් දිගටම බ්ලින්ක් වෙන්න අරිනවා
                element.innerHTML = text + '<span class="typing-cursor">|</span>';
            }
        }
        type();
    }

    if (typewriterElement) {
        typeEffect(typewriterElement, textToType, 80); 
    }

    // ==========================================
    // 2. MOBILE NAVIGATION MENU TOGGLE
    // ==========================================
    const menuToggle = document.getElementById('menuToggle');
    const navLinksContainer = document.getElementById('navLinks');
    const navLinksArray = document.querySelectorAll('#navLinks a');

    if (menuToggle && navLinksContainer) {
        menuToggle.addEventListener('click', () => {
            navLinksContainer.classList.toggle('active');
            const icon = menuToggle.querySelector('i');
            if (icon) {
                icon.classList.toggle('fa-bars');
                icon.classList.toggle('fa-times');
            }
        });

        navLinksArray.forEach(link => {
            link.addEventListener('click', () => {
                navLinksContainer.classList.remove('active');
                const icon = menuToggle.querySelector('i');
                if (icon) {
                    icon.classList.add('fa-bars');
                    icon.classList.remove('fa-times');
                }
            });
        });
    }

    // ==========================================
    // 3. SCROLL EVENTS: BACK TO TOP & ACTIVE NAV HIGHLIGHT
    // ==========================================
    const backToTopBtn = document.getElementById('backToTop');
    const sections = document.querySelectorAll('section[id]');

    function handleScroll() {
        const scrollY = window.scrollY;

        if (backToTopBtn) {
            if (scrollY > 300) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        }

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 100;
            const sectionId = current.getAttribute('id');
            const targetNavLink = document.querySelector(`#navLinks a[href*="${sectionId}"]`);

            if (targetNavLink) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    targetNavLink.classList.add('active');
                } else {
                    targetNavLink.classList.remove('active');
                }
            }
        });
    }

    window.addEventListener('scroll', handleScroll, { passive: true });

    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // ==========================================
    // 4. PORTFOLIO FILTER SYSTEM
    // ==========================================
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            portfolioItems.forEach(item => {
                const itemCategory = item.getAttribute('data-category');
                
                if (filterValue === 'all' || itemCategory === filterValue) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 10);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.92)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300); // Animation එක ඉවර වුණාම display none වෙන්න හැදුවා (Smooth Transition)
                }
            });
        });
    });

    // ==========================================
    // 5. LIGHTBOX MODAL MODIFIER
    // ==========================================
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxClose = document.querySelector('.lightbox-close');

    if (lightbox && lightboxImg) {
        portfolioItems.forEach(item => {
            const img = item.querySelector('img');
            if (img) {
                img.addEventListener('click', () => {
                    lightbox.classList.add('show');
                    lightboxImg.src = img.src;
                    lightboxImg.alt = img.alt;
                    document.body.style.overflow = 'hidden';
                });
            }
        });

        const closeLightbox = () => {
            lightbox.classList.remove('show');
            document.body.style.overflow = '';
        };

        if (lightboxClose) {
            lightboxClose.addEventListener('click', closeLightbox);
        }

        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });
    }

    // ==========================================
    // 6. FORM VALIDATION & WEB3FORMS AJAX INTEGRATION
    // ==========================================
    const contactForm = document.getElementById('contactForm');
    const successBox = document.getElementById('successBox');

    function setupRealtimeValidationCleaner(inputId, errorId) {
        const inputElement = document.getElementById(inputId);
        const errorElement = document.getElementById(errorId);
        if (inputElement && errorElement) {
            inputElement.addEventListener('input', () => {
                if (inputElement.value.trim() !== "") {
                    errorElement.style.display = 'none';
                    inputElement.classList.remove('invalid-field');
                }
            });
        }
    }
    setupRealtimeValidationCleaner('name', 'nameError');
    setupRealtimeValidationCleaner('city', 'cityError');
    setupRealtimeValidationCleaner('message', 'messageError');

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            let isFormValid = true;

            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const whatsapp = document.getElementById('whatsapp');
            const city = document.getElementById('city');
            const message = document.getElementById('message');

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const whatsappRegex = /^(?:\+94|0)?7[0-9]{8}$/;

            if (!name || name.value.trim() === "") {
                const err = document.getElementById('nameError');
                if (err) err.style.display = 'block';
                if (name) name.classList.add('invalid-field');
                isFormValid = false;
            }

            if (!email || !emailRegex.test(email.value.trim())) {
                const err = document.getElementById('emailError');
                if (err) err.style.display = 'block';
                if (email) email.classList.add('invalid-field');
                isFormValid = false;
            } else {
                const err = document.getElementById('emailError');
                if (err) err.style.display = 'none';
                if (email) email.classList.remove('invalid-field');
            }

            if (!whatsapp || !whatsappRegex.test(whatsapp.value.trim().replace(/\s+/g, ''))) {
                const err = document.getElementById('whatsappError');
                if (err) err.style.display = 'block';
                if (whatsapp) whatsapp.classList.add('invalid-field');
                isFormValid = false;
            } else {
                const err = document.getElementById('whatsappError');
                if (err) err.style.display = 'none';
                if (whatsapp) whatsapp.classList.remove('invalid-field');
            }

            if (!city || city.value.trim() === "") {
                const err = document.getElementById('cityError');
                if (err) err.style.display = 'block';
                if (city) city.classList.add('invalid-field');
                isFormValid = false;
            }

            if (!message || message.value.trim() === "") {
                const err = document.getElementById('messageError');
                if (err) err.style.display = 'block';
                if (message) message.classList.add('invalid-field');
                isFormValid = false;
            }

            if (!isFormValid) return;

            const formData = new FormData(contactForm);
            const formObject = Object.fromEntries(formData);
            const jsonPayload = JSON.stringify(formObject);

            const submitButton = contactForm.querySelector('.form-btn');
            if (submitButton) {
                submitButton.disabled = true;
                submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            }

            fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: jsonPayload
            })
            .then(async (response) => {
                let jsonRes = await response.json();
                if (response.status === 200) {
                    if (successBox) {
                        successBox.style.display = 'block';
                        contactForm.reset();
                    }
                } else {
                    alert("Submission Error: " + (jsonRes.message || "Something went wrong."));
                }
            })
            .catch(error => {
                console.error("Error:", error);
                alert("Network connection error.");
            })
            .finally(() => {
                if (submitButton) {
                    submitButton.disabled = false;
                    submitButton.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
                }
                if (successBox) {
                    setTimeout(() => {
                        successBox.style.display = 'none';
                    }, 5000);
                }
            });
        });
    }

    // ==========================================
    // 7. INTERACTIVE STAR RATING SYSTEM
    // ==========================================
    const stars = document.querySelectorAll('.star');
    const ratingText = document.getElementById('rating-text');
    const starContainer = document.querySelector('.stars');

    const feedbackTexts = {
        1: "We're sorry to hear that. How can we improve?",
        2: "Thanks for the feedback. We will work to get better.",
        3: "Thank you! Let us know how we can make it a 5-star experience.",
        4: "Awesome! Thank you for rating Malyx Designs.",
        5: "Exceptional! Thank you for your amazing support!"
    };

    stars.forEach(star => {
        star.addEventListener('mouseover', () => {
            const currentHoverValue = star.getAttribute('data-value');
            highlightStars(currentHoverValue);
        });

        star.addEventListener('mouseout', () => {
            const activeStickyRating = starContainer ? (starContainer.getAttribute('data-rating') || 0) : 0;
            highlightStars(activeStickyRating);
        });

        star.addEventListener('click', () => {
            const selectedRatingValue = star.getAttribute('data-value');
            if (starContainer) {
                starContainer.setAttribute('data-rating', selectedRatingValue);
            }
            
            if (ratingText) {
                ratingText.textContent = feedbackTexts[selectedRatingValue] || `You rated us ${selectedRatingValue} stars!`;
                ratingText.style.fontWeight = 'bold';
            }
        });
    });

    function highlightStars(ratingValue) {
        stars.forEach(star => {
            const value = star.getAttribute('data-value');
            if (parseInt(value) <= parseInt(ratingValue)) {
                star.classList.add('rated');
            } else {
                star.classList.remove('rated');
            }
        });
    }
});

// ==========================================
// PREMIUM LIGHT / DARK / AUTO THEME SYSTEM
// ==========================================
const themeBtn = document.getElementById('themeBtn');
const themeDropdown = document.getElementById('themeDropdown');
const themeOptions = document.querySelectorAll('.theme-dropdown li');

if (themeBtn && themeDropdown) {
    themeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        themeDropdown.classList.toggle('show');
    });
    document.addEventListener('click', () => themeDropdown.classList.remove('show'));
}

function applyTheme(theme) {
    const root = document.documentElement;
    const systemIsDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    themeOptions.forEach(opt => {
        opt.classList.remove('active-theme');
        if (opt.getAttribute('data-theme') === theme) {
            
            opt.classList.add('active-theme');
        }
    });

    if (theme === 'auto') {
        if (systemIsDark) {
            root.removeAttribute('data-theme');
            if (themeBtn) themeBtn.innerHTML = '<i class="fas fa-moon"></i>';
        } else {
            root.setAttribute('data-theme', 'light');
            if (themeBtn) themeBtn.innerHTML = '<i class="fas fa-sun"></i>';
        }
    } else if (theme === 'light') {
        root.setAttribute('data-theme', 'light');
        if (themeBtn) themeBtn.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
        root.removeAttribute('data-theme');
        if (themeBtn) themeBtn.innerHTML = '<i class="fas fa-moon"></i>';
    }
}

themeOptions.forEach(option => {
    option.addEventListener('click', () => {
        const selectedTheme = option.getAttribute('data-theme');
        localStorage.setItem('malyx-theme', selectedTheme);
        applyTheme(selectedTheme);
    });
});

const savedTheme = localStorage.getItem('malyx-theme') || 'auto';
applyTheme(savedTheme);

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    if (localStorage.getItem('malyx-theme') === 'auto' || !localStorage.getItem('malyx-theme')) {
        applyTheme('auto');
    }
});