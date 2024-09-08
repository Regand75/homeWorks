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
    const linkQuestion = document.getElementById("order__question-text");
    const titleOrder = document.getElementById('order__title');
    let passwordMatch = false;
    const fields = [
        {
            field: inputFullName,
            errorField: inputErrorFullName,
            message: "Заполните поле 'Full Name'",
            errorMessage: "'Full Name' может содержать только буквы и пробел",
            validationRegExp: /^[A-Za-zА-Яа-яЁё]+\s{1}[A-Za-zА-Яа-яЁё]+$/,
        },
        {
            field: inputUsername,
            errorField: inputErrorUsername,
            message: "Заполните поле 'Your username'",
            errorMessage: "Только буквы, цифры, символ подчеркивания и тире",
            validationRegExp: /^[\wА-Яа-яЁё0-9-]+$/,
            notFoundMessage: "Такой пользователь уже существует"
        },
        {
            field: inputEmail,
            errorField: inputErrorEmail,
            message: "Заполните поле 'E-mail'",
            errorMessage: "Введите поле 'E-mail' корректно",
            validationRegExp: /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,6}$/,
        },
        {
            field: inputPassword,
            errorField: inputErrorPassword,
            message: "Заполните поле 'Password'",
            errorMessage: "Не менее 8 символов, 1-1 цифры, заглавной буквы и спецсимвола",
            validationRegExp: /(?=.*\d)(?=.*[!@#$%^&*()])(?=.*[A-Z]).{8,}/,
        },
        {
            field: inputRepeatPassword,
            errorField: inputErrorRepeatPassword,
            message: "Заполните поле 'Repeat Password'",
            errorMessage: "Не верно введен пароль",
        },
    ];

    // Новый массив с двумя полями для страницы входа
    const fieldsLoginPage = fields.filter((item) => item.field === inputUsername || item.field === inputPassword);

    // Функция проверки валидности полей страницы регистрации на лету при заполнении
    const validateFields = (fields) => {
        fields.forEach(({field, errorField, message, errorMessage, validationRegExp, notFoundMessage}) => {
            field.addEventListener('input', () => {
                validateField(field, errorField, message, errorMessage, validationRegExp, notFoundMessage); // проверка валидности каждого поля
                // в поле Full Name заменяем начальные буквы на заглавные
                if (field === inputFullName) {
                    field.value = field.value.replace(/(^|\s)[a-zа-яё]/g, (match) => match.toUpperCase());
                }
                checkAllFieldsValid(); // проверяем, все ли поля валидны, чтобы активировать кнопку
            });
        });
    };

    // Функция проверки валидности полей страницы входа на лету при заполнении
    const validateFieldsLoginPage = (fieldsLoginPage) => {
        fieldsLoginPage.forEach(({field, errorField, message}) => {
            field.addEventListener('input', () => {
                validateFieldLoginPage(field, errorField, message); // проверка валидности каждого поля
                checkAllFieldsLoginPageValid(); // проверяем, все ли поля валидны, чтобы активировать кнопку
            });
        });
    };

    // Функция проверки валидности поля на странице регистрации
    const validateField = (field, errorField, message, errorMessage, validationRegExp, notFoundMessage) => {
        const value = field.value;
        let dataClients = JSON.parse(localStorage.getItem('clients')) || [];
        const checkUsernameMatch = dataClients.find(item => item.username.toLowerCase() === inputUsername.value.toLowerCase());
        // Если поле пустое, показываем сообщение об обязательном заполнении
        if (value === '') {
            showError(errorField, message, field);
        }
        // Если есть регулярное выражение и поле не соответствует ему, показываем сообщение о неверном формате
        else if (validationRegExp && !value.match(validationRegExp)) {
            showError(errorField, errorMessage, field);
        }
        // Если username уже существует, выводит сообщение
        else if (field === inputUsername && checkUsernameMatch) {
            showError(errorField, notFoundMessage, field);
        }
        // Если значение верное, скрываем сообщение об ошибке
        else {
            hideError(errorField, field);
        }
    };

    // Функция проверки валидности поля на странице входа
    const validateFieldLoginPage = (field, errorField, message) => {
        const value = field.value;
        // Если поле пустое, показываем сообщение об обязательном заполнении
        if (value === '') {
            showError(errorField, message, field);
        }
        // Если значение верное, скрываем сообщение об ошибке
        else {
            hideError(errorField, field);
        }
    };

    // Функция проверки валидности всех полей для активации кнопки Sign Up
    const checkAllFieldsValid = () => {
        let allValid = true;
        fields.forEach(({field, validationRegExp}) => {
            const value = field.value;
            if (value === '' || (validationRegExp && !value.match(validationRegExp))) {
                allValid = false;
            }
        });
        if (allValid) {
            activeButton(buttonSign);
        } else {
            deActiveButton(buttonSign);
        }
    };

    // Функция проверки валидности всех полей для активации кнопки Sign In
    const checkAllFieldsLoginPageValid = () => {
        let allValid = true;
        fieldsLoginPage.forEach(({field}) => {
            const value = field.value;
            if (value === '') {
                allValid = false;
            }
        });
        if (allValid) {
            activeButton(buttonSign);
        } else {
            deActiveButton(buttonSign);
        }
    };

    // Функция для активации кнопки
    const activeButton = (buttonSign) => {
        buttonSign.removeAttribute('disabled');
        buttonSign.style.backgroundColor = '#DD3142';
        buttonSign.style.cursor = 'pointer';
    };

    // Функция для деактивации кнопки
    const deActiveButton = (buttonSign) => {
        buttonSign.setAttribute('disabled', 'disabled');
        buttonSign.style.backgroundColor = '#DD3142B2';
        buttonSign.style.cursor = 'none';
    };

    // Функция для показа ошибки
    const showError = (errorField, message, field) => {
        errorField.style.display = 'block';
        errorField.innerText = message;
        field.style.borderBottomColor = '#DD3142';
    };

    // Функция для скрытия ошибки
    const hideError = (errorField, field) => {
        errorField.style.display = 'none';
        field.style.borderBottomColor = '';
    };

    // Функция проверки совпадения паролей
    const checkPasswordMatch = () => {
        if (inputPassword.value !== inputRepeatPassword.value) {
            showError(inputErrorRepeatPassword, "Пароли не совпадают", inputRepeatPassword);
            return passwordMatch = false;
        } else {
            hideError(inputErrorRepeatPassword, inputRepeatPassword);
            return passwordMatch = true;
        }
    };

    // Функция запуска анимации если чекбокс не выбран
    const checkInputCheckbox = () => {
        inputCheckbox.classList.toggle('error', (!inputCheckbox.checked && passwordMatch));
    };

    // Функция управления анимацией для чекбокса на лету
    const validateCheckbox = () => {
        inputCheckbox.addEventListener('change', () => {
            checkInputCheckbox();
        });
    };

    // Функция показа pop-up
    const togglePopup = (isVisible) => {
        const display = isVisible ? 'block' : 'none';
        popup.style.display = display;
        popupOverlay.style.display = display;
    };

    // Функция перезагрузки страницы
    const reloadPage = () => {
        location.reload();
    };

    //функция для имитации переключения формы регистрации на форму входа
    const switchToLoginForm = () => {
        form.reset();
        deActiveButton(buttonSign);
        hideError (inputErrorUsername, inputUsername);
        hideError (inputErrorPassword, inputPassword);
        titleOrder.innerHTML = 'Log in to the system';
        //удаление полей input
        document.querySelectorAll('input').forEach((item) => {
            if (item.id === 'order__username' || item.id === 'order__password') {
                return;
            }
            item.parentElement.remove();
        });
        buttonSign.innerText = 'Sign In'; //замена текста в кнопке
        linkQuestion.innerText = 'Registration'; //Изменение ссылки
        //добавление отступов для выравнивания контента
        document.getElementsByClassName('order__image')[0].style.marginTop = '0';
        titleOrder.style.marginTop = '80px';
        // замена слушателя на кнопке
        buttonSign.removeEventListener('click', handleSignUp);
        buttonSign.addEventListener('click', handleLogin);
        // замена слушателя на ссылке
        linkQuestion.removeEventListener('click', switchToLoginForm);
        linkQuestion.addEventListener('click', reloadPage);
        validateFieldsLoginPage(fieldsLoginPage); // запускаем валидацию полей для формы входа
    };

    // Функция имитации перехода в личный кабинет
    const switchToPersonalAccount = () => {
        titleOrder.innerHTML = 'Log in to the system';
    };

    // функция для обработки клика на кнопку регистрации
    const handleSignUp = (e) => {
        e.preventDefault();
        checkPasswordMatch(); // запускаем проверку совпадения паролей
        checkInputCheckbox(); // показывает анимацию если не выбран чекбокс
        // Записываем данные в localStorage и запускаем pop-up
        if (inputCheckbox.checked && passwordMatch) {
            // let clientAll = localStorage.getItem('clients');
            let clients = JSON.parse(localStorage.getItem('clients')) || [];
            const checkEmailMatch = clients.find(item => item.email === inputEmail.value);
            if (!checkEmailMatch) {
                let client = {};
                fields.forEach(({field}) => {
                    const fieldName = field.name;
                    if (fieldName && fieldName !== 'repeat-password') {
                        client[fieldName] = field.value;
                    }
                });
                clients.push(client);
                localStorage.setItem('clients', JSON.stringify(clients));
                togglePopup(true); //запускаем pop-up
            } else {
                showError(inputErrorEmail, 'Такая почта уже используется', inputEmail);
            }
        }
    };

    //функция для обработки клика на кнопку входа
    const handleLogin = (e, fieldsLoginPage) => {
        e.preventDefault();
        let clientsLocalStorage = JSON.parse(localStorage.getItem('clients')) || [];
        // Найти индекс элемента с совпадающим username
        const indexUsername = clientsLocalStorage.findIndex((item) => {
            return item.username.trim().toLowerCase() === inputUsername.value.trim().toLowerCase()
        });
        // Проверка существует ли пользователь с таким username
        if (indexUsername === -1) {
            showError(inputErrorUsername, 'Такой пользователь не зарегистрирован', inputUsername);
        } else {
            hideError(inputErrorUsername, inputUsername);
            if (clientsLocalStorage[indexUsername].password !== inputPassword.value) {
                showError(inputErrorPassword, 'Неверный пароль', inputPassword);
            } else {
                alert('Ok');
            }
        }
    };

    validateFields(fields); // запускаем валидацию всех полей
    validateCheckbox(); // запускаем управление анимацией чекбокса на лету

    // При нажатии на кнопку проверяется совпадение паролей и чекбокс, записываются данные в localStorage
    buttonSign.addEventListener('click', handleSignUp);

    //при нажатии на ссылку вызываем функцию имитации изменения формы
    linkQuestion.addEventListener('click', switchToLoginForm);

    //при нажатии кнопки pop-up
    popupButton.addEventListener('click', (e) => {
        if (e.target !== popupButton) return;
        togglePopup(false); // скрываем pop-up
        switchToLoginForm(); //вызываем функцию имитации изменения формы
    });
};

