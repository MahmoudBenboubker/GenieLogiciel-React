const API_Link = "http://localhost:8080";

export function postEnseignant(enseignant) {
  return fetch(`${API_Link}/enseignants/add`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Access-Control-Allow-Credentials": true
    },
    body: JSON.stringify(enseignant)
  })
    .then(res => {
      return res;
    })
    .catch(err => err);
}

export function updateEnseignant(enseignant) {
  return fetch(`${API_Link}/enseignants/add`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Access-Control-Allow-Credentials": true
    },
    body: JSON.stringify(enseignant)
  })
    .then(res => {
      return res;
    })
    .catch(err => err);
}


export function getEnseignants() {
  return fetch(`${API_Link}/enseignants`)
    .then(response => response.json())
    .catch(error => console.error(error));
}

export function deleteEnseignant(e) {
  return fetch(`${API_Link}/enseignants/${e.idEnseignant}`, {
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
