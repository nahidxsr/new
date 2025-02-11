from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route("/")
def home():
    return "Crypto Wallet Backend Running!"

@app.route("/deposit", methods=["POST"])
def deposit():
    data = request.json
    user_address = data.get("user_address")
    amount = data.get("amount")
    return jsonify({"message": "Deposit successful!", "user": user_address, "amount": amount})

if __name__ == "__main__":
    app.run(debug=True)
