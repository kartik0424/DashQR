const API = fetch(`https://dashqr-backend.onrender.com/api/auth`)

async function register() {
    const name = document.getElementById("name").value
    const email = document.getElementById("email").value
    const password = document.getElementById("password").value

    if (!name || !email || !password){
        alert("All fields are required!!")
        return
    }

    const res = await fetch(`${API}/register`, {
        method: "POST",
        headers: {"content-Type" : "application/json"},
        body: JSON.stringify({name, email, password})
    })

    const data = await res.json()

    if (!res.ok){
        alert(data.message)
        return
    }

    localStorage.setItem("token", data.token)
    window.location.href =  "login.html"
}


async function login(){
    const email = document.getElementById("email").value
    const password = document.getElementById("password").value

    if(!email || !password){
        alert("All field are required")
        return
    }

    const res = await fetch(`${API}/login`, {
        method: "POST",
        headers: {"content-Type" : "application/json"},
        body: JSON.stringify({email, password})
    })

    const data = await res.json()

    if (!res.ok){
        alert(data.message)
        return
    }

    localStorage.setItem("token", data.token)
    window.location.href = "generate.html"
}

function logout() {
    localStorage.removeItem("token")
    window.location.href = "login.html"
}
