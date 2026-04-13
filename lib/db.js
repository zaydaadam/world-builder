const users = [];
const projects = [];

// users

function getUsers() {
  return users;
}

function findUserByEmail(email) {
  const cleanEmail = email.trim().toLowerCase();

  return users.find(function (user) {
    return user.email.trim().toLowerCase() === cleanEmail;
  });
}

// create user
function addUser({ username, email, password }) {
  const newUser = {
    id: Date.now(),
    username: username,
    email: email,
    password: password,
  };

  users.push(newUser);
  return newUser;
}

// projects

// get all projects
function getProjects() {
  return projects;
}

// add new project
function addProject({ name, userId }) {
  const newProject = {
    id: Date.now(),
    name: name, // project name
    userId: userId, // who owns it
  };

  projects.push(newProject);
  return newProject;
}

export { getUsers, findUserByEmail, addUser, getProjects, addProject };
