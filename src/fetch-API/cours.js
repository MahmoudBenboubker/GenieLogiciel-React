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

export function updateCours(r) {
  return fetch(`${API_Link}/cours/add`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Access-Control-Allow-Credentials": true
    },
    body: JSON.stringify(r)
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



export function deleteCours(e) {
  return fetch(`${API_Link}/cours/${e.idCour}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Access-Control-Allow-Credentials": true
    }
  })
    .then(response => response.json())
    .catch(error => console.error(error));
}

