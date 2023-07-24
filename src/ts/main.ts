// theme script
let themeBtn = <HTMLButtonElement>document.getElementById("themeBtn");
// theme button click
themeBtn.addEventListener("click", (): void => {
  if (document.body.dataset.theme === "light") {
    document.body.dataset.theme = "dark";
    localStorage.setItem("theme", "dark");
  } else {
    document.body.dataset.theme = "light";
    localStorage.setItem("theme", "light");
  }
});
// theme from local storage
if (!localStorage.getItem("theme")) {
  document.body.dataset.theme = "light";
  localStorage.setItem("theme", "light");
} else {
  localStorage.getItem("theme") === "dark"
    ? (document.body.dataset.theme = "dark")
    : (document.body.dataset.theme = "light");
}
//////////////////////////////////////////////////////////////////
// item interface
interface Item {
  // id: number;
  finished: boolean;
  title: string;
  date: string;
  time: string;
}
//////////////////////////////////////////////////////////////////
// create the Item arrays
let runningItems: Item[] = [];
let completedItems: Item[] = [];
// get the elements main div
let runningElements = <HTMLDivElement>document.getElementById("runningItems");
let completedElements = <HTMLDivElement>(
  document.getElementById("completedElements")
);
//////////////////////////////////////////////////////////////////
// function to create the Running Item
let createRunningItem = (itemTitle: string): Item => {
  let date = new Date();
  let item: Item = {
    title: itemTitle.toLowerCase(),
    date: date.toDateString(),
    time: date.toLocaleTimeString(),
    finished: false,
  };
  return item;
};
// function to create the Completed Item
let createCompletedItem = (itemTitle: string): Item => {
  let date = new Date();
  let item: Item = {
    title: itemTitle.toLowerCase(),
    date: date.toDateString(),
    time: date.toLocaleTimeString(),
    finished: true,
  };
  return item;
};
//////////////////////////////////////////////////////////////////
// function to add new item to running items array
let addToRunningArray = (itemTitle: string): void => {
  runningItems.push(createRunningItem(itemTitle));
};
// function to add new item to completed items array
let addToCompletedArray = (itemTitle: string): void => {
  completedItems.push(createCompletedItem(itemTitle));
};
//////////////////////////////////////////////////////////////////
// function to create a running items elements in HTML
let addToElementParent = (item: Item, parentElement: HTMLDivElement): void => {
  // create article
  let article = document.createElement("article");
  article.classList.add("item");

  // left section
  let leftSec = document.createElement("div");
  leftSec.classList.add("left-sec");
  // left section span
  let leftSpan = document.createElement("span");
  if (item.finished === true) {
    leftSpan.innerHTML = `<i class="f-icon fa-solid fa-check"></i>`;
  }
  // append elements in left section
  leftSec.appendChild(leftSpan);

  // right section
  let rightSec = document.createElement("div");
  rightSec.classList.add("right-sec");
  // title
  let itemTitle = document.createElement("h3");
  itemTitle.innerText = item.title;
  // right section span
  let rightSpan = document.createElement("span");
  rightSpan.innerText = `${item.date} at ${item.time}`;
  // append elements in right section
  rightSec.appendChild(itemTitle);
  rightSec.appendChild(rightSpan);

  // append elements in article
  article.appendChild(leftSec);
  article.appendChild(rightSec);

  // append element in the body
  parentElement.append(article);
  // if (item.finished === true) completedElements.append(article);
  // else runningElements.append(article);
};
//////////////////////////////////////////////////////////////////
// start running array and elements:-
// get the new added item from form and add it to the running items array
let form = <HTMLFormElement>document.getElementById("form");
let submitBtn = <HTMLButtonElement>document.getElementById("submitBtn");
let input = <HTMLInputElement>document.getElementById("item");
let errorSpan = <HTMLSpanElement>document.querySelector(".add-item form>span");
let runningCounter = <HTMLSpanElement>document.getElementById("runningCounter");
let runningCounterNumber: number = 0;
runningCounter.innerText = runningCounterNumber.toString();
// add old elements on open and edit the number of items
if (localStorage.getItem("runningItems")) {
  runningItems = JSON.parse(localStorage.getItem("runningItems"));
  runningCounterNumber = runningItems.length;
  runningCounter.innerText = runningCounterNumber.toString();
  runningItems.forEach((e: Item) => {
    addToElementParent(e, runningElements);
  });
}
// add new elements
submitBtn.addEventListener("click", (e): void => {
  e.preventDefault();
  if (input.value) {
    errorSpan.classList.remove("active");
    addToRunningArray(input.value);
    addToElementParent(createRunningItem(input.value), runningElements);
    localStorage.setItem("runningItems", JSON.stringify(runningItems));
    runningCounterNumber++;
    runningCounter.innerText = runningCounterNumber.toString();
    input.value = "";
    window.location.reload();
  } else {
    errorSpan.classList.add("active");
  }
});
//////////////////////////////////////////////////////////////////
// start completed array and elements:-
// get the new added item from form and add it to the running items array
let completedCounter = <HTMLSpanElement>(
  document.getElementById("completedCounter")
);
let completedCounterNumber: number = 0;
completedCounter.innerText = completedCounterNumber.toString();
let runningTasks = document.querySelectorAll("#runningItems .item");
// add elements and data from local storage
if (localStorage.getItem("completedItems")) {
  completedItems = JSON.parse(localStorage.getItem("completedItems"));
  completedCounterNumber = completedItems.length;
  completedCounter.innerText = completedCounterNumber.toString();
  completedItems.forEach((e: Item) => {
    addToElementParent(e, completedElements);
  });
}
// add new completed elements
runningTasks = document.querySelectorAll("#runningItems .item");
runningTasks.forEach((ele) => {
  ele.addEventListener("click", (e) => {
    let itemTitle = e.target.closest(".item").children[1].children[0].innerText;
    // remove elements from DOM
    ele.remove();
    runningCounterNumber--;
    runningCounter.innerText = runningCounterNumber.toString();
    // add new completed element to all places
    addToCompletedArray(itemTitle);
    addToElementParent(createCompletedItem(itemTitle), completedElements);
    localStorage.setItem("completedItems", JSON.stringify(completedItems));
    completedCounterNumber++;
    completedCounter.innerText = completedCounterNumber.toString();
    // remove element from running items array
    let x: number = 0;
    runningItems.forEach((e: Item) => {
      if (e.title.toLowerCase() == itemTitle.toLowerCase()) {
        runningItems.splice(x, 1);
        localStorage.setItem("runningItems", JSON.stringify(runningItems));
      } else x++;
    });
  });
});
//////////////////////////////////////////////////////////////////
// clear history Button
let allItemsBtn = document.getElementById("allItemsBtn");
let runningItemsBtn = document.getElementById("runningItemsBtn");
let completedItemsBtn = document.getElementById("completedItemsBtn");
// remove all items from local storage
allItemsBtn?.addEventListener("click", (): void => {
  localStorage.removeItem("runningItems");
  localStorage.removeItem("completedItems");
  window.location.reload();
});
// remove running items from local storage
runningItemsBtn?.addEventListener("click", (): void => {
  localStorage.removeItem("runningItems");
  window.location.reload();
});
// remove completed items from local storage
completedItemsBtn?.addEventListener("click", (): void => {
  localStorage.removeItem("completedItems");
  window.location.reload();
});
//////////////////////////////////////////////////////////////////
// search Button
let searchBtn = <HTMLButtonElement>document.getElementById("searchBtn");
let searchInput = <HTMLInputElement>document.getElementById("search");
let searchForm = <HTMLFormElement>document.getElementById("searchForm");
let searchRunningElements = <HTMLDivElement>(
  document.getElementById("searchRunningElements")
);
let searchCompletedElements = <HTMLDivElement>(
  document.getElementById("searchCompletedElements")
);
let searchMenu = <HTMLDivElement>document.getElementById("searchMenu");
searchBtn.addEventListener("click", (e): void => {
  if (searchInput.classList.contains("active"))
    searchInput.classList.remove("active");
  else {
    searchInput.classList.add("active");
    searchInput.focus();
  }
  e.stopPropagation();
});
// get elements based on the search input
let runningAppearedItems: Item[] = [];
let completedAppearedItems: Item[] = [];
let overlay = <HTMLDivElement>document.querySelector(".overlay");
let searchErrorSpan = <HTMLElement>document.getElementById("errorSpan");
let runningDiv = <HTMLDivElement>document.querySelector(".menu .running");
let completedDiv = <HTMLDivElement>document.querySelector(".menu .completed");
searchForm.addEventListener("submit", (ele): void => {
  ele.preventDefault();
  // reset the elements
  searchRunningElements.innerHTML = "";
  runningAppearedItems.length = 0;
  searchCompletedElements.innerHTML = "";
  completedAppearedItems.length = 0;
  // search running elements
  runningItems.forEach((e: Item) => {
    if (e.title.toLowerCase().includes(searchInput.value.toLowerCase())) {
      // active menu
      searchMenu.classList.add("active");
      overlay.classList.add("active");
      // add element to the array and DOM
      if (runningAppearedItems.length === 0) {
        runningAppearedItems.push(e);
        addToElementParent(e, searchRunningElements);
      } else {
        for (let i = 0; i < runningAppearedItems.length; i++) {
          if (
            e.title === runningAppearedItems[i].title &&
            e.date === runningAppearedItems[i].date &&
            e.time === runningAppearedItems[i].time &&
            e.finished === runningAppearedItems[i].finished
          ) {
          } else {
            console.log("founded in the running list");
            runningAppearedItems.push(e);
            addToElementParent(e, searchRunningElements);
          }
        }
      }
    }
  });

  // search completed elements
  completedItems.forEach((e: Item) => {
    if (e.title.toLowerCase().includes(searchInput.value.toLowerCase())) {
      // active menu
      searchMenu.classList.add("active");
      overlay.classList.add("active");
      // add element to the array and DOM
      if (completedAppearedItems.length === 0) {
        completedAppearedItems.push(e);
        addToElementParent(e, searchCompletedElements);
      } else {
        for (let i = 0; i < completedAppearedItems.length; i++) {
          if (
            e.title === completedAppearedItems[i].title &&
            e.date === completedAppearedItems[i].date &&
            e.time === completedAppearedItems[i].time &&
            e.finished === completedAppearedItems[i].finished
          ) {
          } else {
            console.log("founded in the complete list");
            completedAppearedItems.push(e);
            addToElementParent(e, searchCompletedElements);
          }
        }
      }
    }
  });

  // error message
  if (
    searchRunningElements.innerHTML === "" &&
    searchCompletedElements.innerHTML === ""
  ) {
    searchErrorSpan.style.display = "block";
    runningDiv.style.display = "none";
    completedDiv.style.display = "none";
  } else {
    searchErrorSpan.style.display = "none";
    runningDiv.style.display = "block";
    completedDiv.style.display = "block";
  }
});

// close the search menu with click in any place
document.addEventListener("click", (e): void => {
  if (searchMenu.classList.contains("active") && e.target === overlay) {
    searchMenu.classList.remove("active");
    overlay.classList.remove("active");
  }
});
