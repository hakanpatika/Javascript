function getCategories(){
    const categories = ["All"];
    menu.forEach(item => !categories.includes(item.category) ? categories.push(item.category) : "");
    return categories;
}

function loadCategories() {
    const categories = getCategories();
    const btnContainer = document.querySelector(".btn-container");
    categories.forEach(category => {
        btnContainer.innerHTML += `
            <button onclick="loadMenu(this.getAttribute('data-id'))" class="btn btn-outline-dark btn-item" data-id="${category}">${category}</button>
        `;
    });
}

function loadMenu(category) {
    const mealList = document.querySelector("#meal-list");
    mealList.innerHTML = "";    

    let selectedMeals = null;
    if (category === "All")
        selectedMeals = menu;
    else
        selectedMeals = menu.filter(x => x.category === category);

    selectedMeals.forEach(meal => {
        mealList.innerHTML += `
            <div class="menu-items col-lg-6 col-sm-12">
                <img src="${meal.img}" alt="${meal.title}" class="photo">
                <div class="menu-info">
                <div class="menu-title">
                    <h4>${meal.title}</h4>
                    <h4 class="price">${meal.price}</h4>
                </div>
                <div class="menu-text">
                    ${meal.desc}
                </div>
                </div>
            </div>
        `;
    });
}

document.addEventListener("DOMContentLoaded", () => {
    loadCategories();
    loadMenu("All");
});