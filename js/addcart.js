//обновление цены в карточке товара
document.addEventListener('DOMContentLoaded', function() {
    const counterInput = document.querySelector('.card-box .js-input-counter');
    const priceElement = document.querySelector('.card-box .elm-price');
    const plusButton = document.querySelector('.card-box .js-button-counter-plus');
    const minusButton = document.querySelector('.card-box .js-button-counter-minus');
    

	if (counterInput) {
		// Получаем цену за единицу из data-атрибута
		const pricePerUnit = parseInt(priceElement.getAttribute('data-price'));
		
		function updatePrice() {
			const quantity = parseInt(counterInput.value) || 1;
			const totalPrice = quantity * pricePerUnit;
			priceElement.textContent = totalPrice;
		}
		
		// Обновляем цену при загрузке
		updatePrice();
		
		// Обработчики событий
		plusButton.addEventListener('click', function() {
			setTimeout(updatePrice, 10);
		});
		
		minusButton.addEventListener('click', function() {
			setTimeout(updatePrice, 10);
		});
		
		counterInput.addEventListener('input', updatePrice);
		counterInput.addEventListener('change', updatePrice);
	}
});



// Обработчик клика на кнопки плюс и минус в блоках каталога
document.addEventListener('mousedown', function(e) {
    // Обработка кнопки плюс
    if (e.target.classList.contains('js-button-counter-plus') || 
        e.target.closest('.js-button-counter-plus')) {
			
        const button = e.target.classList.contains('js-button-counter-plus') 
            ? e.target 
            : e.target.closest('.js-button-counter-plus');
			
        const counter = button.closest('.js-counter');
        const input = counter.querySelector('.js-input-counter');
        const currentValue = parseInt(input.value);
        
        // Проверяем, было ли значение 0 до нажатия
        if (currentValue === 0) {
            const tile = counter.closest('.item-tile-catalog');
            
            // Проверяем, что tile найден
            if (!tile) return;
            
            const photo = tile.querySelector('.elm-photo');
            
            // Проверяем, что photo найден
            if (!photo) return;
            
            const clonedPhoto = photo.cloneNode(true);
            
            // Добавляем data-атрибут для идентификации товара
            const tileIndex = Array.from(document.querySelectorAll('.item-tile-catalog')).indexOf(tile);
            clonedPhoto.setAttribute('data-tile-index', tileIndex);
            
            animatePhotoToPanel(photo, clonedPhoto);
        }
    }
});

// Обработчик для обновления суммы в блоках каталога
document.addEventListener('click', function(e) {
    // Обработка кнопки плюс
    if (e.target.classList.contains('js-button-counter-plus') || 
        e.target.closest('.js-button-counter-plus')) {
        setTimeout(updatePanelTotal, 50);
    }
    
    // Обработка кнопки минус
    if (e.target.classList.contains('js-button-counter-minus') || 
        e.target.closest('.js-button-counter-minus')) {
        
        const button = e.target.classList.contains('js-button-counter-minus') 
            ? e.target 
            : e.target.closest('.js-button-counter-minus');
        
        const counter = button.closest('.js-counter');
        const input = counter.querySelector('.js-input-counter');
        const currentValue = parseInt(input.value) || 0;
        
        // Если количество стало 0, удаляем элемент из панели
        if (currentValue === 0) {
            removeFromPanel(counter);
        }
        
        setTimeout(updatePanelTotal, 50);
    }
});

// Анимация перемещения картинки в панель
function animatePhotoToPanel(originalPhoto, clonedPhoto) {
    const panel = document.querySelector('#panel .panel-items');
    const originalRect = originalPhoto.getBoundingClientRect();
    const panelRect = panel.getBoundingClientRect();
    
    // Создаем временный элемент для анимации
    const tempPhoto = originalPhoto.cloneNode(true);
    tempPhoto.style.cssText = `
        position: fixed;
        left: ${originalRect.left}px;
        top: ${originalRect.top}px;
        width: ${originalRect.width}px;
        height: ${originalRect.height}px;
        z-index: 10000;
        transition: all 0.6s ease-in-out;
        pointer-events: none;
    `;
    
    document.body.appendChild(tempPhoto);
    
    setTimeout(() => {
        tempPhoto.style.left = panelRect.left + 'px';
        tempPhoto.style.top = panelRect.top + 'px';
        tempPhoto.style.width = '30px';
        tempPhoto.style.height = '30px';
        tempPhoto.style.opacity = '0.7';
    }, 50);
    
    setTimeout(() => {
        panel.appendChild(clonedPhoto);
        
        clonedPhoto.style.opacity = '0';
        clonedPhoto.style.transform = 'scale(0.5)';
        
        setTimeout(() => {
            clonedPhoto.style.transition = 'all 0.3s ease';
            clonedPhoto.style.opacity = '1';
            clonedPhoto.style.transform = 'scale(1)';
        }, 10);
        
        document.body.removeChild(tempPhoto);
        updatePanelTotal();
    }, 600);
}

