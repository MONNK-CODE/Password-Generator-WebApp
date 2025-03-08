document.addEventListener('DOMContentLoaded', function(){
    
const result = document.getElementById("result");
const generateButton = document.getElementById("generate-button");
    

generateButton.onclick = () => {
    generate_password()
    console.log("Button Clicked!")
}

    function generate_password(length = 12) {
        // Define character sets as strings for efficiency
        const lowercaseLetters = 'abcdefghijklmnopqrstuvwxyz';
        const uppercaseLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const numbers = '0123456789';
        const specialCharacters = '!@#$%^&*()_+-=[]{}|;:,.<>?';
        
        // Combine all character sets into one string
        const allCharacters = lowercaseLetters + uppercaseLetters + numbers + specialCharacters;

        // Initialize an empty string to store the password
        let password = '';

        // Ensure at least one character from each set is included
        // This guarantees the password meets minimum complexity requirements
        password += lowercaseLetters.charAt(Math.floor(Math.random() * lowercaseLetters.length));
        password += uppercaseLetters.charAt(Math.floor(Math.random() * uppercaseLetters.length));
        password += numbers.charAt(Math.floor(Math.random() * numbers.length));
        password += specialCharacters.charAt(Math.floor(Math.random() * specialCharacters.length));

        // Fill the rest of the password with random characters from all sets
        for (let i = password.length; i < length; i++) {
            password += allCharacters.charAt(Math.floor(Math.random() * allCharacters.length));
        }

        // Shuffle the password to randomize the position of the guaranteed characters
        // Convert to array, shuffle, then join back into a string
        password = password.split('') // Convert string to array
            .sort(() => 0.5 - Math.random()) // Shuffle array
            .join(''); // Join array back into string

        // Display the generated password along with the clipboard icon
        result.innerHTML = `Your new secure password is ${password} <i id="copy-icon" class="fa-solid fa-clipboard"></i>`;

        // Attach event listener to the clipboard icon to copy the password when clicked
        const copyIcon = document.getElementById("copy-icon");
        copyIcon.addEventListener("click", function() {
            navigator.clipboard.writeText(password).then(() => {
                console.log("Copied to clipboard!");
                // Optional: briefly change the icon's color
                copyIcon.style.color = "green";
                setTimeout(() => {
                    copyIcon.style.color = "";
                }, 2000);

                // Create a mini pop-up element
                const popup = document.createElement("span");
                popup.className = "copy-popup";
                popup.textContent = "Copied to clipboard";
                // Append the pop-up as a child of the icon so it appears on top
                copyIcon.appendChild(popup);

                // Trigger fade in
                setTimeout(() => {
                    popup.style.opacity = "1";
                }, 10);

                // Remove the pop-up after 2 seconds
                setTimeout(() => {
                    popup.style.opacity = "0";
                    setTimeout(() => {
                        popup.remove();
                    }, 300);
                }, 2000);
            }).catch(err => {
                console.error("Error copying to clipboard:", err);
            });
        });

        console.log("Password Generated");
    }
});