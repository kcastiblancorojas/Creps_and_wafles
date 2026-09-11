function validateForm(event) {
  
    event.preventDefault();

    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const address = document.getElementById('address').value;
    const city = document.getElementById('city').value;
    const postalCode = document.getElementById('postalCode').value.toUpperCase();
    const province = document.getElementById('province').value.toUpperCase();
    const age = document.getElementById('age').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const email = document.getElementById('email').value;

   
    if (!firstName || !lastName || !address || !city || !postalCode || !province || !age || !password || !confirmPassword || !email) {
        alert('Please fill in all fields.');
        return false;
    }


    const postalFormat = /^[A-Z]\d[A-Z]\d[A-Z]\d$/;
    if (!postalFormat.test(postalCode)) {
        alert("Please enter postal code in the format A0A0A0 (e.g., M1G3T8)");
        return false;
    }


    const validProvinces = ["QC", "ON", "MN", "SK", "AB", "BC"];
    if (!validProvinces.includes(province)) {
        alert("Please enter a valid province (QC, ON, MN, SK, AB, BC)");
        return false;
    }


    if (parseInt(age) < 18) {
        alert("You must be at least 18 years old to register.");
        return false;
    }

    const emailFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailFormat.test(email)) {
        alert("Please enter a valid email address (myname@domain.com)");
        return false;
    }

   const passwordFormat = /^(?=.*\d)(?=.*[A-Z]).{6,}$/;
    if (!passwordFormat.test(password)) {
        alert("Password must be at least 6 characters long and contain at least one uppercase letter and one number.");
        return false;
    }


    if (password !== confirmPassword) {
        alert("Passwords do not match.");
        return false;
    }

    // If it reaches here, everything is valid!
    alert("Thanks for registering with our website! Your customer record was created successfully.");
    
    // This is the missing piece:
    event.target.submit(); 
}