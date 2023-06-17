const sendFormButton = document.getElementById("send-form");
sendFormButton.addEventListener("click", handleSubmit);
const form = document.getElementById("form-amouts");

function handleSubmit(event) {
  event.preventDefault();
  const formData = new FormData(form);
  let formValues = {};

  for (const pair of formData.entries()) {
    formValues[pair[0]] = pair[1];
  }

  formValues = formatForm(formValues);

  const validate = validateform(formValues);
  if (validate) console.log(validate);

  const months = generateMonthsOfInterval(
    formValues["initial-interval"],
    formValues["final-interval"]
  );

  const card = generateValues(
    formValues["billing-total"],
    formValues["card-percentage"],
    months.length
  );

  const checkTicket = generateValues(
    formValues["billing-total"],
    formValues["check-percentage"] + formValues["ticket-percentage"],
    months.length
  );

  console.log(card, checkTicket);

  const sumCard = card.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0
  );

  const sumCheckTicket = checkTicket.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0
  );

  openBillingBBPage(); 
  
  console.log(sumCard, sumCheckTicket);  
}

function openBillingBBPage() {
  const url = "billing-bb.html";
  window.open(url, "_blank"); 
}

function generateValues(totalValue, percentage, numMonths) {
  const percentageValue = (totalValue * percentage) / 100;
  const averageValue = percentageValue / numMonths;
  const values = [];

  for (let i = 0; i < numMonths; i++) {
    const randomValue =
      ((Math.random() * numMonths) / 9 + percentage / 100) * averageValue;
    values.push(Math.round(randomValue * 100) / 100);
  }

  const sumValues = values.reduce((a, b) => a + b, 0);
  const adjustment = (percentageValue - sumValues) / numMonths;

  for (let i = 0; i < numMonths; i++) {
    values[i] += adjustment;
  }

  return values;
}

function formatForm(form) {
  form["initial-interval"] = formatToEnglishDate(form["initial-interval"]);
  form["final-interval"] = formatToEnglishDate(form["final-interval"]);

  form["card-percentage"] = Number(form["card-percentage"]);
  form["check-percentage"] = Number(form["check-percentage"]);
  form["ticket-percentage"] = Number(form["ticket-percentage"]);

  form["billing-total"] = removeCurrencyFormat(form["billing-total"]);

  return form;
}

function formatToEnglishDate(date) {
  const parts = date.split("/");
  const month = parseInt(parts[0]);
  const year = parseInt(parts[1]);

  const newDate = new Date(year, month - 1, 1);

  const englishFormat = newDate.toISOString().split("T")[0];

  return englishFormat;
}

function validateform(form) {
  const initialDate = form["initial-interval"];
  const finalDate = form["final-interval"];

  const cardPercentage = form["card-percentage"];
  const checkPercentage = form["check-percentage"];
  const ticketPercentage = form["ticket-percentage"];
  const percentagesAmount = cardPercentage + checkPercentage + ticketPercentage;

  if (!initialDate || !finalDate) return "Preencha a data Inicial e Final";

  if (!initialDate < finalDate)
    return "A data inicial deve ser anterior a data final";

  if (percentagesAmount > 100 || percentagesAmount < 100)
    return "As porcetagens devem chegar ao valor de 100%";

  return null;
}

function removeCurrencyFormat(value) {
  const valueWithoutThousands = value.replace(/\./g, "");
  const valueEnglishFormat = valueWithoutThousands.replace(",", ".");
  return valueEnglishFormat;
}

function generateMonthsOfInterval(initialInterval, finalInterval) {
  const result = [];

  initialInterval = initialInterval.split("-");
  finalInterval = finalInterval.split("-");

  const initialMonth = parseInt(initialInterval[1]);
  const initialYear = parseInt(initialInterval[0]);
  const finalMonth = parseInt(finalInterval[1]);
  const finalYear = parseInt(finalInterval[0]);

  const currentDate = new Date(initialYear, initialMonth - 1, 1);
  const endDate = new Date(finalYear, finalMonth - 1, 1);

  while (currentDate <= endDate) {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;

    result.push(("0" + month).slice(-2) + "/" + year);

    currentDate.setMonth(currentDate.getMonth() + 1);
  }

  return result;
}
