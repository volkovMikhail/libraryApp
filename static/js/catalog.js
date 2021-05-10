let catalog;
let data;
let authorFilter;
let availableCheck;
let sort;
let nameSearch;

let authorArr = [];
let firstOutput = true;

class Filter{
    constructor() {
        this.nameSearch = nameSearch.value;
        this.sort = sort.value;
        this.available = availableCheck.checked;
        this.author = authorFilter.value;
        this.arr = [];
    }

    toHtml() {
        catalog.innerHTML = '';
        for (const item of this.arr) {
            let available = /*html*/ `<span class="text-danger">Нет в наличии</span>`;
            if (item.available) {
                available = /*html*/ `<span class="text-success">В наличии</span>`;
            }
            catalog.insertAdjacentHTML(
                'beforeend', //html
                `
                    <div class="card m-1" style="width: 18rem;">
                        <div class="imgBlock" style="background-image: url(/images/${item.image});" onclick="window.location='/book/${item._id}'">
    
                        </div> 
                        <div class="card-body">
                            <h5 class="card-title text-truncate">${item.name}</h5>
                            <p class="card-text">
                                Автор: ${item.author} <br>
                                Год издания: ${item.year} <br>
                                ${available} 
                            </p>
                            <a href="/book/${item._id}" class="btn btn-warning">Подробней...</a>
                        </div>
                    </div>
                `
            );
            if (firstOutput) {
                authorArr.push(item.author);
            }
        }
        firstOutput = false;
    }


    uptadeState(){
        this.nameSearch = nameSearch.value;
        this.sort = sort.value;
        this.available = availableCheck.checked;
        this.author = authorFilter.value;
    }

    compareSort(param) {
        this.arr.sort((a, b) => {
            if (a[param] < b[param]) {
                return 1;
            }
            if (a[param] > b[param]) {
                return -1;
            }
            return 0;
        });
    }

    filter(){
        this.uptadeState();
        const regEx = new RegExp(this.nameSearch.toUpperCase());
        this.arr = data.filter((e) => regEx.test(e.name.toUpperCase()));
        if (this.sort === 'popularity') {
            this.compareSort('popularity');
        } else if (this.sort === 'yearOld') {
            this.compareSort('year');
        } else if (this.sort === 'yearNew') {
            this.compareSort('year');
            this.arr.reverse();
        }
        if (this.available) this.arr = this.arr.filter((e) => e.available === true);
        if (this.author !== 'all') this.arr = this.arr.filter((el) => el.author === this.author);
        this.toHtml();
    }
}

let filter;

window.onload = async () => {
    catalog = document.querySelector('#catalog');
    authorFilter = document.querySelector('#authorFilter');
    availableCheck = document.querySelector('#availableCheck');
    authorFilter = document.querySelector('#authorFilter');
    sort = document.querySelector('#sort');
    nameSearch = document.querySelector('#nameSearch');
    filter = new Filter();
    data = await (await fetch('/api/books')).json();
    filter.filter();
    authorArr = [...new Set(authorArr)];
    for (const item of authorArr) {
        authorFilter.insertAdjacentHTML(
            'beforeend', //html
            `
                <option value="${item}">${item}</option>
            `
        );
    }

    sort.addEventListener('change', (e) => {
        filter.filter();
    });

    availableCheck.addEventListener('change', (e) => {
        filter.filter();
    });

    authorFilter.addEventListener('change', (e) => {
        filter.filter();
    });

    nameSearch.addEventListener('input', (e) => {
        filter.filter();
    });
};
