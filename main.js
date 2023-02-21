const createBtn = document.getElementById("createBtn");
const saveBtn = document.getElementById("saveBtn");
const closeBtn = document.getElementById("closeBtn");
const searchBox = document.getElementById("searchBox");
const listContainer = document.querySelector("ul");
const inputForm = document.getElementById("activity");
const optionList = document.getElementById("optionList")
let tasks = readFromLocalStorage();

initiate();

createBtn.addEventListener("click", createForm);
closeBtn.addEventListener("click", closeForm);
saveBtn.addEventListener("click", saveForm);
searchBox.addEventListener("keyup", search);

//This Method is The First Function To Read To Fill 'tasks[]'
function initiate() {
  renderList(tasks);
}
//This Method is Called When Create Button is Clicked
function createForm(e) {
  let container = document.getElementById("modal");
  if (container.style.display == "block") container.style.display = "none";
  else container.style.display = "block";
}
//This Method is Called When Close Button is Clicked
function closeForm(e) {
  let container = document.getElementById("modal");
  container.style.display = "none";
}
//This Method is Called When Save Button is Clicked
function saveForm(e) {
  if (inputForm.value === "") return closeForm();

  const newTask = {
    id: Date.now(),
    data: inputForm.value,
    status: false,
  };

  tasks.push(newTask);

  renderList(tasks);

  saveToLocalStorage(tasks);

  closeForm();
}
function editForm(){
  if (inputForm.value === "") return closeForm();

  let filterdList = tasks.filter((task) => task.id !== id);

  tasks = filterdList;

  document.querySelector(`#task-${id}`).remove();

  saveToLocalStorage(filterdList);

  const newTask = {
    id: id,
    data: inputForm.value,
    status: item.status,
  };

  tasks.push(newTask);

  renderList(tasks);

  saveToLocalStorage(tasks);

  closeForm();
}
function closeOptions(){
  let container = document.getElementById("optionList");
  optionList.replaceChildren()
  container.style.display ="none"
}
function openOptions(item){
  let container = document.getElementById("optionList");
  if (container.style.display == "block") {container.style.display = "none";optionList.replaceChildren()}
  else container.style.display = "block";
}

function createOption(item){
  let listItem1 = document.createElement("li")
  let listItem2 = document.createElement("li")
  let listItem3 = document.createElement("li")
  let img1 = document.createElement("img")
  let img2 = document.createElement("img")
  let img3 = document.createElement("img")

  img1.src="img/edit.png"
  img2.src="img/trash.png"
  img3.src="img/close.png"

  listItem1.addEventListener("click", () => editHandle(item.id));
  listItem2.addEventListener("click", () => removeHandle(item.id));

  listItem3.addEventListener("click",()=>{
    closeOptions()
  })
  
  listItem1.appendChild(img1)
  listItem2.appendChild(img2)
  listItem3.appendChild(img3)
  
  optionList.appendChild(listItem3)
  optionList.appendChild(listItem2)
  optionList.appendChild(listItem1)
}

//This Method initiates Items in Main Page

function renderList(tasks) {
listContainer.replaceChildren()

  tasks.forEach((task) => {
    const newTaskEl = createItem(task);

    listContainer.appendChild(newTaskEl);
  });
}

//This Method Creates a New Item in Main Page
function createItem(item) {
  let li = document.createElement("li");
  let titleSpan = document.createElement("span");
  let optionBtn = document.createElement("button");
  let img = document.createElement("img");

  li.setAttribute("id", `task-${item.id}`);
  titleSpan.textContent = item.data;
  img.setAttribute('src' , "img/dots.png");


  optionBtn.addEventListener("click", ()=>{
    createOption(item);
    openOptions();
  });
  titleSpan.addEventListener("click", () => {
    itemClick(item);
  });
  
  optionBtn.appendChild(img);

  li.appendChild(titleSpan);
  li.appendChild(optionBtn);

  return li;
}
//This Method Deletes Selected Item in Main Page
function removeHandle(id) {
  let filterdList = tasks.filter((task) => task.id !== id);

  tasks = filterdList;

  document.querySelector(`#task-${id}`).remove();

  saveToLocalStorage(filterdList);
  closeOptions();
}
function editHandle(id){
  let container = document.getElementById("modal");
  if (container.style.display == "block") container.style.display = "none";
  else container.style.display = "block";


  let item = tasks.filter((task) => (task.id === id) !== -1);
  if (item != null) {
    document.getElementById("activity").value = item[0].data;
  }
}






//This Method is Called When Search-Box is Clicked
function search() {
  // Declare letiables
  const filterValue = searchBox.value;

  let filterdList = tasks.filter(
    (task) => task.data.search(filterValue) !== -1
  );

  renderList(filterdList);
}
//This Method Is For Clicked Item in Main Page
function itemClick(item) {
  if (item.status) {
    item.status = false;
    document
      .querySelector(`#task-${item.id}`)
      //.children[0].classList.remove("checked");
      .classList.remove("checked")
  } else {
    item.status = true;
    document
      .querySelector(`#task-${item.id}`)
      //.children[0].classList.add("checked");
      .classList.add("checked")
  }
  saveToLocalStorage(tasks);
}




//This Method Saves To Storage
function saveToLocalStorage(tasks) {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
//This Method Reads Data
function readFromLocalStorage() {
  const tasks = localStorage.getItem("tasks");

  if (tasks) {
    return JSON.parse(tasks);
  } else {
    return [];
  }
}
