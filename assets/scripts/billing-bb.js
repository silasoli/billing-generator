document.addEventListener("DOMContentLoaded", function () {
  fillBillingBBPage();
});

function fillBillingBBPage() {
  const formValues = JSON.parse(localStorage.getItem("formValues"));

  fillCNPJ(formValues);
  fillCorporateName(formValues);
  fillYield(formValues);
  fillLocationDate(formValues);
  fillCardPercentage(formValues);
  fillCheckPercentage(formValues);
  fillTicketPercentage(formValues);
  fillBillingTotal(formValues);
  fillTaxRegimeCheck(formValues);
  console.log(formValues);
}

function fillCNPJ(formValues) {
  const cnpj = formValues.cnpj;
  const inputCNPJ = document.getElementById("cnpj");
  inputCNPJ.value = cnpj;
}
function fillYield(formValues) {
  const yieldValue = formValues.yield;
  const inputYield = document.getElementById("prazoMedio");
  inputYield.value = yieldValue;
}

function fillCorporateName(formValues) {
  const corporateName = formValues["corporate-name"];
  const inputCorporateName = document.getElementById("empresa");
  inputCorporateName.value = corporateName;
}

function fillLocationDate(formValues) {
  const locationDate = formValues["location-date"];
  const inputLocationDate = document.getElementById("localdata");
  inputLocationDate.value = locationDate;
}

function fillCardPercentage(formValues) {
  const cardPercentage = formValues["card-percentage"];
  const inputCardPercentage = document.getElementById("cartao");
  inputCardPercentage.value = cardPercentage;
}

function fillCheckPercentage(formValues) {
  const checkPercentage = formValues["check-percentage"];
  const inputCheckPercentage = document.getElementById("cheque");
  inputCheckPercentage.value = checkPercentage;
}

function fillTicketPercentage(formValues) {
  const ticketPercentage = formValues["ticket-percentage"];
  const inputTicketPercentage = document.getElementById("boleto");
  inputTicketPercentage.value = ticketPercentage;
}

function fillBillingTotal(formValues) {
  const billingTotal = formValues["billing-total"];
  const inputBillingTotal = document.getElementById("faturamentoBruto");
  inputBillingTotal.value = formatCurrency(billingTotal);
}

function fillTaxRegimeCheck(formValues) {
  const checkboxes = window.document.getElementsByName("regimeTributario");

  for (const item of checkboxes) {
    if (item.value === formValues.taxRegimeCheck) {
      item.checked = true;
    }
  }
}

function formatCurrency(value) {
 const number = parseFloat(value);

 const formatedValue = number.toLocaleString("pt-BR", {
   style: "currency",
   currency: "BRL",
 });

 const valueWithoutSymbol = formatedValue.replace("R$", ""); 

 return valueWithoutSymbol;
}
