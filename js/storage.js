async function getUsers() {
  return await fetch("../data.json").then((response) => response.json());
}

const saveOnStorage = () => {
  getUsers().then((data) => {
    localStorage.setItem("comments", JSON.stringify(data.comments));
    localStorage.setItem("currentUser", JSON.stringify(data.currentUser));
  });
};

saveOnStorage();
