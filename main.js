const readline = require('readline');
const child_process = require('child_process');

const reader = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function questionSync(question) {
    return new Promise((resolve, reject) => {
        reader.question(question, phone => {
            resolve(phone);
        });
    });
}

async function main() {

    while (true) {
        let phone = await questionSync('Qual o número deseja contactar?\n');

        phone = phone.replace(/[()+ -]/g, '');

        if (phone.length < 11) {
            console.log('Número muito pequeno. Certeza que digitou tudo (nono dígito e DDD)?\n');
            continue;
        }
        else if (phone.length == 11 || (phone.length == 12 && phone[0] == '0')) {
            phone = `55${phone}`;
            console.log(`Parece que você esqueceu o código do Brasil (55). Vou adicionar pra você: ${phone}`);
        }

        console.log(`Iniciando conversa com ${phone}`);
        let url = 'https://api.whatsapp.com/send?phone=';
        let start = (process.platform == 'darwin'? 'open': process.platform == 'win32'? 'start' : 'xdg-open');
        child_process.exec(`${start} ${url}${phone}`);
        reader.close();

        return;
    }
}

main();