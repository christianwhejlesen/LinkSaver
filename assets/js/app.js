const linkCategory = document.querySelector("#linkCategory");
const submitButton = document.querySelector("#submitButton");
const cancelButton = document.querySelector("#cancelButton");
const addBtn = document.querySelector("#addBtn");
const addLinkPanel = document.querySelector("#addLinkPanel");
const linkList = document.querySelector("#linkList");
const addedCategories = document.querySelector("#addedCategories");
const panelTitle = document.querySelector("#panel-title");



let linkIndex = -1;
let linkCategories = [];
let links = [
    {
        title:'[WIEHL.DK] - My website.',
        url:'http://wiehl.dk',
        date:new Date(),
        categories: ['3D Print','CAD','C/C++','Lua','JavaScript','SQL']
    }
];

setCookie();

displayLinks();

linkCategory.addEventListener('keydown',function (event) {

    if(event.keyCode === 188){
        event.preventDefault();
        linkCategories.push(linkCategory.value);
        linkCategory.value = '';

        displayLinkCategories();
    }
})

submitButton.addEventListener("click", (event) => {
    event.preventDefault();

    const title = linkTitle.value;
    const url = linkURL.value;
    const categories = linkCategories;
    const date = new Date();

    const newLink = {
        title,
        url,
        categories,
        date,
    }
    if(linkIndex === -1){
        links.unshift(newLink);
    }
    else{
        links[linkIndex] = newLink;
        linkIndex = -1;
    }

    clearLinkForm();
    displayLinkCategories();
    hideFormPanel();
    editCookie();
    displayLinks();
})

cancelButton.addEventListener("click", (event) => {
    event.preventDefault();
    clearLinkForm()
    hideFormPanel();
})

addBtn.addEventListener("click", (event) => {
    showFormPanel();
})

function displayLinkCategories() {
    addedCategories.innerHTML = '';
    let index = 0;
    for(category of linkCategories){
        addedCategories.innerHTML += `<button class="category" onClick="deleteCategory(${index})">${category}</button>`;
        index++;
    }
}

function showFormPanel(){
    addLinkContainer.classList.add('full-screen-opaque');
    addLinkPanel.classList.remove('hidden');
    if(linkIndex != -1){
        panelTitle.innerHTML = 'Edit Link';
    }
    else{
        panelTitle.innerHTML = 'Add Link';
    }
    displayLinkCategories();

}

function hideFormPanel(){
    addLinkContainer.classList.remove('full-screen-opaque');
    addLinkPanel.classList.add('hidden');
    linkIndex = -1;
}

function displayLinks(){
    linkList.innerHTML = '';
    let index = 0;

    for (let link of links){
        const linkDate = new Date(link.date);
        let linkHTMLString = `
            <div class="flex-item">
                <div class="link panel">
                    <div class="link-options">
                        <button class="btn-sm" onClick="deleteLink(${index})">Delete</button>
                        <button class="btn-sm" onClick="editLink(${index})">Edit</button>
                    </div>

                    <a href="${link.url}" target="_blank" rel="noreferrer noopener">
                        <h1 class="header">${link.title}</h1>
                    </a>

                    <p class="link-date">${formatDate(linkDate)}</p>

                    <div class="categories">
                        Categories:<br>`;
                        for (let category of link.categories){
                            linkHTMLString += `<span class="category">${category}</span>`;
                        }
                    linkHTMLString += `
                    </div>
                </div>
            </div>
            `;
        linkList.innerHTML += linkHTMLString;
        index++;
    }
}

function clearLinkForm(){
    addedCategories.innerHTML = '';
    linkTitle.value = '';
    linkURL.value = '';
    linkCategory.value = '';
    linkCategories = [];
}

function deleteLink(index){
    //myArray.splice(3, 1)
    links.splice(index,1);
    editCookie();
    displayLinks();
}

function editLink(index){
    linkIndex = index;

    linkTitle.value = links[index].title;
    linkURL.value = links[index].url;
    linkCategories = links[index].categories;

    showFormPanel();

}

function deleteCategory(index){

    links[linkIndex].categories.splice(index,1);
    displayLinkCategories();
}

function formatDate(date){
    return `${("0"+(date.getDay()-1)).slice(-2)}/${("0" + (date.getMonth()+1)).slice(-2)}-${date.getFullYear()}`;
}

function setCookie() {

    if(localStorage.getItem('LinkSaver') === null){
        localStorage.setItem('LinkSaver', JSON.stringify(links));
    }

    links = JSON.parse(localStorage.getItem('LinkSaver'));
}

function editCookie() {
    localStorage.setItem('LinkSaver', JSON.stringify(links));
    links = JSON.parse(localStorage.getItem('LinkSaver'));
}