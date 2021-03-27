// 🔓
const correctComb = '1234'

// 🏢 DOM
const DOM_main = document.querySelector('#DOM_main')
const DOM_lockImg = document.querySelector('#DOM_lockImg')
const DOM_correctCombo = document.querySelector('#DOM_correctCombo')
const DOM_comboDigits = document.querySelectorAll('.DOM_comboDigit')

// 🏁 Start here
let comboInputArray = []
let comboInput = '';

// 🔉
const unlockSound = new Audio('/assets/unlock.wav')

// Show the correct the combo in DOM
DOM_correctCombo.innerHTML = correctComb;

// Get the combo digits
DOM_comboDigits.forEach((DOM_comboDigit, index) => {
    // On inputting, check if it's a number, if so keep and switch to next input, otherwise empty the value
    DOM_comboDigit.addEventListener('input', e => {
        if (!isNaN(e.target.value) && e.target.value !== '') {
            if (index < DOM_comboDigits.length - 1) DOM_comboDigits[index + 1].focus()
            else {
                DOM_comboDigits.forEach(DCD => comboInputArray.push(DCD.value))
                comboInput = comboInputArray.join('')
                if (comboInput === correctComb) {
                    e.target.blur()
                    DOM_comboDigits.forEach(DCD => DCD.setAttribute('disabled', true))
                    DOM_lockImg.classList.add('right')
                    setTimeout(() => {
                        DOM_lockImg.setAttribute('src', 'assets/unlock-fill.svg')
                        unlockSound.play()
                    }, 500);
                } else {
                    DOM_lockImg.classList.add('wrong')
                    setTimeout(() => {
                        DOM_lockImg.classList.remove('wrong')
                    }, 150);
                    DOM_comboDigits.forEach(DCD => DCD.value = '')
                    DOM_comboDigits[0].focus()
                    comboInputArray = []
                    comboInput = ''
                }
            }
        }
        else e.target.value = ''
    })

    DOM_comboDigit.addEventListener('keyup', e => {
        if (e.code === 'Backspace' && index > 0) {
            DOM_comboDigits[index - 1].focus()
            DOM_comboDigits[index - 1].select()
        }
    })

})