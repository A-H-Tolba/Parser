var scanned;
var tokenValue = [];
var tokenType = [];
var nodes = [{container: "#Parser", hideRootNode: true}, {}];
var n = 1;
const input = document.querySelector("#ip");
input.addEventListener('change', function(e)
{
    var file = new FileReader();
    file.onload = function()
    {
        var s = 0;
        scanned = file.result.replace(/\s+/,'');
        while(scanned.indexOf('\n') > 0)
        {
            if (scanned[s] === ",") {tokenValue.push(scanned.slice(0, s)); tokenType.push(scanned.slice(s+1, scanned.indexOf('\n'))); scanned = scanned.slice(scanned.indexOf('\n')+1); s = 0;}
            s++;
        }
        tokenValue.push(scanned.slice(0, scanned.indexOf(',')));
        tokenType.push(scanned.slice(scanned.indexOf(',')+1, scanned.length));
        for(var i = 0; i < tokenValue.length; i++)
        {
            tokenValue[i] = tokenValue[i].replace(/\s/g, '');
            tokenType[i] = tokenType[i].replace(/\s/g, '');
        }
        program();
    }
    file.readAsText(input.files[0]);
},false)


//tokenValue and tokenType are the variables representing the value and the type of the token you will probably read them from the input file and change their value after every 
//getToken() call (This is just a hint, do whatever you think is the best)

//program->stmtSeq
function program() {
    //This is the function to be called in the main function once you are ready to start ( you will probably need to do some stuff like tokens manipulation before calling it)
    stmtSeq();
}
//stmtSeq->stmt{;stmt}
function stmtSeq() {
    stmt();
    while (tokenValue[0] == ';') {
        match(';');
        n = 1;
        stmt();
    }
}
//statement(stmt)->ifStmt | repeatStmt | assignStmt | readStmt | writeStmt
function stmt() {
    switch (tokenValue[0]) {
        //ifStmt 
        case "if":
            ifStmt();
            break;
        //repeatStmt
        case "repeat":
            repeatStmt();
            break;
        //readStmt
        case "read":
            readStmt();
            break;
        //writeStmt
        case "write":
            writeStmt();
            break;
        default:
            assignStmt();
            break;
    }
}
//ifStmt->if exp then stmtSeq [else stmtSeq] end
function ifStmt() {
    match("if");
    exp();
    match("then");
    stmtSeq();
    if (tokenValue[0] == "else") {
        match("else");
        stmtSeq();
    }
    match("end");
}
//repeatStmt->repeat stmtSeq until exp
function repeatStmt() {
    match("repeat");
    stmtSeq();
    match("until");
    exp();
}
//assignStmt->identifier := exp
function assignStmt() {
    match("identifier");
    match(":=");
    exp();
}
//readStmt->read identifier
function readStmt() {
    match("read");
    match("identifier");
}
//writeStmt->write exp
function writeStmt() {
    match("write");
    exp();
}
//exp->simpleExp { comparison-op simpleExp }
function exp() {
    simpleExp();
    while (tokenValue[0] == "=" || tokenValue[0] == "<") {
        compOp();
        simpleExp();
    }
}
//compOp-> < | =
function compOp() {
    switch (tokenValue[0]) {
        case "<":
            match("<");
            break;
        case "=":
            match("=");
            break;
    }
}
//simpleExp->term { addOp term }
function simpleExp() {
    term();
    while (tokenValue[0] == "+" || tokenValue[0] == "-") {
        addOp();
        term();
    }
}
//addOp-> + | -
function addOp() {
    switch (tokenValue[0]) {
        case "+":
            match("+");
            break;
        case "-":
            match("-");
            break;
    }
}
//term->factor { mulOp factor }
function term() {
    factor();
    while (tokenValue[0] == "*" || tokenValue[0] == "/") {
        mulOp();
        factor();
    }
}
//mulOp-> * | /
function mulOp() {
    switch (tokenValue[0]) {
        case "*":
            match("*");
            break;
        case "/":
            match("/");
            break;
    }
}
//factor->(exp) | number | identifier
function factor() {
    if(tokenValue[0] == "(") {
       match("(");
       exp();
       match(")");
    }
    else if (tokenType[0] == "identifier") {
        match("identifier");
    }
    else if (tokenType[0] == "number") {
        match("number");
    }
}

function match(expectedToken){
    //compare the tokenType
    if (expectedToken == "identifier" || expectedToken == "number") {
        if (tokenType[0]===expectedToken)
            getToken();
        else
            errorMsg();
    }
    //compare the tokenValue
    else {
        if (tokenValue[0]===expectedToken)
            getToken();
        else
            errorMsg();
    }
    
}

function getToken() {
    //This function should insert the token in its rightful place in the diagram
    if (tokenValue[0] != ";" && tokenValue[0] != "end")
    {
        nodes.push({parent: nodes[n], text : { name : tokenValue[0] }});
        n++;
    }
    tokenValue.shift();
    tokenType.shift();
    if(!tokenValue.length) 
    {
        document.getElementsByTagName("BODY")[0].innerHTML = '<div class="chart" id="Parser"></div>';
        new Treant(nodes);
    }

}

function errorMsg() {
    //This function should say that there's an error.
    console.log("error flag");
}