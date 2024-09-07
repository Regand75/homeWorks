window.onload = function () {
    const inputFullName = document.getElementById("order__fullName");
    const inputErrorFullName = document.getElementById("order__error-fullName");
    const inputUsername = document.getElementById("order__username");
    const inputErrorUsername = document.getElementById("order__error-username");
    const inputCheckbox = document.getElementById("order__checkbox");
    const inputEmail = document.getElementById("order__email");
    const inputErrorEmail = document.getElementById("order__error-email");
    const inputPassword = document.getElementById("order__password");
    const inputErrorPassword = document.getElementById("order__error-password");
    const inputRepeatPassword = document.getElementById("order__repeat-password");
    const inputErrorRepeatPassword = document.getElementById("order__error-repeat-password");
    const popupOverlay = document.getElementById("popup-overlay");
    const popup = document.getElementById("popup");
    const form = document.getElementById("order__form");
    const popupButton = document.getElementById("popup__button");
    const buttonSign = document.getElementById("order__button");
    const linkQuestion = document.getElementById("order__question");
    const titleOrder = document.getElementById('order__title');

    //функция для предотвращения ввода недопустимых символов
    function preventInvalidInput(e, regex) {
        if (regex.test(e.key)) {
            e.preventDefault();
        }
    }

    //функция для проверки поля на наличие значения
    function validateField(field, errorField, message) {
        if (!field.value) {
            errorField.style.display = 'block';
            errorField.innerText = message;
            return false;
        } else {
            errorField.style.display = 'none';
            return true;
        }
    }

    //функция для имитации переключения формы регистрации на форму входа
    function switchToLoginForm() {
        titleOrder.innerHTML = 'Log in to the system';

        //удаление полей input
        document.querySelectorAll('input').forEach((item) => {
            if (item.id === 'order__username' || item.id === 'order__password') {
                return;
            }
            item.parentElement.remove();
        });

        //замена текста в кнопке
        buttonSign.innerText = 'Sign In';

        //удаление ссылки
        linkQuestion.remove();

        //добавление отступов для выравнивания контента
        document.getElementsByClassName('order__image')[0].style.marginTop = '0';
        titleOrder.style.marginTop = '80px';

        buttonSign.removeEventListener('click', handleSignUp);
        buttonSign.addEventListener('click', handleLogin);
    }

    //функция для обработки клика на кнопку регистрации
    function handleSignUp(e) {
        e.preventDefault();

        //проверка значений в каждом поле, кроме поля 'Repeat Password'
        const fields = [
            {field: inputFullName, errorField: inputErrorFullName, message: "Заполните поле 'Full Name'"},
            {field: inputUsername, errorField: inputErrorUsername, message: "Заполните поле 'Your username'"},
            {field: inputEmail, errorField: inputErrorEmail, message: "Заполните поле 'E-mail'"},
            {field: inputPassword, errorField: inputErrorPassword, message: "Заполните поле 'Password'"}
        ];
        for (const { field, errorField, message } of fields) {
            if (!validateField(field, errorField, message)) return;
        }

        // Проверка на количество символов в поле 'Password'
        if (inputPassword.value.length < 8) {
            inputErrorPassword.style.display = 'block';
            inputErrorPassword.innerText = 'Пароль должен содержать не менее 8-ми символов';
            return;
        } else {
            inputErrorPassword.style.display = 'none';
        }

        // Проверка значение поля 'Repeat Password' и совпадение паролей
        if (!validateField(inputRepeatPassword, inputErrorRepeatPassword, "Заполните поле 'Repeat Password'")) return;
        if (inputPassword.value !== inputRepeatPassword.value) {
            inputErrorRepeatPassword.style.display = 'block';
            inputErrorRepeatPassword.innerText = 'Пароли не совпадают';
            return;
        } else {
            inputErrorRepeatPassword.style.display = 'none';
        }

        //проверка выбран ли чекбокс
        if (!inputCheckbox.checked) {
            alert('Вы должны принять условия');
            return;
        }

        // Показ pop-up
        popup.style.display = "block";
        popupOverlay.style.display = "block";
    }

    //функция для обработки клика на кнопку входа
    function handleLogin(e) {
        e.preventDefault();

        //проверка значений в оставшихся полях
        const remainingFields = [
            {field: inputUsername, errorField: inputErrorUsername, message: "Заполните поле 'Your username'"},
            {field: inputPassword, errorField: inputErrorPassword, message: "Заполните поле 'Password'"},
        ];
        for (const { field, errorField, message } of remainingFields) {
            if (!validateField(field, errorField, message)) return;
        }

        //выводит сообщение
        alert('Добро пожаловать, ' + document.getElementById("order__username").value + '!')
        form.reset();
    }

    //2. запрет ввода в поле input цифр
    inputFullName.addEventListener('keydown', e => preventInvalidInput(e, /\d/));
    //3. запрет ввода в поле input точек и запятых
    inputUsername.addEventListener('keydown', e => preventInvalidInput(e, /[.,]/));
    //4. выводит сообщение в консоль при изменении значения чекбокса
    inputCheckbox.addEventListener('change', () => console.log(inputCheckbox.checked ? 'Согласен' : 'Не согласен'));
    //проверка значений в каждом поле формы регистрации
    buttonSign.addEventListener('click', handleSignUp);
    //при нажатии на ссылку вызываем функцию имитации изменения формы
    linkQuestion.addEventListener('click', switchToLoginForm);
    //при нажатии кнопки попапа
    popupButton.addEventListener('click', (e) => {
        if (e.target !== popupButton) return;
        popup.style.display = "none";
        popupOverlay.style.display = "none";
        form.reset();
        switchToLoginForm(); //вызываем функцию имитации изменения формы
    })
}

