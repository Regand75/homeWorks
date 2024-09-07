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
    let hasError = false;
    let clients = [];
    const fields = [
        {
            field: inputFullName,
            errorField: inputErrorFullName,
            message: "Заполните поле 'Full Name'",
            errorMessage: "'Full Name' может содержать только буквы и пробел",
            validationRegExp: /^[A-Za-zА-Яа-яЁё]+\s[A-Za-zА-Яа-яЁё]+$/,
        },
        {
            field: inputUsername,
            errorField: inputErrorUsername,
            message: "Заполните поле 'Your username'",
            errorMessage: "Только буквы, цифры, символ подчеркивания и тире",
            validationRegExp: /^[\wА-Яа-яЁё0-9-]+$/,
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
            errorMessage: "Не менее 8 символов, одной цифры, заглавной буквы и спецсимвола",
            validationRegExp: /(?=.*\d)(?=.*[!@#$%^&*()])(?=.*[A-Z]).{8,}/,
        },
        {
            field: inputRepeatPassword,
            errorField: inputErrorRepeatPassword,
            message: "Заполните поле 'Repeat Password'",
            errorMessage: "Не верно введен пароль",
        },
    ];

    // Функция проверки валидности полей на лету при заполнении
    const validateFields = (fields) => {
        fields.forEach(({field, errorField, message, errorMessage, validationRegExp}) => {
            field.addEventListener('input', () => {
                validateField(field, errorField, message, errorMessage, validationRegExp);
                // в поле Full Name заменяем начальные буквы на заглавные
                if (errorField === inputErrorFullName) {
                    field.value = field.value.replace(/\b\w/g, (match) => {
                        return match.toUpperCase();
                    })
                }
                checkAllFieldsValid(); // Проверяем, все ли поля валидны
            });
        });
    };

    // Функция проверки валидности поля
    const validateField = (field, errorField, message, errorMessage, validationRegExp) => {
        const value = field.value.trim();

        // Если поле пустое, показываем сообщение об обязательном заполнении
        if (value === '') {
            showError(errorField, message, field);
        }
        // Если есть регулярное выражение и поле не соответствует ему, показываем сообщение о неверном формате
        else if (validationRegExp && !value.match(validationRegExp)) {
            showError(errorField, errorMessage, field);
        }
        // Если значение верное, скрываем сообщение об ошибке
        else {
            hideError(errorField, field);
        }
    };

    // Функция проверки валидности всех полей для активации кнопки
    const checkAllFieldsValid = () => {
        let allValid = true;

        fields.forEach(({field, validationRegExp}) => {
            const value = field.value.trim();
            if (value === '' || (validationRegExp && !value.match(validationRegExp))) {
                allValid = false;
            }
        });

        if (allValid) {
            buttonSign.removeAttribute('disabled');
            buttonSign.style.backgroundColor = '#DD3142';
            buttonSign.style.cursor = 'pointer';
        } else {
            buttonSign.setAttribute('disabled', 'disabled');
            buttonSign.style.backgroundColor = '#DD3142B2';
        }
    };

    // Функция для показа ошибки
    const showError = (errorField, message, field) => {
        errorField.style.display = 'block';
        errorField.innerText = message;
        field.style.borderBottomColor = '#DD3142';
    }

    // Функция для скрытия ошибки
    const hideError = (errorField, field) => {
        errorField.style.display = 'none';
        field.style.borderBottomColor = '';
    }

    // Функция проверки совпадения паролей
    const checkPasswordMatch = () => {
        if (inputPassword.value !== inputRepeatPassword.value) {
            showError(inputErrorRepeatPassword, "Пароли не совпадают", inputRepeatPassword);
            hasError = false;
        } else {
            hideError(inputErrorRepeatPassword, inputRepeatPassword);
            hasError = true;
        }
    };

    // Функция запуска анимации если чекбокс не выбран
    const checkInputCheckbox = () => {
        inputCheckbox.classList.toggle('error', (!inputCheckbox.checked && hasError));
    };

    // Функция управления анимацией для чекбокса на лету
    const validateCheckbox = () => {
        inputCheckbox.addEventListener('change', () => {
            checkInputCheckbox();
        });
    };

    // Функция показа попапа
    const togglePopup = (isVisible) => {
        const display = isVisible ? 'block' : 'none';
        popup.style.display = display;
        popupOverlay.style.display = display;
    };

    //функция для имитации переключения формы регистрации на форму входа
    const switchToLoginForm = () => {
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
    };

    // функция для обработки клика на кнопку регистрации
    const handleSignUp = (e) => {
        e.preventDefault();
        checkPasswordMatch(); // запускаем проверку совпадения паролей
        checkInputCheckbox(); // показывает анимацию если не выбран чекбокс

        // Записываем данные в localStorage и запускаем pop-up
        if (inputCheckbox.checked && hasError) {
            let clientAll = localStorage.getItem('clients');
            if (clientAll) {
                clients = JSON.parse(clientAll);
            }
            let client = {};
            fields.forEach(({field}) => {
                const fieldName = field.name;
                if (fieldName && fieldName !== 'repeat-password') {
                    client[fieldName] = field.value;
                }
            });
            clients.push(client);
            localStorage.setItem('clients', JSON.stringify(clients));
            console.log(localStorage);
            togglePopup(true);
        }
    };

    //функция для обработки клика на кнопку входа
    const handleLogin = (e) => {
        e.preventDefault();

        //проверка значений в оставшихся полях
        const remainingFields = [
            {field: inputUsername, errorField: inputErrorUsername, message: "Заполните поле 'Your username'"},
            {field: inputPassword, errorField: inputErrorPassword, message: "Заполните поле 'Password'"},
        ];
        for (const {field, errorField, message} of remainingFields) {
            if (!validateField(field, errorField, message)) return;
        }

        //выводит сообщение
        alert('Добро пожаловать, ' + document.getElementById("order__username").value + '!')
        form.reset();
    };

    validateFields(fields); // запускаем валидацию всех полей
    validateCheckbox(); // запускаем управление анимацией чекбокса на лету

    // При нажатии на кнопку проверяется совпадение паролей и чекбокс
    buttonSign.addEventListener('click', handleSignUp);

    //при нажатии на ссылку вызываем функцию имитации изменения формы
    linkQuestion.addEventListener('click', switchToLoginForm);

    //при нажатии кнопки попапа
    popupButton.addEventListener('click', (e) => {
        if (e.target !== popupButton) return;
        togglePopup(false);
        form.reset();
        switchToLoginForm(); //вызываем функцию имитации изменения формы
    });
};

