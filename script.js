// 1. MOBILE MENU TOGGLE
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
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
        // ඇක්ටිව් බටන් එකේ ස්ටයිල් එක මාරු කිරීම
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

// පෝර්ට්ෆෝලියෝ එකේ පින්තූරයක් ක්ලික් කළ විට ලොකු කර පෙන්වීම
document.querySelectorAll('.portfolio-item img').forEach(img => {
    img.addEventListener('click', () => {
        if (lightbox && lightboxImg) {
            lightbox.style.display = 'flex';
            lightboxImg.src = img.src; // ක්ලික් කරපු පින්තූරයේ ලින්ක් එක දානවා
        }
    });
});

// X බටන් එක ක්ලික් කළ විට Popup එක වැසීම
if (lightboxClose && lightbox) {
    lightboxClose.addEventListener('click', () => {
        lightbox.style.display = 'none';
    });
}

// පින්තූරයෙන් පිටත කළු පසුබිම ක්ලික් කළත් වැසෙන ලෙස සකස් කිරීම
if (lightbox) {
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.style.display = 'none';
        }
    });
}

// 5. CONTACT FORM VALIDATION & WEB3FORMS SUBMISSION LOGIC
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

        // 1. නම පරීක්ෂා කිරීම
        if (formName.value.trim() === '') {
            formName.parentElement.classList.add('invalid');
            document.getElementById('nameError').style.display = 'block';
            isValid = false;
        } else {
            formName.parentElement.classList.remove('invalid');
            document.getElementById('nameError').style.display = 'none';
        }

        // 2. ඊමේල් එක පරීක්ෂා කිරීම
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(formEmail.value.trim())) {
            formEmail.parentElement.classList.add('invalid');
            document.getElementById('emailError').style.display = 'block';
            isValid = false;
        } else {
            formEmail.parentElement.classList.remove('invalid');
            document.getElementById('emailError').style.display = 'none';
        }

        // 3. WhatsApp නම්බර් එක පරීක්ෂා කිරීම (ඉලක්කම් 9-11 අතරද කියා බලයි)
        const phonePattern = /^[0-9]{9,11}$/;
        // කලින් හිස්තැන් සහ දෑත් සලකුණු (-, +) තිබේ නම් ඒවා අයින් කර ඉලක්කම් පමණක් ගනී
        const cleanPhone = formWhatsapp.value.trim().replace(/[\s\-\+]/g, '');
        
        if (!phonePattern.test(cleanPhone)) {
            formWhatsapp.parentElement.classList.add('invalid');
            document.getElementById('whatsappError').style.display = 'block';
            isValid = false;
        } else {
            formWhatsapp.parentElement.classList.remove('invalid');
            document.getElementById('whatsappError').style.display = 'none';
        }

        // 4. නගරය පරීක්ෂා කිරීම
        if (formCity.value.trim() === '') {
            formCity.parentElement.classList.add('invalid');
            document.getElementById('cityError').style.display = 'block';
            isValid = false;
        } else {
            formCity.parentElement.classList.remove('invalid');
            document.getElementById('cityError').style.display = 'none';
        }

        // 5. මැසේජ් එක පරීක්ෂා කිරීම
        if (formMessage.value.trim() === '') {
            formMessage.parentElement.classList.add('invalid');
            document.getElementById('messageError').style.display = 'block';
            isValid = false;
        } else {
            formMessage.parentElement.classList.remove('invalid');
            document.getElementById('messageError').style.display = 'none';
        }

        // ඔක්කොම හරි නම් ඊමේල් එකට යවනවා
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
                    
                    setTimeout(() => {
                        successBox.style.display = 'none';
                    }, 5000);
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

// 6. SMOOTH NAVIGATION LINK HIGHLIGHTS LOGIC
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let currentSectionId = '';
    const scrollPosition = window.scrollY + 100; // උඩ සිට ඇති දුර මැනීම

    // දැනට ස්ක්‍රීන් එකේ පෙනෙන සෙක්ෂන් එක කුමක්දැයි සෙවීම
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            currentSectionId = section.getAttribute('id');
        }
    });

    // අදාළ සෙක්ෂන් එකට ගැලපෙන Menu Link එකට .active ක්‍ලාස් එක එකතු කිරීම
    navLinks.forEach(link => {
        link.classList.remove('active');
        // href attribute එකේ තියෙන id එකයි currentSectionId එකයි සමානද බලයි
        if (link.getAttribute('href') === `#${currentSectionId}`) {
            link.classList.add('active');
        }
    });
});

const stars = document.querySelectorAll('.star');
const ratingText = document.getElementById('rating-text');

stars.forEach(star => {
    star.addEventListener('click', () => {
        let value = star.getAttribute('data-value');
        ratingText.textContent = "You rated us " + value + " stars!";
        
        // තරු ටික පේන්න හදන ලොජික් එක
        stars.forEach(s => s.classList.remove('active'));
        for(let i=0; i<value; i++) {
            stars[i].classList.add('active');
        }
    });
});