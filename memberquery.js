"use strict";
/* JavaScript
   Web Development - COMP125
   Crepes & Waffles — Member Registration
   Author: Karen Lorena Castiblanco Rojas
   Date: 2026
   Filename: memberquery.js
*/

// ── 1a. QUERY STRING ────────────────────────────────────────────
// Retrieve the text of the query string
let qString = location.search.slice(1);

// Replace the encoded "+" characters with a space
qString = qString.replace(/\+/g, " ");

// Decode all other encoded characters (e.g. %40 → @)
qString = decodeURIComponent(qString);

// Split the fieldname pairs into separate array items
let formData = qString.split(/&/g);

for (let items of formData) {
    // Extract the field names and values
    let fieldValuePair = items.split(/=/);
    let fieldName  = fieldValuePair[0];
    let fieldValue = fieldValuePair[1];

    // Skip empty pairs (happens when there is no query string yet)
    if (!fieldName) continue;

    // Create a label containing the field name
    let fieldLabel = document.createElement("label");
    fieldLabel.textContent = fieldName;
    document.getElementById("contactInfo").appendChild(fieldLabel);

    // Create a disabled input box with the field value
    let inputBox = document.createElement("input");
    inputBox.id       = fieldName;
    inputBox.name     = fieldName;
    inputBox.value    = fieldValue;
    inputBox.readOnly = true; 
    document.getElementById("contactInfo").appendChild(inputBox);
}

console.log(qString);

// ── 1b & 1c. COOKIES + LOCAL STORAGE ───────────────────────────
document.getElementById("signupBtn").onclick = function () {
    // Target the inputs specifically inside the contactInfo div
    let formFields = document.querySelectorAll("#contactInfo input");

    for (let field of formFields) {
        // Use the 'name' attribute we assigned during the loop above
        if (field.name) {
            localStorage.setItem(field.name, field.value);
            writeCookie(field.name, field.value);
        }
    }

    // Redirect to the confirmation page
    window.location.href = "memberconfirm.html";
};

// ── COOKIE HELPERS ──────────────────────────────────────────────
function writeCookie(name, value, expDate, path, domain, secure) {
    if (name && value) {
        let cStr = name + "=" + encodeURIComponent(value);
        if (expDate) cStr += ";expires=" + expDate.toUTCString();
        if (path)    cStr += ";path="    + path;
        if (domain)  cStr += ";domain="  + domain;
        if (secure)  cStr += ";secure";
        document.cookie = cStr;
    }
}

function readCookie() {
    let fields = {};
    if (document.cookie) {
        let cookieList = document.cookie.split("; ");
        for (let items of cookieList) {
            let cookie = items.split("=");
            let name   = cookie[0];
            let value  = decodeURIComponent(cookie[1]);
            fields[name] = value;
        }
        return fields;
    }
}

// Function to send data from the URL back to the main form
function repopulateForm() {
    let params = new URLSearchParams(window.location.search);
    
    // List all your form field IDs
    const fields = ["firstName", "lastName", "address", "city", "postalCode", 
                    "province", "age", "email", "password", "confirmPassword"];

    fields.forEach(field => {
        let value = params.get(field);
        if (value) {
            // Find the input in the main form and set its value
            let mainInput = document.querySelector(`#registrationForm #${field}`);
            if (mainInput) {
                mainInput.value = value;
            }
        }
    });
}

// Run this as soon as the page loads if there is a query string
if (window.location.search) {
    repopulateForm();
}


