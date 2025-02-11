let web3;
let userAccount;

async function connectWallet() {
    if (window.ethereum) {
        web3 = new Web3(window.ethereum);
        try {
            const accounts = await ethereum.request({ method: "eth_requestAccounts" });
            userAccount = accounts[0];
            document.getElementById("walletAddress").innerText = "Connected: " + userAccount;
        } catch (error) {
            console.error("User denied wallet connection", error);
        }
    } else {
        alert("Please install MetaMask or use a Web3 browser!");
    }
}

async function deposit() {
    if (!userAccount) {
        alert("Please connect your wallet first!");
        return;
    }

    const amount = document.getElementById("amount").value;
    const weiAmount = web3.utils.toWei(amount, "ether");

    web3.eth.sendTransaction({
        from: userAccount,
        to: "0xYourSmartContractAddress",  // এখানে তোমার স্মার্ট কন্ট্রাক্টের ঠিকানা বসাও
        value: weiAmount
    }).then((receipt) => {
        document.getElementById("response").innerText = "Transaction Successful!";
        console.log("Transaction Receipt:", receipt);
    }).catch((error) => {
        document.getElementById("response").innerText = "Transaction Failed!";
        console.error(error);
    });
}
