//  PROJECT DATA 
        const projects = [
            {
                title: "Band Website",
                description: "Website ban nhạc tĩnh.",
                fullDescription: "Dự án website ban nhạc được xây dựng với HTML, CSS và JavaScript thuần.",
                tech: ["HTML5", "CSS3", "JavaScript"],
                features: [
                    "Có thể được thêm trong tương lai.",
                ],
            },
            {
                title: "Portfolio",
                description: "Website giới thiệu bản thân có các animation.",
                fullDescription: "Dự án Portfolio giới thiệu bản thân được xây dựng với HTML, CSS và JavaScript thuần.",
                tech: ["HTML5", "CSS3", "JavaScript"],
                features: [
                    "Có thể được thêm trong tương lai."
                ],
            },
            {
                title: "Weather App",
                description: "Ứng dụng xem thời tiết được xây dựng với HTML, CSS, JavaScript thuần và API weather",
                fullDescription: "Người dùng có thể xem thời tiết ở các thành phố thông qua việc tìm kiếm/",
                tech: ["HTML5", "CSS3", "JavaScript", "API"],
                features: [
                    "Xem thời tiết, nhiệt độ ở các thành phố."
                ],
            }
        ];

        //  NAVBAR FUNCTIONALITY 
        const hamburger = document.getElementById('hamburger');
        const navMenu = document.getElementById('navMenu');
        const navLinks = document.querySelectorAll('.navbar__link');

        /*Làm cho chữ chạy */
        var typed = new Typed("#typing", {
            strings: ["Front-end Developer"],
            typeSpeed: 100,
            backSpeed: 60,
            backDelay: 1000,
            loop: true
        });

        // Toggle mobile menu
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close menu khi click vào link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });

        //  SCROLL SPY 
        // Highlight menu item khi scroll đến section tương ứng
        const sections = document.querySelectorAll('.section, .hero');
        
        window.addEventListener('scroll', () => {
            let current = '';
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                
                if (pageYOffset >= sectionTop - 100) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href').slice(1) === current) {
                    link.classList.add('active');
                }
            });
        });

        //  THEME TOGGLE 
        const themeToggle = document.getElementById('themeToggle');
        const html = document.documentElement;

        // Load theme từ localStorage
        const currentTheme = localStorage.getItem('theme') || 'light';
        html.setAttribute('data-theme', currentTheme);
        themeToggle.textContent = currentTheme === 'dark' ? '☀️' : '🌙';

        themeToggle.addEventListener('click', () => {
            const theme = html.getAttribute('data-theme');
            const newTheme = theme === 'light' ? 'dark' : 'light';
            
            html.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            themeToggle.textContent = newTheme === 'dark' ? '☀️' : '🌙';
        });

        //  ANIMATE ON SCROLL 
        const animateElements = document.querySelectorAll('.animate-on-scroll');

        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                    
                    // Animate skill bars khi vào viewport
                    if (entry.target.classList.contains('skills__category')) {
                        const skillBars = entry.target.querySelectorAll('.skill__progress');
                        skillBars.forEach(bar => {
                            const width = bar.getAttribute('data-width');
                            setTimeout(() => {
                                bar.style.width = width + '%';
                            }, 200);
                        });
                    }
                }
            });
        }, observerOptions);

        animateElements.forEach(el => observer.observe(el));

        //  PROJECT MODAL 
        const modal = document.getElementById('projectModal');
        const modalBody = document.getElementById('modalBody');

        function openProjectModal(index) {
            const project = projects[index];
            
            modalBody.innerHTML = `
                <h2 style="margin-bottom: 1rem; font-size: 2rem;">${project.title}</h2>
                <p style="color: var(--text-gray); margin-bottom: 2rem;">${project.fullDescription}</p>
                
                <h3 style="margin-bottom: 1rem;">🚀 Công Nghệ Sử Dụng</h3>
                <div style="display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 2rem;">
                    ${project.tech.map(tech => `
                        <span style="background: var(--accent-gradient); color: white; padding: 0.5rem 1rem; border-radius: 20px; font-size: 0.9rem;">
                            ${tech}
                        </span>
                    `).join('')}
                </div>
                
                <h3 style="margin-bottom: 1rem;">✨ Tính Năng </h3>
                <ul style="list-style: none; padding: 0; margin-bottom: 2rem;">
                    ${project.features.map(feature => `
                        <li style="padding: 0.5rem 0; padding-left: 1.5rem; position: relative;">
                            <span style="position: absolute; left: 0;">✓</span>
                            ${feature}
                        </li>
                    `).join('')}
                </ul>
            `;
            
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }

        function closeModal() {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }

        // Đóng modal khi click bên ngoài
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });

        // Đóng modal khi nhấn ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.classList.contains('active')) {
                closeModal();
            }
        });

        //  FORM VALIDATION & SUBMISSION 
        function handleSubmit(event) {
            event.preventDefault();
            
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();
            
            let isValid = true;

            // Validate name
            if (name === '') {
                showError('nameError');
                isValid = false;
            } else {
                hideError('nameError');
            }

            // Validate email
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(email)) {
                showError('emailError');
                isValid = false;
            } else {
                hideError('emailError');
            }

            // Validate message
            if (message.length < 10) {
                showError('messageError');
                isValid = false;
            } else {
                hideError('messageError');
            }

            if (isValid) {
                showToast('✅ Gửi tin nhắn thành công! Cảm ơn bạn đã liên hệ.', 'success');
                document.getElementById('contactForm').reset();
            }
        }

        function showError(errorId) {
            const errorElement = document.getElementById(errorId);
            errorElement.style.display = 'block';
            errorElement.previousElementSibling.style.borderColor = '#f5576c';
        }

        function hideError(errorId) {
            const errorElement = document.getElementById(errorId);
            errorElement.style.display = 'none';
            errorElement.previousElementSibling.style.borderColor = 'var(--border-color)';
        }

        //  TOAST NOTIFICATION 
        function showToast(message, type = 'success') {
            const toast = document.getElementById('toast');
            toast.textContent = message;
            toast.classList.add('active');

            setTimeout(() => {
                toast.classList.remove('active');
            }, 3000);
        }

        //  SMOOTH SCROLL ENHANCEMENT 
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    const offsetTop = target.offsetTop - 70;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });

        //  NAVBAR SCROLL EFFECT 
        let lastScroll = 0;
        const navbar = document.querySelector('.navbar');

        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;

            // Thêm shadow khi scroll
            if (currentScroll > 0) {
                navbar.style.boxShadow = 'var(--shadow-lg)';
            } else {
                navbar.style.boxShadow = 'var(--shadow-md)';
            }

            lastScroll = currentScroll;
        });

        //  LAZY LOADING IMAGES 
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        if (img.dataset.src) {
                            img.src = img.dataset.src;
                            img.removeAttribute('data-src');
                        }
                        observer.unobserve(img);
                    }
                });
            });

            document.querySelectorAll('img[data-src]').forEach(img => {
                imageObserver.observe(img);
            });
        }

        const backToTopButton = document.getElementById("backToTop");
    // Ẩn/hiện nút khi cuộn
    window.addEventListener("scroll", () => {
        if (window.scrollY > 300) {
        backToTopButton.classList.add("show");
        } else {
        backToTopButton.classList.remove("show");
        }
    });

    // Cuộn mượt về đầu trang
    backToTopButton.addEventListener("click", () => {
        window.scrollTo({
        top: 0,
        behavior: "smooth"
        });
    });
