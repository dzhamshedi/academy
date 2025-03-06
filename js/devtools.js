document.addEventListener('DOMContentLoaded', function() {
    const tabs = document.querySelectorAll('.tab:not(.disabled)');
    const contents = document.querySelectorAll('.tab-content');
    const playgrounds = document.querySelectorAll('.playground-content');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
            contents.forEach(c => c.classList.remove('active'));
            playgrounds.forEach(p => p.classList.remove('active'));

            tab.classList.add('active');
            
            const tabName = tab.dataset.tab;
            document.getElementById(`${tabName}-content`).classList.add('active');
            document.getElementById(`${tabName}-playground`).classList.add('active');
        });
    });

    // Маска для телефона
    const phoneInput = document.getElementById('phone');
    phoneInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        
        if (value.length > 0) {
            if (value.length <= 11) {
                let formattedValue = '';
                if (value.length > 0) {
                    formattedValue = '+7';
                    if (value.length > 1) {
                        formattedValue += ' (' + value.substring(1, 4);
                    }
                    if (value.length > 4) {
                        formattedValue += ') ' + value.substring(4, 7);
                    }
                    if (value.length > 7) {
                        formattedValue += '-' + value.substring(7, 9);
                    }
                    if (value.length > 9) {
                        formattedValue += '-' + value.substring(9, 11);
                    }
                }
                e.target.value = formattedValue;
            }
        }
    });

    // Маска для паспорта
    const passportInput = document.getElementById('passport');
    passportInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        
        if (value.length > 0) {
            if (value.length <= 10) {
                let formattedValue = '';
                if (value.length > 0) {
                    formattedValue = value.substring(0, 2);
                    if (value.length > 2) {
                        formattedValue += ' ' + value.substring(2, 4);
                    }
                    if (value.length > 4) {
                        formattedValue += ' ' + value.substring(4);
                    }
                }
                e.target.value = formattedValue;
            }
        }
    });

    // Предотвращение ввода букв
    [phoneInput, passportInput].forEach(input => {
        input.addEventListener('keypress', function(e) {
            if (!/\d/.test(e.key)) {
                e.preventDefault();
            }
        });
    });

    // Обработчики для кнопок проверки
    document.querySelectorAll('.check-button').forEach(button => {
        button.addEventListener('click', function() {
            const input = this.previousElementSibling;
            const expectedValue = input.dataset.expected;
            const userValue = input.value.trim();

            input.classList.remove('correct', 'incorrect');

            if (userValue === expectedValue) {
                input.classList.add('correct');
            } else {
                input.classList.add('incorrect');
            }
        });
    });

    // Очистка классов состояния при вводе
    document.querySelectorAll('.check-input').forEach(input => {
        input.addEventListener('input', function() {
            this.classList.remove('correct', 'incorrect');
        });
    });

    // Обработчики для Network запросов
    document.querySelectorAll('.request-button').forEach(button => {
        button.addEventListener('click', async function() {
            const method = this.dataset.method;
            
            try {
                const options = {
                    method: method,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                };

                if (method !== 'GET') {
                    options.body = JSON.stringify({
                        id: 1,
                        name: 'Test User',
                        email: 'test@example.com'
                    });
                }

                const response = await fetch('https://jsonplaceholder.typicode.com/users', options);
                const data = await response.json();
                
                console.log(`${method} request completed:`, data);
            } catch (error) {
                console.error(`${method} request failed:`, error);
            }
        });
    });

    // Обработчики для проверки хранилищ
    document.querySelectorAll('#application-playground .check-button').forEach(button => {
        button.addEventListener('click', function() {
            const input = this.previousElementSibling;
            const expectedValue = input.dataset.expected;
            const userValue = input.value.trim().toLowerCase();

            input.classList.remove('correct', 'incorrect');
            
            if (userValue === expectedValue.toLowerCase()) {
                input.classList.add('correct');
            } else {
                input.classList.add('incorrect');
            }
        });
    });

    // Очистка классов при новом вводе
    document.querySelectorAll('#application-playground .check-input').forEach(input => {
        input.addEventListener('input', function() {
            this.classList.remove('correct', 'incorrect');
        });
    });
});