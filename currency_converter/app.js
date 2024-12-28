import https from 'https';
import readline from 'readline';
import chalk from 'chalk';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const currencyConverter = (sourceCurrency, targetCurrency, amount) => {
    const api_key = '337a3848fd17a13f9aa65427';
    const api = `https://v6.exchangerate-api.com/v6/${api_key}/latest/${sourceCurrency}`;

    https.get(api, (response) => {
        let data = '';

        response.on('data', (chunk) => {
            data += chunk;
        });

        response.on('end', () => {
            try {
                const rates = JSON.parse(data).conversion_rates;
                const targetRate = rates[targetCurrency];
                if (targetRate) {
                    const convertedAmount = amount * targetRate;
                    console.log(chalk.green.bgGreen.bold(`Converted Amount: ${convertedAmount.toFixed(2)} ${targetCurrency}`));
                } else {
                    console.error(chalk.red.bgRed.bold(`Error: Unable to find rate for ${targetCurrency}`));
                }
            } catch (error) {
                console.error(chalk.red.bgRed.bold('Error parsing data:', error.message));
            }
            rl.close();
        });

        response.on('error', (err) => {
            console.error(chalk.red('Error:', err.message));
            rl.close();
        });
    });
};

rl.question("Enter the amount to convert: ", (amount) => {
    rl.question("Enter the source currency code (e.g., EUR, GBP): ", (sourceCurrency) => {
        rl.question("Enter the target currency code (e.g., USD, JPY): ", (targetCurrency) => {
            currencyConverter(sourceCurrency.toUpperCase(), targetCurrency.toUpperCase(), parseFloat(amount));
        });
    });
});