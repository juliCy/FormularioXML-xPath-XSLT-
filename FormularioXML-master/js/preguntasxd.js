var nota = 0.0;
var respuestasMultiple1 = [];
var respuestasMultiple2 = [];
var respuestaText1 = null;
var respuestaText2 = null;
var respuestasRadio1 = [];
var respuestasRadio2 = [];
var respuestaSelect1 = null;
var respuestaSelect2 = null;
var respuestasCheckbox1 = [];
var respuestasCheckbox2 = [];
var formElement = null;


window.onload = function () {

    //CORRECCION--------------------
    formElement = document.getElementById('myForm');
    formElement.onsubmit = function () {
        inicializar();
        if (comprobar()) {
            cRadio1();
            cText1();
            cCheckbox1();
            cSelect1();
            cMultiple1();
            cRadio2();
            cText2();
            cCheckbox2();
            cSelect2();
            cMultiple2();
            Nota();
        }
        return false;
    };

//xml request--------------------
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            gestionarXml(this);
        }
    };
    xhttp.open("GET", "xml/preguntasxd.xml", true);
    xhttp.send();
}


function gestionarXml(dadesXml) {
    //PARSE XML--------------------
    var xmlDoc = dadesXml.responseXML;

    //RADIO--------------------
    var tituloRadio1 = xmlDoc.getElementsByTagName("title")[0].innerHTML;  
    var xpath = "//question[@id='1']/option";
    var nodesRadio1 = xmlDoc.evaluate(xpath, xmlDoc, null, XPathResult.ANY_TYPE, null);    
    datosRadio1(tituloRadio1, nodesRadio1);
    var nresr1 = xmlDoc.getElementById("1").getElementsByTagName('answer').length;
    for (i = 0; i < nresr1; i++) {
        respuestasRadio1[i] = xmlDoc.getElementById("1").getElementsByTagName("answer")[i].innerHTML;
    }
    //2-------------------------
    var tituloRadio2 = xmlDoc.getElementsByTagName("title")[5].innerHTML;
    var xpath = "//question[@id='6']/option";
    var nodesRadio2 = xmlDoc.evaluate(xpath, xmlDoc, null, XPathResult.ANY_TYPE, null);  
    datosRadio2(tituloRadio2, nodesRadio2);
    var nresr2 = xmlDoc.getElementById("6").getElementsByTagName('answer').length;
    for (i = 0; i < nresr2; i++) {
        respuestasRadio2[i] = xmlDoc.getElementById("6").getElementsByTagName("answer")[i].innerHTML;
    }

    //TEXTO--------------------
    var tituloText1 = xmlDoc.getElementsByTagName("title")[1].innerHTML;   
    datosText1(tituloText1);    
    respuestaText1 = String(xmlDoc.getElementsByTagName("answer")[1].innerHTML);   
    //2--------------------------
    var tituloText2 = xmlDoc.getElementsByTagName("title")[6].innerHTML;
    datosText2(tituloText2);
    respuestaText2 = String(xmlDoc.getElementsByTagName("answer")[7].innerHTML);

    //SELECT--------------------
    var tituloSelect1 = xmlDoc.getElementsByTagName("title")[3].innerHTML;  
    var xpath = "//question[@id='4']/option";   
    var nodesSelect1 = xmlDoc.evaluate(xpath, xmlDoc, null, XPathResult.ANY_TYPE, null);   
    datosSelect1(tituloSelect1, nodesSelect1);    
    respuestaSelect1 = parseInt(xmlDoc.getElementsByTagName("answer")[3].innerHTML);   
    //2-------------------------
    var tituloSelect2 = xmlDoc.getElementsByTagName("title")[8].innerHTML;
    var xpath = "//question[@id='9']/option"; 
    var nodesSelect2 = xmlDoc.evaluate(xpath, xmlDoc, null, XPathResult.ANY_TYPE, null);
    datosSelect2(tituloSelect2, nodesSelect2);
    respuestaSelect2 = parseInt(xmlDoc.getElementsByTagName("answer")[11].innerHTML);

    //MULTI--------------------
    var tituloMultiple1 = xmlDoc.getElementsByTagName("title")[4].innerHTML;  
    var xpath = "//question[@id='5']/option";   
    var nodesMulti1 = xmlDoc.evaluate(xpath, xmlDoc, null, XPathResult.ANY_TYPE, null);
    datosMultiple1(tituloMultiple1, nodesMulti1);
    var nresm1 = xmlDoc.getElementById("5").getElementsByTagName('answer').length;   
    for (i = 0; i < nresm1; i++) {
        respuestasMultiple1[i] = xmlDoc.getElementById("5").getElementsByTagName("answer")[i].innerHTML;
    }  
    //2---------------------------
    var tituloMultiple2 = xmlDoc.getElementsByTagName("title")[9].innerHTML;
    var xpath = "//question[@id='10']/option";   
    var nodesMulti2 = xmlDoc.evaluate(xpath, xmlDoc, null, XPathResult.ANY_TYPE, null);
    datosMultiple2(tituloMultiple2, nodesMulti2);
    var nresm2 = xmlDoc.getElementById("10").getElementsByTagName('answer').length;
    for (i = 0; i < nresm2; i++) {
        respuestasMultiple2[i] = xmlDoc.getElementById("10").getElementsByTagName("answer")[i].innerHTML;
    }

    //CHECKBOX--------------------
    var tituloCheckbox1 = xmlDoc.getElementsByTagName("title")[2].innerHTML;   
    var xpath = "//question[@id='3']/option";   
    var nodesCheck1 = xmlDoc.evaluate(xpath, xmlDoc, null, XPathResult.ANY_TYPE, null);
    datosCheckbox1(tituloCheckbox1, nodesCheck1);  
    var nresc1 = xmlDoc.getElementById("3").getElementsByTagName('answer').length;   
    for (i = 0; i < nresc1; i++) {
        respuestasCheckbox1[i] = xmlDoc.getElementById("3").getElementsByTagName("answer")[i].innerHTML;
    }   
    //2-------------------------
    var tituloCheckbox2 = xmlDoc.getElementsByTagName("title")[7].innerHTML;
    var xpath = "//question[@id='8']/option";   
    var nodesCheck2 = xmlDoc.evaluate(xpath, xmlDoc, null, XPathResult.ANY_TYPE, null);
    datosCheckbox2(tituloCheckbox2, nodesCheck2);
    var nresc2 = xmlDoc.getElementById("8").getElementsByTagName('answer').length;
    for (i = 0; i < nresc2; i++) {
        respuestasCheckbox2[i] = xmlDoc.getElementById("8").getElementsByTagName("answer")[i].innerHTML;
    }
}


