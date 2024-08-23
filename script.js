const adminUsername = 'admin';
const adminPassword = 'admin0912';

function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username === adminUsername && password === adminPassword) {
        document.querySelector('.login-container').style.display = 'none';
        document.querySelector('.admin-panel').style.display = 'block';
        loadUsers();
    } else {
        document.getElementById('login-error').style.display = 'block';
    }
}

function loadUsers() {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const usersList = document.getElementById('users-list');
    const usersScores = document.getElementById('users-scores');
    usersList.innerHTML = '';
    usersScores.innerHTML = '';

    users.forEach(user => {
        const option = document.createElement('option');
        option.value = user.username;
        option.textContent = `${user.username} (${user.score})`;
        usersList.appendChild(option);

        const li = document.createElement('li');
        li.textContent = `${user.username}: ${user.score} points`;
        usersScores.appendChild(li);
    });
}

function createUser() {
    const username = document.getElementById('new-username').value;
    const password = document.getElementById('new-password').value;

    const users = JSON.parse(localStorage.getItem('users')) || [];

    users.push({ username, password, score: 0 });
    localStorage.setItem('users', JSON.stringify(users));

    loadUsers();
}

function updateScore() {
    const username = document.getElementById('users-list').value;
    const score = parseInt(document.getElementById('user-score').value, 10);

    const users = JSON.parse(localStorage.getItem('users')) || [];

    const user = users.find(user => user.username === username);
    if (user) {
        user.score += score;
        localStorage.setItem('users', JSON.stringify(users));
        loadUsers();
    }
}

function deleteUser() {
    const username = document.getElementById('users-list').value;

    let users = JSON.parse(localStorage.getItem('users')) || [];
    users = users.filter(user => user.username !== username);

    localStorage.setItem('users', JSON.stringify(users));
    loadUsers();
}
