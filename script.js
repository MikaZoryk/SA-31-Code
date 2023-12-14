// Функція для відображення або приховання меню навігації
function myFunction() {
    var x = document.getElementById("navDemo");
    if (x.className.indexOf("w3-show") === -1) {
        x.className += " w3-show";
    } else {
        x.className = x.className.replace(" w3-show", "");
    }
}

// Функція для перенаправлення на сторінку реєстрації
function redirectToRegistration() {
    window.location.href = "registration.html";
}

// Функція для входу користувача
function loginUser() {
    var email = document.getElementById('email').value;
    var password = document.getElementById('psw').value;

    // Перевірка, чи відповідає електронна пошта та пароль вимогам
    if (email === 'sola@gmail.com' && password.length >= 8 && /[a-zA-Z]/.test(password) && /\d/.test(password)) {
        var roleSelect = document.getElementById('role');
        var selectedRole = roleSelect.value;

        // Перевірка вибраної ролі та перенаправлення відповідно
        if (selectedRole === 'Фахівець') {
            window.location.href = 'spec.html'; // Перенаправлення на сторінку фахівця
        } else if (selectedRole === 'Пацієнт') {
            window.location.href = 'reg.html'; // Перенаправлення на сторінку реєстрації пацієнта
        } else {
            // Показати сповіщення або обробити випадок, коли не вибрано роль
            alert('Будь ласка, виберіть роль.');
        }
    } else {
        // Показати сповіщення або обробити неправильні дані для входу
        alert('Неправильна електронна пошта або пароль.');
    }
  window.location.href = 'reg.html';
}
function showPassword() {
    var passwordInput = document.getElementById('psw');
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
    } else {
        passwordInput.type = 'password';
    }
}


// Функції для оновлення вмісту випадаючих списків та текстових областей
$(document).ready(function () {
    // Додавання обробників подій до прапорців
    $('.dropdown-item input[type="checkbox"]').change(function () {
        updateButtonText($(this).closest('.dropdown'));
        updateTextArea();
    });

    // Додавання обробника події до кнопок
    $('.dropdown-toggle').click(function () {
        var dropdown = $(this).next('.dropdown-menu');
        updateButtonText(dropdown);
        updateTextArea();
    });

    // Додавання обробника події для закриття випадаючого списку при кліці за межами
    $(document).click(function (event) {
        var target = $(event.target);
        if (!target.closest('.dropdown').length) {
            $('.dropdown-menu').removeClass('show');
        }
    });
});

// Функції для оновлення тексту кнопок
function updateButtonText(dropdown) {
    var button = dropdown.prev('.dropdown-toggle');
    var selectedItems = getSelectedItems(dropdown.data('type'));

    button.toggleClass('selected-item', selectedItems.length > 0);
}

// Функція для оновлення текстової області
function updateTextArea() {
    var selectedGeneticItems = getSelectedItems('genetic');
    var selectedMedicalItems = getSelectedItems('medical');

    $('#geneticTests').val(selectedGeneticItems.join(', '));
    $('#medicalConditions').val(selectedMedicalItems.join(', '));
}

// Функція для отримання вибраних елементів
function getSelectedItems(type) {
    var checkboxes = $('.dropdown-item input[type="checkbox"]:checked');
    var selectedItems = checkboxes.filter('[data-type="' + type + '"]').map(function () {
        return $(this).data('display');
    }).get();
    return selectedItems;
}

// Функція для збереження та відправлення форми
function saveAndSubmit() {
    alert('Дані форми успішно збережено!');
    $('#personalInfoForm').attr('action', 'services.html').submit();
}

// Функції для вибору фахівця, тесту чи послуги
function chooseSpecialist(service) {
    alert("Вибраний спеціаліст для " + service);
}

function scheduleConsultation(specialistName) {
    // Логіка для планування консультації
    var confirmation = confirm("Записатися на онлайн-консультацію з " + specialistName + "?");
    if (confirmation) {
        alert("Ваша заявка на консультацію з " + specialistName + " відправлена. Ми з вами зв'яжемося.");
    }
}

function chooseTest(service) {
    alert("Вибраний тест" + service);
}

function chooseService(service) {
    window.location.href = "gentest.html";
}



function getDiagnosis() {
    // Отримання даних з форми
    var symptoms = document.getElementById('symptoms').value.toLowerCase(); // перетворення на нижній регістр
    
    // Перевірка наявності конкретних симптомів
    var diagnosis = "Не вдалося визначити діагноз"; // за замовчуванням

    if (symptoms.includes('пігметні плями') && symptoms.includes('дисплазія кісток')) {
        diagnosis = "Можливо, це Нейрофіброматоз";
    } else if (symptoms.includes('анемія') && symptoms.includes('збільшена селезінка')) {
        diagnosis = "Можливо, це Гоше";
    } // додайте інші умови для різних діагнозів

    // Виведення результатів
    var resultContainer = document.getElementById('diagnosisResult');
    
    // Real related articles
    var articles = [];
    if (diagnosis === "Можливо, це Нейрофіброматоз") {
        articles = [
            { title: 'Understanding Neurofibromatosis', link: 'https://www.nfnetwork.org/understanding-nf/' }
            // Додайте інші статті для Нейрофіброматозу
        ];
    } else if (diagnosis === "Можливо, це Гоше") {
        articles = [
            { title: 'Gaucher Disease Overview', link: 'https://ghr.nlm.nih.gov/condition/gaucher-disease' }
            // Додайте інші статті для Гоше
        ];
    } // додайте блоки else if для інших діагнозів

    // Real research
    var research = [
        { title: 'Genetic Disorders Research', link: 'https://www.genome.gov/health/all-about-genomics' }
    ];

    // Display results
    resultContainer.innerHTML = '<h3>' + diagnosis + '</h3>' +
        '<p>Симптоми: ' + symptoms + '</p>' +
        '<h4>Статті:</h4>' + generateLinks(articles) +
        '<h4>Дослідження:</h4>' + generateLinks(research);
}

// Helper function to generate links from the array
function generateLinks(data) {
    var result = '<ul>';
    data.forEach(function (item) {
        result += '<li><a href="' + item.link + '" target="_blank">' + item.title + '</a></li>';
    });
    result += '</ul>';
    return result;
}
