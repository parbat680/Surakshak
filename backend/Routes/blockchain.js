const express = require('express');
const router = express.Router();
const Web3 = require('web3');
const contractAbi = [
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "_name",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "_email",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "_phoneNumber",
                "type": "string"
            },
            {
                "internalType": "string[]",
                "name": "_credentials",
                "type": "string[]"
            }
        ],
        "name": "registerMedicalCareTaker",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "_name",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "_email",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "_phoneNumber",
                "type": "string"
            },
            {
                "internalType": "string[]",
                "name": "_credentials",
                "type": "string[]"
            }
        ],
        "name": "registerNGO",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "verifyMedicalCareTaker",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "verifyNGO",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "name": "medicalCareTakers",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "id",
                "type": "uint256"
            },
            {
                "internalType": "string",
                "name": "name",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "email",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "phoneNumber",
                "type": "string"
            },
            {
                "internalType": "bool",
                "name": "verified",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "name": "ngos",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "id",
                "type": "uint256"
            },
            {
                "internalType": "string",
                "name": "name",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "email",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "phoneNumber",
                "type": "string"
            },
            {
                "internalType": "bool",
                "name": "verified",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
]
const contractAddress = "0x5B38Da6a701c568545dCfcB03FcB875f56beddC4";

// Connect to the Ethereum network and instantiate the smart contract
const web3 = new Web3(new Web3.providers.HttpProvider("https://mainnet.infura.io/v3/0x7EF2e0048f5bAeDe046f6BF797943daF4ED8CB47"));
const contract = new web3.eth.Contract(contractAbi, contractAddress);

// Define an API endpoint to fetch the medical care taker's details
router.get('/medical-caretaker/:address', async (req, res) => {
    const address = req.params.address;

    // Fetch the medical care taker's details from the smart contract
    const medicalCareTaker = await contract.methods.getMedicalCareTaker(address).call(function (err, res) {
        if (!err) {
            console.log(res);
        } else {
            console.log(err);
        }
    });

    // Return the medical care taker's details as a JSON response
    res.json({
        name: medicalCareTaker.name,
        email: medicalCareTaker.email,
        phone: medicalCareTaker.phone,
        credentials: medicalCareTaker.credentials
    });
});



module.exports = router