// Удаление товара из панели
function removeFromPanel(counter) {
    const tile = counter.closest('.item-tile-catalog');
    
    // Проверяем, что tile найден
    if (!tile) return;
    
    const tileIndex = Array.from(document.querySelectorAll('.item-tile-catalog')).indexOf(tile);
    const panelItems = document.querySelector('#panel .panel-items');
    
    // Проверяем, что panelItems найден
    if (!panelItems) return;
    
    // Находим элемент с соответствующим data-атрибутом
    const itemToRemove = panelItems.querySelector(`.elm-photo[data-tile-index="${tileIndex}"]`);
    
    if (itemToRemove) {
        itemToRemove.style.transition = 'all 0.3s ease';
        itemToRemove.style.opacity = '0';
        itemToRemove.style.transform = 'scale(0.5)';
        
        setTimeout(() => {
            itemToRemove.remove();
            updatePanelTotal();
        }, 300);
    }
}

// Обновление общей суммы в панели (объединенная функция для карточки и каталога)
function updatePanelTotal() {
	console.log('updatePanelTotal')
    const panelTitle = document.querySelector('#panel .panel-title');
    let newTotal = 0;
    
    // Суммируем товары из каталога
    const catalogItems = document.querySelectorAll('.item-tile-catalog');
    catalogItems.forEach(item => {
        const counterInput = item.querySelector('.js-input-counter');
        const priceElement = item.querySelector('.elm-price');
        
        if (counterInput && priceElement) {
            const quantity = parseInt(counterInput.value) || 0;
            const price = parseInt(priceElement.textContent) || 0;
            newTotal += quantity * price;
        }
    });
    
    // Суммируем товары из карточек (только один раз каждый товар)
    const cardItems = document.querySelectorAll('#panel .panel-items .elm-photo[data-card-index]');
    cardItems.forEach(item => {
        const price = parseInt(item.getAttribute('data-card-price')) || 0;
        newTotal += price;
    });
    
    panelTitle.textContent = newTotal;
    updateItemsCount();
}

