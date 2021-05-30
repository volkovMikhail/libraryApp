window.onload = async () => {
    let phoneSearch = document.querySelector('#phoneSearch');
    let dateBook = document.querySelector('#dateBook');
    let bookOnHands = document.querySelector('#bookOnHands');
    let bookFilter = document.querySelector('#bookFilter');
    tbody = document.querySelector('#tbody');
    const users = await (await fetch('/api/users')).json();
    const books = await (await fetch('/api/books')).json();
    let dates = [];
    users.forEach((user) => {
        if (user.hasOwnProperty('books')) {
            user.books.forEach((bk) => {
                dates.push(bk.orderDate);
            });
        }
    });
    dates = [...new Set(dates)];
    dates.forEach((e) => {
        dateBook.insertAdjacentHTML(
            'beforeend', //html
            `
                <option value="${e}">${e}</option>
            `
        );
    });
    books.forEach((e) => {
        bookFilter.insertAdjacentHTML(
            'beforeend', //html
            `
                <option value="${e.name}">${e.name}</option>
            `
        );
    });

    class Filter {
        constructor() {
            this.phoneStr = phoneSearch.value.replace(/\D+/g,"")
            this.date = dateBook.value;
            this.onHands = bookOnHands.checked;
            this.book = bookFilter.value;
        }

        usersToHtml = (u) => {
            this.phoneStr = phoneSearch.value.replace(/\D+/g,"")
            this.date = dateBook.value;
            this.onHands = bookOnHands.checked;
            this.book = bookFilter.value;
            let userArr = u;
            if (this.onHands === true) {
                userArr = userArr.filter((user) => {
                    if (user.hasOwnProperty('books')) {
                        return user.books.length > 0;
                    } else {
                        return false;
                    }
                });
            }
            if (this.phoneStr != "") {
                const regEx = new RegExp(this.phoneStr);
                userArr = userArr.filter((e) => regEx.test(e.phone.replace(/\D+/g,"")));
            }
            if (this.date != 'all') {
                userArr = userArr.filter(user=>{
                    let yes = false;
                    if (user.hasOwnProperty('books')) {
                        user.books.forEach(element => {
                            if (element.orderDate === this.date) {
                                yes = true;
                            }
                        });
                        return yes;
                    } else {
                        return false;
                    }
                })
            }
            if (this.book != 'all') {
                userArr = userArr.filter(user=>{
                    let yes = false;
                    if (user.hasOwnProperty('books')) {
                        user.books.forEach(element => {
                            if (element.name === this.book) {
                                yes = true;
                            }
                        });
                        return yes;
                    } else {
                        return false;
                    }
                })
            }
            tbody.innerHTML = '';
            userArr.forEach((e) => {
                tbody.insertAdjacentHTML(
                    'beforeend', //html
                    `
                        <tr>
                            <td style="font-size: small">
                                <a href="/user/${e._id}"
                                    >${e._id}</a
                                >
                            </td>
                            <td>${e.name}</td>
                            <td>${e.email}</td>
                            <td>${e.phone}</td>
                            <td>${e.regDate}</td>
                        </tr>
                    `
                );
            });
        };
    }

    let filter = new Filter();
    filter.usersToHtml(users);
    bookOnHands.addEventListener('click', () => {
        filter.usersToHtml(users);
    });
    bookFilter.addEventListener('change',()=>{
        filter.usersToHtml(users);
    })
    phoneSearch.addEventListener('input',()=>{
        filter.usersToHtml(users);
    })
    dateBook.addEventListener('change',()=>{
        filter.usersToHtml(users);
    })
};
