const form = document.querySelector("form")

const register = document.getElementById("register")


register.addEventListener("click", (e) => {
    e.preventDefault();
    let obj = {
        username: form.username.value,
        email: form.email.value,
        password: form.password.value,
        checkDoctor: form.checkDoctor.value,
    };

    if (obj.username == "" || obj.email == "" || obj.password == "") {
        alert("please fill details")
    } else
        userregister(obj)
})

let userregister = (obj) => {

    let { email, password } = obj;

    fetch(`http://localhost:3000/users`,{
        method:"POST",
        headers:{
            "content-type": "application/json",
        },
        body:JSON.stringify(obj),
    })
        .then((res) => res.json())
        .then((data) => {
        
                alert("register successful")

            }).catch((err) => {
            console.log(err.message)
        })
}