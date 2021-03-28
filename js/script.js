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
    DOM_comboDigit.addEventListener('input', e => {
        // On input, check if it's a number, if so keep and switch to next input, otherwise empty the value
        if (!isNaN(e.target.value)
            && e.target.value.trim() !== '' // fallback for backspace
        ) {
            // Applies to all digits except the last one
            if (index < DOM_comboDigits.length - 1) DOM_comboDigits[index + 1].focus()
            // If it's the last one, submit the input instead
            else {
                // Merge all inputs into one, easier to compare two strings than to compare two arrays. No point of storing the combo in the backend as an array. If you want to compare two arrays instead: https://www.30secondsofcode.org/blog/s/javascript-array-comparison
                DOM_comboDigits.forEach(DCD => comboInputArray.push(DCD.value))
                comboInput = comboInputArray.join('')
                if (comboInput === correctComb) {
                    e.target.blur() // Fallback to prevent input focus
                    DOM_comboDigits.forEach(DCD => DCD.setAttribute('disabled', true)) // Disable all
                    DOM_lockImg.classList.add('right') // Animate the lock
                    setTimeout(() => { // Replace the image in the MIDDLE of the animation (1000ms)
                        DOM_lockImg.setAttribute('src', 'assets/unlock-fill.svg') 
                        unlockSound.play()
                    }, 500);
                } else {
                    DOM_lockImg.classList.add('wrong') // Animate the lock
                    setTimeout(() => {
                        DOM_lockImg.classList.remove('wrong') // Remove the animation so that it can be used again
                    }, 150);
                    DOM_comboDigits.forEach(DCD => DCD.value = '') // Empty all
                    DOM_comboDigits[0].focus() // Go back to the begining
                    // Restart the input variables
                    comboInputArray = [] 
                    comboInput = ''
                }
            }
        }
        else e.target.value = ''
    })
    // For backspace, go back and select the text of the previous input
    DOM_comboDigit.addEventListener('keyup', e => {
        if (e.code === 'Backspace' && index > 0) {
            DOM_comboDigits[index - 1].focus()
            DOM_comboDigits[index - 1].select()
        }
    })

})