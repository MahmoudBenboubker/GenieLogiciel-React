const API_Link = "http://localhost:8080";

export function postCours(cours) {
  return fetch(`${API_Link}/cours/add`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Access-Control-Allow-Credentials": true
    },
    body: JSON.stringify(cours)
  })
    .then(res => {
      return res;
    })
    .catch(err => err);
}

export function getCours() {
  return fetch(`${API_Link}/cours`)
    .then(response => response.json())
    .catch(error => console.error(error));
}

export function getCoursByMatricule(id) {
  return fetch(`${API_Link}/enseignants/${id}`)
    .then(response => response.json())
    .catch(error => console.error(error));
}



