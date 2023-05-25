const form = document.querySelector("form")
const button = document.querySelector("button")
const select = document.querySelector("select")
let FormOption = ""

select.addEventListener("change", () => {
    FormOption = select.value
})

window.addEventListener("load", () => {
    getData()
})
button.addEventListener("click", (e) => {
    e.preventDefault();

    let obj = {
        name: form.name.value,
        image: form.image.value,
        experience: form.experience.value,
        location: form.location.value,
        date: form.date.value,
        slots: form.slots.value,
        fee: form.fee.value,
        specialization: FormOption,
    };

    if (obj.name == "" || obj.image == "" ||
        obj.experience == "" || obj.location == "" ||
        obj.date == "" || obj.slots == "" ||
        obj.fee == "" || obj.specialization == "") {
        alert("please fill details")
    } else
        DoctorData(obj)
})

let DoctorData = (obj) => {

    fetch(`http://localhost:3000/appointments`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(obj),
    })
        .then((res) => res.json())
        .then((data) => {

            alert("Doctor's register successful")
            getData()

        }).catch((err) => {
            console.log(err.message)
        })
}

let getData = () => {

    fetch(`http://localhost:3000/appointments`)
        .then((res) => res.json())
        .then((data) => {
            console.log(data)
            displayTable(data)
        }).catch((err) => {
            console.log(err.message)
        })
}

let tbody = document.querySelector("tbody")

function displayTable(data) {
    // tbody.innerHTML = ""
    data.forEach((el, i) => {
        let tr = document.createElement("tr")

        let name = document.createElement("td")
        name.innerHTML = el.name;

        let specialization = document.createElement("td")
        specialization.innerHTML = el.specialization;

        let experience = document.createElement("td")
        experience.innerHTML = el.experience;

        let location = document.createElement("td")
        location.innerHTML = el.location;

        let slots = document.createElement("td")
        slots.innerHTML = el.slots;

        let Edit = document.createElement("td")
        Edit.textContent = "Edit";

        let Delete = document.createElement("td")
        Delete.textContent = "Delete";

        let Appointments = document.createElement("td")
        Appointments.textContent = "Appointments";

        tr.append(name, specialization, experience, location,slots, Edit, Delete, Appointments)

        tbody.append(tr)

        Delete.addEventListener("click",()=>{
            fetch(`http://localhost:3000/appointments/${el.id}`, {
                method: "DELETE", 
            })
            .then((res) => res.json())
            .then((data) => {
                console.log(data)
                
            }).catch((err) => {
                console.log(err.message)
            })
        })
    })
}
