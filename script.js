let balance = parseFloat(localStorage.getItem('saved_pts')) || 0;
let isMining = localStorage.getItem('is_mining') === 'true';

function handleStep() {
    const btn = document.getElementById('step-btn');
    const ifr = document.getElementById('taskIfr');
    const ifrBox = document.getElementById('ifr-box');

    if (btn.innerText.includes("লগইন")) {
        ifr.src = "https://www.taskm4u.com/#/HangTask";
        ifrBox.classList.remove('scroll-locked');
        ifrBox.classList.add('scroll-allowed');
        btn.innerText = "হোয়াটসঅ্যাপ যুক্ত করেছি (Verify)";
    } else {
        btn.innerText = "Verifying Connection...";
        btn.disabled = true;
        setTimeout(() => {
            isMining = true;
            localStorage.setItem('is_mining', 'true');
            alert("Verification Success! Mining Started.");
            showView('balance');
            startMiningCycle();
        }, 4000);
    }
}

function startMiningCycle() {
    if(!isMining) return;
    
    // এনিমেশন এবং স্ট্যাটাস আপডেট
    document.getElementById('gear').style.display = 'block';
    document.getElementById('p-light').classList.add('pulse');
    document.getElementById('p-text').innerText = "Mining Active";
    document.getElementById('p-text').style.color = "#25D366";
    document.getElementById('h-rate').innerText = "32.45 GH/s";

    setInterval(() => {
        balance += (30 / 3600); // ৩০ পয়েন্ট প্রতি ঘন্টা
        document.getElementById('main-bal').innerText = balance.toFixed(2) + " PT";
        localStorage.setItem('saved_pts', balance);
    }, 1000);
}

function showView(vId) {
    document.querySelectorAll('.app-view').forEach(v => v.classList.remove('active'));
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active-nav'));

    document.getElementById('view-' + vId).classList.add('active');
    document.getElementById('n-' + vId).classList.add('active-nav');
    
    if(vId === 'balance') {
        document.getElementById('main-bal').innerText = balance.toFixed(2) + " PT";
        if(isMining) startMiningCycle();
    }
}

// পেজ লোড হলে মাইনিং চেক করা
if(isMining) {
    startMiningCycle();
}
document.getElementById('main-bal').innerText = balance.toFixed(2) + " PT";
