/**
 * Security Credentials (Base64)
 * Number: 01321494267 -> MDEzMjE0OTQyNjc=
 * Pass: 123456789 -> MTIzNDU2Nzg5
 */
const _vault = {
    u: "MDEzMjE0OTQyNjc=", 
    p: "MTIzNDU2Nzg5",
    link: "https://www.taskm4u.com/#/HangTask"
};

// পয়েন্ট সিস্টেম ভ্যারিয়েবল
let balance = parseFloat(localStorage.getItem('user_balance')) || 0;
const hourlyRate = 30; // প্রতি ঘন্টায় ৩০ পয়েন্ট
const secRate = hourlyRate / 3600; // প্রতি সেকেন্ডে কত পয়েন্ট

// ব্যালেন্স আপডেট ফাংশন
function updateDisplay() {
    document.getElementById('mainBalance').innerText = balance.toFixed(4) + " PT";
    localStorage.setItem('user_balance', balance);
}

// অটো-পয়েন্ট বাড়ানোর লজিক (প্রতি সেকেন্ডে পয়েন্ট বাড়বে)
setInterval(() => {
    balance += secRate;
    updateDisplay();
}, 1000);

// ট্যাব সুইচিং ফাংশন
function showTab(tabId, element) {
    document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active-tab'));
    document.querySelectorAll('.nav-item').forEach(nav => nav.classList.remove('active'));
    
    document.getElementById(tabId).classList.add('active-tab');
    element.classList.add('active');
}

// টাস্ক শুরু করার ফাংশন
function startWhatsAppTask() {
    // ডিকোড করা তথ্য (ইউজার দেখবে না)
    const phone = atob(_vault.u);
    const pass = atob(_vault.p);

    alert("System connecting to secure node... Please wait.");
    
    // ইউজারকে টাস্ক সাইটে পাঠানো
    setTimeout(() => {
        window.location.href = _vault.link;
    }, 1500);
}

// উইথড্র হ্যান্ডলার
function handleWithdraw() {
    const amount = document.getElementById('amount').value;
    const wallet = document.getElementById('phone').value;

    if (balance < 10000) {
        alert("Insufficient balance! Minimum 10,000 points required.");
    } else if (wallet.length < 11) {
        alert("Enter a valid bKash/Nagad number.");
    } else {
        alert("Withdrawal request of " + amount + " PT submitted successfully!");
    }
}

// ইনিশিয়াল কল
updateDisplay();
