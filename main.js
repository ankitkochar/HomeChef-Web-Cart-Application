// variables
// yeh bind kese owrk krra hai vo cheez h, or agar addEventListener ke funtion mein parameters bind use krke kr skte hai
// var ankit  = "ankit is cool";
// let main = document.querySelector(".navbar-brand");
// main.addEventListener("click",testing.bind(null,ankit));
// function testing(name) {
//     console.log(name);
    
// }
let searchBox = document.querySelector(".search-box");
let mainBody = document.querySelector(".main-list");
let mainValue = document.querySelectorAll(".value-change");
let tableBody = document.querySelector(".t-body");
let totalQuantity = document.querySelector(".total-quantity");
let subTotal = document.querySelector(".sub-total");
var emptyCart = document.querySelector(".empty-cart");
var mainCart = document.querySelector(".main-cart");

searchBox.addEventListener("click", borderNone);
function borderNone(){
    searchBox.style.border = "none";
}

for (const item of mainValue) {
    let btn = item.parentElement;
    btn.addEventListener("click",firstClick);
}

function checkEmpty(){
    number = parseInt(totalQuantity.innerText);
    console.log(number,emptyCart.style);
    if (number>0){
        emptyCart.style.display = "none";
        mainCart.style.display = "block";
    }
    else {
        emptyCart.style.display = "block";
        mainCart.style.display = "none";
    }
}
checkEmpty();
function subTotalAdd(value){
    if (subTotal.innerText==""){
        subTotal.innerText = "₹ " + value;
    }else{
        subTotal.innerText = "₹ " + (parseInt(subTotal.innerText.slice(2,)) + value);
    }
    checkEmpty();
}
function subTotalMinus(value){
    if (parseInt(subTotal.innerText.slice(2,))-value<=0){
        subTotal.innerText = "";
    }
    else{
        subTotal.innerText = "₹ " + (parseInt(subTotal.innerText.slice(2,))-value);
    }
    checkEmpty();
}
function firstClick(event) {
    let btn = event.target;
    if (btn.textContent == "Add") {
        btn.innerText = 1;
        btn.parentElement.querySelector(".add-1").innerText = "+";
        btn.parentElement.querySelector(".sub-1").innerText = "-";
        let mainContent = btn.parentElement.parentElement.parentElement;
        createCartRow(mainContent.querySelector(".card-title"),mainContent.querySelector(".price-item"),btn);
        btn.parentElement.querySelector(".add-1").addEventListener("click",addOne);
        btn.parentElement.querySelector(".sub-1").addEventListener("click",subOne);
}
}
function subOne(event) {
    btn = event.target.parentElement.querySelector(".value-change");
    let className = btn.parentElement.parentElement.parentElement.parentElement.parentElement.classList[1];
    let tableClass = tableBody.querySelector("."+className);
    totalQuantity.innerText = parseInt(totalQuantity.innerText) - 1;
    let tableValue = tableClass.querySelector(".total");
    let tablePrice = tableClass.querySelector(".price");
    tableValue.innerText = "₹ "+ (parseInt(tableValue.innerText.slice(2,)) - parseInt(tablePrice.innerText.slice(2,)));
    subTotalMinus(parseInt(tablePrice.innerText.slice(2,)));
    if (parseInt(btn.innerText)>1) {
        btn.innerText = parseInt(btn.innerText) - 1;
        let tableBtn = tableClass.querySelector(".main-value");
        tableBtn.innerText = parseInt(tableBtn.innerText) - 1;
    } else {
        tableClass.remove();
        btn.innerText = "Add";
        btn.parentElement.querySelector(".add-1").innerText = "";
        btn.parentElement.querySelector(".sub-1").innerText = "";
        btn.parentElement.querySelector(".add-1").removeEventListener("click",addOne);
        btn.parentElement.querySelector(".sub-1").removeEventListener("click",subOne);
    }
}
function addOne(event){
    totalQuantity.innerText = parseInt(totalQuantity.innerText) + 1;
    btn = event.target.parentElement.querySelector(".value-change");
    btn.innerText = parseInt(btn.innerText) + 1;
    let className = btn.parentElement.parentElement.parentElement.parentElement.parentElement.classList[1];
    let tableClass = tableBody.querySelector("."+className);
    let tableBtn = tableClass.querySelector(".main-value");
    let tableValue = tableClass.querySelector(".total");
    let tablePrice = tableClass.querySelector(".price");
    tableValue.innerText = "₹ "+ (parseInt(tableValue.innerText.slice(2,)) + parseInt(tablePrice.innerText.slice(2,)));
    tableBtn.innerText = parseInt(tableBtn.innerText) + 1;
    subTotalAdd(parseInt(tablePrice.innerText.slice(2,)));

}
function createCartRow(name,price,btn){
    let className = btn.parentElement.parentElement.parentElement.parentElement.parentElement.classList[1];
    let mainContent = btn.parentElement.parentElement.parentElement.parentElement.parentElement.classList[1];
    let tableContent = tableBody.querySelector("."+mainContent);
    let tableRow = document.createElement("tr");
    let rowName = document.createElement("td");
    let rowPrice = document.createElement("td");
    let rowQuantity = document.createElement("td");
    let rowTotal = document.createElement("td");
    let addSymbol = document.createElement("span");
    let subSymbol = document.createElement("span");
    let mainSymbol = document.createElement("span");
    rowPrice.className = "price";
    rowTotal.className = "total";
    tableRow.className = className;
    addSymbol.className = "add-1 px-2";
    subSymbol.className = "sub-1 px-2";
    mainSymbol.className = "main-value"; 
    addSymbol.innerText = "+";
    subSymbol.innerText = "-";
    mainSymbol.innerText = 1;
    rowName.innerText = name.innerText;
    totalQuantity.innerText = parseInt(totalQuantity.innerText) + 1;
    rowQuantity.append(subSymbol,mainSymbol,addSymbol);
    rowPrice.innerText = price.innerText;
    rowTotal.innerText = price.innerText;
    subTotalAdd(parseInt(rowPrice.innerText.slice(2,)));
    tableRow.append(rowName,rowPrice,rowQuantity,rowTotal);
    tableBody.appendChild(tableRow);
    let tableLast = tableBody.lastChild;
    let tablePlus = tableLast.querySelector(".add-1");
    tablePlus.addEventListener("click",addTablePlus);
    tableBody.lastChild.querySelector(".sub-1").addEventListener("click",subTablePlus);
}

