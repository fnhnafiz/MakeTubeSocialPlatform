function mainTimes(time) {
  const hours = Math.floor(time / 3600);
  const min = Math.floor((time % 3600) / 60);
  const seconds = (time % 3600) % 60;
  return `${hours} Hours ${min} Minutes ${seconds} Seconds Ago`;
}
console.log(mainTimes(65456));
