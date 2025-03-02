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
}
