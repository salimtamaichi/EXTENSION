let tabId;

chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    let currTab = tabs[0];
    if (currTab) {
        tabId = currTab.id;
    }
});

let btn = document.getElementById("btn_change_background");
btn.addEventListener("click", click_change_background);

function click_change_background(evt) {
    chrome.scripting.executeScript({
        target: { tabId: tabId },
        func: exec_change_background,
        args: ["red"]
    });
}

function exec_change_background(valor) {
    document.body.style.backgroundColor = valor;
}

document.getElementById("apply-color").addEventListener("click", function () {
    let newColor = document.getElementById("link-color").value;
    chrome.scripting.executeScript({
        target: { tabId: tabId },
        func: exec_change_links_color,
        args: [newColor]
    });
});

function exec_change_links_color(newColor) {
    let links = document.getElementsByTagName("a");

    for (let i = 0; i < links.length; i++) {
        links[i].style.color = newColor;
    }
}
document.getElementById("delete-img").addEventListener("click", function () {
    chrome.scripting.executeScript({
        target: { tabId: tabId },
        func: deleteImg,
    });
});

function deleteImg() {
    let images = document.getElementsByTagName("img");
    console.log("kelonke")
    for (let i = 0; i < images.length; i++) {
        images[i].style.display = "none";
    }
}
function click_changeState_passwords() {
 
    chrome.scripting.executeScript({
        target: { "tabId": tabId },
        func: exec_changeState_passwords,
        args: []
    });
}
 
document.getElementById("toggle-pass").addEventListener("click", () => {
 
    click_changeState_passwords();
});
 
function exec_changeState_passwords() {
    let allInputs = document.querySelectorAll('input');
    allInputs.forEach(function (input) {
 
        if (input.getAttribute('type') === 'password') {
            input.setAttribute('type', 'text');
            input.setAttribute('is_pass', 'false');
        } else if (input.getAttribute('type') === 'text' && input.getAttribute('is_pass') === "false") {
 
            input.setAttribute('type', 'password');
            input.setAttribute('is_pass', 'true');
 
        }
    });
}

chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    let currTab = tabs[0];
    if (currTab) {
        tabId = currTab.id;
    }
});

function sticky_menu() {
    const stickyMenu = document.createElement('div');
    stickyMenu.id = 'stickyMenu';
    stickyMenu.style.position = 'fixed';
    stickyMenu.style.top = '50%';
    stickyMenu.style.right = '20px';
    stickyMenu.style.height = '300px';
    stickyMenu.style.width = '300px';
    stickyMenu.style.transform = 'translateY(-50%)';
    stickyMenu.style.backgroundColor = '#fff';
    stickyMenu.style.padding = '15px';
    stickyMenu.style.border = '1px solid #ccc';
    stickyMenu.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.1)';
    stickyMenu.style.zIndex = '999';

    const button1 = document.createElement('button');
    button1.textContent = 'Informacio imatges';
    button1.addEventListener('click', () => {
        alert('Haz clic en el Botón 1');
//////////////

    });

    const button2 = document.createElement('button');
    button2.textContent = 'Preu més petit';
    button2.addEventListener('click', () => {
        alert('Haz clic en el Botón 2');
//////////////
    });

    stickyMenu.appendChild(button1);
    stickyMenu.appendChild(button2);

    document.body.appendChild(stickyMenu);
}

document.getElementById("amazonMenu").addEventListener("click", function () {
    chrome.scripting.executeScript({
        target: { tabId: tabId },
        func: sticky_menu,
    });
});



