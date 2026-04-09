// Navigation Effects
const nav = document.querySelector('.glass-nav');
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-links li a');

// Scroll Effect on Navbar
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }

    // Active Link Highlight
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= sectionTop - 150) {
            current = section.getAttribute('id');
        }
    });

    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href').includes(current)) {
            item.classList.add('active');
        }
    });
});

// Hamburger Menu Toggle
hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    const icon = hamburger.querySelector('i');
    if (navLinks.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

// Close menu when a link is clicked
navItems.forEach(item => {
    item.addEventListener('click', () => {
        navLinks.classList.remove('active');
        const icon = hamburger.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    });
});

// Scroll Reveal Animation (Intersection Observer)
const revealElements = document.querySelectorAll('.fade-in');
const revealOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
};

const revealObserver = new IntersectionObserver(function (entries, observer) {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('appear');
        observer.unobserve(entry.target);
    });
}, revealOptions);

revealElements.forEach(el => {
    revealObserver.observe(el);
});

// Custom Cursor Logic
const dot = document.querySelector('.cursor-dot');
const outline = document.querySelector('.cursor-outline');

if (dot && outline) {
    window.addEventListener('mousemove', function (e) {
        // Dot follows exactly
        dot.style.left = e.clientX + 'px';
        dot.style.top = e.clientY + 'px';

        // Outline trails slightly via delay animation
        outline.style.left = e.clientX + 'px';
        outline.style.top = e.clientY + 'px';
    });

    // Hover effect on links and buttons
    const interactables = document.querySelectorAll('a, button, input, textarea');
    interactables.forEach(el => {
        el.addEventListener('mouseenter', () => {
            outline.style.transform = 'translate(-50%, -50%) scale(1.5)';
            outline.style.backgroundColor = 'rgba(37, 99, 235, 0.1)';
            dot.style.transform = 'translate(-50%, -50%) scale(1.5)';
        });
        el.addEventListener('mouseleave', () => {
            outline.style.transform = 'translate(-50%, -50%) scale(1)';
            outline.style.backgroundColor = 'transparent';
            dot.style.transform = 'translate(-50%, -50%) scale(1)';
        });
    });
}

// 3D Card Parallax Tilt Logic
const cardWrap = document.getElementById('card3d');

if (cardWrap) {
    cardWrap.addEventListener('mousemove', (e) => {
        // Get dimensions of container
        const rect = cardWrap.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;

        // Mouse position relative to container
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        // Calculate rotation based on cursor position (-15 to 15 degrees)
        const rotateY = ((mouseX / width) - 0.5) * 30; // 30 deg sweep
        // Correcting rotateX (pushing into page when above center)
        const rotateX = ((mouseY / height) - 0.5) * -30; // -30 deg sweep

        // Apply to the wrap itself so that inner flip stays intact
        cardWrap.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    cardWrap.addEventListener('mouseleave', () => {
        // Reset transform on leave with smooth transition
        cardWrap.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg)`;
        cardWrap.style.transition = 'transform 0.5s ease-out';
        setTimeout(() => {
            cardWrap.style.transition = 'transform 0.1s ease-out';
        }, 500);
    });
}

// Whatsapp Form Submission
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const nama = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const pesan = document.getElementById('message').value;

        const nomorWA = "6289517354572";
        const teks = `Halo Hifzhi, ada pesan baru dari website: MyPortofolio\n\nNama: ${nama}\nEmail: ${email}\nPesan: ${pesan}`;
        const url = "https://wa.me/" + nomorWA + "?text=" + encodeURIComponent(teks);

        window.open(url, '_blank');

        alert("Pesan Anda akan diarahkan ke WhatsApp 🚀");
        this.reset();
    });
}

// Comments Form & LocalStorage Logic
const commentForm = document.getElementById('commentForm');
const commentsList = document.getElementById('commentsList');
const countDisplay = document.getElementById('countDisplay');

// Retrieve existing comments from storage
let commentsArr = JSON.parse(localStorage.getItem('portofolio_comments')) || [];

function renderComments() {
    if (!commentsList) return;
    commentsList.innerHTML = ''; // Clear list

    if (commentsArr.length === 0) {
        commentsList.innerHTML = '<p style="color: #475569; font-style: italic;">Belum ada komentar. Jadilah yang pertama!</p>';
    }

    // Render from newest to oldest
    const displayArr = [...commentsArr].reverse();
    
    displayArr.forEach(comment => {
        const item = document.createElement('div');
        item.className = 'comment-item';
        
        item.innerHTML = `
            <div class="comment-header">
                <span class="comment-name">@${comment.name}</span>
                <span class="comment-date">${comment.date}</span>
            </div>
            <div class="comment-body">
                ${comment.text}
            </div>
        `;
        commentsList.appendChild(item);
    });

    if (countDisplay) {
        countDisplay.textContent = commentsArr.length;
    }
}

// Run render initial
renderComments();

if (commentForm) {
    commentForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const nameInput = document.getElementById('commentName').value.trim();
        const textInput = document.getElementById('commentText').value.trim();

        if (textInput !== "") {
            const finalName = nameInput === "" ? "Anonim" : nameInput;
            const dateStr = new Date().toLocaleDateString('id-ID', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });

            const newComment = {
                name: finalName.replace(/</g, "&lt;"), // basic sanitize
                text: textInput.replace(/</g, "&lt;"),
                date: dateStr
            };

            commentsArr.push(newComment);
            localStorage.setItem('portofolio_comments', JSON.stringify(commentsArr));
            
            renderComments();
            // Optional: Scroll to list to see new comment
            commentsList.scrollTop = 0; 
            commentForm.reset();
        }
    });
}