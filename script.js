// Quando il DOM è completamente caricato, viene eseguito il codice all'interno
// Viene stampato un messaggio in console e vengono aggiunti event listener ai link della navbar
document.addEventListener("DOMContentLoaded", function() {
    console.log("Pagina caricata correttamente");

    // Aggiunge un event listener a tutti i link della navbar per loggare il testo del link cliccato
    document.querySelectorAll(".nav-link").forEach(link => {
        link.addEventListener("click", function() {
            console.log("Hai cliccato su: " + this.textContent);
        });
    });
});

// Imposta la lingua della pagina basandosi sui parametri dell'URL
function setPageLanguage() {
    const urlParams = new URLSearchParams(window.location.search);
    const lang = urlParams.get('lang');
    
    if (lang) {
        document.documentElement.setAttribute('lang', lang);
    }
}

let isNavbarInNewPosition = false;
window.addEventListener("scroll", function() {
    let navbarLinks = document.getElementById('navbar');
    let distanza = navbarLinks.getBoundingClientRect();
    if (distanza.top <= 0 && !isNavbarInNewPosition) {
        console.log(distanza.top);
        var header = document.getElementById('main-header');
        header.removeChild(navbarLinks);
        header.insertAdjacentElement('afterend', navbarLinks);
        navbarLinks.style.backgroundColor = '#f6f5f1'
        isNavbarInNewPosition = true;
    }
    else if (distanza.top > 0 && isNavbarInNewPosition) {
        console.log(distanza.top);
        console.log("ciao");
        var div = this.document.getElementById('div-logo');
        div.insertAdjacentElement('afterend', navbarLinks);
        isNavbarInNewPosition = false;
        navbarLinks.style.backgroundColor = 'transparent'
    }
});

// Funzione per mostrare una categoria e nascondere le altre
function showCategory(category) {
    // Nasconde tutte le sezioni di categoria
    document.querySelectorAll('.category-section').forEach(section => {
        section.classList.add('d-none');
    });

    // Mostra la sezione selezionata
    document.getElementById(category).classList.remove('d-none');

    // Aggiorna il breadcrumb con il nome del bottone cliccato
    var breadcrumb = document.querySelector('.breadcrumb');
    var activeItem = breadcrumb.querySelector('.breadcrumb-item.active');
    
    // Rimuove l'elemento breadcrumb-item attivo esistente
    if (activeItem) {
        activeItem.remove();
    }

    // Crea un nuovo elemento breadcrumb-item attivo
    var newItem = document.createElement('li');
    newItem.classList.add('breadcrumb-item', 'active');
    newItem.textContent = category;

    // Aggiunge il nuovo elemento al breadcrumb
    breadcrumb.appendChild(newItem);
}