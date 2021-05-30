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
            'beforeend',//html
            `
                <option value="${e}">${e}</option>
            `
        );
    });

    class Filter {
        constructor() {
            this.phoneStr = phoneSearch.value.trim();
            this.date = dateBook.value;
            this.onHands = bookOnHands.value;
            this.book = bookFilter.value;
        }

        usersToHtml = (u) => {
            u.forEach((e) => {
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
};
