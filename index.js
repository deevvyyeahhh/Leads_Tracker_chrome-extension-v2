let myLeads = []
let oldLeads = []
const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const deleteBtn = document.getElementById("delete-btn")
const tabBtn = document.getElementById("tab-btn")
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"))

if(leadsFromLocalStorage){
    myLeads = leadsFromLocalStorage
    render(myLeaads)//passing 'myLeads' as arguement
}

tabBtn.addEventListener("click", function (){
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads",JSON.stringify(myLeads))//converting the array into string
        render(myLeads)
    }) 
})


function render(leads) {
    let listItems = ""
    for( let i = 0; i < leads.length; i++) {
        
        // const  li = document.createElement("li")
        // li.textContent = myLeads[i];
        // ulEl.append(li); is another way to write the code line written below
        
        listItems += "<li><a href='#' target='_blank'> " + leads[i] + "</a></li>"; 
         
        //  listItems += "<li><a target='_blank' href='" + myLeads[i] + " '>" + myLeads[i] + "</a></li>"; can also be written(avoid it, to not create confusion)
        
        /*Another way to write the same code line:
        listItems += `
            <li> 
                <a target='_blank' href='${myLeads[i]}'>
                    ${myLeads[i]}
                </a>
            </li>
            `
        */
    }
    ulEl.innerHTML = listItems;
}

deleteBtn.addEventListener("dblclick", function() {
    localStorage.clear()
    myLeads = []
    render(myLeads)
})

inputBtn.addEventListener("click", function() {
    myLeads.push(inputEl.value);  
    inputEl.value = " ";
    localStorage.setItem("myLeads", JSON.stringify(myLeads))
    render(myLeads);
})


