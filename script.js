// ==========================================
// 1. ตั้งค่าเริ่มต้นเมื่อโหลดหน้าเว็บ (แก้ปัญหาเนื้อหาโผล่มาพร้อมกันหมด)
// ==========================================
document.addEventListener("DOMContentLoaded", function() {
    
    // บังคับซ่อนทุกหมวดหมู่ และแสดงแค่หน้า Profile Info เป็นหน้าแรก
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(sec => {
        sec.style.display = 'none';
    });
    const firstSection = document.getElementById('header');
    if (firstSection) {
        firstSection.style.display = 'block';
    }

    // ระบบนับจำนวนคนเข้าชม (Visitor Counter)
    let count = localStorage.getItem('siteVisitors');
    if (count === null) {
        count = 1; 
    } else {
        count = parseInt(count) + 1; 
    }
    localStorage.setItem('siteVisitors', count);
    let visitorDisplay = document.getElementById('visitorCountDisplay');
    if(visitorDisplay) {
        visitorDisplay.innerText = count;
    }
});

// ==========================================
// 2. ฟังก์ชันสลับหน้าต่าง (ระบบกดเมนู)
// ==========================================
function showSection(sectionId, btn) {
    // ซ่อนเนื้อหาทุกหมวดหมู่ก่อน
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(sec => {
        sec.style.display = 'none';
    });

    // แสดงเฉพาะเนื้อหาที่ตรงกับเมนูที่กด
    const activeSection = document.getElementById(sectionId);
    if (activeSection) {
        activeSection.style.display = 'block';
    }

    // ลบแถบสีแดง (Active) ออกจากปุ่มเมนูทั้งหมด
    const buttons = document.querySelectorAll('.nav-btn');
    buttons.forEach(b => {
        b.classList.remove('active-btn');
    });

    // ใส่แถบสีแดง ให้กับปุ่มที่เพิ่งถูกกด
    if (btn) {
        btn.classList.add('active-btn');
    }
    
    // [เพิ่มพิเศษ] ถ้าเปิดบนมือถือ/หน้าจอเล็ก พอกดเลือกเมนูเสร็จ ให้เก็บเมนูอัตโนมัติ
    const sidebar = document.querySelector('.sidebar');
    const resumeContainer = document.querySelector('.resume-container');
    if (window.innerWidth <= 1024 && sidebar) {
        sidebar.classList.remove('active');
        if (resumeContainer) resumeContainer.classList.remove('active');
    }
}

// ==========================================
// 3. ระบบจัดการ Intro Video
// ==========================================
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

        // ตั้งเวลาสำรองเผื่อวิดีโอมีปัญหา ให้ลบตัวเองทิ้งหลังผ่านไป 5 วินาที
        setTimeout(function() {
            if (document.getElementById('video-intro')) {
                introContainer.style.opacity = '0';
                setTimeout(() => introContainer.remove(), 800);
            }
        }, 5000); 
    }
});

// ==========================================
// 4. ระบบปุ่มแฮมเบอร์เกอร์
// ==========================================
const mobileMenu = document.getElementById('mobile-menu');
const sidebar = document.querySelector('.sidebar');
const resumeContainer = document.querySelector('.resume-container');

if (mobileMenu && sidebar) {
    mobileMenu.addEventListener('click', function() {
        sidebar.classList.toggle('active');
        if (resumeContainer) {
            resumeContainer.classList.toggle('active');
        }
    });
}

// ==========================================
// 5. ระบบปุ่ม Go to Top 
// ==========================================
const topBtn = document.getElementById("goToTopBtn");
const scrollContainer = document.querySelector('.resume-container'); 

function checkScroll() {
    if (window.scrollY > 50 || (scrollContainer && scrollContainer.scrollTop > 50)) {
        if(topBtn) topBtn.style.display = "block";
    } else {
        if(topBtn) topBtn.style.display = "none";
    }
}

window.addEventListener("scroll", checkScroll);
if (scrollContainer) {
    scrollContainer.addEventListener("scroll", checkScroll);
}

if(topBtn) {
    topBtn.addEventListener("click", function() {
        window.scrollTo({ top: 0, behavior: "smooth" });
        if (scrollContainer) scrollContainer.scrollTo({ top: 0, behavior: "smooth" });
    });
}

// ==========================================
// 6. ระบบจัดการฟอร์มติดต่อ
// ==========================================
const contactForm = document.getElementById('contactForm');
if(contactForm) {
    contactForm.addEventListener('submit', function(event) {
        event.preventDefault(); 
        let rawName = document.getElementById('name').value;
        let rawEmail = document.getElementById('email').value;
        let rawMessage = document.getElementById('message').value;

        // ป้องกันสแปมและโค้ดอันตราย
        function sanitizeInput(inputStr) {
            const tempDiv = document.createElement('div');
            tempDiv.textContent = inputStr;
            return tempDiv.innerHTML;
        }

        let cleanName = sanitizeInput(rawName);
        let cleanEmail = sanitizeInput(rawEmail);
        let cleanMessage = sanitizeInput(rawMessage);

        const contactData = { name: cleanName, email: cleanEmail, message: cleanMessage };
        
        // แสดงข้อความตอบกลับ
        let feedbackElement = document.getElementById('formFeedback');
        if(feedbackElement) {
            feedbackElement.style.color = "#28a745"; 
            feedbackElement.innerHTML = `Thank you, ${contactData.name}! Your message has been safely received.`;
        }
        contactForm.reset();
    });
}
