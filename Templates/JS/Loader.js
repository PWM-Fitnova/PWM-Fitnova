document.addEventListener("DOMContentLoaded", () => {
    loadHeaderFooter();
})

function loadTemplate(id, url) {
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Fail loading ${url}`);
            }
            return response.text();
        })
        .then(html => {
            document.getElementById(id).innerHTML = html;
        })
        .catch(error => console.error(error));
}

function loadHeaderFooter(){

    loadTemplate("header", "../HTML/header.html");
    loadTemplate("footer", "../HTML/footer.html");
}

function loadPlanTypes(){
    loadTemplate("planTypes", "../HTML/planTypes.html");
}

function loadIndex(){
        loadTemplate("planTypes", "../HTML/planTypes.html");
        loadDescription();

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