

document.addEventListener("DOMContentLoaded", function() {


	const bodyElem = document.querySelector('body')


	//components counter
    const components = document.querySelectorAll('.frm-select-component');
    components.forEach(component => {
        const checkbox = component.querySelector('input[type="checkbox"]');
        const input = component.querySelector('.js-input-counter');
        const minusBtn = component.querySelector('.js-button-counter-minus');
        if (parseInt(input.value) >= 1 && !checkbox.checked) {
            checkbox.checked = true;
        }
        if (checkbox.checked) {
            minusBtn.classList.remove('button-disabled');
        } else {
            minusBtn.classList.add('button-disabled');
        }
    });
    document.addEventListener('change', function(e) {
        if (e.target.matches('.frm-select-component input[type="checkbox"]')) {
            const checkbox = e.target;
            const component = checkbox.closest('.frm-select-component');
            const minusBtn = component.querySelector('.js-button-counter-minus');
            const input = component.querySelector('.js-input-counter');
            
            if (checkbox.checked) {
                minusBtn.classList.remove('button-disabled');
                input.value = 1;
            } else {
                minusBtn.classList.add('button-disabled');
                input.value = 0;
            }
        }
    });
    document.addEventListener('click', function(e) {
        if (e.target.matches('.frm-select-component .js-button-counter-plus')) {
            const plusBtn = e.target;
            const component = plusBtn.closest('.frm-select-component');
            const checkbox = component.querySelector('input[type="checkbox"]');
            
            if (!checkbox.checked) {
                checkbox.checked = true;
                checkbox.dispatchEvent(new Event('change'));
            }
        }
    });
    document.addEventListener('click', function(e) {
        if (e.target.matches('.frm-select-component .js-button-counter-minus')) {
            const minusBtn = e.target;
            const component = minusBtn.closest('.frm-select-component');
            const checkbox = component.querySelector('input[type="checkbox"]');
            const input = component.querySelector('.js-input-counter');
            
            if (parseInt(input.value) === 0) {
                checkbox.checked = false;
                checkbox.dispatchEvent(new Event('change'));
            }
        }
    });


	//mask phone
	let telInputs = document.querySelectorAll('input[type="tel"]');
	let dateInputs = document.querySelectorAll('input.birthday');
	if (telInputs) {
		let im = new Inputmask("+7 (999) 999-99-99");
		im.mask(telInputs);
	}
	
	
	

	//fancybox
	Fancybox.bind("[data-fancybox]", {
		//settings
	});

	//fixed header
	let header = document.querySelector(".header");
	let headerHeight = header.offsetHeight;
	let content = document.querySelector(".wrap");
	document.addEventListener("DOMContentLoaded", function () {
	  if (header) {
		if (content) {
		  content.style.paddingTop = headerHeight + "px";
			}
		}
	});
	 window.addEventListener("scroll", function () {
	   const windowTop = window.pageYOffset;
	   if (windowTop > 0) {
		 document.querySelector(".wrap").classList.add("header-fixed");
		} else {
		 document.querySelector(".wrap").classList.remove("header-fixed");
		}
	});


	//copy button
	document.querySelectorAll('.js-btn-copy').forEach(function(btn) {
		btn.addEventListener('click', function(e) {
			e.preventDefault();
			const content = btn.getAttribute('data-content');
			if (content) {
				navigator.clipboard.writeText(content)
					.then(() => {
						// alert('Скопировано!');
					})
					.catch(err => {
						// Обработка ошибок, если не удалось скопировать
						alert('Ошибка копирования');
					});
			}
		});
	});


	//all close
	const allCloseAction = document.querySelector('.js-all-close')
	const allBackAction = document.querySelector('.js-all-back')
	if (allBackAction) {
		allBackAction.addEventListener('click', function(e) {
			bodyElem.classList.remove('side-profile-active');
			e.preventDefault();
			return false;
		})
	}
	if (allCloseAction) {
		allCloseAction.addEventListener('click', function(e) {
			bodyElem.classList.remove('side-profile-active');
			e.preventDefault();
			return false;
		})
	}

	//side menu action
	const sideMenuAction = document.querySelector('.js-side-menu-action')
	const sideProfileMenu = document.querySelector('.side-profile-box')
	if (sideMenuAction) {
		sideMenuAction.addEventListener('click', function(e) {
			bodyElem.classList.add('side-profile-active');
			e.preventDefault();
			return false;
		})
	}


	//btn tgl and add
	let tglButtons = document.querySelectorAll('.js-btn-tgl')
	let addButtons = document.querySelectorAll('.js-btn-add')
	let buttonsTglOne = document.querySelectorAll('.js-btn-tgl-one');
	for (i = 0;i < tglButtons.length;i++) {
		tglButtons[i].addEventListener('click', function(e) {
			this.classList.contains('active') ? this.classList.remove('active') : this.classList.add('active')
			e.preventDefault()
			return false
		})
	}
	for (i = 0;i < addButtons.length;i++) {
		addButtons[i].addEventListener('click', function(e) {
			if (!this.classList.contains('active')) {
				this.classList.add('active');
				e.preventDefault()
				return false
			}
		})
	}
	buttonsTglOne.forEach(function(button) {
		button.addEventListener('click', function(e) {
			e.preventDefault();
			let toggleButtonsWrap = this.closest('.js-toggle-buttons');
	
			if (this.classList.contains('active')) {
				this.classList.remove('active');
			} else {
				toggleButtonsWrap.querySelectorAll('.js-btn-tgl-one').forEach(function(btn) {
					btn.classList.remove('active');
				});
				this.classList.add('active');
			}
			return false;
		});
	});


	//js tabs
	const tabsNav = document.querySelectorAll('.js-tabs-nav')
	const tabsBlocks = document.querySelectorAll('.js-tab-block')
	const tabsButtonTitle = document.querySelectorAll('.js-tab-title')
	const tabsButtonContent = document.querySelectorAll('.js-tab-content')
	function tabsActiveStart() {
		for (iTab = 0; iTab < tabsBlocks.length; iTab++) {
			if (tabsBlocks[iTab].classList.contains('active')) {
				tabsBlocks[iTab].classList.remove('active')
			}
		}
		for (i = 0; i < tabsNav.length; i++) {
			let tabsNavElements = tabsNav[i].querySelectorAll('[data-tab]')
			for (iElements = 0; iElements < tabsNavElements.length; iElements++) {
				if (tabsNavElements[iElements].classList.contains('active')) {
					let tabsNavElementActive = tabsNavElements[iElements].dataset.tab
					for (j = 0; j < tabsBlocks.length; j++) {
						if (tabsBlocks[j].dataset.tab.toString().indexOf(tabsNavElementActive) > -1) {
							tabsBlocks[j].classList.add('active')
						}
					}
				}
			}
		}
		
	}
	for (i = 0; i < tabsButtonTitle.length; i++) {
		tabsButtonTitle[i].addEventListener('click', function (e) {
			this.classList.toggle('active')
			e.preventDefault()
			e.stopPropagation()
			return false
		})
	}
	for (i = 0; i < tabsNav.length; i++) {
		tabsNav[i].addEventListener('click', function (e) {
			if (e.target.closest('[data-tab]')) {
				let tabsNavElements = this.querySelector('[data-tab].active')
				tabsNavElements ? tabsNavElements.classList.remove('active') : false
				e.target.closest('[data-tab]').classList.add('active')
				tabsActiveStart()
				e.preventDefault()
				e.stopPropagation()
				return false
			}
		})
	}
	tabsActiveStart()


	//js popup wrap
	const togglePopupButtons = document.querySelectorAll('.js-btn-popup-toggle')
	const closePopupButtons = document.querySelectorAll('.js-btn-popup-close')
	const popupElements = document.querySelectorAll('.js-popup-wrap')
	const wrapWidth = document.querySelector('.wrap').offsetWidth
	function popupElementsClear() {
		document.body.classList.remove('menu-show')
		document.body.classList.remove('filter-show')
		document.body.classList.remove('search-show')
		popupElements.forEach(element => element.classList.remove('popup-right'))
	}
	function popupElementsClose() {
		togglePopupButtons.forEach(element => {
			if (window.innerWidth < 1024) {
				if (!element.closest('.no-close-mobile') && !element.closest('.no-close')) {
					element.classList.remove('active')
				}

			} else if  (window.innerWidth > 1023) {
				if (!element.closest('.no-close-desktop') && !element.closest('.no-close')) {
					element.classList.remove('active')
				}
			} else {
				if (!element.closest('.no-close')) {
					element.classList.remove('active')
				}
			}
			
		})
	}
	function popupElementsContentPositionClass() {
		popupElements.forEach(element => {
			let pLeft = element.offsetLeft
			let pWidth = element.querySelector('.js-popup-block').offsetWidth
			let pMax = pLeft + pWidth;
			if (pMax > wrapWidth) {
				element.classList.add('popup-right')
			} else {
				element.classList.remove('popup-right')
			}
		})
	}
	for (i = 0; i < togglePopupButtons.length; i++) {
		togglePopupButtons[i].addEventListener('click', function (e) {
			popupElementsClear()
			if (this.classList.contains('active')) {
				this.classList.remove('active')
			} else {
				popupElementsClose()
				this.classList.add('active')
				if (this.closest('.popup-menu-wrap')) {
					document.body.classList.add('menu-show')
				}
				if (this.closest('.popup-search-wrap')) {
					document.body.classList.add('search-show')
				}
				if (this.closest('.popup-filter-wrap')) {
					document.body.classList.add('filter-show')
				}
				popupElementsContentPositionClass()
			}
			e.preventDefault()
			e.stopPropagation()
			return false
		})
	}
	for (i = 0; i < closePopupButtons.length; i++) {
		closePopupButtons[i].addEventListener('click', function (e) {
			popupElementsClear()
			popupElementsClose()
			e.preventDefault()
			e.stopPropagation()
			return false;
		})
	}
	document.onclick = function (event) {
		if (!event.target.closest('.js-popup-block')) {
			popupElementsClear()
			popupElementsClose()
		}
	}
	popupElements.forEach(element => {
		if (element.classList.contains('js-popup-select')) {
			let popupElementSelectItem = element.querySelectorAll('.js-popup-block li a')
			if (element.querySelector('.js-popup-block .active')) {
				element.classList.add('select-active')
				let popupElementActive = element.querySelector('.js-popup-block .active').innerHTML
				let popupElementButton = element.querySelector('.js-btn-popup-toggle')
				popupElementButton.innerHTML = ''
				popupElementButton.insertAdjacentHTML('beforeend', popupElementActive)
			} else {
				element.classList.remove('select-active')
			}
			for (i = 0; i < popupElementSelectItem.length; i++) {
				popupElementSelectItem[i].addEventListener('click', function (e) {
					this.closest('.js-popup-wrap').classList.add('select-active')
					if (this.closest('.js-popup-wrap').querySelector('.js-popup-block .active')) {
						this.closest('.js-popup-wrap').querySelector('.js-popup-block .active').classList.remove('active')
					}
					this.classList.add('active')
					let popupElementActive = element.querySelector('.js-popup-block .active').innerHTML
					let popupElementButton = element.querySelector('.js-btn-popup-toggle')
					popupElementButton.innerHTML = ''
					popupElementButton.insertAdjacentHTML('beforeend', popupElementActive)
					popupElementsClear()
					popupElementsClose()
					if (!this.closest('.js-tabs-nav')) {
						e.preventDefault()
						e.stopPropagation()
						return false
					}
				})
			}
		}
	})



	// Popups
	let popupCurrent;
	let popupsList = document.querySelectorAll('.popup-outer-box')

	document.querySelectorAll(".js-popup-open").forEach(function (element) {
	element.addEventListener("click", function (e) {
		document.querySelector(".popup-outer-box").classList.remove("active");
		document.body.classList.add("popup-open");
		for (i=0;i<popupsList.length;i++) {
			popupsList[i
				].classList.remove("active");
			}

		popupCurrent = this.getAttribute("data-popup");
		document
		.querySelector(
			`.popup-outer-box[id="${popupCurrent}"
			]`
		)
		.classList.add("active");

		e.preventDefault();
		e.stopPropagation();
		return false;
		});
	});
	document.querySelectorAll(".js-popup-close").forEach(function (element) {
	element.addEventListener("click", function (event) {
		document.body.classList.remove("popup-open");
		for (i=0;i<popupsList.length;i++) {
			popupsList[i
				].classList.remove("active");
			}
		event.preventDefault();
		event.stopPropagation();
		});
	});
	document.querySelector("body").addEventListener("click", function (event) {
		if (!event.target.closest(".popup-box")) {
			if (document.querySelector('.popup-filter.active')) {
					document.body.classList.remove("popup-open");
					document.body.classList.remove("popup-open-scroll");
					document.querySelector(".popup-filter").classList.remove("active");
					return false;
			}
		}
	});


	//slider main top
	const slidersmain = document.querySelectorAll(".slider-main");
	
	slidersmain.forEach((container) => {
		const swiperEl = container.querySelector(".swiper");
		const paginationEl = container.querySelector(".slider-main-pagination");
		const nextEl = container.querySelector(".button-slider-main-next");
		const prevEl = container.querySelector(".button-slider-main-prev");
	
		if (!swiperEl) return;
	
		new Swiper(swiperEl, {
			loop: false,
			slidesPerGroup: 1,
			slidesPerView: 1,
			spaceBetween: 0,
			autoHeight: false,
			speed: 400,
			pagination: {
				el: paginationEl,
				clickable: true,
			},
			autoplay: {
				delay: 4000,
				disableOnInteraction: false,
			},
			navigation: false,
		});
	});


	//slider menu
	const slidersmenu = document.querySelectorAll(".slider-menu");
	slidersmenu.forEach((container) => {
		const swiperEl = container.querySelector(".swiper");
		if (!swiperEl) return;
		new Swiper(swiperEl, {
			loop: false,
			slidesPerGroup: 1,
			slidesPerView: 'auto',
			spaceBetween: 0,
			autoHeight: false,
			speed: 400,
			freeMode: true,
			pagination: false,
			autoplay: false,
			navigation: false,
		});
	});


	//slider card
	const sliderscard = document.querySelectorAll(".slider-card");
	
	sliderscard.forEach((container) => {
		const swiperEl = container.querySelector(".swiper");
		const paginationEl = container.querySelector(".slider-card-pagination");
	
		if (!swiperEl) return;
	
		new Swiper(swiperEl, {
			loop: false,
			slidesPerGroup: 1,
			slidesPerView: 1,
			spaceBetween: 0,
			autoHeight: false,
			speed: 400,
			pagination: {
				el: paginationEl,
				clickable: true,
			},
			autoplay: false,
			navigation: false,
		});
	});


	//slider actions
	const slidersactions = document.querySelectorAll(".slider-actions");
	slidersactions.forEach((container) => {
		const swiperEl = container.querySelector(".swiper");
		if (!swiperEl) return;
		new Swiper(swiperEl, {
			loop: false,
			slidesPerGroup: 1,
			slidesPerView: 'auto',
			spaceBetween: 0,
			autoHeight: false,
			speed: 400,
			pagination: false,
			autoplay: {
				delay: 4000,
				disableOnInteraction: false,
			},
			navigation: false,
			breakpoints: {
				720: { slidesPerView: 2 },
			},
		});
	});


	//slider tiles
	const sliderstiles = document.querySelectorAll(".slider-tiles");
	sliderstiles.forEach((container) => {
		const swiperEl = container.querySelector(".swiper");
		const paginationEl = container.querySelector(".slider-tiles-pagination");
		const nextEl = container.querySelector(".button-slider-tiles-next");
		const prevEl = container.querySelector(".button-slider-tiles-prev");
		if (!swiperEl) return;
		new Swiper(swiperEl, {
			loop: false,
			slidesPerGroup: 1,
			slidesPerView: 'auto',
			spaceBetween: 0,
			autoHeight: false,
			speed: 400,
			pagination: {
				el: paginationEl,
				clickable: true,
			},
			autoplay: {
				delay: 4000,
				disableOnInteraction: false,
			},
			navigation: {
				nextEl: nextEl,
				prevEl: prevEl,
			},
			 on: {
				init: function () {
				const swiperEl = this.el;
				
				swiperEl.addEventListener('mouseenter', () => {
					this.autoplay.stop();
				});
				
				swiperEl.addEventListener('mouseleave', () => {
					this.autoplay.start();
				});
				},
			},
		});
	});


})