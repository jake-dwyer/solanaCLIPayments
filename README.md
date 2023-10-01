# Solana Payment Sender Script

## Overview

This script allows you to send SOL (Solana) to multiple wallet addresses specified in a CSV file. It uses the Solana JavaScript library (`@solana/web3.js`) to interact with the Solana blockchain.

## Prerequisites

Before running the script, make sure you have the following:

- Node.js installed on your computer.
- An active Solana wallet with a secret key in base64 format.
- Python installed on your computer. You can download and install Python from the official Python website: [Python Downloads](https://www.python.org/downloads/).

## Installation

1. Clone this repository to your local machine:
   ``git clone https://github.com/jake-dwyer/solanaCLIPayments.git``
   ``cd solanaCLIPayments``

2. Install the required Node.js packages:
   ``npm install``

3. Install the required Python package:
    ``pip install base58``

## Converting Your Key

In order to convert your base58 private key:

- Paste your private key into the private_key_base58 variable.

Run the script using the following command:

```python decoder.py```

Your base64 private key will be printed to the console.

## Configuration 

Edit the sendPay script to configure your settings:

- Replace YOUR_SECRET_KEY with your Solana wallet's secret key in base64 format.
- Specify the path to your CSV file containing recipient details in csvFilePath.
- Customize the headers for the output CSV file in the header array.

## Usage

To execute the script, run the following command:

```node senday.js```

The script will read the CSV file, confirm the transactions, and log the results.

## Example CSV Format

The CSV file should have the following format:

RECIPIENT,ADDRESS,AMOUNT
Recipient 1,WalletAddress1,0.1
Recipient 2,WalletAddress2,0.2
Recipient 3,WalletAddress3,0.3

## License

This script is provided under the MIT License.

