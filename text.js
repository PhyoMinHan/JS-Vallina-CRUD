showData();
document.getElementById('register').addEventListener('click', () => {
    const name = document.getElementById('name').value.trim();
    const age = document.getElementById('age').value.trim();
    const address = document.getElementById('address').value.trim();
    const gender = document.querySelector(`input[name = "gender"]:checked`)?.value;
    if (!name || !age || !address || gender === undefined) {
        alert('Please fill something value');
        return;
    }
    const students = { name, age, address, gender };
    const studentlist = localStorage.getItem('list');
    const studentArray = studentlist ? JSON.parse(studentlist) : [];
    studentArray.push(students);
    const studentstring = JSON.stringify(studentArray);
    localStorage.setItem('list', studentstring);
    showData();
    clear();
});
function showData() {
    const studentlist = localStorage.getItem('list');
    const studentArray = studentlist ? JSON.parse(studentlist) : [];
    const tbody = document.querySelector('tbody');
    tbody.innerHTML = ``;
    studentArray.forEach((obj, id) => {
        const row = document.createElement(`tr`);
        row.innerHTML = `
        <td>${id + 1}</td>
        <td>${obj.name}</td>
        <td>${obj.age}</td>
        <td>${obj.address}</td>
        <td>${obj.gender}</td>
        <td>
        <button onclick="Edit(${id})">Edit</button>
        <button onclick="Delete(${id})" class="delete">Delete</button>
        </td>`;
        tbody.append(row);
    });
}
function clear() {
    document.querySelectorAll(`#reg_form input[type="text"],#reg_form input[type="number"],
        #update_form input[type="text"], #update_form input[type="number"]`).forEach(input =>
        input.value = "");
    document.querySelectorAll(`#reg_form input[type="radio"],#update_form input[type="radio"]`).forEach(input => input.checked = false);
}
function Delete(id) {
    const studentlist = localStorage.getItem('list');
    let studentArray = JSON.parse(studentlist);
    studentArray.splice(id, 1);
    const studentstring = JSON.stringify(studentArray);
    localStorage.setItem('list', studentstring);
    showData();
};
function Edit(id) {
    document.getElementById('uid').value = id;
    let studentlist = localStorage.getItem('student');
    let studentArray = JSON.parse(studentlist);
    let studentupdate = studentArray[id];
    document.getElementById('uname').value = studentupdate.name;
    document.getElementById('uage').value = studentupdate.age;
    document.getElementById('uaddress').value = studentupdate.address;
    document.querySelector(`input[name = "ugender"][value = "${studentupdate.gender}"]`).checked = true;
    document.querySelectorAll("button[class^='delete']").forEach(button => {
        button.remove();
    });
    document.getElementById('reg_form').style.display = 'none';
    document.getElementById('update_form').style.display = 'block';
    // showData(); you won't need because it is error
};
document.getElementById('update').addEventListener('click', () => {
    const id = document.getElementById('uid').value;
    const name = document.getElementById('uname').value.trim();
    const age = document.getElementById('uage').value.trim();
    const address = document.getElementById('uaddress').value.trim();
    const gender = document.querySelector(`input[name = "ugender"]:checked`)?.value;
    if (!name || !age || !address || gender === undefined) {
        alert('Please fill something value');
        return;
    }
    const newstudents = { name, age, address, gender };
    const studentlist = localStorage.getItem('list');
    const studentArray = studentlist ? JSON.parse(studentlist) : [];
    studentArray[id] = newstudents;
    const studentstring = JSON.stringify(studentArray);
    localStorage.setItem('list', studentstring);
    showData();
    clear();
    document.getElementById('reg_form').style.display = 'block';
    document.getElementById('update_form').style.display = 'none';
});