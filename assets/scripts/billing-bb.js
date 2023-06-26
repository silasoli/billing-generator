document.addEventListener("DOMContentLoaded", function () {
  minhaFuncao();
  fillBillingBBPage();
});

function minhaFuncao() {
  console.log("A página foi aberta!");
}


function fillBillingBBPage() {
  const checkboxes = window.document.getElementsByName("regimeTributario");
  const formValues = JSON.parse(localStorage.getItem("formValues"));

  for (const item of checkboxes) {
    if (item.value === formValues.taxRegimeCheck) {
      item.checked = true;
    }
  }
}