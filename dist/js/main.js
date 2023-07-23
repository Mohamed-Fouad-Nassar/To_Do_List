"use strict";
let themeBtn = document.getElementById("themeBtn");
themeBtn.addEventListener("click", () => {
    if (document.body.dataset.theme === "light") {
        document.body.dataset.theme = "dark";
        localStorage.setItem("theme", "dark");
    }
    else {
        document.body.dataset.theme = "light";
        localStorage.setItem("theme", "light");
    }
});
if (!localStorage.getItem("theme")) {
    document.body.dataset.theme = "light";
    localStorage.setItem("theme", "light");
}
else {
    localStorage.getItem("theme") === "dark"
        ? (document.body.dataset.theme = "dark")
        : (document.body.dataset.theme = "light");
}
let searchBtn = document.getElementById("sreachBtn");
let searchInput = document.getElementById("search");
searchBtn.addEventListener("click", () => {
    searchInput.classList.contains("active")
        ? searchInput.classList.remove("active")
        : searchInput.classList.add("active");
});
let runningItems = [];
let completedItems = [];
let runningElements = document.getElementById("runningItems");
let completedElements = (document.getElementById("completedElements"));
let createRunningItem = (itemTitle) => {
    let date = new Date();
    let item = {
        title: itemTitle.toLowerCase(),
        date: date.toDateString(),
        time: date.toLocaleTimeString(),
        finished: false,
    };
    return item;
};
let createCompletedItem = (itemTitle) => {
    let date = new Date();
    let item = {
        title: itemTitle.toLowerCase(),
        date: date.toDateString(),
        time: date.toLocaleTimeString(),
        finished: true,
    };
    return item;
};
let addToRunningArray = (itemTitle) => {
    runningItems.push(createRunningItem(itemTitle));
};
let addToCompletedArray = (itemTitle) => {
    completedItems.push(createCompletedItem(itemTitle));
};
let addToElementParent = (item) => {
    let article = document.createElement("article");
    article.classList.add("item");
    let leftSec = document.createElement("div");
    leftSec.classList.add("left-sec");
    let leftSpan = document.createElement("span");
    if (item.finished === true) {
        leftSpan.innerHTML = `<i class="f-icon fa-solid fa-check"></i>`;
    }
    leftSec.appendChild(leftSpan);
    let rightSec = document.createElement("div");
    rightSec.classList.add("right-sec");
    let itemTitle = document.createElement("h3");
    itemTitle.innerText = item.title;
    let rightSpan = document.createElement("span");
    rightSpan.innerText = `${item.date} at ${item.time}`;
    rightSec.appendChild(itemTitle);
    rightSec.appendChild(rightSpan);
    article.appendChild(leftSec);
    article.appendChild(rightSec);
    if (item.finished === true)
        completedElements.append(article);
    else
        runningElements.append(article);
};
let form = document.getElementById("form");
let submitBtn = document.getElementById("submitBtn");
let input = document.getElementById("item");
let errorSpan = document.querySelector(".add-item form>span");
let runningCounter = document.getElementById("runningCounter");
let runningCounterNumber = 0;
runningCounter.innerText = runningCounterNumber.toString();
if (localStorage.getItem("runningItems")) {
    runningItems = JSON.parse(localStorage.getItem("runningItems"));
    runningCounterNumber = runningItems.length;
    runningCounter.innerText = runningCounterNumber.toString();
    runningItems.forEach((e) => {
        addToElementParent(e);
    });
}
submitBtn.addEventListener("click", (e) => {
    e.preventDefault();
    if (input.value) {
        errorSpan.classList.remove("active");
        addToRunningArray(input.value);
        addToElementParent(createRunningItem(input.value));
        localStorage.setItem("runningItems", JSON.stringify(runningItems));
        runningCounterNumber++;
        runningCounter.innerText = runningCounterNumber.toString();
        input.value = "";
        window.location.reload();
    }
    else {
        errorSpan.classList.add("active");
    }
});
let completedCounter = (document.getElementById("completedCounter"));
let completedCounterNumber = 0;
completedCounter.innerText = completedCounterNumber.toString();
let runningTasks = document.querySelectorAll("#runningItems .item");
if (localStorage.getItem("completedItems")) {
    completedItems = JSON.parse(localStorage.getItem("completedItems"));
    completedCounterNumber = completedItems.length;
    completedCounter.innerText = completedCounterNumber.toString();
    completedItems.forEach((e) => {
        addToElementParent(e);
    });
}
runningTasks = document.querySelectorAll("#runningItems .item");
console.log(runningTasks);
runningTasks.forEach((ele) => {
    ele.addEventListener("click", (e) => {
        let itemTitle = e.target.closest(".item").children[1].children[0].innerText;
        ele.remove();
        runningCounterNumber--;
        runningCounter.innerText = runningCounterNumber.toString();
        addToCompletedArray(itemTitle);
        addToElementParent(createCompletedItem(itemTitle));
        localStorage.setItem("completedItems", JSON.stringify(completedItems));
        completedCounterNumber++;
        completedCounter.innerText = completedCounterNumber.toString();
        let x = 0;
        runningItems.forEach((e) => {
            if (e.title.toLowerCase() == itemTitle.toLowerCase()) {
                runningItems.splice(x, 1);
                localStorage.setItem("runningItems", JSON.stringify(runningItems));
            }
            else
                x++;
        });
    });
});
let allItemsBtn = document.getElementById("allItemsBtn");
let runningItemsBtn = document.getElementById("runningItemsBtn");
let completedItemsBtn = document.getElementById("completedItemsBtn");
allItemsBtn?.addEventListener("click", () => {
    localStorage.clear();
    window.location.reload();
});
runningItemsBtn?.addEventListener("click", () => {
    localStorage.removeItem("runningItems");
    window.location.reload();
});
completedItemsBtn?.addEventListener("click", () => {
    localStorage.removeItem("completedItems");
    window.location.reload();
});
//# sourceMappingURL=main.js.map