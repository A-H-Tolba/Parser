//tokenValue and tokenType are the variables representing the value and the type of the token you will probably read them from the input file and change their value after every 
//getToken() call (This is just a hint, do whatever you think is the best)
var tokenValue, tokenType;

//program->stmtSeq
function program() {
    //This is the function to be called in the main function once you are ready to start ( you will probably need to do some stuff like tokens manipulation before calling it)
    stmtSeq();
}
//stmtSeq->stmt{;stmt}
function stmtSeq() {
    stmt();
    while (tokenValue == ';') {
        match(';');
        stmt();
    }
}
//statement(stmt)->ifStmt | repeatStmt | assignStmt | readStmt | writeStmt
function stmt() {
    switch (tokenType) {
        //ifStmt 
        case "if":
            ifStmt();
            break;
        //repeatStmt
        case "repeat":
            repeatStmt();
            break;
        //assignStmt
        case "identifier":
            assignStmt();
            break;
        //readStmt
        case "read":
            readStmt();
            break;
        //writeStmt
        case "write":
            writeStmt();
            break;
    }
}
//ifStmt->if exp then stmtSeq [else stmtSeq] end
function ifStmt() {
    match("if");
    exp();
    match("then");
    stmtSeq();
    if (tokenValue == "else") {
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
    while (tokenValue == "=" || tokenValue == "<") {
        compOp();
        simpleExp();
    }
}
//compOp-> < | =
function compOp() {
    switch (tokenValue) {
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
    while (tokenValue == "+" || tokenValue == "-") {
        addOp();
        term();
    }
}
//addOp-> + | -
function addOp() {
    switch (tokenValue) {
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
    while (tokenValue == "*" || tokenValue == "/") {
        mulOp();
        factor();
    }
}
//mulOp-> * | /
function mulOp() {
    switch (tokenValue) {
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
    if(tokenValue == "(") {
       match("(");
       exp();
       match(")");
    }
    else if (tokenType == "identifier") {
        match("identifier");
    }
    else if (tokenType == "number") {
        match("number");
    }
}

function match(expectedToken){
    //compare the tokenType
    if (expectedToken == "identifier" || expectedToken == "number") {
        if (tokenType.equals(expectedToken))
            getToken();
        else
            errorMsg();
    }
    //compare the tokenValue
    else {
        if (tokenValue.equals(expectedToken))
            getToken();
        else
            errorMsg();
    }
    
}

function getToken() {
    //This function should insert the token in its rightful place in the diagram
}

function errorMsg() {
    //This function should say that there's an error.
}