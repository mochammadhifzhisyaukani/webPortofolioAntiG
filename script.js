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
        const sectionHeight = section.clientHeight;
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

    // Toggle icon
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
        if (!entry.isIntersecting) {
            return;
        } else {
            entry.target.classList.add('appear');
            observer.unobserve(entry.target);
        }
    });
}, revealOptions);

revealElements.forEach(el => {
    revealObserver.observe(el);
});

// Form Submission (Prevent Default for demo)
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = contactForm.querySelector('button');
        const originalText = btn.innerHTML;

        btn.innerHTML = 'Terkirim <i class="fas fa-check"></i>';
        btn.style.background = 'linear-gradient(45deg, #10b981, #059669)';

        setTimeout(() => {
            btn.innerHTML = originalText;
            btn.style.background = '';
            contactForm.reset();
        }, 3000);
    });
}

// Sparkle Effect on Cursor Click
document.addEventListener('click', function (e) {
    createSparkle(e.clientX, e.clientY);
});

function createSparkle(x, y) {
    const sparkle = document.createElement('div');
    sparkle.style.position = 'fixed';
    sparkle.style.left = x + 'px';
    sparkle.style.top = y + 'px';
    sparkle.style.width = '10px';
    sparkle.style.height = '10px';
    sparkle.style.borderRadius = '50%';
    sparkle.style.background = 'white';
    sparkle.style.boxShadow = '0 0 10px 2px rgba(255, 255, 255, 0.8)';
    sparkle.style.pointerEvents = 'none';
    sparkle.style.zIndex = '9999';
    sparkle.style.transform = 'translate(-50%, -50%) scale(1)';
    sparkle.style.transition = 'all 0.5s ease-out';

    document.body.appendChild(sparkle);

    setTimeout(() => {
        sparkle.style.transform = 'translate(-50%, -50%) scale(2)';
        sparkle.style.opacity = '0';
    }, 10);

    setTimeout(() => {
        sparkle.remove();
    }, 500);
}


// document.getElementById('contactForm').addEventListener('submit', function (e) {
// 1. Mencegah halaman reload saat tombol diklik
// e.preventDefault();

// 2. Ambil data dari input form berdasarkan ID
// const nama = document.getElementById('name').value;
// const email = document.getElementById('email').value;
// const pesan = document.getElementById('message').value;

// 3. Masukkan nomor WhatsApp Anda (Gunakan format internasional tanpa +)
// const nomorWA = "6289517354572"; // GANTINOMOR INI

// 4. Susun pesan (Gunakan %0A untuk baris baru agar rapi)
// const teksPesan = "Halo Hifzhi, ada pesan baru dari website : MyPortofolio\n\n" +
//     "*Nama:* " + encodeURIComponent(nama) + "\n" +
//     "*Email:* " + encodeURIComponent(email) + "\n" +
//     "*Pesan:* " + encodeURIComponent(pesan);

// 5. Buat URL WhatsApp
// const urlWA = "https://wa.me/" + nomorWA + "?text=" + teksPesan;

// 6. Buka di tab baru
// window.open(urlWA, '_blank');

// Opsional: Reset form setelah kirim
// this.reset();

// alert("Pesan akan diarahkan ke WhatsApp 🚀");
// });

document.getElementById('contactForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const nama = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const pesan = document.getElementById('message').value;

    const nomorWA = "6289517354572";

    const teks =
        `Halo Hifzhi, ada pesan baru dari website: MyPortofolio

Nama: ${nama}
Email: ${email}
Pesan: ${pesan}`;

    const url = "https://wa.me/" + nomorWA + "?text=" + encodeURIComponent(teks);

    window.open(url, '_blank');

    alert("Pesan akan diarahkan ke WhatsApp 🚀");
});