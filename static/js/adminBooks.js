window.onload = async ()=>{
    let books = document.querySelector('#books');
    let nameSearch = document.querySelector('#nameSearch');
    let data = await (await fetch('/api/books')).json();
    toHtml(data);

    nameSearch.addEventListener('input',()=>{
        const regEx = new RegExp(nameSearch.value.toUpperCase());
        let arr = data.filter((e) => regEx.test(e.name.toUpperCase()));
        toHtml(arr);
    })

    function toHtml(booksArr){
        books.innerHTML = "";
        booksArr.forEach(element => {
            books.insertAdjacentHTML('beforeend',//html
            `
                <tr>
                    <td style="font-size: small">${element._id}</td>
                        <td>
                            <a href="/book/${element._id}">${element.name}</a>
                        </td>
                    <td class="form-inline">
                         <form
                             class="m-1"
                             action="/delete/book/${element._id}"
                             method="GET"
                         >
                             <button class="btn btn-danger" type="submit">
                                 Удалить
                             </button>
                        </form>
                     </td>
                </tr>
            `
            );
        }); 
    }
}