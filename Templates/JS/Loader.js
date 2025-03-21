document.addEventListener("DOMContentLoaded", () => {
     loadHeaderFooter().then(r => null);
})
async function loadTemplate(id, url) {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Fail loading ${url}`);
        document.getElementById(id).innerHTML = await response.text();
    }
    catch(error) {
        console.error(error);
    }
}

async function loadCards(url, templateId){
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Fail loading`);
        response.json().then(data => {data.forEach(element => {addTemplate("grid", templateId, element)});})

    }catch (error) {
        console.error(error);
    }
}
async function loadData(){
    const currentPage = document.location.pathname.split("/").pop();
    currentPage === "recipes.html" ? await loadCards("../JsonFiles/recipes.json", "exerciseRecipeCard.html") : null;
    currentPage === "exercises.html" ?  await loadCards("../JsonFiles/exercises.json", "exerciseRecipeCard.html") : null;
}
async function loadHeaderFooter() {
    await loadTemplate("header", "../HTML/header.html");
    await loadTemplate("footer", "../HTML/footer.html");
}

async function loadPlanTypes(){
    await loadTemplate("planTypes", "../HTML/planTypes.html");

}
async function loadIndex(){
        await loadTemplate("planTypes", "../HTML/planTypes.html");
        await loadDescription();
}

async function addTemplate(id, url, item) {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Fail loading ${url}`);

        const container = document.getElementById(id)
        const newElement = document.createElement("div");
        newElement.innerHTML = await response.text();

        const label = newElement.querySelector(".card-label");
        const title = newElement.querySelector(".card-title");

        label.textContent = item.type;
        title.textContent = item.name;

        container.appendChild(newElement);

    }catch(error) {console.log(error);}
}


const loadDescription = () =>{
    fetch("../JsonFiles/indexDescription.json")
        .then(response => {
            if(!response.ok){
                throw new Error("Failed to load description");
            }
            return response.json();
        })
        .then(data => {
            document.getElementsByClassName('main-description')[0].textContent = data.description;
        })
}

