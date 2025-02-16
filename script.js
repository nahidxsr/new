// Copy Payment Number
function copyNumber() {
    var copyText = document.getElementById("paymentNumber");
    copyText.select();
    copyText.setSelectionRange(0, 99999); // For mobile devices
    document.execCommand("copy");
    alert("Payment number copied: " + copyText.value);
}

// Handle form submission
document.getElementById("submitButton").addEventListener("click", function() {
    // Check if the user has submitted more than 3 times using LocalStorage
    var submitCount = localStorage.getItem('submitCount') || 0;
    submitCount++;

    // Check if inputs are filled
    var userNumber = document.getElementById("userNumber").value;
    var transactionId = document.getElementById("transactionId").value;

    if (!userNumber || !transactionId) {
        alert("Please fill all the fields.");
        return; // Don't proceed further if fields are not filled
    }

    if (submitCount >= 3) {
        document.getElementById("helpPopup").style.display = "block"; // Show help popup
        localStorage.setItem('submitCount', 0); // Reset submit count after 3 submissions
    } else {
        localStorage.setItem('submitCount', submitCount); // Store the submission count
        document.getElementById("loading").style.display = "block"; // Show loading

        setTimeout(function() {
            document.getElementById("loading").style.display = "none"; // Hide loading
            document.getElementById("popup").style.display = "block"; // Show success popup

            // Send message to Telegram Bot
            var paymentNumber = document.getElementById("paymentNumber").value;
            var paymentMethod = document.getElementById("paymentMethod").value;

            var message = `New Account Activation Request:\nPayment Method: ${paymentMethod}\nPayment Number: ${paymentNumber}\nUser Number: ${userNumber}\nTransaction ID: ${transactionId}`;

            sendTelegramMessage(message); // Call function to send message to Telegram
        }, 10000); // 10 seconds delay for loading
    }
});

// Function to send message to Telegram Bot
function sendTelegramMessage(message) {
    var token = '7997811733:AAEgcdq3mGC64cB_duEsQ2kfHTq6CG6t4Ec'; // Replace with your Bot API Token
    var chatId = '7294674899'; // Replace with your Chat ID
    var url = `https://api.telegram.org/bot${token}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(message)}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.ok) {
                console.log('Message sent successfully to Telegram');
            } else {
                console.log('Error sending message to Telegram');
            }
        })
        .catch(error => console.log('Error:', error));
}
