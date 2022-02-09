/**
 * Created by Bohdan on Sep, 2021
 */

console.log('Client side javascript file is loaded!');

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('p#message-1');
const messageTwo = document.querySelector('p#message-2');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    messageOne.textContent = 'Loading...';
    messageTwo.textContent = '';

    fetch(`/weather?address=${search.value}`).then(res => {
        res.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error
                return
            }

            messageOne.textContent = `Location: ${data.location}`;
            messageTwo.textContent = `Forecast: ${data.forecast}`;
        })
    }).catch(err => {
        console.error(err);
    })
})
