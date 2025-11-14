const baseURL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector(".btn")
const fromcurr = document.querySelector(".from select");
const tocurr = document.querySelector(".to select");
const input = document.querySelector(".inpv");
const msg = document.querySelector(".msg");

for (let select of dropdowns) {
    for (crrCode in countryList) {
        const newoption = document.createElement("option");
        newoption.innerText = crrCode;
        newoption.value = crrCode;
        if (select.name === "from" && crrCode === "USD") {
            newoption.selected = "selected";
        } else if (select.name === "to" && crrCode === "INR") {
            newoption.selected = "selected";
        }
        select.append(newoption);
    }
    select.addEventListener("change", (evt) => {
        updateflag(evt.target)
    })
}
const updateflag = (element) => {
    let currcode = element.value;

    let countrycode = countryList[currcode];

    let newlink = `https://flagsapi.com/${countrycode}/flat/64.png`;
    let image = element.parentElement.querySelector("img");
    image.src = newlink;

}

const convert = async () => {

    let fc = fromcurr.value.toLowerCase();
    let tc = tocurr.value.toLowerCase();

    const currencyurl = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@2025.11.10/v1/currencies/${fc}.json`;

    let code = await fetch(currencyurl);
    let jcode = await code.json();

    let bg = jcode[fc][tc];
    console.log(bg);

    let inpval = input.value;

    let tot = bg*inpval;

    msg.innerText = `${inpval} ${fc.toUpperCase()} = ${tot} ${tc.toUpperCase()}`
    msg.style.fontSize = "18px"

}

btn.addEventListener("click", async (evt) => {
    evt.preventDefault();
    let amount = document.querySelector(".amount input");
    let amoval = amount.value;
    if (amoval === "" || amoval < 1) {
        amoval = 1;
        amount.value = "1";
    }
    console.log(fromcurr.value, tocurr.value);

    const URL = `${baseURL}/`
    let responce = await fetch(URL);
    console.log(responce);
    convert()

})