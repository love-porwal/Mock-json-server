const form = document.querySelector("form")

const login = document.getElementById("login")


login.addEventListener("click", (e) => {
    e.preventDefault();
    let obj = {
        email: form.email.value,
        password: form.password.value,
    };

    if (obj.email == "" || obj.password == "") {
        alert("please fill details")
    } else
        userlogin(obj)
})

let userlogin = (obj) => {

    let { email, password } = obj;

    fetch(`http://localhost:3000/users?email=${email}&password=${password}`)
        .then((res) => res.json())
        .then((data) => {
            if (data.length >= 1) {
                localStorage.setItem("checkDoctor", data[0].checkDoctor);
                localStorage.setItem("username", data[0].username);
                alert("login successful")

            } else alert("login failed")

        }).catch((err) => {
            console.log(err.message)
        })
}