// overlay for alerts (flash messages)
function overlay_off() {
    document.querySelector(".overlay").style.display = "none";
}

// autocomplete search bar
function search() {
    let input = document.getElementById('nav-searchbar');
    input.addEventListener('input', async function() {
        let response = await fetch('/search?q=' + input.value);
        let products = await response.json();
        let html = '';
        for (let i in products) {
            let product_name = products[i].name.replace('<', '&lt;').replace('&', '&amp;');
            let product_id = products[i].id;
            let product_img = products[i].img;
            html += '<form class="nav-searchitem" action="/product" method="post"><input name="id" type="hidden" value="' + product_id + '"><img src="' + product_img + '" alt="Image" class="nav-searchimg"><button class="nav-searchname" type="submit">' + product_name + '</button></form>';
        }
        document.querySelector('.nav-searchlist').innerHTML = html;
    });
}
