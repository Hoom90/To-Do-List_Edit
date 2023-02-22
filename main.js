const createBtn = document.getElementById("createBtn");
const searchBox = document.getElementById("searchBox");
const listContainer = document.querySelector("ul");
let tasks = readFromLocalStorage();

initiate();

createBtn.addEventListener("click", () => {openForm('create')} );
searchBox.addEventListener("keyup", search);

//This Method is The First Function To Read To Fill 'tasks[]'
function initiate() {
  renderList(tasks);
}
/*
*
*             Forms Initilizers
*
*/
//This Method is Called When Create Button is Clicked
function openForm(formName) {
  let container
  if(formName === 'options'){
    container = document.getElementById("optionList");
  }
  else{
    container = document.getElementById("modal");
    if(formName === 'create'){
      createCreateForm()
    }
    if(formName === 'edit'){
      createEditForm()
    }
  }
  if (container.style.display == "block") {container.replaceChildren(); container.style.display = "none";}
  else container.style.display = "block";
}
//This Method is Called When Close Button is Clicked
function closeForm(formName) {
  let container 
  if (formName === 'opstions') {
    container = document.getElementById("optionList");
    optionList.replaceChildren();
  } else {
    container = document.getElementById("modal");
    if (formName === 'create') {
      document.getElementById("activity").value = "";
    }
    if (formName === 'edit') {
      document.getElementById("activityId").value = "";
      document.getElementById("activity").value = "";
    }
  }
  container.style.display = "none";
}
//This Method is Called When Save Button is Clicked
function saveForm() {
  if (document.getElementById("activity").value === "") return closeForm('create');

  const newTask = {
    id: Date.now(),
    data: document.getElementById("activity").value,
    status: false,
  };

  tasks.push(newTask);

  renderList(tasks);

  saveToLocalStorage(tasks);

  closeForm('create');
}
function editForm(){
  if (document.getElementById("activity").value === "") return closeForm('edit');

  let id = document.getElementById("activityId")
  console.log(id);

  let filterdList = tasks.filter((task) => task.id !== id);

  tasks = filterdList;

  document.querySelector(`#task-${id}`).remove();

  saveToLocalStorage(filterdList);

  const newTask = {
    id: id,
    data: document.getElementById("activity").value,
    status: item.status,
  };

  tasks.push(newTask);

  renderList(tasks);

  saveToLocalStorage(tasks);

  closeForm('edit');
}
/*
*
*         Form Creation
*
*/
//This Method creates the Create Form
function createCreateForm(){
  let innerModal = document.createElement("div")
  let modalTitle = document.createElement("h1")
  let contentDiv = document.createElement("div")
  let dataInput = document.createElement("input")
  let buttonDiv = document.createElement("div")
  let closeButton = document.createElement("button")
  let saveButton = document.createElement("button")
  
  
  innerModal.setAttribute('class','innerModal')
  dataInput.setAttribute('type','text')
  dataInput.setAttribute('id','activity')
  dataInput.setAttribute('placeholder','نام فعالیت')
  closeButton.setAttribute('id','closeBtn')
  saveButton.setAttribute('id','saveBtn')
  
  saveButton.addEventListener('click' , () => {saveForm()})
  closeButton.addEventListener('click', () =>{closeForm('close')})

  modalTitle.innerText = "افزودن یک وظیفه جدید"
  closeButton.innerText = "انصراف"
  saveButton.innerText = "ثبت"

  innerModal.appendChild(modalTitle)
  contentDiv.appendChild(dataInput)
  buttonDiv.appendChild(closeButton)
  buttonDiv.appendChild(saveButton)
  innerModal.appendChild(contentDiv)
  innerModal.appendChild(buttonDiv)
  document.getElementById("modal").appendChild(innerModal)
}
//This Method creates the Edit Form
function createEditForm(){
  let innerModal = document.createElement("div")
  let modalTitle = document.createElement("h1")
  let contentDiv = document.createElement("div")
  let idInput = document.createElement("input") 
  let dataInput = document.createElement("input")
  let buttonDiv = document.createElement("div")
  let closeButton = document.createElement("button")
  let editButton = document.createElement("button")


  innerModal.setAttribute('class','innerModal')
  idInput.setAttribute('type','hidden')
  idInput.setAttribute('id','activityId')
  dataInput.setAttribute('type','text')
  dataInput.setAttribute('id','activity')
  dataInput.setAttribute('placeholder','نام فعالیت')
  closeButton.setAttribute('id','closeBtn')
  editButton.setAttribute('id','editBtn')

  editButton.addEventListener('click' , () => {editForm()})
  closeButton.addEventListener('click', () =>{closeForm('close')})

  modalTitle.innerText = "ویرایش فعالیت"
  closeButton.innerText = "انصراف"
  editButton.innerText = "ذخیره"


  innerModal.appendChild(modalTitle)
  contentDiv.appendChild(idInput)
  contentDiv.appendChild(dataInput)
  buttonDiv.appendChild(closeButton)
  buttonDiv.appendChild(editButton)
  innerModal.appendChild(contentDiv)
  innerModal.appendChild(buttonDiv)
  
  document.getElementById("modal").appendChild(innerModal);
}
//This Method creates the item Option Form
function createOptionForm(item){
  let listItem1 = document.createElement("div")
  let listItem2 = document.createElement("div")
  let listItem3 = document.createElement("div")
  let img1 = document.createElement("img")
  let img2 = document.createElement("img")
  let img3 = document.createElement("img")

  img1.src="img/edit.png"
  img2.src="img/trash.png"
  img3.src="img/close.png"


  listItem1.addEventListener("click", () => editHandle(item.id));
  listItem2.addEventListener("click", () => removeHandle(item.id));

  listItem3.addEventListener("click",()=>{
    closeForm(3)
  })
  
  listItem1.appendChild(img1)
  listItem2.appendChild(img2)
  listItem3.appendChild(img3)
  
  optionList.appendChild(listItem3)
  optionList.appendChild(listItem2)
  optionList.appendChild(listItem1)
}
/*
*
*             Render
*
*/
//This Method initiates Items in Main Page
function renderList(tasks) {
listContainer.replaceChildren()

  tasks.forEach((task) => {
    const newTaskEl = createItem(task);

    listContainer.appendChild(newTaskEl);
  });
}
/*
*
*               Create | Delete | Edit
*
*/
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
    createOptionForm(item);
    openForm('options');
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
  closeForm();
}
//This Method Updates Selected Item in Main Page
function editHandle(id){

  openForm('edit')

  let item = tasks.filter((task) => (task.id === id) !== -1);
  if (item != null) {
    document.getElementById("activityId").value = item[0].id
    document.getElementById("activity").value = item[0].data;
  }
}
/*
*
*
*           FEATURE >> Search | Check
*
*/
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
/*
*
*                LOCAL STORAGE >> set | get
*
*/
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
