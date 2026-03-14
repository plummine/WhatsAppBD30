let pts = parseFloat(localStorage.getItem('pts_save')) || 0;
const linkMap = {
    login: "https://www.taskm4u.com/#/login",
    hang: "https://www.taskm4u.com/#/HangTask"
};

function cpData(t) {
    navigator.clipboard.writeText(t).then(() => alert("কপি হয়েছে!"));
}

function changeV(vName) {
    document.querySelectorAll('.view').forEach(v => v.classList.remove('active-view'));
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    
    document.getElementById('view-' + vName).classList.add('active-view');
    document.getElementById('n-' + vName).classList.add('active');
}

function processStep() {
    const btn = document.getElementById('nextBtn');
    const ifr = document.getElementById('appIframe');

    if (btn.innerText.includes("লগইন")) {
        ifr.src = linkMap.hang;
        btn.innerText = "হোয়াটসঅ্যাপ অ্যাড করেছি (Verify)";
    } else {
        btn.innerText = "Verifying...";
        btn.disabled = true;
        setTimeout(() => {
            alert("সফলভাবে যুক্ত হয়েছে!");
            btn.innerText = "Node Connected (Active)";
            startMining();
        }, 4000);
    }
}

function startMining() {
    setInterval(() => {
        pts += (30/3600);
        document.getElementById('drawPoints').innerText = pts.toFixed(2) + " PT";
        localStorage.setItem('pts_save', pts);
    }, 1000);
}

// ইনিশিয়াল পয়েন্ট আপডেট
document.getElementById('drawPoints').innerText = pts.toFixed(2) + " PT";
