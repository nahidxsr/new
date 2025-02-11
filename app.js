let web3;
let userAccount;

async function connectWallet() {
    if (window.ethereum) {
        web3 = new Web3(window.ethereum);
        try {
            const accounts = await ethereum.request({ method: "eth_requestAccounts" });
            userAccount = accounts[0];
            document.getElementById("walletAddress").innerText = "Connected: " + userAccount;
            document.getElementById("options").style.display = "block"; // Dropdown menu দেখাও
        } catch (error) {
            console.error("User denied wallet connection", error);
        }
    } else {
        alert("Please install MetaMask or use a Web3 browser!");
    }
}

function goToDapp() {
    let selectedDapp = document.getElementById("dappSelect").value;
    if (selectedDapp !== "none") {
        window.location.href = selectedDapp;
    } else {
        alert("Please select a DApp!");
    }
}
