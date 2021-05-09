let catalog;
let data;

window.onload = async () => {
    catalog = document.querySelector('#catalog');
    data = await (await fetch('/api/books')).json();
    for (const item of data) {
        let available = /*html*/`<span class="text-success">В наличии</span>`;
        if(item.available){
            available = /*html*/`<span class="text-danger">Нет в наличии</span>`;
        }
        catalog.insertAdjacentHTML('beforeend', //html
            `
                <div class="card m-1" style="width: 18rem;">
                    <div class="imgBlock" style="background-image: url(/images/${item.image});" onclick="window.location='/book/${item._id}'">

                    </div> 
                    <div class="card-body">
                        <h5 class="card-title">${item.name}</h5>
                        <p class="card-text">
                            Автор: ${item.author} <br>
                            Год издания: ${item.year} <br>
                            ${available} 
                        </p>
                        <a href="/book/${item._id}" class="btn btn-warning">Подробней/взять</a>
                    </div>
                </div>
            `
        );
    }
};
