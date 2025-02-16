const BOT_TOKEN = "7997811733:AAEgcdq3mGC64cB_duEsQ2kfHTq6CG6t4Ec";
const CHAT_ID = "7294674899";

let requestCount = parseInt(localStorage.getItem("requestCount")) || 0;
let lastRequestTime = parseInt(localStorage.getItem("lastRequestTime")) || 0;

function copyNumber() {
    navigator.clipboard.writeText("01997747613");
    alert("নাম্বার কপি হয়েছে!");
}

function selectMethod(method) {
    localStorage.setItem("selectedMethod", method);
    
    document.getElementById("nagad").classList.remove("active");
    document.getElementById("bkash").classList.remove("active");

    if (method === "নগদ") {
        document.getElementById("nagad").classList.add("active");
    } else {
        document.getElementById("bkash").classList.add("active");
    }
}

function submitPayment() {
    let currentTime = new Date().getTime();
    let timeDiff = currentTime - lastRequestTime;

    // যদি তিনবারের বেশি রিকুয়েস্ট করে এবং ৪ মিনিট না পার হয়
    if (requestCount >= 3 && timeDiff < 4 * 60 * 1000) {
        document.getElementById("help-popup").style.display = "block";
        return;
    }

    // যদি ৪ মিনিট পার হয়ে যায়, তাহলে রিকুয়েস্ট কাউন্ট রিসেট হবে
    if (timeDiff >= 4 * 60 * 1000) {
        requestCount = 0;
    }

    document.getElementById("loading-popup").style.display = "block";

    setTimeout(() => {
        document.getElementById("loading-popup").style.display = "none";
        document.getElementById("success-popup").style.display = "block";

        requestCount++;
        lastRequestTime = new Date().getTime();
        localStorage.setItem("requestCount", requestCount);
        localStorage.setItem("lastRequestTime", lastRequestTime);

        let newRequest = {
            method: localStorage.getItem("selectedMethod"),
            phone: document.getElementById("phone").value,
            transactionId: document.getElementById("transaction-id").value,
            time: new Date().toLocaleString()
        };

        sendToTelegram(newRequest);

        setTimeout(() => {
            document.getElementById("success-popup").style.display = "none";
        }, 2000);
    }, 10000);
}

function sendToTelegram(data) {
    let message = `✅ **নতুন পেমেন্ট রিকুয়েস্ট**  
📌 মেথড: ${data.method}  
📞 নাম্বার: ${data.phone}  
💳 ট্রানজেকশন আইডি: ${data.transactionId}  
🕒 সময়: ${data.time}`;

    fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage?chat_id=${CHAT_ID}&text=${encodeURIComponent(message)}`);
    }