// Обновление количества товаров в панели
function updateItemsCount() {
    const panelItems = document.querySelectorAll('#panel .panel-items .elm-photo');
    const totalItems = panelItems.length;
    
    const countElement = document.querySelector('#panel .items-count');
    const panel = document.querySelector('#panel .panel-order-wrap');
    
    // Проверяем, что панель существует
    if (!panel) return;
    
    if (!countElement && totalItems > 0) {
        const countEl = document.createElement('div');
        countEl.className = 'items-count';
        countEl.style.cssText = `
            position: absolute;
            top: -5px;
            right: -5px;
            background: red;
            color: white;
            border-radius: 50%;
            width: 20px;
            height: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 12px;
        `;
        countEl.textContent = totalItems;
        panel.style.position = 'relative';
        panel.appendChild(countEl);
    } else if (countElement) {
        countElement.textContent = totalItems;
        if (totalItems === 0) {
            countElement.remove();
        }
    }
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', updatePanelTotal);

// Обработчик клика на кнопку "В корзину" в карточке товара
document.addEventListener('click', function(e) {
    // Проверяем, была ли нажата кнопка с id="addcart"
    if (e.target.id === 'addcart' || e.target.closest('#addcart')) {
        e.preventDefault();
        
        const button = e.target.id === 'addcart' 
            ? e.target 
            : e.target.closest('#addcart');
        
        // Проверяем, что кнопка находится внутри карточки товара
        const cardBox = button.closest('.card-box');
        if (cardBox) {
            addCardProductToPanel(cardBox);
        }
        
        return false;
    }
});

// Функция для добавления товара из карточки в панель
function addCardProductToPanel(cardBox) {
	console.log('addCardProductToPanel')
    // Находим .elm-photo из активного слайда слайдера
    const firstSlidePhoto = cardBox.querySelector('.slider-wrap .swiper-slide-active .elm-photo');
    
    // Проверяем, что firstSlidePhoto найден
    if (!firstSlidePhoto) return;
    
    // Находим цену товара
    const priceElement = cardBox.querySelector('.elm-cart-panel .elm-price');
    
    // Проверяем, что priceElement найден
    if (!priceElement) return;
    
    if (firstSlidePhoto && priceElement) {
        // Получаем цену
        const price = parseInt(priceElement.textContent) || 0;
        
        // Проверяем, был ли уже добавлен этот товар
        const cardIndex = Array.from(document.querySelectorAll('.card-box')).indexOf(cardBox);
        const existingPhoto = document.querySelector(`#panel .panel-items .elm-photo[data-card-index="${cardIndex}"]`);
        
        if (existingPhoto) {
            // Товар уже добавлен - обновляем цену
            existingPhoto.setAttribute('data-card-price', price);
            // Запускаем анимацию
            animateExistingProduct(firstSlidePhoto);
            // Обновляем сумму сразу
            setTimeout(updatePanelTotal, 50);
        } else {
            // Товар еще не добавлен - добавляем новый
            const clonedPhoto = firstSlidePhoto.cloneNode(true);
            clonedPhoto.setAttribute('data-card-index', cardIndex);
            clonedPhoto.setAttribute('data-card-price', price);
            addCardPhotoToPanel(firstSlidePhoto, clonedPhoto, price);
        }
    }
}

// Функция для анимации добавления картинки из карточки в панель
function addCardPhotoToPanel(originalPhoto, clonedPhoto, price) {
    const panel = document.querySelector('#panel .panel-items');
    const originalRect = originalPhoto.getBoundingClientRect();
    const panelRect = panel.getBoundingClientRect();
    
    // Создаем временный элемент для анимации
    const tempPhoto = originalPhoto.cloneNode(true);
    tempPhoto.style.cssText = `
        position: fixed;
        left: ${originalRect.left}px;
        top: ${originalRect.top}px;
        width: ${originalRect.width}px;
        height: ${originalRect.height}px;
        z-index: 10000;
        transition: all 0.6s ease-in-out;
        pointer-events: none;
    `;
    
    document.body.appendChild(tempPhoto);
    
    setTimeout(() => {
        tempPhoto.style.left = panelRect.left + 'px';
        tempPhoto.style.top = panelRect.top + 'px';
        tempPhoto.style.width = '30px';
        tempPhoto.style.height = '30px';
        tempPhoto.style.opacity = '0.7';
    }, 50);
    
    setTimeout(() => {
        panel.appendChild(clonedPhoto);
        
        clonedPhoto.style.opacity = '0';
        clonedPhoto.style.transform = 'scale(0.5)';
        
        setTimeout(() => {
            clonedPhoto.style.transition = 'all 0.3s ease';
            clonedPhoto.style.opacity = '1';
            clonedPhoto.style.transform = 'scale(1)';
        }, 10);
        
        document.body.removeChild(tempPhoto);
        
        // Обновляем сумму после того как картинка добавлена в DOM
        setTimeout(updatePanelTotal, 100);
    }, 600);
}
// Анимация для уже добавленного товара
function animateExistingProduct(originalPhoto) {
    const originalRect = originalPhoto.getBoundingClientRect();
    const panel = document.querySelector('#panel .panel-items');
    const panelRect = panel.getBoundingClientRect();
    
    // Создаем временный элемент для анимации
    const tempPhoto = originalPhoto.cloneNode(true);
    tempPhoto.style.cssText = `
        position: fixed;
        left: ${originalRect.left}px;
        top: ${originalRect.top}px;
        width: ${originalRect.width}px;
        height: ${originalRect.height}px;
        z-index: 10000;
        transition: all 0.6s ease-in-out;
        pointer-events: none;
    `;
    
    document.body.appendChild(tempPhoto);
    
    setTimeout(() => {
        tempPhoto.style.left = panelRect.left + 'px';
        tempPhoto.style.top = panelRect.top + 'px';
        tempPhoto.style.width = '30px';
        tempPhoto.style.height = '30px';
        tempPhoto.style.opacity = '0.7';
    }, 50);
    
    setTimeout(() => {
        document.body.removeChild(tempPhoto);
    }, 600);
}


