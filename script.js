// Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Scroll animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                }
            });
        }, observerOptions);

        document.querySelectorAll('.animate-on-scroll').forEach(el => {
            observer.observe(el);
        });

        // Header background on scroll
        window.addEventListener('scroll', () => {
            const header = document.querySelector('header');
            if (window.scrollY > 100) {
                header.style.background = 'rgba(15, 15, 35, 0.95)';
                header.style.backdropFilter = 'blur(20px)';
            } else {
                header.style.background = 'rgba(15, 15, 35, 0.9)';
                header.style.backdropFilter = 'blur(20px)';
            }
        });

        

        // Dynamic typing effect for hero text
        const heroText = document.querySelector('.hero p');
        const roles = [
            'Software Developer | Problem Solver | Tech Enthusiast',
            'Frontend Developer | Spring Boot Expert | MongoDB Specialist',
            'LeetCode Solver | Competitive Programmer | Open Source Contributor',
        ];
        
        let currentRole = 0;
        let currentChar = 0;
        let isDeleting = false;

        function typeEffect() {
            const current = roles[currentRole];
            
            if (isDeleting) {
                heroText.textContent = current.substring(0, currentChar - 1);
                currentChar--;
            } else {
                heroText.textContent = current.substring(0, currentChar + 1);
                currentChar++;
            }

            let typeSpeed = isDeleting ? 50 : 100;

            if (!isDeleting && currentChar === current.length) {
                typeSpeed = 2000;
                isDeleting = true;
            } else if (isDeleting && currentChar === 0) {
                isDeleting = false;
                currentRole = (currentRole + 1) % roles.length;
                typeSpeed = 500;
            }

            setTimeout(typeEffect, typeSpeed);
        }

        // Start typing effect after page load
        setTimeout(typeEffect, 2000);

        // Add interactive hover effects to project cards
        document.querySelectorAll('.project-card').forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-15px) rotateX(5deg)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) rotateX(0deg)';
            });
        });

        // Add parallax effect to hero section
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const hero = document.querySelector('.hero');
            const rate = scrolled * -0.5;
            
            if (hero) {
                hero.style.transform = `translateY(${rate}px)`;
            }
        });

        // Add click animations to buttons
        document.querySelectorAll('.cta-button').forEach(button => {
            button.addEventListener('click', function(e) {
                const ripple = document.createElement('span');
                const rect = this.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                
                ripple.style.cssText = `
                    position: absolute;
                    width: ${size}px;
                    height: ${size}px;
                    left: ${x}px;
                    top: ${y}px;
                    background: rgba(255,255,255,0.3);
                    border-radius: 50%;
                    transform: scale(0);
                    animation: ripple 0.6s ease-out;
                    pointer-events: none;
                `;
                
                this.appendChild(ripple);
                
                setTimeout(() => {
                    ripple.remove();
                }, 600);
            });
        });

        // Add CSS for ripple animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(2);
                    opacity: 0;
                }
            }
            
            .cta-button {
                position: relative;
                overflow: hidden;
            }
        `;
        document.head.appendChild(style);