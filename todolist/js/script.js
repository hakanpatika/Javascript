function newElement(){
    const task = document.querySelector("#task");
    
    if (!task.value?.trim()){
        $("#list-item-error-toast").toast("show");
        return false;   
    }
    
    let listItem = addListItemToLocalStorage(task.value.trim());

    const list = document.querySelector("#list");
    const item = document.createElement("li");
    item.setAttribute("data-id", listItem.id);
    item.innerHTML = `
        ${task.value.trim()}
        <button onclick="removeListItem(this)" class="remove-list-item"><i class="bi bi-x"></i></button>
    `;
    item.onclick = selectListItem.bind(null, item);
    list.prepend(item);

    task.value = null;

    $("#list-item-success-toast").toast("show");
}

function getListItems(){
    return (localStorage.getItem("listItems") ? JSON.parse(localStorage.getItem("listItems")) : []);
}

function generateListItemId() {
    let lastListItemId = (localStorage.getItem("lastListItemId") ? parseInt(localStorage.getItem("lastListItemId")) : 0) + 1;
    localStorage.setItem("lastListItemId", lastListItemId);
    return lastListItemId;
}

function addListItemToLocalStorage(text) {
    let lastListItemId = generateListItemId();
    const listItem = {
        id: lastListItemId,
        text: text,
        checked: false
    };

    let listItems = getListItems();
    listItems.push(listItem);
    localStorage.setItem("listItems", JSON.stringify(listItems)); 
    return listItem;
}

function removeListItem(btnRemove) {
    let item = btnRemove.parentElement;
    let listItems = getListItems();
    let listItem = listItems.find(x => x.id === parseInt(item.getAttribute("data-id")));

    const index = listItems.indexOf(listItem);
        if (index > -1)
            listItems.splice(index, 1);

    localStorage.setItem("listItems", JSON.stringify(listItems));
    item.remove();
}

function selectListItem(item) {
    let listItemId = parseInt(item.getAttribute("data-id"));
    let listItems = getListItems();
    let listItem = listItems.find(x => x.id === listItemId);

    if (!listItem)
        return false;

    listItem.checked ? item.classList.remove("checked") : item.classList.add("checked");

    listItem.checked = !listItem.checked;
    localStorage.setItem("listItems", JSON.stringify(listItems));   
}

function loadListItems() {
    let lastListItemId = 0;
    let listItems = getListItems();
    listItems.forEach(listItem => {
        lastListItemId = (listItem.id > lastListItemId ? listItem.id : lastListItemId);
        const list = document.querySelector("#list");
        const item = document.createElement("li");
        if (listItem.checked)
            item.classList.add("checked");
        item.setAttribute("data-id", listItem.id);
        item.innerHTML = `
            ${listItem.text}
            <button onclick="removeListItem(this)" class="remove-list-item"><i class="bi bi-x"></i></button>
        `;
        item.onclick = selectListItem.bind(null, item);
        list.prepend(item);
    });
    localStorage.setItem("lastListItemId", lastListItemId);
}

document.addEventListener("DOMContentLoaded", () => {
    loadListItems();
});