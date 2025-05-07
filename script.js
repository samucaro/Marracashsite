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

// Funzione per eseguire un'azione quando il documento è pronto
function ready(fn) {
    if (document.readyState != 'loading') {
        fn();
    } else {
        document.addEventListener('DOMContentLoaded', fn);
    }
}

// Imposta la lingua della pagina basandosi sui parametri dell'URL
function setPageLanguage() {
    var lang = window.location.href.match(/&lang=([a-zA-Z]*?)&?/);

    if (lang) {
        document.getElementsByTagName('html')[0].setAttribute('lang', lang[1]);
    }

}

// Determina il percorso dell'embed della timeline basandosi sull'URL
function computeEmbedPath() {
    var trim_point = window.location.href.indexOf('embed/index.html');
    if (trim_point > 0) {
        return window.location.href.substring(0, trim_point); // supports https access via https://s3.amazonaws.com/cdn.knightlab.com/libs/timeline/latest/embed/index.html
    }
    return "https://cdn.knightlab.com/libs/timeline3/latest/";
}

// Aggiunge un tag oEmbed per supportare l'integrazione con altri servizi
function addOembedTag() {
    var oembed_link = document.createElement('link');
    oembed_link['rel'] = 'alternate';
    oembed_link['type'] = 'application/json+oembed';
    oembed_link['href'] = 'https://oembed.knightlab.com/timeline/?url=' + encodeURIComponent(window.location.href);
    document.head.appendChild(oembed_link);
}

// Crea un contenitore per l'embed della timeline
function createEmbedDiv(containerId, width, height) {

    if (typeof(width) != 'string' && typeof(width) != 'number') {
        width = '100%'
    }

    if (typeof(height) != 'string' && typeof(height) != 'number') {
        height = '100%'
    }

    // default containerId would be 'timeline-embed'
    t = document.createElement('div');
    t.style.position = 'relative';

    te = document.getElementById(containerId);
    te.appendChild(t);
    te.classList.add("tl-timeline-embed");

    if (width.toString().match("%")) {
        te.style.width = width.split("%")[0] + "%";
    } else {
        width = Number(width) - 2;
        te.style.width = (width) + 'px';
    }

    if (height.toString().match("%")) {
        te.style.height = height;
        te.classList.add("tl-timeline-full-embed");
    } else if (width.toString().match("%")) {
        te.classList.add("tl-timeline-full-embed");
        height = Number(height) - 16;
        te.style.height = (height) + 'px';
    } else {
        height = height - 16;
        te.style.height = (height) + 'px';
    }
}

// Estrae i parametri dall'URL e li restituisce come oggetto
function optionsFromUrlParams() {
    var param_str = window.location.href.slice(window.location.href.indexOf('?') + 1);

    if (param_str.match('#')) {
        param_str = param_str.split('#')[0];
    }

    param_str = param_str.split('&');

    var url_vars = {}

    for (var i = 0; i < param_str.length; i++) {
        var uv = param_str[i].split('=');
        url_vars[uv[0]] = uv[1];
    }

    return url_vars;
};

// Quando il documento è pronto, esegue diverse funzioni per configurare la timeline
ready(function() {
    setPageLanguage();
    var embed_path = computeEmbedPath();
    addOembedTag();

    var options = optionsFromUrlParams();
    createEmbedDiv('timeline-embed', options.width, options.height);
    
    options.ga_measurement_id = 'G-LVEFKMG087'
    if (typeof(options.source) == 'undefined') {
        options.source = '1xuY4upIooEeszZ_lCmeNx24eSFWe0rHe9ZdqH2xqVNk' // women in computing
    }

    options.soundcite = true;

    window.options = options
    window.timeline = new TL.Timeline('timeline-embed', options.source, options)       
});

var myModal = new bootstrap.Modal(document.getElementById('mappaModal'));
myModal.show();

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