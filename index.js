let myLeads = [];



const inputEl = document.getElementById("input-el");
const inputBtn = document.getElementById("input-btn");
const ulEl = document.getElementById("ul-el");
const deleteBtn = document.getElementById("delete-btn");
const tabBtn = document.getElementById("tab-btn");



let leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"));
console.log(leadsFromLocalStorage);

if(leadsFromLocalStorage){
    myLeads = leadsFromLocalStorage;
    renderLeads();
}



tabBtn.addEventListener("click",function(){
    chrome.tabs.query({active:true, currentWindow:true}, function(tabs){
        myLeads.push(tabs[0].url);
        localStorage.setItem("myLeads",JSON.stringify(myLeads));
        renderLeads(myLeads);

    });
})

inputBtn.addEventListener("click",function(){
    myLeads.push(inputEl.value);
    clearInput();
    localStorage.setItem("myLeads",JSON.stringify(myLeads));
    renderLeads();
})

deleteBtn.addEventListener("click",function(){
    
    localStorage.clear();
    myLeads = [];
    renderLeads();
})





function renderLeads(){
let listItems = "";
for(let lead = 0; lead < myLeads.length; lead++){
    listItems += `
    <li>
        <a href =  '${myLeads[lead]}'  target = '_blank'> 
            ${myLeads[lead]} 
        </a>
    </li>`;
}

ulEl.innerHTML = listItems;

}

function clearInput(){
    inputEl.value = "";
}