function subTablePlus(event) {
    totalQuantity.innerText = parseInt(totalQuantity.innerText) - 1;
    let btn = event.target;
    let tv = btn.parentElement.querySelector(".main-value");
    let mainRow = mainBody.querySelector("."+btn.parentElement.parentElement.classList[0]);
    mainValue = mainRow.querySelector(".value-change");
    let subValue = mainRow.querySelector(".sub-1");
    let addValue = mainRow.querySelector(".add-1");
    tp = btn.parentElement.parentElement.querySelector(".price");
    tt = btn.parentElement.parentElement.querySelector(".total");
    tt.innerText = "₹ " + (parseInt(tt.innerText.slice(2,))-parseInt(tp.innerText.slice(2,)));
    subTotalMinus(parseInt(tp.innerText.slice(2,)));
    if (parseInt(tv.innerText)==1){
        btn.parentElement.parentElement.remove();
        subValue.innerText = "";
        addValue.innerText = "";
        mainValue.innerText = "Add";
        mainRow.querySelector(".sub-1").removeEventListener("click",subOne);
    }
    else{
        tv.innerText = parseInt(tv.innerText) - 1;
        mainValue.innerText = parseInt(mainValue.innerText) - 1;
    }
}

function addTablePlus(event) {
    let btn = event.target;
    let mainRow = mainBody.querySelector("."+btn.parentElement.parentElement.classList[0]);
    mainValue = mainRow.querySelector(".value-change");
    let tv = btn.parentElement.querySelector(".main-value");
    tv.innerText = parseInt(tv.innerText)+1;
    mainValue.innerText = parseInt(mainValue.innerText) + 1;
    totalQuantity.innerText = parseInt(totalQuantity.innerText) + 1;
    tp = btn.parentElement.parentElement.querySelector(".price");
    tt = btn.parentElement.parentElement.querySelector(".total");
    tt.innerText = "₹ " + (parseInt(tt.innerText.slice(2,))+parseInt(tp.innerText.slice(2,)));
    subTotalAdd(parseInt(tp.innerText.slice(2,)));
}