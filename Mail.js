let iframe = document.getElementById("iframeit");
let submitit = document.getElementById("submitit");
let yesornot = document.getElementById("yesornot");
submitit.addEventListener("click", () => {
  console.log("clicked");
  if (yesornot.checked) {
    iframe.innerHTML = `<iframe
    src="https://script.google.com/macros/s/AKfycby-dovV1srzdkp2gW-geaQZI0zJ2Wi0KPqtHdR3OLcQUCvx7UX_5ohqX5Tj8_0IgfZc/exec?readData=true"
    frameborder="0"
    width="450px"
  ></iframe>`;
  } else
    iframe.innerHTML = `<iframe
  src="https://script.google.com/macros/s/AKfycby-dovV1srzdkp2gW-geaQZI0zJ2Wi0KPqtHdR3OLcQUCvx7UX_5ohqX5Tj8_0IgfZc/exec"
  frameborder="0"
  width="450px"
></iframe>`;
});