//CORREGIR--------------------
function cRadio1() {
    var f = formElement;
    var escorrecta = [];
    for (i = 0; i < f.año.length; i++) {
        if (f.año[i].checked) {
            escorrecta[i] = false;
            for (j = 0; j < respuestasRadio1.length; j++) {
                if (i == respuestasRadio1[j])
                    escorrecta[i] = true;
            }

            if (escorrecta[i]) {
                nota += 1.0 / respuestasRadio1.length;
                mostrarResultado("Pregunta 1: ¡Correcta!");
            } else {
                nota -= 1.0 / respuestasRadio1.length;
                mostrarResultado("Pregunta 1: ¡Incorrecta!");
            }
        }
    }
}

function cRadio2() {
    var f = formElement;
    var escorrecta = [];
    for (i = 0; i < f.verbo.length; i++) {
        if (f.verbo[i].checked) {
            escorrecta[i] = false;
            for (j = 0; j < respuestasRadio2.length; j++) {
                if (i == respuestasRadio2[j])
                    escorrecta[i] = true;
            }

            if (escorrecta[i]) {
                nota += 1.0 / respuestasRadio2.length;
                mostrarResultado("Pregunta 6: ¡Correcta!");
            } else {
                nota -= 1.0 / respuestasRadio2.length;
                mostrarResultado("Pregunta 6: ¡Incorrecta!");
            }
        }
    }
}

