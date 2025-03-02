/* eslint-disable linebreak-style */
// eslint-disable-next-line linebreak-style
// Create search field
export default function (block) {
  function displayTime() {
    const now = new Date();
    const timeString = now.toLocaleString('en-AU', { timeZone: 'Australia/Sydney' });
    let timeDiv1 = document.getElementById('time1');
    if (!timeDiv1) {
      timeDiv1 = document.createElement('div');
      timeDiv1.id = 'time1';
      block.appendChild(timeDiv1);
    }
    timeDiv1.textContent = `Current AU time: ${timeString}`;

    const timeString2 = now.toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
    let timeDiv2 = document.getElementById('time2');
    if (!timeDiv2) {
      timeDiv2 = document.createElement('div');
      timeDiv2.id = 'time2';
      block.appendChild(timeDiv2);
    }
    timeDiv2.textContent = `Current IN time: ${timeString2}`;
  }
  setInterval(displayTime, 1000);

  function generateRandomColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  }
  function generateRandomTaskDiv() {
    const button = document.createElement('button');
    button.textContent = 'Get Random Task';
    button.style.background = 'linear-gradient(to right, #ff7e5f, #feb47b)';
    button.style.border = 'none';
    button.style.color = 'white';
    button.style.padding = '10px 20px';
    button.style.textAlign = 'center';
    button.style.textDecoration = 'none';
    button.style.display = 'inline-block';
    button.style.fontSize = '16px';
    button.style.margin = '4px 2px';
    button.style.cursor = 'pointer';
    button.style.transition = 'background 0.3s ease';

    button.onmouseover = () => {
      button.style.background = 'linear-gradient(to right, #feb47b, #ff7e5f)';
    };

    button.onmouseout = () => {
      button.style.background = 'linear-gradient(to right, #ff7e5f, #feb47b)';
    };
    block.appendChild(button);
    button.onclick = () => {
      button.style.backgroundColor = generateRandomColor(); // Change the color to the random color
      fetch('https://bored.api.lewagon.com/api/activity/')
        .then((response) => {
          const res = response.json();
          return res;
        })
        .then((data) => {
          console.log(data);
          let resultDiv = document.getElementById('result');
          if (!resultDiv) {
            resultDiv = document.createElement('div');
            resultDiv.id = 'result';
            button.after(resultDiv);
          }
          resultDiv.style.backgroundColor = generateRandomColor();
          resultDiv.textContent = data.activity;
          button.after(resultDiv);
        })
        .catch((error) => console.error('Error fetching activity:', error));
    };
  }
  generateRandomTaskDiv();
}
