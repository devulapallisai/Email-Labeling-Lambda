let iframe = document.getElementById("iframeit");
let submitit = document.getElementById("submitit");
let yesornot = document.getElementById("yesornot");
submitit.addEventListener("click", () => {
  console.log("clicked");
  if (yesornot.checked) {
    iframe.innerHTML = `<iframe
    src="https://script.google.com/a/macros/iith.ac.in/s/AKfycbw1b__MpyLukEcROCHG3DEVgNOXZzIkFgiYWbQAyz0KU6V6fZQnUka-UGljVYpSlQ0Okg/exec?readData=true"
    frameborder="0"
    width="450px"
  ></iframe>`;
  } else
    iframe.innerHTML = `<iframe
  src="https://script.google.com/a/macros/iith.ac.in/s/AKfycbw1b__MpyLukEcROCHG3DEVgNOXZzIkFgiYWbQAyz0KU6V6fZQnUka-UGljVYpSlQ0Okg/exec"
  frameborder="0"
  width="450px"
></iframe>`;
});
