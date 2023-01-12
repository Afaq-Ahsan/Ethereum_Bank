var conttractABI = [
  {
    inputs: [],
    name: "deposit",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
    ],
    name: "withDraw",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
    ],
    name: "withDrawFunds",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "getBalance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getBankBalance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "Owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "userBalance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

var contractAddress = "0x1FF49E55B068c018A6fc1259e99AA5B32911b341";

var loginButton = document.getElementById("connect_To_Metamask");
var userAddress = document.getElementById("accountAddress");
var depositInput = document.getElementById("deposit-eth");
var depositButton = document.getElementById("depositButton");
var withdrawInput = document.getElementById("withdraw-eth");
var withdrawButton = document.getElementById("withdrawButton");
var getContractBalanceButton = document.getElementById("getContractBalance");
var Contractbalance = document.getElementById("balance");
var getBalance = document.getElementById("getBalance");
var mybalance = document.getElementById("mybalance");

var address;

document.addEventListener("DOMContentLoaded", async () => {
  if (typeof window.ethereum !== "undefined") {
    console.log("MetaMask is installed!");
    // var accounts = await ethereum.request({method: 'eth_requestAccounts'})
    // console.log(accounts);
    web3 = new Web3(window.ethereum);
    console.log("web3 is loaded", web3);
    myContract = new web3.eth.Contract(conttractABI, contractAddress);
    console.log("contract is ", myContract);

    loginButton.addEventListener("click", async () => {
      var accounts = await ethereum.request({ method: "eth_requestAccounts" });
      address = accounts[0];
      userAddress.innerText = address;
      userAddress.classList.remove("d-none");
      loginButton.classList.add("d-none");
      console.log(accounts);
      console.log(accounts[0]);
    });

    ethereum.on("accountsChanged", async function (accounts) {
      var accounts = await ethereum.request({ method: "eth_requestAccounts" });
      address = accounts[0];
      userAddress.innerText = address;
    });

    depositButton.addEventListener("click", async () => {
      console.log("Deposit value", depositInput.value);

      myContract.methods
        .deposit()
        .send(
          { from: address, value: depositInput.value },
          function (err, res) {
            // .send is used to write contract function
            console.log(res);
            console.log("Deposit button is called"); // .call is used to write contract function
          }
        );
    });

    withdrawButton.addEventListener("click", async () => {
      console.log("withdraw value", withdrawInput.value);
      myContract.methods
        .withDraw(withdrawInput.value)
        .send({ from: address }, function (err, res) {
          // .send is used to write contract function
          console.log(res);
          console.log("Withdraw button is called"); // .call is used to write contract function
        });
    });

    getContractBalanceButton.addEventListener("click", async () => {
      console.log("get Contract Balance function is called");
      myContract.methods
        .getBalance()
        .call({ from: address }, function (err, res) {
          // .send is used to write contract function
          console.log(res / 1e18);
          Contractbalance.innerText = res; // .call is used to write contract function
        });
    });

    getBalance.addEventListener("click", async () => {
      console.log("get my Balance function is called");
      myContract.methods
        .getBankBalance()
        .call({ from: address }, function (err, res) {
          // .send is used to write contract function
          console.log(res / 1e18);
          mybalance.innerText = res; // .call is used to write contract function
        });
    });
  } else {
    alert("please install metamask");
  }
});
