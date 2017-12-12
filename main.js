const DOM = {};
const user = {};
function clear(obj) {
    for (k in obj)
        delete obj[k];
}
function showLogin() {
    DOM.flogin.removeAttribute("hidden");
    DOM.fprofile.setAttribute("hidden", "true");
    DOM.faddocr.setAttribute("hidden", "true");
}
function hideLogin() {
    DOM.flogin.setAttribute("hidden", "true");
    DOM.fprofile.removeAttribute("hidden");
    DOM.faddocr.removeAttribute("hidden");
}
function submit_flogin(evt) {
    evt.preventDefault();
    const data = JSON.stringify({
        username: DOM.flogin.login,
        password: DOM.flogin.password
    });
    const headers = new Headers();
    headers.append("Content-Type", "application/json;charset=utf-8");
    headers.append("Content-Length", data.length.toString());
    fetch("https://air.ephec-ti.org/api/v1/login", {
        method: "POST",
        headers,
        data
    }).then(res => {
        return res.json()
    }).then(json => {
        user["token"] = json["token"];
        const obj = jwt_decode(user["token"]);
        for (k in obj)
            user[k] = obj[k];
    });

}
function main() {
    window.removeEventListener("load", main);
    DOM.flogin = document.getElementById("flogin");
    DOM.fprofile = document.getElementById("fprofile");
    DOM.faddocr = document.getElementById("faddocr");

    DOM.flogin.onsubmit = submit_flogin;
}
window.addEventListener("load", main);