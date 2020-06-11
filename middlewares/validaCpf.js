const validaCpf = (value) => {
    let soma = 0;
    let resto = 0;

    if (value == "111.111.11-11") {
        return false;
    }

    for (i=1; i<=9; i++) {
        soma += parseInt(value.substring(i - 1, i)) * (11 - i);
    }

    resto = (soma * 10) % 11;

    if ((resto == 10) || (resto == 11)) {
        resto = 0;
    }

    if (resto != parseInt(value.substring(9, 10))) {
        return false;
    }

    soma = 0;
    for (i=1; i<=10; i++) {
        soma += parseInt(value.substring(i - 1, i)) * (12 - i);
    }
    resto = (soma * 10) % 11;

    if ((resto == 10) || (resto == 11)) {
        resto = 0;
    }

    if (resto != parseInt(value.substring(9, 10))) {
        return false;
    }

    return true;
};

module.exports = validaCpf;