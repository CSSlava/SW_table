window.onload = loadData();

function loadData() {

    $.ajax({
        type: "GET",
        url: "http://swapi.co/api/people/?format=json",
        success: function (data) {
            setData(data);
        },
        error: function () {
            console.log('error');
        }
    })



    // var xhr = new XMLHttpRequest();
    // xhr.open("GET", "http://swapi.co/api/people/?format=json", false);
    // xhr.send();
    //
    // xhr.onreadystatechange = function () {
    //     if (xhr.readyState != 4) return;
    // }
    //
    // if (xhr.status != 200) {
    //     alert(xhr.status + ": " + xhr.statusText);
    // } else {
    //     setData(xhr.responseText);
    // }

}
/////   Download Hero Table     ///////////////////////////////////////////////////////////

function setData(responseText) {

    var newHero;
    var newSetting;
    var heroTable = document.getElementById("tableBody");
    // var resp = JSON.parse(responseText);
    var resp = responseText;

    for (var i = 0; i < resp.results.length; i++) {
        newHero = document.createElement("tr");
        newHero.setAttribute("class", "hero_table-item");
        newHero.id = i;

        
        function addHero(setting) {
            newSetting = document.createElement("td");
            newSetting.innerHTML = setting;
            newHero.appendChild(newSetting);
        }

        addHero(resp.results[i].name);
        addHero(resp.results[i].height);
        addHero(resp.results[i].mass);
        addHero(resp.results[i].hair_color);
        addHero(resp.results[i].skin_color);
        addHero(resp.results[i].eye_color);
        addHero(resp.results[i].birth_year);

        newSetting = document.createElement("td");
        newSetting.innerHTML = "<input type='checkbox' id='check'>";
        newHero.appendChild(newSetting);

        heroTable.appendChild(newHero);
    }

    console.log(resp.results);
}

/////    Print textarea     ///////////////////////////////////////////////////////////

function printTextarea() {

    textWindow = window.open("", "textWindow", "location=no, menubar=no, toolbar=no");
    textWindow.document.open();
    textWindow.document.write("<html><head></head><body>");

    textWindow.document.write(
        document.getElementById("textareaToPrint").value.replace(/\n/gi, "<br>"));
    textWindow.document.write("</body></html>");
    textWindow.print();
    textWindow.document.close();
    textWindow.close();
}

/////     Print selected rows     ////////////////////////////////////////////////////////////

function matches(el, selector) {
    
    var matches = document.querySelectorAll(selector),
        i = matches.length;
    while (--i >= 0 && matches.item(i) !== el) {}
    return i > -1;
}

function closest(el, selector) {
    while (el && !matches(el, selector)) {
        el = el.parentNode;
    }
    return matches(el, selector) ? el : null;
}

document.querySelector('table').addEventListener('change', function(event) {
    var target = event.target;
    closest(target, 'tr').classList[target.checked ? 'add' : 'remove']('printme');
});

function printSelected() {
    window.print();
}


/////     Sort table     /////////////////////////////////////////////////////////////


var tableSort = document.getElementById("hero_table");

tableSort.onclick = function (e) {

    if (e.target.getAttribute("class") == 'clickTop') {
        sorting1(e.target.cellIndex, e.target.getAttribute("data-type"));
        e.target.setAttribute("class", "clickDown");
        document.getElementById("icon").innerHTML = '&#x25b3;';
        return;
    }

    if (e.target.getAttribute("class") == 'clickDown'){
        sorting2(e.target.cellIndex, e.target.getAttribute("data-type"));
        e.target.setAttribute("class", "clickTop");
        document.getElementById("icon").innerHTML = '&#x25bd;';
        return;
    }
}

function sorting1(colNum, type) {
    var tbody = tableSort.getElementsByTagName('tbody')[0];

    var rowsArray = [].slice.call(tbody.rows);

    var compare;

    if (type == 'number') {
        compare = function(rowA, rowB) {
            return rowA.cells[colNum].innerHTML - rowB.cells[colNum].innerHTML;
        };
    } else if (type == 'string') {
        compare = function(rowA, rowB) {
            return rowA.cells[colNum].innerHTML > rowB.cells[colNum].innerHTML ? 1 : -1;
        };
    }

    rowsArray.sort(compare);

    tableSort.removeChild(tbody);

    for (var i = 0; i < rowsArray.length; i++) {
        tbody.appendChild(rowsArray[i]);
    }

    tableSort.appendChild(tbody);

}

function sorting2(colNum, type) {
    var tbody = tableSort.getElementsByTagName('tbody')[0];

    var rowsArray = [].slice.call(tbody.rows);

    var compare;

    if (type == 'number') {
        compare = function(rowA, rowB) {
            return rowB.cells[colNum].innerHTML - rowA.cells[colNum].innerHTML;
        };
    } else if (type == 'string') {
        compare = function(rowA, rowB) {
            return rowA.cells[colNum].innerHTML < rowB.cells[colNum].innerHTML ? 1 : -1;
        };
    }

    rowsArray.sort(compare);

    tableSort.removeChild(tbody);

    for (var i = 0; i < rowsArray.length; i++) {
        tbody.appendChild(rowsArray[i]);
    }

    tableSort.appendChild(tbody);

}
