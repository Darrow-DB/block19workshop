
const bank = [];
const odds = [];
const evens = [];
const submittedEntries = [];

function addToBank(number) {
  bank.push(number);
  render();
}

function sort() {
  const number = bank.shift();
    if (number % 2 === 0) {
    evens.push(number);
  } else {
    odds.push(number);
  }
}
function sortOne() {
  if (bank.length > 0) {
    sort();
    render();
  }
}
function sortAll() {
  while (bank.length) {
    sort();
  }
  render();
}
function NumberForm() {
  const $form = document.createElement("form");
  $form.classList.add;
  $form.classList.add("form-content", "p-4", "bg-gray-50", "rounded-lg", "shadow-md");
  
  $form.innerHTML = `
    <div class="flex flex-col space-y-2 mb-4">>
        <label for="number-input" class="text-sm font-medium text-gray-700">Add a number to the bank</label>
            <input name="number" id="number-input" type="number" placeholder="Add a number" 
                   class="p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500" />
        <label for=>Add a number to the bank</label>
        <input name="Number" id="number-input" type="number" placeholder="Add a number" class= />
    </div>
    <div>
        <button type="submit" data-action="add">
            Add number
        </button>
        <button type="submit" data-action="sortOne" >
            Sort 1
        </button>
        <button type="submit" data-action="sortAll">
            Sort All
        </button>
    </div>
  `;

  $form.addEventListener("submit", (event) => {
    event.preventDefault();

    const action = event.submitter.dataset.action;

    if (action === "add") {
      const data = new FormData($form);
      const numberString = data.get("number");

      if (numberString === null || numberString === "") return;

      addToBank(+numberString);
      
      $form.querySelector('input[name="number"]').value = '';
    } else if (action === "sortOne") {
      sortOne();
    } else if (action === "sortAll") {
      sortAll();
    }
  });

  return $form;
}

/**
@param {number} n
 */
function NumberInBank(n) {
  const $span = document.createElement("span");
  $span.textContent = n;
  $span.classList.add("inline-block", "bg-indigo-100", "text-indigo-800", "text-sm", "font-medium", "mr-2", "px-3", "py-1", "rounded-full", "shadow-sm", "mt-2");
  return $span;
}


function NumberBank(label, numbers, id) {
  const $bank = document.createElement("section");
  $bank.id = id;
  $bank.classList.add();
  $bank.innerHTML = `
    <h2>${label} (${numbers.length})</h2>
  `;
  
  const fragment = document.createDocumentFragment();
  numbers.map(NumberInBank).forEach(node => fragment.appendChild(node));

  $bank.querySelector(".output").replaceChildren(fragment);

  return $bank;
}


function render() {
  const $app = document.querySelector("#app");
  
  $app.innerHTML = `
      <div>
        <h1>Odds and Evens Sorter</h1>
    
      </div>
    `;
    

  $app.querySelector("#number-form-placeholder").replaceWith(NumberForm());

  $app.querySelector("#bank-placeholder").replaceWith(NumberBank("Bank", bank, "bank"));
  $app.querySelector("#odds-placeholder").replaceWith(NumberBank("Odds", odds, "odds"));
  $app.querySelector("#evens-placeholder").replaceWith(NumberBank("Evens", evens, "evens"));
}
window.onload = render;
