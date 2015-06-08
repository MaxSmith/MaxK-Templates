var app = {};

app.group_apps = [
	{
		caption: 'Products', // Заголовок
		active: true, // Тот который открыть вначале, то которе активно
		icon: 'i/apps/icons/cart.svg', // Путь к иконке
		click: function (list_group_api, item, $panel) {
			// Выполняется когда юзер кликает на табе с приложением
		},
	},
	{
		caption: 'Customer',
		icon: 'i/apps/icons/customer.svg',
		build: function (list_group_api, item, $panel) {
			// Выполняется единожды, когда приложение впервые билдается
		}
	},
	{
		caption: 'Emails',
		icon: 'i/apps/icons/envelope.svg',
		disabled: true, // Заблокировать приложение
		before_show: function (list_group_api, item, $panel) {
			// Выполнить перед открытием приложения
		},
		after_show: function (list_group_api, item, $panel) {
			// Выполнить после открытия приложения
		}
	}
];

var list_group_options = {

    data: [{
          list: app.group_apps
    }],

    complete: function ( list_group_api ) {
		
		// Выполняется один раз, когда list_group собран и готов к работе

        // list_group_api.place.$application - это весь $DOM от list_group

    }

};

var list_group_api = window.list_group.build( list_group_options );