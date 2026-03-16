function selectOrderType(type) {
    console.log("Selected:", type);
    
    // Buscamos el modal por su ID
    var modal = document.getElementById('order-modal');
    
    if (modal) {
        // Esto lo quita por completo de la vista
        modal.style.display = 'none';
        modal.style.visibility = 'hidden';
        modal.style.opacity = '0';
    } else {
        console.error("No encontré el elemento con ID 'order-modal'");
    }
}



const mexican = 7.21;
const thai = 11.62;
const stroganoff = 12.54;
const montes = 9.92;
const pita = 10.32;
const salad = 15.10;
const vanilla = 5.51;
const chocolate = 5.14;
const waffle = 5.51;
const raspberry = 3.48;
const mango = 3.48;
const mint = 2.89;

window.addEventListener("load", setupForm);

function setupForm() {
    // List of all your IDs
    const ids = ["mexicanSoup", "thaiChickenCrepe", "stroganoffCrepe", "crepeMontesDeMaria", "pitaInTheForest", "valparaisoSalad", "vanillaHotChocolateCup", "chocolateFondueCrepe", "waffleWithBerries", "raspberryJuice", "mangoBicheLemonade", "mintLemonade"];

    ids.forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            element.value = 0;
            element.onchange = getEstimate;
        }
    });
    getEstimate();
}

// Function for the Modal buttons
function selectOrderType(type) {
    document.getElementById('order-modal').style.display = 'none';
    console.log("Order type selected: " + type);
}

// Function for the + and - buttons
function changeQty(id, amount) {
    let input = document.getElementById(id);
    let newValue = parseInt(input.value) + amount;
    if (newValue >= 0) {
        input.value = newValue;
        getEstimate(); // This triggers the calculation
    }
}

function getEstimate() {
    let totalCost = 0;
    const TAX_RATE = 0.13;

    // We use Number() to ensure these are treated as numbers
    totalCost += Number(document.getElementById("mexicanSoup").value) * mexican;
    totalCost += Number(document.getElementById("thaiChickenCrepe").value) * thai;
    totalCost += Number(document.getElementById("stroganoffCrepe").value) * stroganoff;
    totalCost += Number(document.getElementById("crepeMontesDeMaria").value) * montes;
    totalCost += Number(document.getElementById("pitaInTheForest").value) * pita;
    totalCost += Number(document.getElementById("valparaisoSalad").value) * salad;
    totalCost += Number(document.getElementById("vanillaHotChocolateCup").value) * vanilla;
    totalCost += Number(document.getElementById("chocolateFondueCrepe").value) * chocolate;
    totalCost += Number(document.getElementById("waffleWithBerries").value) * waffle;
    totalCost += Number(document.getElementById("raspberryJuice").value) * raspberry;
    totalCost += Number(document.getElementById("mangoBicheLemonade").value) * mango;
    totalCost += Number(document.getElementById("mintLemonade").value) * mint;

    let taxAmount = totalCost * TAX_RATE;
    let finalTotal = totalCost + taxAmount;

    // Display values in your footer IDs
    document.getElementById("subtotal").innerHTML = "Subtotal: $" + totalCost.toFixed(2);
    document.getElementById("tax").innerHTML = "Tax (13%): $" + taxAmount.toFixed(2);
    document.getElementById("estimate").innerHTML = "Total: $" + finalTotal.toFixed(2);
}