function cText1() {
    var t = document.getElementById("text1").value;
    var s = t.toUpperCase();
    var res = respuestaText1.toUpperCase();
    if (s == res) {
        mostrarResultado("Pregunta 2: ¡Correcta!");
        nota += 1;
    } else {
        mostrarResultado("Pregunta 2: ¡Incorrecta!");
        nota -= 1;
    }
}

function cText2() {
    var t = document.getElementById("text2").value;
    var s = t.toUpperCase();
    var res = respuestaText2.toUpperCase();
    if (s == res) {
        mostrarResultado("Pregunta 7: ¡Correcta!");
        nota += 1;
    } else {
        mostrarResultado("Pregunta 7: ¡Incorrecta!");
        nota -= 1;
    }
}

function cSelect1() {
    var sel = formElement.elements[9];
    if (sel.selectedIndex - 1 == respuestaSelect1) {
        mostrarResultado("Pregunta 4: ¡Correcta!");
        nota += 1;
    } else
        mostrarResultado("Pregunta 4: ¡Incorrecta!");
}

function cSelect2() {
    var sel = formElement.elements[19];
    if (sel.selectedIndex - 1 == respuestaSelect2) {
        mostrarResultado("Pregunta 9: ¡Correcta!");
        nota += 1;
    } else
        mostrarResultado("Pregunta 9: ¡Incorrecta!");
}

function cCheckbox1() {
    var f = formElement;
    var escorrecta = [];
    for (i = 0; i < f.picos.length; i++) {
        if (f.picos[i].checked) {
            escorrecta[i] = false;
            for (j = 0; j < respuestasCheckbox1.length; j++) {
                if (i == respuestasCheckbox1[j])
                    escorrecta[i] = true;
            }

            if (escorrecta[i]) {
                nota += 1.0 / respuestasCheckbox1.length;
                mostrarResultado("Pregunta 3: " + i + " ¡Correcta!");
            } else {
                nota -= 1.0 / respuestasCheckbox1.length;
                mostrarResultado("Pregunta 3: " + i + " ¡Incorrecta!");
            }
        }
    }
}

function cCheckbox2() {
    var f = formElement;
    var escorrecta = [];
    for (i = 0; i < f.meses.length; i++) {
        if (f.meses[i].checked) {
            escorrecta[i] = false;
            for (j = 0; j < respuestasCheckbox2.length; j++) {
                if (i == respuestasCheckbox2[j])
                    escorrecta[i] = true;
            }

            if (escorrecta[i]) {
                nota += 1.0 / respuestasCheckbox2.length;
                mostrarResultado("Pregunta 8: " + i + " ¡Correcta!");
            } else {
                nota -= 1.0 / respuestasCheckbox2.length;
                mostrarResultado("Pregunta 8: " + i + " ¡Incorrecta!");
            }
        }
    }
}

function cMultiple1() {
    var mul = document.getElementsByClassName("opmult1");
    var escorrecta = [];
    for (i = 0; i < mul.length; i++) {
        if (mul[i].selected) {
            escorrecta[i] = false;
            for (j = 0; j < respuestasMultiple1.length; j++) {
                if (i == respuestasMultiple1[j])
                    escorrecta[i] = true;
            }

            if (escorrecta[i]) {
                nota += 1.0 / respuestasMultiple1.length;
                mostrarResultado("Pregunta 5:  ¡Correcta!");
            } else {
                nota -= 1.0 / respuestasMultiple1.length;
                mostrarResultado("Pregunta 5:  ¡Incorrecta!");
            }
        }
    }
}

