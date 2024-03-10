
let taskin = document.getElementById("task");

let addbut = document.getElementsByTagName("button")[0];

let incomtask = document.getElementById("incomplete-tasks");

let comtask = document.getElementById("completed-tasks");

let createNewTaskElement = function (taskString) {

	let list_Item = document.createElement("li");

	let check_Box = document.createElement("input");
	let label = document.createElement("label");
	let edin = document.createElement("input");
	let edbut = document.createElement("button");

	let delbut = document.createElement("button");

	label.innerText = taskString;

	check_Box.type = "checkbox";
	edin.type = "text";


	edbut.innerText = "Edit";
	edbut.className = "edit";
	delbut.innerText = "Delete";
	delbut.className = "delete";

	list_Item.appendChild(check_Box);
	list_Item.appendChild(label);
	list_Item.appendChild(edin);
	list_Item.appendChild(edbut);
	list_Item.appendChild(delbut);
	return list_Item;
}
let addTask = function () {

	let listItem = createNewTaskElement(taskin.value);

	if (taskin.value === "") {
		return;
	}

	incomtask.appendChild(listItem);
	bindTaskEvents(listItem, taskCompleted);

	taskin.value = "";

}

let editTask = function () {
	let listItem = this.parentNode;

	let editInput = listItem.querySelector('input[type=text]');
	let label = listItem.querySelector("label");
	let containsClass = listItem.classList.contains("editMode");
	if (containsClass) {
		label.innerText = editInput.value;
	} else {
		editInput.value = label.innerText;
	}
	listItem.classList.toggle("editMode");
}

let deleteTask = function () {

	let listItem = this.parentNode;
	let ul = listItem.parentNode;
	ul.removeChild(listItem);

}


let taskCompleted = function () {

	let listItem = this.parentNode;
	comtask.appendChild(listItem);
	bindTaskEvents(listItem, taskIncomplete);

}

let taskIncomplete = function () {
	let listItem = this.parentNode;
	incomtask.appendChild(listItem);
	bindTaskEvents(listItem, taskCompleted);

}

let bindTaskEvents = function (taskListItem, checkBoxEventHandler) {

	let checkBox = taskListItem.querySelector("input[type=checkbox]");
	let editButton = taskListItem.querySelector("button.edit");
	let deleteButton = taskListItem.querySelector("button.delete");

	editButton.onclick = editTask;
	deleteButton.onclick = deleteTask;
	checkBox.onchange = checkBoxEventHandler;
}

addbut.addEventListener("click", addTask);
addbut.addEventListener("click", ajaxRequest);

for (let i = 0; i < incomtask.children.length; i++) {
	bindTaskEvents(incomtask.children[i], taskCompleted);
}


for (let i = 0; i < comtask.children.length; i++) {
	bindTaskEvents(comtask.children[i], taskIncomplete);
}
