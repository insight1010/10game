document.addEventListener('DOMContentLoaded', function() {
    // Инициализация Telegram Mini App
    const tg = window.Telegram.WebApp;
    tg.expand();
    
    // Элементы интерфейса
    const userInfo = document.getElementById('userInfo');
    const startButton = document.getElementById('startButton');
    const gameContainer = document.getElementById('gameContainer');
    
    // Данные пользователя
    let userData = {};
    
    // Инициализация данных пользователя
    function initUserData() {
        if (tg.initDataUnsafe && tg.initDataUnsafe.user) {
            userData = tg.initDataUnsafe.user;
            userInfo.innerHTML = `
                <p><strong>ID:</strong> ${userData.id}</p>
                <p><strong>Имя:</strong> ${userData.first_name} ${userData.last_name || ''}</p>
                <p><strong>Username:</strong> @${userData.username || 'не указан'}</p>
            `;
        } else {
            userInfo.innerHTML = '<p>Информация о пользователе недоступна. Запустите через Telegram.</p>';
        }
    }
    
    // Валидация пользователя на сервере
    function validateUser() {
        // В реальном приложении здесь будет запрос к серверу
        const apiUrl = 'https://yourdomain.com/api/auth'; // Замените на реальный URL вашего API
        
        return new Promise((resolve, reject) => {
            // Имитация отправки данных на сервер
            console.log('Отправка данных на сервер:', tg.initData);
            
            // Для тестирования просто возвращаем успех
            setTimeout(() => {
                resolve({ success: true });
            }, 500);
            
            // В реальном приложении:
            /*
            fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    initData: tg.initData
                })
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    resolve(data);
                } else {
                    reject(new Error(data.error || 'Ошибка аутентификации'));
                }
            })
            .catch(error => {
                reject(error);
            });
            */
        });
    }
    
    // Инициализация игры
    function initGame() {
        // Добавляем элементы игры
        const questionElement = document.createElement('div');
        questionElement.className = 'game-question';
        questionElement.innerHTML = `
            <h3>Вопрос 1 из 10:</h3>
            <p>Что для вас наиболее важно в жизни?</p>
            <div class="options">
                <div class="option" data-value="1">Стабильность и безопасность</div>
                <div class="option" data-value="2">Развитие и рост</div>
                <div class="option" data-value="3">Отношения с близкими</div>
                <div class="option" data-value="4">Самореализация и достижения</div>
            </div>
            <button class="button" id="nextButton" disabled>Далее</button>
        `;
        
        const resultsElement = document.createElement('div');
        resultsElement.className = 'game-results';
        resultsElement.innerHTML = `
            <h3>Результаты:</h3>
            <div id="resultsContent">
                <p>Анализ ваших ответов будет здесь.</p>
            </div>
            <button class="button" id="restartButton">Пройти заново</button>
        `;
        
        gameContainer.appendChild(questionElement);
        gameContainer.appendChild(resultsElement);
        
        // Добавляем обработчики событий
        const options = document.querySelectorAll('.option');
        const nextButton = document.getElementById('nextButton');
        
        options.forEach(option => {
            option.addEventListener('click', function() {
                // Снимаем выбор со всех опций
                options.forEach(opt => opt.classList.remove('selected'));
                // Выбираем текущую опцию
                this.classList.add('selected');
                // Активируем кнопку "Далее"
                nextButton.disabled = false;
            });
        });
        
        nextButton.addEventListener('click', function() {
            // В реальном приложении здесь будет логика переключения вопросов
            // Для демонстрации просто показываем результаты
            gameContainer.classList.add('results-active');
        });
        
        const restartButton = document.getElementById('restartButton');
        restartButton.addEventListener('click', function() {
            // Возвращаемся к вопросам
            gameContainer.classList.remove('results-active');
            // Снимаем выбор с опций
            options.forEach(opt => opt.classList.remove('selected'));
            // Деактивируем кнопку "Далее"
            nextButton.disabled = true;
        });
    }
    
    // Запуск игры
    startButton.addEventListener('click', function() {
        // Валидация пользователя
        validateUser()
            .then(() => {
                // Начинаем игру
                gameContainer.classList.add('game-active');
                // Убираем кнопку старта
                startButton.style.display = 'none';
            })
            .catch(error => {
                // Показываем ошибку пользователю
                tg.showAlert(`Произошла ошибка: ${error.message}`);
            });
    });
    
    // Инициализация
    initUserData();
    initGame();
}); 