const main = document.querySelector("#main")
const select = document.querySelector("select")
const doctor = document.querySelector("#doctor")

window.addEventListener("load", () => {
    getData()
})

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

select.addEventListener("change", () => {
    if (select.value == "") {
        getData()

    } else {
        fetch(`https://erin-weary-mite.cyclic.app/appointments?specialization=${select.value} `)
            .then((res) => res.json())
            .then((data) => {
                console.log(data)
                displayTable(data)
            }).catch((err) => {
                console.log(err.message)
            })
    }
    FormOption = select.value
})

const search = document.querysearchor("#search")

search.addEventListener("click", () => {
    if (doctor.value !== "") {
        fetch(`https://erin-weary-mite.cyclic.app/appointments?name=${doctor.value} `)
            .then((res) => res.json())
            .then((data) => {
                console.log(data)
                displayTable(data)
            }).catch((err) => {
                console.log(err.message)
            })

    } else {
        getData();
    }

})

function displayTable(data) {
    main.innerHTML = ""
    data.forEach((el, i) => {
        let card = document.createElement("div")

        let img = document.createElement("img")
        img.src = el.image

        let name = document.createElement("h1")
        name.src = el.name

        let specialization = document.createElement("p")
        specialization.src = "Specialization :" + el.specialization

        let experience = document.createElement("p")
        experience.src = "Experience :" + el.experience

        let location = document.createElement("p")
        location.src = "Location :" + el.location

        let date = document.createElement("p")
        date.src = "Date :" + el.date

        let slots = document.createElement("p")
        slots.src = "Slots :" + el.slots

        let fee = document.createElement("p")
        fee.src = "Fee :" + el.fee

        let btn = document.createElement("button")
        btn.innerHTML = "BOOK NOW"
        if (el.slots <= 0) {
            btn.disabled = true
        }
        card.append(img, name, specialization, experience, location,
            date, slots, fee, btn)
        main.append(card)

        btn.addEventListener("click", ()=>{
            let obj = {
                slots: el.slots - 1,
            };
            fetch(`https://erin-weary-mite.cyclic.app/appointments/${el.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(obj),
            })
                .then((res) => res.json())
                .then((data) => {


                    getData()

                }).catch((err) => {
                    console.log(err.message)
                })
        })
    })
}
