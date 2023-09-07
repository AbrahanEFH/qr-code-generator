const container = document.querySelector('.container');
const userInput = document.getElementById('placement');
const submitBtn = document.getElementById('generate');
const downLoadBtn = document.getElementById('download-btn');
const sizeOptions = document.querySelector('.size');
const BGcolor = document.getElementById('color1');
const FGcolor = document.getElementById('color2');


let QR_Code;
let sizechoice = 100;
let BGColorChoice = '#000000'
let FGcolorChoice = '#ffffff'


sizeOptions.addEventListener('change', () => {
    sizechoice = sizeOptions.value;
});

BGcolor.addEventListener('input', () => {
    BGColorChoice = BGcolor.value;
});

FGcolor.addEventListener('input', () => {
    FGcolorChoice = FGcolor.value;
});


userInput.addEventListener('input', () => {
    if (userInput.value.trim().length < 1) {
        submitBtn.disabled = true;
        downLoadBtn.href = '';
        downLoadBtn.classList.add('hide');

    } else {
        submitBtn.disabled = false;
    }
});


const inputFormatter = (value) => {
    value = value.replace(/[^a-z0-9A-Z]+/g, "");
    return value;
}

const generateQRCode = async () => {
    container.innerHTML = '';


    // QRCode costructor for the API
    QR_Code = await new QRCode(container, {
        text: userInput.value,
        width: sizechoice,
        height: sizechoice,
        colorDark: FGcolorChoice,
        colorLight: BGColorChoice

    });

    const src = container.firstChild.toDataURL('imag/pmg');
    downLoadBtn.href = src;

    let userValue = userInput.value;
    try {
        userValue = new URL(userValue).hostname;
    } catch (_) {
        userValue = inputFormatter(userValue);
    }
    downLoadBtn.download = `${userValue}QR`;
    downLoadBtn.classList.remove('hide');
};

window.onload = () => {
    container.innerHTML = '';
    sizeOptions.value = sizechoice;
    userInput.value = '';
    BGcolor.value = BGColorChoice;
    FGcolor.value = FGcolorChoice;
    downLoadBtn.classList.add('hide');
    submitBtn.disabled = true;

};


submitBtn.addEventListener('click', generateQRCode);





