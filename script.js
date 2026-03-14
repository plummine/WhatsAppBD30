const links = {
    login: "https://www.taskm4u.com/#/login",
    hang: "https://www.taskm4u.com/#/HangTask"
};

let balance = parseFloat(localStorage.getItem('user_points')) || 0;

function copyData(val) {
    navigator.clipboard.writeText(val).then(() => alert("কপি হয়েছে!"));
}

// পরবর্তী ধাপে (HangTask) যাওয়ার ফাংশন
function openHang() {
    document.getElementById('view-login').style.display = 'none';
    document.getElementById('view-hang').style.display = 'flex';
    document.getElementById('hangIframe').src = links.hang;
}

// ফাইনাল ভেরিফাই
function verifyFinal() {
    const btn = document.getElementById('verifyBtn');
    btn.innerText = "Checking Node...";
    btn.style.background = "#444";
    btn.disabled = true;

    setTimeout(() => {
        alert("Verification Success!");
        document.getElementById('view-hang').style.display = 'none';
        document.getElementById('view-final').style.display = 'flex';
        startMining();
    }, 4000);
}

function startMining() {
    setInterval(() => {
        balance += (30 / 3600);
        document.getElementById('displayPts').innerText = balance.toFixed(2) + " PT";
        localStorage.setItem('user_points', balance);
    }, 1000);
}

document.getElementById('displayPts').innerText = balance.toFixed(2) + " PT";
