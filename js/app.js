document.addEventListener('DOMContentLoaded', () => {
    // 0. Preloader Logic
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        // Wait 1.2s for the animation to finish then slide it up
        setTimeout(() => {
            preloader.classList.add('hidden');
        }, 1200);
    }

    // 1. Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 2. Scroll Reveal Animations (Intersection Observer)
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealOptions = {
        threshold: 0.15, // Activa cuando el 15% del elemento es visible
        rootMargin: "0px 0px -50px 0px" // Un pequeño margen antes de que entre
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Solo animar una vez
            }
        });
    }, revealOptions);

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    // 3. Mobile Menu Toggle (Basic implementation)
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    mobileBtn.addEventListener('click', () => {
        // En una app real, aquí abrirías un modal de menú a pantalla completa
        // Por ahora, simplemente podemos hacer un alert o un toggle básico
        alert('Abrir menú móvil (Implementación pendiente según diseño UI final)');
    });
    
    // 4. Parallax effect for Orbs
    const orbs = document.querySelectorAll('.bg-orb');
    window.addEventListener('mousemove', (e) => {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        
        orbs.forEach((orb, index) => {
            const speed = (index + 1) * 20;
            const moveX = (x * speed);
            const moveY = (y * speed);
            orb.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });
    });
    
    // 5. Prevent Default on form submit for demo
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('¡Gracias por tu mensaje! Nos pondremos en contacto pronto.');
            contactForm.reset();
        });
    }
});

    // 6. Typewriter Effect for Hero Code Window
    const typeWriterElement = document.getElementById("typewriter");
    if (typeWriterElement) {
        const codeLines = [
            "<span class=\"keyword\">const</span> <span class=\"function\">TechHmo</span> = {",
            "  servicios: [<span class=\"string\">\"Mantenimiento\"</span>, <span class=\"string\">\"Software\"</span>, <span class=\"string\">\"Apps\"</span>],",
            "  experiencia: <span class=\"string\">\"Senior\"</span>,",
            "  calidad: <span class=\"string\">\"Premium\"</span>,",
            "  <span class=\"function\">iniciarProyecto</span>: <span class=\"keyword\">function</span>() {",
            "    <span class=\"keyword\">return</span> <span class=\"string\">\"�xito garantizado ??\"</span>;",
            "  }",
            "};",
            "",
            "<span class=\"function\">TechHmo</span>.<span class=\"function\">iniciarProyecto</span>();"
        ];

        let lineIndex = 0;
        let charIndex = 0;
        let currentLine = "";
        let isTag = false;

        function type() {
            if (lineIndex < codeLines.length) {
                let fullLine = codeLines[lineIndex];
                
                if (charIndex < fullLine.length) {
                    let char = fullLine.charAt(charIndex);
                    
                    if (char === "<") isTag = true;
                    if (char === ">") isTag = false;

                    currentLine += char;
                    charIndex++;

                    if (isTag) {
                        type(); // skip delay for HTML tags
                    } else {
                        // Render previous lines plus current line
                        typeWriterElement.innerHTML = Array.from({length: lineIndex}, (_, i) => codeLines[i]).join("<br>") + (lineIndex > 0 ? "<br>" : "") + currentLine;
                        setTimeout(type, Math.random() * 40 + 20); // random typing speed
                    }
                } else {
                    lineIndex++;
                    charIndex = 0;
                    currentLine = "";
                    setTimeout(type, 300); // pause between lines
                }
            } else {
                // Loop the animation after a long pause
                setTimeout(() => {
                    typeWriterElement.innerHTML = "";
                    lineIndex = 0;
                    charIndex = 0;
                    currentLine = "";
                    type();
                }, 6000);
            }
        }
        
        // Start typing after preloader (1.2s + small buffer)
        setTimeout(type, 1500);
    }

