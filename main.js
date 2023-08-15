const myForm = document.querySelector('#my-form');
const nameInput = document.querySelector('#name');
const emailInput = document.querySelector('#email');
const msg = document.querySelector('.msg');
const userList = document.querySelector('#users');

myForm.addEventListener('submit', onSubmit);

function onSubmit(e) {
  e.preventDefault();

  if (nameInput.value === '' || emailInput.value === '') {
    msg.classList.add('error');
    msg.innerHTML = 'Please enter all fields';
    setTimeout(() => msg.remove(), 3000);
  } else {
    const name = nameInput.value;
    const email = emailInput.value;
    const myObj = {
      name,
      email,
    };

    localStorage.setItem(myObj.email, JSON.stringify(myObj));
    // showUserOnScreen(myObj);

    nameInput.value = '';
    emailInput.value = '';

    axios
      .post(
        'https://crudcrud.com/api/ce7e92a5b6374cd3a7d3bded330efba0/appointment',
        myObj
      )
      .then((response) => {
        console.log(response.data);
        showUserOnScreen(myObj);
      })
      .catch((err) => {
        const error = document.getElementById('error');
        error.innerHTML = 'Something went wrong';
        console.log(err);
       
      });   
       
  }
}

function showUserOnScreen(myObj) {
  const li = document.createElement('li');
  li.textContent = `${myObj.name}: ${myObj.email}`;

 //create a delete button
 const deletebtn = document.createElement("input");
 deletebtn.type = "button";
 deletebtn.value = "Delete";
 deletebtn.classList = "deleteBtn";
  li.appendChild(deletebtn);

 deletebtn.onclick = ()=> {
  localStorage.removeItem(myObj.email);
  userList.removeChild(li);
 };

 // create an edit button
 const editBtn = document.createElement("input");
 editBtn.type = "button";
 editBtn.value = "Edit";
 editBtn.classList = "editBtn";


 editBtn.onclick = ()=> {
   localStorage.removeItem(myObj.email);
   nameInput.value = myObj.name;
   emailInput.value = myObj.email;
   userList.removeChild(li);
 };
 li.append(editBtn);
 userList.appendChild(li);

 }

