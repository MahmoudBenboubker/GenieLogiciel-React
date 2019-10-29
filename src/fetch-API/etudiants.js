const API_Link = "http://localhost:8080";
//const token = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJtYWhtb3VkLmJlbmJvdWJrZXIiLCJleHAiOjE1NzI1MDg0MzksImlhdCI6MTU3MTkwMzYzOX0.PG2rmIrjnpj36ozzP52cwOI7ulVqS0pAFh3ZVvonaq5jN2_AT1jEedXFXeWO9cg_QnX7KcYD9nMxOpb8HU0zTg";

export function postEtudiant(e) {
  const t = localStorage.getItem('token')
  return fetch(`${API_Link}/etudiants`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Access-Control-Allow-Credentials": true,
      "Origin" : "http://localhost:4200",
      "Access-Control-Allow-Origin" :  "http://localhost:4200",
      "Authorization" : `Bearer ${t}`
    },
    body: JSON.stringify(e)
  })
    .then(res => {
      return res;
    })
    .catch(err => err);
}

export function updateEtudiant(e) {
  const t = localStorage.getItem('token')
  return fetch(`${API_Link}/etudiants`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Access-Control-Allow-Credentials": true,
      "Origin" : "http://localhost:4200",
      "Access-Control-Allow-Origin" :  "http://localhost:4200",
      "Authorization" : `Bearer ${t}`
    },
    body: JSON.stringify(e)
  })
    .then(res => {
      return res;
    })
    .catch(err => err);
}


export function getEtudiants() {
  const t = localStorage.getItem('token')
  return fetch(`${API_Link}/etudiants`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Access-Control-Allow-Credentials": true,
      "Origin" : "http://localhost:4200",
      "Access-Control-Allow-Origin" :  "http://localhost:4200",
      "Authorization" : `Bearer ${t}`
    }
  })
    .then(response => response.json())
    .catch(error => console.error(error));
}

export function deleteEtudiant(e) {
  const t = localStorage.getItem('token')
  return fetch(`${API_Link}/etudiants/${e.matricule}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Access-Control-Allow-Credentials": true,
      "Origin" : "http://localhost:4200",
      "Access-Control-Allow-Origin" :  "http://localhost:4200",
      "Authorization" : `Bearer ${t}`
    }
  })
    .then(response => response.json())
    .catch(error => console.error(error));
}
