const inputUrl = document.querySelector('.input');
const outputUrl = document.querySelector('.output');
const shortenUrl = document.querySelector('.button-content');
const copyUrl = document.querySelector('.copy');

function urlShortener() {
    if (inputUrl.value === '') {
        // eslint-disable-next-line no-alert
        alert('Enter URL');
    } else {
        fetch('./api/urls', {
            method: 'POST',
            body: JSON.stringify({
                longUrl: inputUrl.value,
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((response) => response.json())
            .then((json) => {
                outputUrl.value = `${document.location.origin}/${json.id}`;
                copyUrl.addEventListener('click', () => {
                    const copyText = document.querySelector('.output');
                    copyText.select();
                    document.execCommand('copy');
                    // eslint-disable-next-line no-alert
                    alert('Copied');
                });
            });
    }
}

shortenUrl.addEventListener('click', urlShortener);

const table = document.querySelector('#table');
function displayURL() {
    fetch('./api/urls/')
        .then((response) => response.json())
        .then((urls) => {
            urls.forEach((component) => {
                const longURL = component.longUrl;
                const shortURL = `${document.location.origin}/${component.id}`;
                const row = document.createElement('tr');
                const cell1 = document.createElement('td');
                const cell2 = document.createElement('td');
                const cellText1 = document.createTextNode(longURL);
                const cellText2 = document.createTextNode(shortURL);
                cell1.appendChild(cellText1);
                cell2.appendChild(cellText2);
                row.appendChild(cell1);
                row.appendChild(cell2);
                table.appendChild(row);
            });
        });
}

window.onload = displayURL();
