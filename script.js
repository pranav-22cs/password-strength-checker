document.addEventListener('DOMContentLoaded', function() {
    let passwordInput = document.getElementById('password');
    let togglePassword = document.getElementById('togglePassword');
    let strengthIndicators = document.querySelectorAll('.strength-indicator');
    let text = document.getElementById('text');

    passwordInput.addEventListener('input', function(event) {
        let password = event.target.value;
        let strength = calculateStrength(password);
        let degree = (strength / 10) * 360; // calculate degree value based on password strength
        let gradientColor = strength <= 4 ? '#ff2c1c' : 
        (strength <= 8 ? '#ff9800' : '#12ff12');

        let strengthText = strength <= 4 ? 'Weak' : 
        (strength <= 8 ? 'Medium' : 'Strong');

        strengthIndicators.forEach(strengthIndicator => {
            strengthIndicator.style.background =
            `conic-gradient(${gradientColor} ${degree}deg, #1115 ${degree}deg)`;
        });
        text.textContent = strengthText;
        text.style.color = gradientColor;
    });

    togglePassword.addEventListener('change', function() {
        if (togglePassword.checked) {
            passwordInput.type = 'text';
        } else {
            passwordInput.type = 'password';
        }
    });

    function calculateStrength(password) {
        let strength = 0;
        if (password.length >= 8) strength += 2;  //strength increase if length is more than 8
        if (/[A-Z]/.test(password)) strength += 2; //strength increase Capital letter is added
        if (/[a-z]/.test(password)) strength += 2;
        if (/[0-9]/.test(password)) strength += 2; //strength increase if number is added
        if (/[^A-Za-z0-9]/.test(password)) strength += 2; //strength increase if contains any special characters.
        return strength;
    }
});
