// 1. ระบบจัดการ Intro Video
window.addEventListener('load', function() {
    const introContainer = document.getElementById('video-intro');
    const introVideo = document.getElementById('intro-clip');

    if (introContainer && introVideo) {
        introVideo.addEventListener('ended', function() {
            introContainer.style.opacity = '0'; 
            setTimeout(function() {
                introContainer.remove(); 
            }, 800); 
        });

        setTimeout(function() {
            if (document.getElementById('video-intro')) {
                introContainer.style.opacity = '0';
                setTimeout(() => introContainer.remove(), 800);
            }
        }, 5000); 
    }
});

// 2. ระบบควบคุมการกดเมนูแท็บด้านซ้าย
function showSection(sectionId, clickedElement) {
    document.querySelectorAll('.content-section').forEach(function(sec) {
        sec.classList.remove('active');
    });
    document.getElementById(sectionId).classList.add('active');

    document.querySelectorAll('.nav-btn').forEach(function(btn) {
        btn.classList.remove('active-btn');
    });
    clickedElement.classList.add('active-btn');
}

// 3. ระบบจัดการฟอร์มติดต่อ
document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault(); 
    let rawName = document.getElementById('name').value;
    let rawEmail = document.getElementById('email').value;
    let rawMessage = document.getElementById('message').value;

    function sanitizeInput(inputStr) {
        const tempDiv = document.createElement('div');
        tempDiv.textContent = inputStr;
        return tempDiv.innerHTML;
    }

    let cleanName = sanitizeInput(rawName);
    let cleanEmail = sanitizeInput(rawEmail);
    let cleanMessage = sanitizeInput(rawMessage);

    const contactData = { name: cleanName, email: cleanEmail, message: cleanMessage };
    console.log("Sanitized Data Saved:", contactData);

    let feedbackElement = document.getElementById('formFeedback');
    feedbackElement.style.color = "#28a745"; 
    feedbackElement.innerHTML = `Thank you, ${contactData.name}! Your message has been safely received.`;
    document.getElementById('contactForm').reset();
});

// 4. ระบบปุ่ม Go to Top (อัปเดตให้รองรับกรอบเนื้อหาด้านขวา)
const topBtn = document.getElementById("goToTopBtn");
const scrollContainer = document.querySelector('.resume-container'); // อ้างอิงกรอบเนื้อหาด้านขวา

// สร้างฟังก์ชันเช็คระยะการเลื่อน
function checkScroll() {
    // เช็คว่าเลื่อนหน้าต่างหลัก หรือ เลื่อนกรอบด้านขวา ลงมาเกิน 50px หรือยัง
    if (window.scrollY > 50 || (scrollContainer && scrollContainer.scrollTop > 50)) {
        topBtn.style.display = "block";
    } else {
        topBtn.style.display = "none";
    }
}

// สั่งให้คอยดักจับเมื่อมีการเลื่อน (Scroll)
window.addEventListener("scroll", checkScroll);
if (scrollContainer) {
    scrollContainer.addEventListener("scroll", checkScroll);
}

// เมื่อกดปุ่ม ให้สกอร์บาร์เลื่อนขึ้นไปบนสุดแบบนุ่มนวล
topBtn.addEventListener("click", function() {
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (scrollContainer) scrollContainer.scrollTo({ top: 0, behavior: "smooth" });
});

// 5. ระบบนับจำนวนคนเข้าชม (Visitor Counter) โดยใช้ LocalStorage
window.addEventListener('load', function() {
    let count = localStorage.getItem('siteVisitors');
    
    if (count === null) {
        count = 1; 
    } else {
        count = parseInt(count) + 1; 
    }
    
    localStorage.setItem('siteVisitors', count);
    document.getElementById('visitorCountDisplay').innerText = count;
});