function cMultiple2() {
    var mul = document.getElementsByClassName("opmult2");
    var escorrecta = [];
    for (i = 0; i < mul.length; i++) {
        if (mul[i].selected) {
            escorrecta[i] = false;
            for (j = 0; j < respuestasMultiple2.length; j++) {
                if (i == respuestasMultiple2[j])
                    escorrecta[i] = true;
            }

            if (escorrecta[i]) {
                nota += 1.0 / respuestasMultiple2.length;
                mostrarResultado("Pregunta 10:  ¡Correcta!");
            } else {
                nota -= 1.0 / respuestasMultiple2.length;
                mostrarResultado("Pregunta 10:  ¡Incorrecta!");
            }
        }
    }
}


// PONER DATOS EN HTML--------------------
function datosRadio1(t, nodes) {
    var radioContainer = document.getElementById('radioDiv1');
    document.getElementById('tituloRadio1').innerHTML = t;
    var result = nodes.iterateNext();
    i=0;
    while (result) {
        var input = document.createElement("input");
        var label = document.createElement("label");
        label.innerHTML = result.innerHTML;
        label.setAttribute("for", "respuesta_" + i);
        input.type = "radio";
        input.name = "año";
        input.id = "año_" + i;
        ;
        radioContainer.appendChild(input);
        radioContainer.appendChild(label);
        radioContainer.appendChild(document.createElement("br"));
        result = nodes.iterateNext();
    }
}

function datosRadio2(t, nodes) {
    var radioContainer = document.getElementById('radioDiv2');
    document.getElementById('tituloRadio2').innerHTML = t;
    var result = nodes.iterateNext();
    i=0;
    while (result) {
        var input = document.createElement("input");
        var label = document.createElement("label");
        label.innerHTML = result.innerHTML;
        label.setAttribute("for", "respuesta_" + i);
        input.type = "radio";
        input.name = "verbo";
        input.id = "verbo_" + i;
        ;
        radioContainer.appendChild(input);
        radioContainer.appendChild(label);
        radioContainer.appendChild(document.createElement("br"));
        result = nodes.iterateNext();
    }
}

function datosCheckbox1(t, nodes) {
    var checkboxContainer = document.getElementById('checkboxDiv1');
    document.getElementById('tituloCheckbox1').innerHTML = t;
    var result = nodes.iterateNext();
    i=0;
    while (result) {
        var input = document.createElement("input");
        var label = document.createElement("label");
        label.innerHTML = result.innerHTML;
        label.setAttribute("for", "picos_" + i);
        input.type = "checkbox";
        input.name = "picos";
        input.id = "picos_" + i;
        ;
        checkboxContainer.appendChild(input);
        checkboxContainer.appendChild(label);
        checkboxContainer.appendChild(document.createElement("br"));
        result = nodes.iterateNext();
    }
}

function datosCheckbox2(t, nodes) {
    var checkboxContainer = document.getElementById('checkboxDiv2');
    document.getElementById('tituloCheckbox2').innerHTML = t;
    var result = nodes.iterateNext();
    i=0;
    while (result) {
        var input = document.createElement("input");
        var label = document.createElement("label");
        label.innerHTML = result.innerHTML;
        label.setAttribute("for", "meses_" + i);
        input.type = "checkbox";
        input.name = "meses";
        input.id = "meses_" + i;
        ;
        checkboxContainer.appendChild(input);
        checkboxContainer.appendChild(label);
        checkboxContainer.appendChild(document.createElement("br"));
        result = nodes.iterateNext();
    }
}

function datosSelect1(t, nodes) {
    document.getElementById("tituloSelect1").innerHTML = t;
    var select = document.getElementById("select1");
    var result = nodes.iterateNext();
    i=0;
    while (result) {
        var option = document.createElement("option");
        option.text = result.innerHTML;
        option.value = i + 1;
        select.options.add(option);
        result = nodes.iterateNext();
    }
}

function datosSelect2(t, nodes) {
    document.getElementById("tituloSelect2").innerHTML = t;
    var select = document.getElementById("select2");
    var result = nodes.iterateNext();
    i=0;
    while (result) {
        var option = document.createElement("option");
        option.text = result.innerHTML;
        option.value = i + 1;
        select.options.add(option);
        result = nodes.iterateNext();
    }
}

