const URL = "https://backend-937p.onrender.com/"

let navbar = document.querySelector(".navbar")

document.querySelector("#menu-btn").onclick = () => {
    navbar.classList.toggle("active");
    searchForm.classList.remove("active");
    cartItem.classList.remove("active");
}

let searchForm = document.querySelector(".search-form")

document.querySelector("#search-btn").onclick = () => {
    searchForm.classList.toggle("active");
    navbar.classList.remove("active");
    cartItem.classList.remove("active");
}

let cartItem = document.querySelector(".cart-items-container")

document.querySelector("#cart-btn").onclick = () => {
    cartItem.classList.toggle("active");
    navbar.classList.remove("active");
    searchForm.classList.remove("active");
}

window.onscroll = () => {
    navbar.classList.remove("active");
    searchForm.classList.remove("active");
    cartItem.classList.remove("active");
}
function removeCart(removeId) {
    fetch(URL + "/remove/" + removeId)
        .then((res) => {
            if (res.ok) {
                window.location.reload()
                alert("your products remove")
            }
        })
}

function manuCart() {
    fetch(URL + "/menuCart")
        .then(res => res.json())
        .then(data => {
            data.map((cartDetails) => {
                let { _id, id, images, title, new_price, old_price } = cartDetails
                let container = document.querySelector(".box-container")
                let div = document.createElement("div")
                div.setAttribute("class", "box")
                div.innerHTML = `<img class="menu-image" src=${images} alt="">
                    <h3>${title}</h3>
                    <div class="price">$${new_price} <span>$${old_price}</span></div>
                    <button onclick="addCart('${_id}')" id="cart-local" class="btn">add to cart</button>`
                container.appendChild(div)
            })
        })
} manuCart()


function addCart(id) {
    fetch(URL + "/menuCart/" + id)
        .then(data => data.json())
        .then(productDetails => {
            const { id, images, title, new_price, old_price } = productDetails
            fetch(URL + "/postCart",
                {
                    method: 'POST',
                    body: JSON.stringify({
                        id,
                        images,
                        title,
                        new_price,
                        old_price
                    }),
                    headers: {
                        "content-type": "application/json; charset=UTF-8"
                    }
                })

                .then(res => {
                    res.json()
                    alert("Your_Products_Succesful")
                    window.location.reload()
                })
        })
}

function cartItems() {
    fetch(URL + "/getCart")
        .then(res => res.json())
        .then(data => {
            data.map((data) => {
                let container = document.querySelector(".cart-small-container")
                let div = document.createElement("div")
                div.setAttribute("class", "cart-item")
                div.innerHTML = `<span onclick="removeCart('${data._id}')" class="fas fa-times"></span>
                <img src="${data.images}" alt="">
                <div class="content">
                    <h3>${data.title}</h3>
                    <div class="price">$${data.new_price}-</div>`
                container.appendChild(div)
            })
        })
} cartItems()

function Submit(event) {
    event.preventDefault();

    let name = document.getElementById('name').value
    let email = document.getElementById('email').value
    let number = document.getElementById('number').value

    fetch(URL + "/contact",
        {
            method: 'POST',
            body: JSON.stringify({
                name,
                email,
                number
            }),
            headers: {
                "content-type": "application/json; charset=UTF-8"
            }
        })

        .then(res => {
            res.json()
            alert("Your_deatails_Successful")
            window.location.reload()
        })
        .then(data => console.log(data))
}

function productItem() {
    fetch(URL + "/productItem")
        .then(res => res.json())
        .then(data => {
            data.map((data) => {
                let container = document.querySelector("#product-box")
                let div = document.createElement("div")
                div.setAttribute("class", "box")
                div.innerHTML = `<div class="icons">
                    <a href="#" class="fas fa-shopping-cart"></a>
                    <a href="#" class="fas fa-heart"></a>
                    <a href="#" class="fas fa-eye"></a>
                </div>
                <div class="image">
                    <img src="${data.images}" alt="">
                </div>
                <div class="content">
                    <h3>${data.title}</h3>
                    <div class="stars">
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star-half-alt"></i>
                    </div>
                    <div class="price">$${data.new_price}<span>$${data.old_price} </span></div>
                </div>`
                container.appendChild(div)
            })
        })
} productItem()








