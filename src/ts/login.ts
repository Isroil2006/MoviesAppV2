const emilinput = document.querySelector(".inputemil") as HTMLInputElement;
const paswordinput = document.querySelector(
  ".inputpasword"
) as HTMLInputElement;
const btn = document.querySelector(".loginbtn") as HTMLButtonElement;

btn.addEventListener("click", () => {
  const emailValue = emilinput.value;
  const passwordValue = paswordinput.value;
  console.log("Email:", emailValue);
  console.log("Password:", passwordValue);
});