function datosMultiple1(t, nodes) {
    document.getElementById("tituloMultiple1").innerHTML = t;
    var multiple = document.getElementById("multiple1");
    var result = nodes.iterateNext();
    i=0;
    while (result) {
        var option = document.createElement("option");
        option.text = result.innerHTML;
        option.value = i + 1;
        option.className = "opmult1";
        multiple.options.add(option);
        result = nodes.iterateNext();
    }
}

function datosMultiple2(t, nodes) {
    document.getElementById("tituloMultiple2").innerHTML = t;
    var multiple = document.getElementById("multiple2");
    var result = nodes.iterateNext();
    i=0;
    while (result) {
        var option = document.createElement("option");       
        option.text = result.innerHTML;
        option.value = i + 1;
        option.className = "opmult2";
        multiple.options.add(option);
        result = nodes.iterateNext();
    }
}

function datosText1(t) {
    document.getElementById("tituloText1").innerHTML = t;
}

function datosText2(t) {
    document.getElementById("tituloText2").innerHTML = t;
}


//MOSTRAR CORRECCION--------------------
function mostrarResultado(r) {
    var p = document.createElement("p");
    var node = document.createTextNode(r);
    p.appendChild(node);
    document.getElementById('resultados').appendChild(p);
    document.getElementById('resultados').style.display = "block";
}

function Nota() {
    if (nota > 5) {
        mostrarResultado("Nota: " + nota + " puntos sobre 10, ¡HAS APROBADO!");
    } else {
        mostrarResultado("Nota: " + nota + " puntos sobre 10, ¡LO SIENTO, HAS SUPENDIDO!");
    }
}

function inicializar() {
    document.getElementById('resultados').innerHTML = "";
    nota = 0.0;
}

//hacer que se introduzcan datos 
function comprobar() {
    var f = formElement;

    //1
    var checked = false;
    for (i = 0; i < f.año.length; i++) {
        if (f.año[i].checked)
            checked = true;
    }
    if (!checked) {
        document.getElementsByTagName("h3")[0].focus();
        alert("Rellena la pregunta 1");
        return false;
    }

    //2
    if (document.getElementById("text1").value == "") {
        f.elements[4].focus();
        alert("Rellena la pregunta 2");
        return false;
    }

    //3
    checked = false;
    for (i = 0; i < f.picos.length; i++) {
        if (f.picos[i].checked)
            checked = true;
    }
    if (!checked) {
        document.getElementsByTagName("h3")[2].focus();
        alert("Rellena la pregunta 3");
        return false;
    }

    //4
    if (f.elements[9].selectedIndex == 0) {
        f.elements[9].focus();
        alert("Rellena la pregunta 4");
        return false;
    }

    //5
    if (f.elements[10].selectedIndex == 0) {
        f.elements[10].focus();
        alert("Rellena la pregunta 5");
        return false;
    }

    //6
    checked = false;
    for (i = 0; i < f.verbo.length; i++) {
        if (f.verbo[i].checked)
            checked = true;
    }
    if (!checked) {
        document.getElementsByTagName("h3")[5].focus();
        alert("Rellena la pregunta 6");
        return false;
    }

    //7
    if (document.getElementById("text2").value == "") {
        f.elements[12].focus();
        alert("Rellena la pregunta 7");
        return false;
    }

    //8
    checked = false;
    for (i = 0; i < f.meses.length; i++) {
        if (f.meses[i].checked)
            checked = true;
    }
    if (!checked) {
        document.getElementsByTagName("h3")[7].focus();
        alert("Rellena la pregunta 8");
        return false;
    }

    //9
    if (f.elements[19].selectedIndex == 0) {
        f.elements[19].focus();
        alert("Rellena la pregunta 9");
        return false;
    }

    //10
    if (f.elements[20].selectedIndex == 0) {
        f.elements[20].focus();
        alert("Rellena la pregunta 10");
        return false;
    }
    return true;
}