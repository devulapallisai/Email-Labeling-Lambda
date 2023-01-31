let iframe = document.getElementById("iframeit");
let submitit = document.getElementById("submitit");
let yesornot = document.getElementById("yesornot");
submitit.addEventListener("click", () => {
  console.log("clicked");
  if (yesornot.checked) {
    iframe.innerHTML = `<iframe
    src="https://script.google.com/a/macros/iith.ac.in/s/AKfycbxIuPzn1pVrfv0l2EXUedT4FI4kzZYVL4UspuHMI9fmI3t2BpORxGp7sf371hQmK6ayCQ/exec?readData=true"
    frameborder="0"
    width="450px"
  ></iframe>`;
  } else
    iframe.innerHTML = `<iframe
  src="https://script.google.com/a/macros/iith.ac.in/s/AKfycbxIuPzn1pVrfv0l2EXUedT4FI4kzZYVL4UspuHMI9fmI3t2BpORxGp7sf371hQmK6ayCQ/exec"
  frameborder="0"
  width="450px"
></iframe>`;
});
