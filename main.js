//here we append all the required variables to variables for easy access during the rest of the program
let form = document.getElementById("form");
let textInput = document.getElementById("textInput");
let dateInput = document.getElementById("dateInput");
let textarea = document.getElementById("textarea");
let msg = document.getElementById("msg");
let tasks = document.getElementById("tasks");
let add = document.getElementById("add");

    //thid code prevents the page from refreshing after the named functions have been invoked
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        formValidation();
    });
    
    //this function ensures that the user entered the correct data by cvalidating and returning an error message to the user and the console
    let formValidation = () => {
        if (textInput.value === "") {
            console.log("failure");
        msg.innerHTML = "Please insert Text";
    }   else {
            console.log("task entered");
            msg.innerHTML = "";

        //this will allow us to close the modal class to close on its own
        acceptData();
        add.setAttribute("data-bs-dismiss", "modal");
        add.click();

        (() => {
        add.setAttribute("data-bs-dismiss", "");
        })();
    }
  };
    //this creates an array where our data is stored
    let data = [];
    //this updates our array with the new data values enteres
    let acceptData = () => {
        data.push({
        text: textInput.value,
        date: dateInput.value,
        description: textarea.value,

        
    });
    //this saves the data in our local storage
    localStorage.setItem("data", JSON.stringify(data));

    console.log(data);
    createTasks();
    };
    //here we create a function that creates an html element where our data will be displayed
    //we then use template literals to push the data entered into the html elements
    let createTasks = () => {
        tasks.innerHTML = "";
        data.map((x, y) => {
        return (tasks.innerHTML += `
        <div id=${y}>
            <span class="fw-bold">${x.text}</span>
            <span class="small text-secondary">${x.date}</span>
            <p>${x.description}</p>
    
            <span class="options">
              <i onClick= "editTask(this)" data-bs-toggle="modal" data-bs-target="#form" class="fas fa-edit"></i>
              <i onClick ="deleteTask(this);createTasks()" class="fas fa-trash-alt"></i>
            </span>
          </div>
      `);
    });
  
    resetForm();
  };
    //we will use this function to reset the form once the user has completed entering their data
    let resetForm = () => {
        textInput.value = "";
        dateInput.value = "";
        textarea.value = "";
  };

    //this will be the fucntion we use to delete the created task
    let deleteTask = (e) => {
        //line that will delete html element from screen
        e.parentElement.parentElement.remove();
        //this will remove task from the task array
        data.splice(e.parentElement.parentElement.id, 1);
        //this will update local data with new storage
        localStorage.setItem("data", JSON.stringify(data));
        //this displays the data in the console
        console.log(data);
  };
