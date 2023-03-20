const API_URL = "http://localhost:3000";
const expenseList = document.querySelector("#expense-list");
const form = document.querySelector("form");
// create a function that create row
function addList(id, title, expense, date) {
  try {
    // Check if the required data is valid
    if (!id || !title || isNaN(expense) || !date) {
      throw new Error("Invalid expense data");
    }

    // Convert expense to a valid number
    const amount = parseFloat(expense);
    if (isNaN(amount)) {
      throw new Error("Invalid expense amount");
    }

    // Create the expense item element
    const expenseItem = document.createElement("tr");
    expenseItem.innerHTML = ` <td>${title}</td>
      <td>${amount.toFixed(2)}</td>
      <td>${date}</td>
      <td>
        <button class="btn btn-primary btn-sm" id='${id}'>Update</button>
        <button class="btn btn-danger btn-sm" id='${id}'>Delete</button>
      </td> `;

    // Return the expense item element
    return expenseItem;
  } catch (error) {
    // Log any errors to the console
    console.error(error);
  }
}

// create a

function renderExpense(expenses) {
  try {
    // Loop through the expenses and add rows to the table
    expenses.forEach((expense) => {
      // Log the expense details to the console
      console.log(expense.id, expense.title, expense.amount, expense.date);

      // Create a new row using the addList function
      const row = addList(
        expense.id,
        expense.title,
        expense.amount,
        expense.date
      );

      // Add the row to the expense list
      expenseList.appendChild(row);
    });
  } catch (error) {
    // Log any errors to the console
    console.error(error);
  }
}

async function getAllExpense() {
  try {
    // Make a GET request to the API URL using axios
    const response = await axios.get(API_URL);

    // If the request was successful, render the expenses using the renderExpense function
    renderExpense(response.data);
    totalExpense();
  } catch (error) {
    // If there was an error, log it to the console
    console.error(error);
  }
}
getAllExpense();
// This function makes an HTTP GET request to fetch the total expense from the server.
// It then updates the UI to display the total expense.
async function totalExpense() {
  try {
    // Send GET request to the server's "/total" endpoint
    const total = await axios.get(`${API_URL}/total`);

    // Extract the totalExpense value from the response data
    const sum = total.data[0].totalExpense;

    // Log the total expense to the console
    console.log(sum);

    // Update the text content of the "total" element in the UI to display the total expense
    document.querySelector("#total").textContent = `$ ${sum}`;
  } catch (error) {
    // Log any errors to the console
    console.log(error);
  }
}

//totalExpense();

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  // Get values from form inputs
  const titleInput = document.querySelector("#title");
  const amountInput = document.querySelector("#amount");
  const dateInput = document.querySelector("#date");

  const title = titleInput.value.trim();
  const amount = parseFloat(amountInput.value.trim());
  const date = dateInput.value.trim();

  // Basic form input validation
  if (title === "") {
    alert("Please enter a title for the expense.");
    titleInput.focus();
    return;
  }

  if (isNaN(amount) || amount <= 0) {
    alert("Please enter a valid positive number for the amount.");
    amountInput.focus();
    return;
  }

  if (date === "") {
    alert("Please enter a date for the expense.");
    dateInput.focus();
    return;
  }

  const expenseData = {
    title: title,
    amount: amount,
    date: date,
  };

  try {
    const response = await axios.post(API_URL, expenseData);
    console.log(response);
    totalExpense();
    renderExpense([response.data]);
    form.reset();
  } catch (error) {
    console.log(error);
  }
});

async function deleteExpense(id) {
  try {
    const data = await axios.delete(`${API_URL}/${id}`);
    console.log("delete successfully..");
  } catch (error) {
    console.log(error);
  }
}
///---------- button in action -------
// Add event listener for the expenseList element to handle delete button clicks
expenseList.addEventListener("click", async (e) => {
  try {
    // Check if the clicked element is a button
    if (e.target.tagName === "BUTTON") {
      const btn = e.target;
      const tr = btn.parentNode.parentNode;
      // Check if the clicked button is a "Delete" button
      if (btn.textContent === "Delete") {
        const expenseId = btn.id;
        // Call the deleteExpense function with the expense ID
        await deleteExpense(expenseId);
        // Remove the expense row from the HTML table
        expenseList.removeChild(tr);
        // Log the deleted expense ID to the console
        console.log(btn.id);
        //updating total expense
        totalExpense();
      }
    }
  } catch (error) {
    // Handle any errors that occur during the click event
    console.error(error);
  }
});
function editFun(a, b, c, d) {
  // Create a new table row element
  const tr = document.createElement("tr");

  // Use template literals to create the HTML for the row,
  // with placeholders for the values of `a`, `b`, `c`, and `d`
  tr.innerHTML = `
    <td><input required type="text" value="${a}"/></td>
    <td><input required type="number" value="${b}"/></td>
    <td><input required type="date" value="${c}"></td>
    <td>
      <button class="btn btn-primary btn-sm" id="${d}">Save</button>
      <button class="btn btn-danger btn-sm" id="${d}">Delete</button>
    </td>
  `;

  // Return the new table row element
  return tr;
}

// function for update

expenseList.addEventListener("click", async (e) => {
  try {
    if (e.target.tagName === "BUTTON") {
      const btn = e.target;
      const tr = btn.parentNode.parentNode;
      if (btn.textContent === "Update") {
        console.log("update is clicked");
        console.log(tr);
        const arr = tr.children;
        const a = arr[0].textContent,
          b = arr[1].textContent,
          c = arr[2].textContent,
          d = btn.id;
        const row = editFun(a, b, c, d);
        console.log(a, b, c, d);
        expenseList.insertBefore(row, tr);
        expenseList.removeChild(tr);
      } else if (btn.textContent === "Save") {
        const data = tr.children;
        const a = data[0].firstElementChild.value;
        const b = data[1].firstElementChild.value;
        const c = data[2].firstElementChild.value;
        const d = btn.id;
        // console.log(a,b,c,d);
        const expenseData = { title: a, amount: parseFloat(b), date: c };
        const response = await axios.put(`${API_URL}/${d}`, expenseData);
        console.log("expense updated...");
        totalExpense();
        const row = addList(d, a, b, c);
        expenseList.insertBefore(row, tr);
        //console.log(data,a,b,c,d);
        expenseList.removeChild(tr);
      }
    }
  } catch (error) {
    console.log(error);
  }
});
