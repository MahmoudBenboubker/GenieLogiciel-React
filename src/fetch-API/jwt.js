const API_Link = "http://localhost:8080";

export function getJwt(e) {
  return fetch(`${API_Link}/authenticate`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Access-Control-Allow-Credentials": true,
      Origin: "http://localhost:4200"
    },
    body: JSON.stringify(e)
  })
      .then(response => response.json())
    .catch(error => console.error(error));
}

//export const token = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJpbjI4bWludXRlcyIsImV4cCI6MTU3MTg2MTY1MSwiaWF0IjoxNTcxMjU2ODUxfQ.7wIL4slGYGw1-7yy-1ONmQwryghqDnjHTUMVGUQsNHsf2m88QZqsr17POOhmj3Ngy3cwMMT81mY4RRYOHpSPjA";
