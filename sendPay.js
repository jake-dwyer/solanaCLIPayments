const solanaWeb3 = require('@solana/web3.js');
const fs = require('fs');
const readline = require('readline');
const createCsvWriter = require('csv-writer').createObjectCsvWriter; 


const YOUR_SECRET_KEY = Buffer.from('replace with decoded key', 'base64');  // Replace with your base64-encoded secret key
const csvFilePath = 'Recipients.csv';  // Replace with your CSV file path

// Create a CSV writer
let csvWriter = createCsvWriter({
    path: 'TransactionLog.csv',
    header: [
        {id: 'recipientName', title: 'RECIPIENT'},
        {id: 'walletAddress', title: 'ADDRESS'},
        {id: 'amountInSol', title: 'AMOUNT'},
        {id: 'transactionId', title: 'TRANSACTION_ID'}
    ]
});

// Function to send SOL to a given wallet address
async function sendSolToWallet(senderAccount, receiverAddress, amountInSol) {
    let connection = new solanaWeb3.Connection(solanaWeb3.clusterApiUrl('mainnet-beta'));

    // Convert SOL amount to lamports (1 SOL = 10^9 lamports)
    let lamportsAmount = solanaWeb3.LAMPORTS_PER_SOL * amountInSol;

    // Create a transfer instruction
    let transferInstruction = solanaWeb3.SystemProgram.transfer({
        fromPubkey: senderAccount.publicKey,
        toPubkey: receiverAddress,
        lamports: lamportsAmount
    });

    // Sign and send the transactionnpm i @solana/web3.js
    let transaction = new solanaWeb3.Transaction().add(transferInstruction);
    let signedTransaction = await solanaWeb3.sendAndConfirmTransaction(connection, transaction, [senderAccount]);

    return signedTransaction;
}

// Main function
async function main() {
    // Create the sender account from the secret key
    let senderAccount = solanaWeb3.Keypair.fromSecretKey(YOUR_SECRET_KEY);

    // Read data from the CSV file
    let lines = fs.readFileSync(csvFilePath, 'utf-8').split('\n').slice(1);  // Slice to skip header line
    let payments = lines.map(line => {
        let [recipientName, amountInSol, walletAddress] = line.split(',');
        return { recipientName, walletAddress, amountInSol: parseFloat(amountInSol) };
    });

    console.log('Transactions to be executed:');
    for (let payment of payments) {
        console.log(`Pay ${payment.amountInSol} SOL to ${payment.recipientName} (${payment.walletAddress})`);
    }

    // Ask for confirmation before proceeding
    let rl = readline.createInterface({ input: process.stdin, output: process.stdout });
    rl.question("\nType 'yes' to confirm and execute the transactions: ", async (confirmation) => {
        if (confirmation.toLowerCase() !== 'yes') {
            console.log('Transaction execution canceled.');
            rl.close();
            return;
        }

    // Execute the transactions and log the results
    let transactionResults = [];
    for (let payment of payments) {
        let transactionId = await sendSolToWallet(senderAccount, payment.walletAddress, payment.amountInSol);
        console.log(`Payment of ${payment.amountInSol} SOL sent to ${payment.recipientName} (${payment.walletAddress}). Transaction ID: https://solscan.io/tx/${transactionId}`);
        
        // Add the transaction result to the array
        transactionResults.push({
            recipientName: payment.recipientName,
            walletAddress: payment.walletAddress,
            amountInSol: payment.amountInSol,
            transactionId: transactionId
        });
    }

    // Write the transaction results to the CSV file
    csvWriter.writeRecords(transactionResults)
        .then(() => console.log('The CSV file was written successfully'));

    rl.close();
})}

main();
