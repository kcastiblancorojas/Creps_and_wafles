let weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];


window.addEventListener("load", addWeekDays);
function addWeekDays() 
{
    let i = 0;
    let headingCells = document.getElementsByTagName("th");
    while (i < 7)
    {
        headingCells[i].innerHTML = weekDays[i];
        i++;
    }
}

let orderPlacement = ["2025-12-28", "2025-12-30", "2025-12-31", "2026-1-1", "2026-1-3",
                 "2026-1-4", "2026-1-6", "2026-1-8", "2026-1-9", "2026-1-10",
                 "2026-1-11", "2026-1-12", "2026-1-14", "2026-1-16", "2026-1-17",
                 "2026-1-18", "2026-1-20", "2026-1-22", "2026-1-24",
                 "2026-1-25", "2026-1-28", "2026-1-30", "2026-1-31"];


let foodMeal= ["Valparaiso Salad", "Mango Biche Lemonade", "Thai Chicken Crepe", "Mexican Chicken Soup",
                     "Crepe Montes de Maria", "Valparaiso Salad", "Waffle with Berries ", "Mint Lemonade", "Mexican Chicken Soup",
                     "Stroganoff Crepe", "Pita in the Forest", "Vanilla Hot Chocolate Cup", "Raspberry Juice", "Chocolate Fondue Crepe",
                     "Mango Biche Lemonade", "Crepe Montes de Maria", "Mint Lemonade", "Thai Chicken Crepe", "Mexican Chicken Soup",
                     "Pita in the Forest", "Stroganoff Crepe", "Valparaiso Salad", "Raspberry Juice"];

let customerName = ["Felipe Joya", "Michael Jordan", "Jazmin Rojas", "Stiven Gomez", "Nicolas Lopez",
                 "Rafael Garcia", "Karyme Sierra", "Angie Castiblanco", "Laura Losada", "Lizeth Guavita",
                 "Dylan Mayorga", "Martin Reyes", "Jennifer Pedraza", "Beatriz Pinzon", "Carlos Ramirez",
                 "Karen Romero", "Camilo Rodriguez", "Rebeca Suarez", "Luis Martinez",
                 "Sergio Salazar", "Mauricio Castro", "Andrea Villalba", "Juan Perez"];


let WhereToEat =    ["I", "O", "O", "O", "O", "I", "O", "I", "I", "O", "I", "I", "I", "O", 
                      "I", "O", "O", "I", "O", "I", "I", "I", "O"];

window.addEventListener("load", showOrders);

function showOrders() 
{
    for (let i = 0; i < orderPlacement.length; i++) {

        let orderInfo = "";

        
        switch (WhereToEat[i]) {
            case "I":
                orderInfo += "<p class='dine_in'>";
                break;
            case "O":
                orderInfo += "<p class='dine_out'>";
                break;
            
        }

        orderInfo += customerName[i] + ": " + foodMeal[i] + " - ";

     
        if (foodMeal[i] === "Mexican Chicken Soup") 
  {
            orderInfo += "$7.21 ";
        } 
        else if (foodMeal[i] === "Thai Chicken Crepe") 
        {
            orderInfo += "$11.62 ";
        }
        else if (foodMeal[i] === "Stroganoff Crepe") 
        {
            orderInfo += "$12.54 ";
        }
        else if (foodMeal[i] === "Crepe Montes de Maria") 
        {
            orderInfo += "$9.92 ";
        }
        else if (foodMeal[i] === "Pita in the Forest") 
        {
            orderInfo += "$10.32 ";
        }
        else if (foodMeal[i] === "Valparaiso Salad") 
        {
            orderInfo += "$15.10 ";
        }
        else if (foodMeal[i] === "Vanilla Hot Chocolate Cup") 
        {
            orderInfo += "$5.51 ";
        }
        else if (foodMeal[i] === "Chocolate Fondue Crepe") 
        {
            orderInfo += "$5.14 ";
        }
        else if (foodMeal[i] === "Waffle with Berries") 
        {
            orderInfo += "$3.48 ";
        }
        else if (foodMeal[i] === "Raspberry Juice") 
        {
            orderInfo += "$3.48 ";
        }
        else if (foodMeal[i] === "Mango Biche Lemonade") 
        {
            orderInfo += "$3.48 ";
        }
        else if (foodMeal[i] === "Mint Lemonade") 
        {
            orderInfo += "$2.89 ";
        }
    

            
        orderInfo += "</p>";
 
        let tableCell = document.getElementById(orderPlacement[i]);
        tableCell.insertAdjacentHTML("beforeEnd", orderInfo);
    }
}




                      
                      
                      
                      