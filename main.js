
// ===== Navbar Scroll Effect =====
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ===== Mobile Menu Toggle =====
const hamburgerBtn = document.getElementById('hamburgerBtn');
const mobileMenu = document.getElementById('mobileMenu');

hamburgerBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
});

// Close mobile menu when clicking a link
mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
    });
});

// ===== Scroll Animations (Intersection Observer) =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all animated elements
document.querySelectorAll('.fade-in-up, .fade-in-left, .fade-in-right, .scale-in').forEach(el => {
    observer.observe(el);
});

// ===== Testimonials Carousel =====
const testimonials = [
    {
        quote: "The entire experience at Arzoo Zafari felt so luxurious. Clean, calm, and professional — a premium nail care salon in D.H.A.",
        author: "Sarah M."
    },
    {
        quote: "I've never felt more pampered! The attention to detail and the serene atmosphere make every visit absolutely worth it.",
        author: "Emily R."
    },
    {
        quote: "Finally found my go-to salon. The stylists truly understand what I want and always exceed my expectations.",
        author: "Jessica L."
    }
];

let currentTestimonial = 0;
const testimonialContainer = document.getElementById('testimonialContainer');
const dots = document.querySelectorAll('.dot');

function showTestimonial(index) {
    testimonialContainer.style.opacity = '0';

    setTimeout(() => {
        testimonialContainer.innerHTML = `
          <blockquote class="testimonial-quote mb-6">
            "${testimonials[index].quote}"
          </blockquote>
          <cite class="text-peach not-italic font-medium">
            — ${testimonials[index].author}
          </cite>
        `;
        testimonialContainer.style.opacity = '1';
    }, 300);

    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
    });
}

dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        currentTestimonial = index;
        showTestimonial(index);
    });
});

// Auto-rotate testimonials
setInterval(() => {
    currentTestimonial = (currentTestimonial + 1) % testimonials.length;
    showTestimonial(currentTestimonial);
}, 6000);

// ===== Calendar =====
const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'];

let currentDate = new Date();
let selectedDate = null;

function renderCalendar() {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    document.getElementById('currentMonth').textContent = `${monthNames[month]} ${year}`;

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay() === 0 ? 6 : firstDay.getDay() - 1;

    const calendarDays = document.getElementById('calendarDays');
    calendarDays.innerHTML = '';

    // Empty cells for days before month starts
    for (let i = 0; i < startingDay; i++) {
        const emptyDay = document.createElement('div');
        emptyDay.className = 'calendar-day';
        calendarDays.appendChild(emptyDay);
    }

    // Days of the month
    const today = new Date();
    for (let day = 1; day <= daysInMonth; day++) {
        const dayBtn = document.createElement('button');
        dayBtn.className = 'calendar-day';
        dayBtn.textContent = day;

        // Check if today
        if (day === today.getDate() &&
            month === today.getMonth() &&
            year === today.getFullYear()) {
            dayBtn.classList.add('today');
        }

        // Check if selected
        if (selectedDate === day) {
            dayBtn.classList.add('selected');
        }

        dayBtn.addEventListener('click', () => {
            selectedDate = day;
            renderCalendar();
        });

        calendarDays.appendChild(dayBtn);
    }
}

document.getElementById('prevMonth').addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    selectedDate = null;
    renderCalendar();
});

document.getElementById('nextMonth').addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    selectedDate = null;
    renderCalendar();
});

// Initial render
renderCalendar();

// Trigger initial animations for hero elements
setTimeout(() => {
    document.querySelectorAll('#home .fade-in-up').forEach(el => {
        el.classList.add('visible');
    });
}, 100);
