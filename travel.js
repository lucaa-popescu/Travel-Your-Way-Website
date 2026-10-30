const themeToggle = document.getElementById("themeToggle");
themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
});

document.addEventListener("keydown", (e) => {
    const activeElement = document.activeElement.tagName.toLowerCase();
    if (activeElement === "input" || activeElement === "textarea") {
        return;
    }

    if (e.key === "d" || e.key === "D") {
        document.body.classList.toggle("dark-mode");
    }
});

const heroBtn = document.querySelector(".hero-btn");
heroBtn.addEventListener("click", () => {
    const hero = document.querySelector(".hero");
    hero.querySelector("h2").style.color = "#dc257d";
});

// const header = document.querySelector("header");
// setInterval(() => {
//     header.style.backgroundColor = `rgb(
//         ${Math.floor(Math.random() * 256)},
//         ${Math.floor(Math.random() * 256)},
//         ${Math.floor(Math.random() * 256)}
//     )`;
// }, 3000);



const about = document.getElementById("about");

about.addEventListener("dblclick", () => {
    about.classList.toggle("highlight");
});

document.addEventListener("keydown", (e) => {
    if (e.key === "h" || e.key === "H") {
        about.classList.toggle("highlight");
    }
});

const offersCards = document.querySelector("#offers .cards");
const newCard = document.createElement("div");
newCard.className = "card";
newCard.innerHTML = `
    <figure>
        <img src="photos/bucharest.jpg" alt="Bucharest trip">
        <figcaption>Bucharest – From €200 for 3 nights</figcaption>
    </figure>
`;
offersCards.appendChild(newCard);

document.querySelector("#offers .card").remove();



document.querySelectorAll(".cards").forEach(cards => {
    cards.addEventListener("click", (e) => {
        if (e.target.tagName === "IMG") {
            e.target.parentElement.style.border = "3px solid gold";
        }
    });
});

document.querySelectorAll(".card").forEach(card => {
    card.addEventListener("dblclick", (e) => {
        e.stopPropagation();
        alert("Ai apăsat pe această destinație!");
    });
});



const searchInput = document.getElementById("searchInput");
searchInput.addEventListener("input", () => {
    const value = searchInput.value.toLowerCase();
    document.querySelectorAll(".card figcaption").forEach(caption => {
        const card = caption.closest(".card");
        card.style.display = caption.textContent.toLowerCase().includes(value)
            ? "block"
            : "none";
    });
});

const sizeRange = document.getElementById("sizeRange");
sizeRange.addEventListener("input", () => {
    document.querySelectorAll(".card").forEach(card => {
        card.style.width = sizeRange.value + "px";
    });
});



const form = document.querySelector("form");
const messagesList = document.getElementById("messagesList");
let messages = JSON.parse(localStorage.getItem("messages")) || [];

function renderMessages() {
    messagesList.innerHTML = "";
    messages.forEach((msg, index) => {
        const li = document.createElement("li");
        li.textContent = `${index + 1}. ${msg}`;
        messagesList.appendChild(li);
    });
}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const message = form.querySelector("textarea").value.trim();
    if (message) {
        messages.push(message);
        localStorage.setItem("messages", JSON.stringify(messages));
        renderMessages();
        form.reset();
    }
});

renderMessages();



const contactForm = document.getElementById("contactForm");

contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("name");
    const email = document.getElementById("email");
    const message = document.getElementById("message");

    const nameRegex = /^[A-Za-z\s]{3,}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    let valid = true;

    [name, email, message].forEach(el => el.classList.remove("error"));

    if (!nameRegex.test(name.value)) valid = false, name.classList.add("error");
    if (!emailRegex.test(email.value)) valid = false, email.classList.add("error");
    if (message.value.length < 10) valid = false, message.classList.add("error");

    alert(valid ? "Formular trimis!" : "Completează corect formularul!");
    if (valid) contactForm.reset();
});



fetch("travel.json")
    .then(res => res.json())
    .then(data => {
        const container = document.getElementById("ajaxResults");
        container.InnerHTML = "";
        data.forEach(dest => {
            container.innerHTML += `
                <div class="card">
                    <h3>${dest.name}</h3>
                    <p>Price: €${dest.price}</p>
                    <p>Nights: ${dest.nights}</p>
                </div>
            `;
        });
    })
    .catch(error => console.error("Error loading travel.json:", error));



const usernameInput = document.getElementById("usernameInput");
const loginBtn = document.getElementById("loginBtn");
const logoutBtn = document.getElementById("logoutBtn");
const welcomeMsg = document.getElementById("welcomeMsg");

function updateUI() {
    const user = localStorage.getItem("loggedUser");
    welcomeMsg.textContent = user ? `Bine ai venit, ${user}!` : "";
    loginBtn.style.display = user ? "none" : "inline-block";
    logoutBtn.style.display = user ? "inline-block" : "none";
    usernameInput.style.display = user ? "none" : "inline-block";
}

loginBtn.addEventListener("click", () => {
    if (usernameInput.value.length >= 3) {
        localStorage.setItem("loggedUser", usernameInput.value);
        updateUI();
    }
});

logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("loggedUser");
    updateUI();
});

updateUI();



const canvas = document.getElementById("statsCanvas");
const ctx = canvas.getContext("2d");
ctx.clearRect(0,0, canvas.width, canvas.height);
const travelData = [
    { name: "Paris", price: 399, color: "#39C4C0"},
    { name: "Bali", price: 699, color: "#FF6F51"},
    { name: "Tokyo", price: 899, color: "#6DB1ED"}
];

const canvasHeight = canvas.height;
const maxPrice = Math.max(...travelData.map(d => d.price))

const barWidth = 60;
const spacing = 45;
const startX = 45;
const bottomMargin = 25;
const maxBarHeight = canvasHeight - bottomMargin - 30;

travelData.forEach((item, index) => {
    const barHeight = (item.price / maxPrice) * maxBarHeight;
    const x = startX + index * (barWidth + spacing);
    const y = canvasHeight - bottomMargin - barHeight;

    ctx.fillStyle = item.color;
    ctx.fillRect(x, y, barWidth, barHeight);

    ctx.fillStyle = document.body.classList.contains("dark-mode") ? "#FFFFFF" : "#222222";
    ctx.font = "12px Poppins, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(item.name, x + barWidth / 2, canvasHeight - 8);

    ctx.fillText(`€${item.price}`, x + barWidth / 2, y - 6);
});



document.addEventListener("keydown", (e) => {
    if (e.key === "Tab") {
        document.body.classList.add("keyboard-user");
    }
});