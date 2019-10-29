const API_Link = "http://localhost:8080";

export function postCours(cours) {
  const t = localStorage.getItem("token");
  return fetch(`${API_Link}/cours`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Access-Control-Allow-Credentials": true,
      Origin: "http://localhost:4200",
      "Access-Control-Allow-Origin": "http://localhost:4200",
      Authorization: `Bearer ${t}`
    },
    body: JSON.stringify(cours)
  })
    .then(res => {
      return res;
    })
    .catch(err => err);
}

export function updateCours(r) {
  const t = localStorage.getItem("token");
  return fetch(`${API_Link}/cours`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Access-Control-Allow-Credentials": true,
      Origin: "http://localhost:4200",
      "Access-Control-Allow-Origin": "http://localhost:4200",
      Authorization: `Bearer ${t}`
    },
    body: JSON.stringify(r)
  })
    .then(res => {
      return res;
    })
    .catch(err => err);
}

export function getCours() {
  const t = localStorage.getItem("token");
  return fetch(`${API_Link}/cours`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Access-Control-Allow-Credentials": true,
      Origin: "http://localhost:4200",
      "Access-Control-Allow-Origin": "http://localhost:4200",
      Authorization: `Bearer ${t}`
    }
  })
    .then(response => response.json())
    .catch(error => console.error(error));
}

export function getCoursByMatricule(id) {
  const t = localStorage.getItem("token");
  return fetch(`${API_Link}/enseignants/${id}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Access-Control-Allow-Credentials": true,
      Origin: "http://localhost:4200",
      "Access-Control-Allow-Origin": "http://localhost:4200",
      Authorization: `Bearer ${t}`
    }
  })
    .then(response => response.json())
    .catch(error => console.error(error));
}

export function deleteCours(e) {
  const t = localStorage.getItem("token");
  return fetch(`${API_Link}/cours/${e.idCours}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Access-Control-Allow-Credentials": true,
      Origin: "http://localhost:4200",
      "Access-Control-Allow-Origin": "http://localhost:4200",
      Authorization: `Bearer ${t}`
    }
  })
    .then(response => response.json())
    .catch(error => console.error(error));
}
