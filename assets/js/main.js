/*
	Dimension by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function ($) {

	var $window = $(window),
		$body = $('body'),
		$wrapper = $('#wrapper'),
		$header = $('#header'),
		$footer = $('#footer'),
		$main = $('#main'),
		$main_articles = $main.children('article');

	// Breakpoints.
	breakpoints({
		xlarge: ['1281px', '1680px'],
		large: ['981px', '1280px'],
		medium: ['737px', '980px'],
		small: ['481px', '736px'],
		xsmall: ['361px', '480px'],
		xxsmall: [null, '360px']
	});

	// Play initial animations on page load.
	$window.on('load', function () {
		window.setTimeout(function () {
			$body.removeClass('is-preload');
		}, 100);
	});

	// Fix: Flexbox min-height bug on IE.
	if (browser.name == 'ie') {

		var flexboxFixTimeoutId;

		$window.on('resize.flexbox-fix', function () {

			clearTimeout(flexboxFixTimeoutId);

			flexboxFixTimeoutId = setTimeout(function () {

				if ($wrapper.prop('scrollHeight') > $window.height())
					$wrapper.css('height', 'auto');
				else
					$wrapper.css('height', '100vh');

			}, 250);

		}).triggerHandler('resize.flexbox-fix');

	}

	// Nav.
	var $nav = $header.children('nav'),
		$nav_li = $nav.find('li');

	// Add "middle" alignment classes if we're dealing with an even number of items.
	if ($nav_li.length % 2 == 0) {

		$nav.addClass('use-middle');
		$nav_li.eq(($nav_li.length / 2)).addClass('is-middle');

	}

	// Main.
	var delay = 325,
		locked = false;

	// Methods.
	$main._show = function (id, initial) {

		var $article = $main_articles.filter('#' + id);

		// No such article? Bail.
		if ($article.length == 0)
			return;

		// Handle lock.

		// Already locked? Speed through "show" steps w/o delays.
		if (locked || (typeof initial != 'undefined' && initial === true)) {

			// Mark as switching.
			$body.addClass('is-switching');

			// Mark as visible.
			$body.addClass('is-article-visible');

			// Deactivate all articles (just in case one's already active).
			$main_articles.removeClass('active');

			// Hide header, footer.
			$header.hide();
			$footer.hide();

			// Show main, article.
			$main.show();
			$article.show();

			// Activate article.
			$article.addClass('active');

			// Unlock.
			locked = false;

			// Unmark as switching.
			setTimeout(function () {
				$body.removeClass('is-switching');
			}, (initial ? 1000 : 0));

			return;

		}

		// Lock.
		locked = true;

		// Article already visible? Just swap articles.
		if ($body.hasClass('is-article-visible')) {

			// Deactivate current article.
			var $currentArticle = $main_articles.filter('.active');

			$currentArticle.removeClass('active');

			// Show article.
			setTimeout(function () {

				// Hide current article.
				$currentArticle.hide();

				// Show article.
				$article.show();

				// Activate article.
				setTimeout(function () {

					$article.addClass('active');

					// Window stuff.
					$window
						.scrollTop(0)
						.triggerHandler('resize.flexbox-fix');

					// Unlock.
					setTimeout(function () {
						locked = false;
					}, delay);

				}, 25);

			}, delay);

		}

		// Otherwise, handle as normal.
		else {

			// Mark as visible.
			$body
				.addClass('is-article-visible');

			// Show article.
			setTimeout(function () {

				// Hide header, footer.
				$header.hide();
				$footer.hide();

				// Show main, article.
				$main.show();
				$article.show();

				// Activate article.
				setTimeout(function () {

					$article.addClass('active');

					// Window stuff.
					$window
						.scrollTop(0)
						.triggerHandler('resize.flexbox-fix');

					// Unlock.
					setTimeout(function () {
						locked = false;
					}, delay);

				}, 25);

			}, delay);

		}

	};

	$main._hide = function (addState) {

		var $article = $main_articles.filter('.active');

		// Article not visible? Bail.
		if (!$body.hasClass('is-article-visible'))
			return;

		// Add state?
		if (typeof addState != 'undefined'
			&& addState === true)
			history.pushState(null, null, '#');

		// Handle lock.

		// Already locked? Speed through "hide" steps w/o delays.
		if (locked) {

			// Mark as switching.
			$body.addClass('is-switching');

			// Deactivate article.
			$article.removeClass('active');

			// Hide article, main.
			$article.hide();
			$main.hide();

			// Show footer, header.
			$footer.show();
			$header.show();

			// Unmark as visible.
			$body.removeClass('is-article-visible');

			// Unlock.
			locked = false;

			// Unmark as switching.
			$body.removeClass('is-switching');

			// Window stuff.
			$window
				.scrollTop(0)
				.triggerHandler('resize.flexbox-fix');

			return;

		}

		// Lock.
		locked = true;

		// Deactivate article.
		$article.removeClass('active');

		// Hide article.
		setTimeout(function () {

			// Hide article, main.
			$article.hide();
			$main.hide();

			// Show footer, header.
			$footer.show();
			$header.show();

			// Unmark as visible.
			setTimeout(function () {

				$body.removeClass('is-article-visible');

				// Window stuff.
				$window
					.scrollTop(0)
					.triggerHandler('resize.flexbox-fix');

				// Unlock.
				setTimeout(function () {
					locked = false;
				}, delay);

			}, 25);

		}, delay);


	};

	// Articles.
	$main_articles.each(function () {

		var $this = $(this);

		// Close.
		$('<div class="close">Close</div>')
			.appendTo($this)
			.on('click', function () {
				location.hash = '';
			});

		// Prevent clicks from inside article from bubbling.
		$this.on('click', function (event) {
			event.stopPropagation();
		});

	});

	// Events.
	$body.on('click', function (event) {

		// Article visible? Hide.
		if ($body.hasClass('is-article-visible'))
			$main._hide(true);

	});

	$window.on('keyup', function (event) {

		switch (event.keyCode) {

			case 27:

				// Article visible? Hide.
				if ($body.hasClass('is-article-visible'))
					$main._hide(true);

				break;

			default:
				break;

		}

	});

	$window.on('hashchange', function (event) {

		// Empty hash?
		if (location.hash == ''
			|| location.hash == '#') {

			// Prevent default.
			event.preventDefault();
			event.stopPropagation();

			// Hide.
			$main._hide();

		}

		// Otherwise, check for a matching article.
		else if ($main_articles.filter(location.hash).length > 0) {

			// Prevent default.
			event.preventDefault();
			event.stopPropagation();

			// Show article.
			$main._show(location.hash.substr(1));

		}

	});

	// Scroll restoration.
	// This prevents the page from scrolling back to the top on a hashchange.
	if ('scrollRestoration' in history)
		history.scrollRestoration = 'manual';
	else {

		var oldScrollPos = 0,
			scrollPos = 0,
			$htmlbody = $('html,body');

		$window
			.on('scroll', function () {

				oldScrollPos = scrollPos;
				scrollPos = $htmlbody.scrollTop();

			})
			.on('hashchange', function () {
				$window.scrollTop(oldScrollPos);
			});

	}

	// Initialize.

	// Hide main, articles.
	$main.hide();
	$main_articles.hide();

	// Initial article.
	if (location.hash != ''
		&& location.hash != '#')
		$window.on('load', function () {
			$main._show(location.hash.substr(1), true);
		});

})(jQuery);

  function showTab(tabId) {
	// const panes = document.querySelectorAll('.tab-pane');
	// panes.forEach(pane => {
	// 	pane.style.display = (pane.id === tabId) ? 'block' : 'none';
	// });
	// const soluoc = document.getElementById('soluoc');
	// if (soluoc) {
	// 	soluoc.classList.add('hidden');
	// 	// soluoc.style.display = 'none';
	// 	// soluoc.style.cssText = 'display: none !important';
	// }
	const panes = document.querySelectorAll('.tab-pane');
		panes.forEach(pane => {
			pane.style.display = 'none';
		});

		// Hiện tab được chọn
		const selectedPane = document.getElementById(tabId);
		if (selectedPane) {
			selectedPane.style.display = 'block';
		}

		// Ẩn phần sơ lược nếu có
		const intro = document.getElementById('soluoc');
		if (intro) {
			intro.hidden=true;
			//intro.classList.add('hidden'); 
		}
}
// const scrollToTopBtn = document.getElementById('scrollToTopBtn');
// window.onscroll = function () {
//     if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
//         scrollToTopBtn.style.display = 'block';
//     } else {
//         scrollToTopBtn.style.display = 'none';
//     }
// };

// // function scrollToTop() {
// //     window.scrollTo({
// //         top: 100,
// //         behavior: 'smooth'
// //     });
// // }
// function scrollToTop() {
//     const visibleArticle = Array.from(document.querySelectorAll('article'))
//     .find(article => window.getComputedStyle(article).display !== 'none');
    
//     if (visibleArticle) {
//         const top = visibleArticle.offsetTop;
//         window.scrollTo({
//             top: top,
//             behavior: 'smooth'
//         });
//     }
// }
// function scrollToTop() {
//     const main = document.getElementById('main');
//     const activeArticle = main.querySelector('article.active');
//     const scrollContainer = activeArticle?.querySelector('.scroll-container');

//     if (scrollContainer) {
//         scrollContainer.scrollTo({
//             top: 0,
//             behavior: 'smooth'
//         });
//     }
// }
function scrollToVisibleTabContent() {
  const visibleTab = Array.from(document.querySelectorAll('.tab-content'))
    .find(tab => tab.style.display !== 'none');

  if (visibleTab) {
    visibleTab.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }
}
const mockData = [
    { name: 'Đào Thúc', position: 'Mục sư' },
    { name: 'Nguyễn Đích', position: 'Truyền đạo' },
    { name: 'Đặng Ngọc Cầu', position: 'Mục sư' },
    { name: 'Đinh Hấp', position: 'Truyền đạo' },
    { name: 'Phan Minh Lang', position: 'Truyền đạo' },
    { name: 'Nguyễn Ngọc Địch', position: 'Mục sư' },
    { name: 'Phan Phụng Vĩnh', position: 'Truyền đạo' },
	{ name: 'Nguyễn Văn Ất', position: '' },
    { name: 'Nguyễn Văn Đẩu', position: 'Truyền đạo' },
	{ name: 'Mai Đức Lý', position: 'Truyền đạo' },
    { name: 'Đặng Ngọc Thọ', position: 'Mục sư' },
	{ name: 'Đặng Ngọc Cang', position: 'Mục sư' },
    { name: 'Nguyễn Văn Thiệt', position: 'Mục sư' },
	{ name: 'Dương Thạnh', position: 'Mục sư' },
	{ name: 'Mã Phúc Minh', position: 'Mục sư' },
	{ name: 'Đặng Ngọc Hồng', position: 'Mục sư' },
	{ name: 'Nguyễn Văn Hai', position: 'Mục sư' },
	{ name: 'Phan Minh Tân', position: 'Mục sư' },
	{ name: 'Đinh Thống', position: 'Mục sư' },
	{ name: 'Nguyễn Hoài Đức', position: 'Mục sư' },
	{ name: 'Nguyễn Văn Sỹ', position: 'Mục sư' },
	{ name: 'Nguyễn Văn Chờ', position: 'Mục sư nhiệm chức' },
	{ name: 'Lê Cao Thu (Lê Văn Đông)', position: 'Mục sư' },
	{ name: 'Mã Phúc Tuân', position: 'Mục sư' },
	{ name: 'Phan Phụng Phục', position: 'Mục sư' },
	{ name: 'Lê Cao Qúy', position: 'Mục sư' },
	{ name: 'Mã Phúc Tín', position: 'Mục sư' },
	{ name: 'Đặng Ngọc Vui', position: 'Mục sư' },
	{ name: 'Phan Minh Ân', position: 'Mục sư' },
	{ name: 'Võ Xuân Sinh', position: 'Mục sư' },
	{ name: 'Lê Thành Hòa', position: 'Mục sư' },
	{ name: 'Lê Thành Chung', position: 'Mục sư' },
	{ name: 'Lê Thành Hiệp', position: 'Mục sư' },
	{ name: 'Mã Phúc Hiệp', position: 'Mục sư' },
	{ name: 'Đinh Văn Tư', position: 'Mục sư' },
	{ name: 'Mã Phúc Thanh Tươi', position: 'Mục sư' },
	{ name: 'Đặng Ngọc Phước', position: 'Mục sư' },
	{ name: 'Phan Phụng Thanh', position: 'Mục sư' },
	{ name: 'Phan Phụng Khôi', position: 'Mục sư nhiệm chức' },
	{ name: 'Phan Minh Hội', position: 'Mục sư' },
	{ name: 'Dương Quang Hòa', position: 'Mục sư' },
	{ name: 'Mã Phúc Thạch', position: 'Mục sư' },
	{ name: 'Mã Phúc Tấn', position: 'Mục sư' },
	{ name: 'Trần Hữu Phước', position: 'Mục sư' },
	{ name: 'Trần Hữu Truyền', position: 'Mục sư' },
	{ name: 'Đặng Ngọc Minh', position: 'Mục sư' },
	{ name: 'Dương Quang Nhân', position: 'Mục sư' },
	{ name: 'Nguyễn Thanh Phiên', position: 'Mục sư' },
	{ name: 'Nguyễn Hoài Nhơn', position: 'Mục sư' },
	{ name: 'Phan Phụng Hưng', position: 'Mục sư' },
	{ name: 'Đinh Thi', position: 'Mục sư' },
	{ name: 'Đinh Thuận', position: 'Mục sư nhiệm chức' },
	{ name: 'Đào Việt Tiến', position: 'Mục sư' },
	{ name: 'Lê Cao Trọng Đạo', position: 'Mục sư' },
	{ name: 'Nguyễn Công Văn', position: 'Mục sư' },
	{ name: 'Trà Phục', position: 'Mục sư' },
	{ name: 'Hồ Cơ Nghiệp', position: 'Mục sư' },
	{ name: 'Nguyễn Văn Hường', position: 'Mục sư nhiệm chức' },
	{ name: 'Nguyễn Thị Bình', position: 'Nữ truyền đạo' },
	{ name: 'Nguyễn Ngọc Ánh', position: 'Mục sư' },
	{ name: 'Huỳnh Trung Thiên', position: 'Mục sư' },
	{ name: 'Phan Minh Quang', position: 'Mục sư' },
	{ name: 'Đặng Ngọc Thiên Ân', position: 'Mục sư' },
	{ name: 'Phan Minh Hải', position: 'Mục sư' },
	{ name: 'Hà Ngọc Khai', position: 'Mục sư nhiệm chức' },
	{ name: 'Nguyễn Hữu Dũng', position: 'Mục sư nhiệm chức' },
	{ name: 'Nguyễn Bảo Lộc', position: 'Mục sư' },
	{ name: 'Đinh Thiệu', position: 'Mục sư nhiệm chức' },
	{ name: 'Đinh Thuyên', position: 'Truyền đạo' },
	{ name: 'Nguyễn Văn Việt', position: 'Truyền đạo' },
	{ name: 'Trần Ngọc Ánh', position: 'Truyền đạo' },
	{ name: 'Phan Phụng Khánh', position: 'Truyền đạo' },
	{ name: 'Trần Hữu Thiên', position: 'Truyền đạo' },
  ];
  

  const tbody = document.getElementById('staff-table-body');
  

  mockData.forEach((person, index) => {
    const row = document.createElement('tr');

    const sttCell = document.createElement('td');
    sttCell.textContent = index + 1;
	const positionCell = document.createElement('td');
    positionCell.textContent = person.position;

    const nameCell = document.createElement('td');
    nameCell.textContent = person.name;

    

    row.appendChild(sttCell);
	row.appendChild(positionCell);
    row.appendChild(nameCell);
    

    tbody.appendChild(row);
  });
const mockData1 = [
    { name: 'Nguyễn Thị Hường', position: 'Phu nhân TĐ.Phan Minh Lang' },
    { name: 'Nguyễn Thị Chữ', position: 'Phu nhân Mục sư Hoàng Trọng Nhựt' },
    { name: 'Phan Thị Tặng', position: 'Phu nhân Mục sư Lê Văn Tôi' },
    { name: 'Nguyễn Thị Liên', position: 'Phu nhân Mục sư Dương Thạnh' },
    { name: 'Nguyễn Thị Thà', position: 'Phu nhân Mục sư Mã Phúc Minh' },
    { name: 'Đinh Thị Khoái', position: 'Phu nhân Mục sư Nguyễn Văn Lịch' },
    { name: 'Phan Thị Thời', position: 'Phu nhân Mục sư Nguyễn Thân Phẩm' },
	{ name: 'Phan Thị Soạn', position: 'Phu nhân TĐ.Nguyễn Hữu Thuận' },
    { name: 'Từ Thị Thuận', position: 'Phu nhân Mục sư Nguyễn Minh Thắng' },
	{ name: 'Dương Thị Vinh', position: 'Phu nhân Mục sư Hoàng Ngọc Quang' },
    { name: 'Phan Thị Tính', position: 'Phu nhân Mục sư Nguyễn Tấn Cảnh' },
	{ name: 'Nguyễn Thị Ngà', position: 'Phu nhân Mục sư Nguyễn Phú Ngọc' },
    { name: 'Dương Thị Tám', position: 'Phu nhân MsNc.Trương Tương' },
	{ name: 'Phan Thị Lai', position: 'Phu nhân Mục sư Mã Phúc Tín' },
	{ name: 'Dương Thị Phước', position: 'Phu nhân Mục sư Bùi Thanh Nhàn' },
	{ name: 'Đào Thị Thuận', position: 'Phu nhân Mục sư Võ Xuân Sinh' },
	{ name: 'Trần Thị Phước May', position: 'Phu nhân Mục sư Võ Đông Thu' },
	{ name: 'Nguyễn Thị Hoa', position: 'Phu nhân Mục sư Khấu Anh Tuấn' },
	{ name: 'Nguyễn Thị Hường', position: 'Phu nhân Mục sư Nguyễn Ngọc Anh' },
	{ name: 'Nguyễn Thị Hồng Hoa', position: 'Phu nhân Mục sư Trần Hữu Phước' },
	{ name: 'Đinh Thị Thủy Thương', position: 'Phu nhân Mục sư Nguyễn Huy Bân' },
	{ name: 'Nguyễn Thị Dung Nguyệt', position: 'Phu nhân Mục sư Nguyễn Quang Đức' },
	{ name: 'Lê Thị Chanh', position: 'Phu nhân Mục sư Ngô Toàn' },
	{ name: 'Đặng Thị Ngọc Thanh', position: 'Phu nhân Mục sư Nguyễn Quí Hùng' },
	{ name: 'Nguyễn Thị Thủy Tiên', position: 'Phu nhân Mục sư Nguyễn Đình Quy' },
	{ name: 'Lê Thị Khánh Trang', position: 'Phu nhân Mục sư Phan Phụng Hưng' },
	{ name: 'Huỳnh Thị Hai', position: 'Phu nhân Mục sư Phan Công Văn' },
	{ name: 'Mã Thị Mỹ Diệu', position: 'Phu nhân Mục sư Nguyễn Hồng Quang' },
	{ name: 'Nguyễn Thị Thảo', position: 'Phu nhân MsNc.Bùi Văn Chí' },
	{ name: 'Đinh Thị Hồ Thủy', position: 'Phu nhân Mục sư Mai Hồng Sanh' },
	{ name: 'Nguyễn Thị Vân', position: 'Phu nhân Mục sư Nhu Si-ôn' },
	{ name: 'Nguyễn Thị Minh Nguyệt', position: 'Phu nhân Mục sư Nguyễn Nam Trung' },
	{ name: 'Nguyễn Thị Kiều Trang', position: 'Phu nhân MsNc.Nguyễn Hữu Thượng Thanh' },
	{ name: 'Phan Thị Hòa Hương', position: 'Phu nhân TĐ.Lê Thiện Tuyến' },
	{ name: 'Nguyễn Thị Thái An', position: 'Phu nhân TĐ.Phan Trọng Vinh' },
	{ name: 'Nguyễn Thị Kiều Phương', position: 'Phu nhân Mục sư Trần Thái Nghiêm' },
	{ name: 'Nguyễn Thị Tiên Dung', position: 'Phu nhân Mục sư Nguyễn Thân Ái' },
	{ name: 'Phan Phụng Thị Hiền', position: 'Phu nhân Mục sư Triệu Nguyên Thiên Phúc' },
	{ name: 'Phan Nguyễn Lan Thảo', position: 'Phu nhân Mục sư Nguyễn Công Nghĩa' },
	{ name: 'Phan Thị Hòa', position: 'Phu nhân MsNc.Hà Ngọc Khai' },
	{ name: 'Nguyễn Thị Hồng', position: 'Phu nhân MsNc.Nguyễn Thanh Hòa' },
	{ name: 'Thái Thị Minh Hiền', position: 'Phu nhân TĐ.Trần Thanh Hoàng' },
	{ name: 'Nguyễn Thị Tuyết Hạnh', position: 'Phu nhân MsNc.Lê Minh Trí' },
	{ name: 'Trần Thị Mỹ Liên', position: 'Phu nhân MsNc.Lê An Khương' },
	{ name: 'Phan Thị Thùy Trang', position: 'Phu nhân MsNc.Võ Văn Hiển' },
	{ name: 'Phan Thị Hoàng Diệu', position: 'Phu nhân MsNc.Trần Văn Cảnh' }
  ];
const tbody1 = document.getElementById('staff-table-body1');
mockData1.forEach((person, index) => {
    const row = document.createElement('tr');

    const sttCell = document.createElement('td');
    sttCell.textContent = index + 1;
	const positionCell = document.createElement('td');
    positionCell.textContent = person.position;

    const nameCell = document.createElement('td');
    nameCell.textContent = person.name;

    

    row.appendChild(sttCell);
	row.appendChild(positionCell);
    row.appendChild(nameCell);
    

    tbody1.appendChild(row);
  });


