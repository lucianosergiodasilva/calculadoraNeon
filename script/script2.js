const previousOperation = document.querySelector('#previous-operation')
const currentOperation = document.querySelector('#current-operation')
const numbers = document.querySelectorAll('.number')
const operators = document.querySelectorAll('.operator')
const btnLimpar = document.querySelector('[data-funcao="limpar"]')
const btnBackspace = document.querySelector('[data-funcao="backspace"]')
const btnIgual = document.querySelector('[data-funcao="igual"]')
const ponto = document.querySelector('.ponto')
const todosOsBotoes = document.querySelectorAll('button')

let operacao

const pegaClique = (target) => target.innerText

const mostraNaTela = (operacao) => {
    currentOperation.innerText = operacao
    let temPercentual = operacao.indexOf('%') !== -1

    const ultimoCaracter = operacao.slice(operacao.length - 1)
    const sinais = ['-', '+', '*', '/', '%']
    const constaSinal = sinais.find((sinal) => sinal === ultimoCaracter)

    if (constaSinal || operacao.length < 2) {  //O resultado não aparece se o último caracter for um sinal, e se a operação tiver apenas um caracter.
        previousOperation.innerText = ''

    } else {
        previousOperation.innerText = eval(operacao)
    }

    if (temPercentual) {
        operacao = operacao.replace('%', '')
        previousOperation.innerText = eval(operacao) / 100
    }
}

const limpar = () => {
    operacao = ''
    currentOperation.innerText = ''
    previousOperation.innerText = ''
}

const backspace = () => {
    if (operacao.length >= 0) {
        operacao = operacao.slice(0, -1)
        mostraNaTela(operacao)
    } else {
        limpar()
    }
}

numbers.forEach((number) => {
    number.addEventListener('click', ({ target }) => {

        if (operacao === undefined) {
            operacao = pegaClique(target)
            mostraNaTela(operacao)

        } else {
            operacao += pegaClique(target)
            mostraNaTela(operacao)
        }
    })
})

ponto.addEventListener('click', ({ target }) => {

    if (operacao === undefined) {
        operacao = pegaClique(target)
        mostraNaTela(operacao)

    } else {
        const ultimoCaracter = operacao.slice(operacao.length - 1)

        if (ultimoCaracter !== '.') {
            operacao += pegaClique(target)
            mostraNaTela(operacao)
        }
    }
})

operators.forEach((operator) => {
    operator.addEventListener('click', ({ target }) => {

        // Impede que o operador seja clicado mais de uma vez
        const ultimoCaracter = operacao.slice(operacao.length - 1)
        const sinais = ['-', '+', '*', '/', '%']
        const constaSinal = sinais.find((sinal) => sinal === ultimoCaracter)

        if (operacao === undefined || constaSinal) {
            return

        } else {
            operacao += pegaClique(target)
            mostraNaTela(operacao)
        }
    })
})

btnLimpar.addEventListener('click', limpar)

btnBackspace.addEventListener('click', operacao => backspace(operacao))

btnIgual.addEventListener('click', () => {
    currentOperation.innerText = previousOperation.innerText
    previousOperation.innerText = ''
})

todosOsBotoes.forEach((botao) => {
    botao.addEventListener('click', ({ target }) => {

        setTimeout(() => {
            botao.classList.add('animate__animated', 'animate__rubberBand')
            botao.classList.add('efeitoClique')

        }, 100)
        setTimeout(() => {
            botao.classList.remove('efeitoClique')

        }, 500)
    })
})

/*
RESOLVER:

    Implementar mais funcionalidades:
        
        - trocar os sinais de divisão, multiplicação e ponto
        - quando clicar no igual, a operação deve assumir o valor total.
*/




