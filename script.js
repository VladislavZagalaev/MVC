const URL = 'https://docs.google.com/spreadsheets/u/0/d/1tbXbRGX3P3wPJyVtZv_TK69JK4WZpsw6hsSh4SqMrJo/export?format=tsv&id=1tbXbRGX3P3wPJyVtZv_TK69JK4WZpsw6hsSh4SqMrJo&gid=0'
const SEP_LINE = '\r\n'
const SEP_CELL = '\t'
const DOM_TABLE = document.querySelector('.translator')

function loadData() {
    fetch(URL)
        .then(response => response.text())
        .then(body => parseData(body))
        .then(data => render(data));
}

function parseData(body) {
    const table = body
        .split(SEP_LINE)
        .map(element => element.split(SEP_CELL));
    const headers = table.shift();

    return {
        headers: headers,
        words: table.map(element => {
                const wordData = {};
                headers.forEach((header, i) => wordData[header] = element[i])
                return wordData
            }
        )
    };
}

function render(data) {
    DOM_TABLE.innerHTML = `
    ${header(data.headers)}
    <tbody>
        ${body(data.words)}
    </tbody>`;
}

function header(headers) {
    return `
    <thead>
    <tr>
        <th scope="col">${headers[0]}</th>
        <th scope="col">${headers[1]}</th>
        <th scope="col">${headers[2]}</th>
    </tr>
    </thead>`;
}

function body(words) {
    return `
    <tbody>
        ${words.map(it => row(it)).join("")}
    </tbody>`;
}

function row(word) {
    return `
    <tr>
        <th scope="row">${word.n}</th>
        <td>${word.language}</td>
        <td>${word.word}</td>
    </tr>`;
}

loadData();
