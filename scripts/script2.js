$(document).ready(function() {
    const $inputFullName = $("#order__fullName");
    const $inputUsername = $("#order__username");
    const $inputCheckbox = $("#order__checkbox");
    const $inputEmail = $("#order__email");
    const $inputPassword = $("#order__password");
    const $inputRepeatPassword = $("#order__repeat-password");
    const $popupOverlay = $("#popup-overlay");
    const $popup = $("#popup");
    const $form = $("#order__form");
    const $popupButton = $("#popup__button");
    const $buttonSign = $("#order__button");
    const $linkQuestion = $("#order__question");
    const $titleOrder = $('#order__title');

    // Функция для предотвращения ввода недопустимых символов
    function preventInvalidInput(e, regex) {
        if (regex.test(e.key)) {
            e.preventDefault();
        }
    }

    // Функция для проверки поля на наличие значения
    function validateField($field, message) {
        if (!$field.val()) {
            alert(message);
            return false;
        }
        return true;
    }

    // Функция для имитации переключения формы регистрации на форму входа
    function switchToLoginForm() {
        $titleOrder.html('Log in to the system');

        // Удаление полей input
        $('input').each(function() {
            if (this.id === 'order__username' || this.id === 'order__password') {
                return;
            }
            $(this).parent().remove();
        });

        // Замена текста в кнопке
        $buttonSign.text('Sign In');

        // Удаление ссылки
        $linkQuestion.remove();

        // Добавление отступов для выравнивания контента
        $('.order__image').css('marginTop', '0');
        $titleOrder.css('marginTop', '80px');

        $buttonSign.off('click', handleSignUp);
        $buttonSign.on('click', handleLogin);
    }

    // Функция для обработки клика на кнопку регистрации
    function handleSignUp(e) {
        e.preventDefault();

        // Проверка значений в каждом поле, кроме поля 'Repeat Password'
        const fields = [
            { $field: $inputFullName, message: "Заполните поле 'Full Name'" },
            { $field: $inputUsername, message: "Заполните поле 'Your username'" },
            { $field: $inputEmail, message: "Заполните поле 'E-mail'" },
            { $field: $inputPassword, message: "Заполните поле 'Password'" }
        ];
        for (const { $field, message } of fields) {
            if (!validateField($field, message)) return;
        }

        // Проверка на количество символов в поле 'Password'
        if ($inputPassword.val().length < 8) {
            alert('Пароль должен содержать не менее 8-ми символов');
            return;
        }

        // Проверка значение поля 'Repeat Password' и совпадение паролей
        if (!validateField($inputRepeatPassword, "Заполните поле 'Repeat Password'")) return;
        if ($inputPassword.val() !== $inputRepeatPassword.val()) {
            alert('Пароли не совпадают');
            return;
        }

        // Проверка выбран ли чекбокс
        if (!$inputCheckbox.prop('checked')) {
            alert('Примите условия');
            return;
        }

        // Показ pop-up
        $popup.show();
        $popupOverlay.show();
    }

    // Функция для обработки клика на кнопку входа
    function handleLogin(e) {
        e.preventDefault();

        // Проверка значений в оставшихся полях
        const remainingFields = [
            { $field: $inputUsername, message: "Заполните поле 'Your username'" },
            { $field: $inputPassword, message: "Заполните поле 'Password'" }
        ];
        for (const { $field, message } of remainingFields) {
            if (!validateField($field, message)) return;
        }

        // Выводит сообщение
        alert('Добро пожаловать, ' + $inputUsername.val() + '!');
        $form[0].reset();
    }

    // 2. Запрет ввода в поле input цифр
    $inputFullName.on('keydown', e => preventInvalidInput(e, /\d/));
    // 3. Запрет ввода в поле input точек и запятых
    $inputUsername.on('keydown', e => preventInvalidInput(e, /[.,]/));
    // 4. Выводит сообщение в консоль при изменении значения чекбокса
    $inputCheckbox.on('change', () => console.log($inputCheckbox.prop('checked') ? 'Согласен' : 'Не согласен'));
    // Проверка значений в каждом поле формы регистрации
    $buttonSign.on('click', handleSignUp);
    // При нажатии на ссылку вызываем функцию имитации изменения формы
    $linkQuestion.on('click', switchToLoginForm);
    // При нажатии кнопки попапа
    $popupButton.on('click', function(e) {
        if (e.target !== this) return;
        $popup.hide();
        $popupOverlay.hide();
        $form[0].reset();
        switchToLoginForm(); // Вызываем функцию имитации изменения формы
    });
});
