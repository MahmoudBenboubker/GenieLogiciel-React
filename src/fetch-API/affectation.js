const API_Link = "http://localhost:8080";

export function affectationEnseignantCours(idEnseignant, idCours) {
    const t = localStorage.getItem("token");
    return fetch(`${API_Link}/affect/ens-crs/${idEnseignant}/${idCours}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true,
        Origin: "http://localhost:4200",
        "Access-Control-Allow-Origin": "http://localhost:4200",
        Authorization: `Bearer ${t}`
      },
      body: JSON.stringify("")
    })
      .then(res => {
        return res;
      })
      .catch(err => err);
  }
