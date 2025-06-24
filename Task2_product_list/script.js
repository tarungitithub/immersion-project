const btn = document.getElementById('btn');
const inp = document.getElementById('inp');
const sortSelect = document.getElementById('sort');
const tempUrl = "https://dummyjson.com/products/search?q=";
const container = document.getElementById('container');

btn.addEventListener('click', () => {
    const URL = tempUrl + inp.value;
    container.innerHTML = ""; 

    if (inp.value !== "") {
        fetch(URL)
            .then((res) => res.json())
            .then((data) => {
                let products = data.products;

                
                const sortValue = sortSelect.value;
                if (sortValue === "asc") {
                    products.sort((a, b) => a.price - b.price);
                } else if (sortValue === "desc") {
                    products.sort((a, b) => b.price - a.price);
                }

                
                for (let product of products) {
                    const productElem = document.createElement('div');

                    const h2 = document.createElement('h2');
                    h2.innerText = product.title;

                    const img = document.createElement('img');
                    img.setAttribute('src', product.images[0]);
                    img.style.width = "200px";

                    const para = document.createElement('p');
                    para.innerText = product.price;

                    productElem.append(h2, img, para);
                    productElem.style.border = "2px solid black";
                    productElem.style.padding = "10px";
                    productElem.style.margin = "10px";

                    container.append(productElem);
                }
            })
            .catch(err => {
                console.error("Fetch error:", err);
                container.innerHTML = "<p>Something went wrong. Please try again.</p>";
            });
    } else {
        container.innerHTML = "<p>Please enter a search term.</p>";
    }
});