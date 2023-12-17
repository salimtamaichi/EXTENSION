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

function click_stickyMenu() {

    chrome.scripting.executeScript({
        target: { "tabId": tabId },
        func: exec_stickyMenu,
        args: []
    });
}

document.getElementById("amazonMenu").addEventListener("click", () => {

    click_stickyMenu();
});

function exec_stickyMenu() {
    let sticky_menu = document.createElement("div");
    sticky_menu.style.width = "200px";
    sticky_menu.style.height = "200px";
    sticky_menu.style.position = 'fixed';
    sticky_menu.style.top = '50%';
    sticky_menu.style.right = '10px';
    sticky_menu.style.backgroundColor = '#007bff'; // Blue background color

    let button_images = document.createElement("button");
    button_images.textContent = "Show text images";
    button_images.style.margin = "10px";
    button_images.style.padding = "8px 16px";
    button_images.style.fontSize = "16px";
    button_images.style.border = "none";
    button_images.style.borderRadius = "5px";
    button_images.style.cursor = "pointer";
    button_images.style.backgroundColor = '#fff'; // White background color
    button_images.style.color = '#007bff'; // Blue text color
    button_images.style.transition = "background-color 0.3s ease";

    button_images.addEventListener("mouseover", () => {
        button_images.style.backgroundColor = "#007bff"; // Blue background color on hover
        button_images.style.color = '#fff'; // White text color on hover
    });

    button_images.addEventListener("mouseout", () => {
        button_images.style.backgroundColor = "#fff"; // White background color on mouseout
        button_images.style.color = '#007bff'; // Blue text color on mouseout
    });

    button_images.addEventListener("click", () => {
        let images = document.getElementsByTagName("img");
        let imagesArray = Array.from(images);

        imagesArray.forEach(image => {
            image.addEventListener("mouseover", () => {
                let alt = image.getAttribute("alt");
                let text = document.createElement("span");
                text.textContent = alt;
                text.style.position = "absolute";
                image.parentElement.insertBefore(text, image);
                image.addEventListener("mouseout", () => {
                    text.remove();
                });
            });
        });
    });

    let button_prices = document.createElement("button");
    button_prices.textContent = "Search lowest price";
    button_prices.style.margin = "10px";
    button_prices.style.padding = "8px 16px";
    button_prices.style.fontSize = "16px";
    button_prices.style.border = "none";
    button_prices.style.borderRadius = "5px";
    button_prices.style.cursor = "pointer";
    button_prices.style.backgroundColor = '#007bff'; // White background color
    button_prices.style.color = '#fff'; // Blue text color
    button_prices.style.transition = "background-color 0.3s ease";

    button_prices.addEventListener("mouseover", () => {
        button_prices.style.backgroundColor = "#007bff"; // Blue background color on hover
        button_prices.style.color = '#fff'; // White text color on hover
    });

    button_prices.addEventListener("mouseout", () => {
        button_prices.style.backgroundColor = "#fff"; // White background color on mouseout
        button_prices.style.color = '#007bff'; // Blue text color on mouseout
    });

    button_prices.addEventListener("click", () => {
        let prices = document.getElementsByClassName("_cDEzb_p13n-sc-price_3mJ9Z");
        let pricesArray = Array.from(prices);
        let lowestProduct = "";
        let lowestPrice = null;

        pricesArray.forEach(priceElement => {
            let priceText = priceElement.textContent;
            let regex = /(\d{1,3}(?:[.,]\d{3})*(?:[.,]\d{2}))/g;

            let match = priceText.match(regex);

            if (lowestPrice == null || parseFloat(match[0]) < parseFloat(lowestPrice)) {
                lowestPrice = parseFloat(match[0]);
                lowestProduct = priceElement;
            }
        });

        lowestProduct.scrollIntoView()
        lowestProduct.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.style.backgroundColor = "#007bff"; // Blue background color
    });

    sticky_menu.appendChild(button_images);
    sticky_menu.appendChild(button_prices);
    document.body.appendChild(sticky_menu);
}
