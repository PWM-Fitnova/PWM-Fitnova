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