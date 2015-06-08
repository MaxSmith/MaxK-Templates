(function($){
	
	var app = {
		
        // *** Не обязательный метод ***
		preparing: function( api, complete ){
			
			// Ве что в data имеет null - учавствует в подсчете progress
			
			var data = {
				template_aaa: null,
				bbb: null,
				ccc: null,
				ddd: null,
              // nnn: null и т.д. сколько и каких данных зависит от каждого приложения
			};
			
			// Progress api
			var progress = window.progress( data, {
				
                // *** Не обязательный *** Вызывается после каждой загрузки
				progress: function( percent ){
					api.progress( percent );
				},
				
                // Вызывается по окончанию всей загрузки
				complete: function(){
					complete( data );
				}
				
			});
			
			// Ниже вызываются загрузчики, по окончанию в них вызывается проверка готовности is_complete()
			
			// Load some HB templates
			
			$.crm.template.load( $.crm.template.url["aaa"], function( template ){
				
				data.template_aaa = template;
				progress.complete(); // Обновляем прогресс
				
			});
			
			// Chache post (смотри /js/crm.js) если надо данные передать делай так 
			// $.crm.cache.load_post( $.crm.url["bbb"], my_json, function( response ){})
			
			$.crm.cache.load_post( $.crm.url["bbb"], function( response ){
				
				data.bbb = response;
				progress.complete(); // Обновляем прогресс
				
			});
			
			// Chache get
			
			$.crm.cache.load( $.crm.url["ccc"], function( response ){
				
				data.ccc = response;
				progress.complete(); // Обновляем прогресс
				
			});

			// Simple Ajax
			
			window.AjaxApi.post( $.crm.url["ccc"], get_terms_data, function( response ){
					
				data.terms = response.data;
				is_complete();
				
			});
			
		},
		
      // *** Обязательный метод ***
		init: function( options ){
			
			// Start API
			
			var api = {};
			
			// Preloading templates & data
			
			app.preparing( api, function( data ){
				
				api.data = data;
				
				app.build( api );
			
				// Complete method
				
				if( api.complete ){
					api.complete( api );
				}
			
			});
			
			return api;
			
		},
		
      // *** Обязательный метод ***
		build: function( api ){
			
			// For example: set handlebars context
			
          var context = {
				application: {
                   // И так далее
                },
				data: api.data
			};
			
			// For example: Build $HB
			
			api.$application = $( api.data.template(context) );
			
			// For example: $elements in applications set into api
			
			api.$aaa = api.$application.find('.js-aaa');
			api.$bbb = api.$application.find('.js-bbb');
			
			
		},
		
		// Some methods for app goes here
		// <----- 
		
		// Some help methods
		
		some_set: function( options ){
			
			window.AjaxApi.post( $.crm.url["some_set"], options.data, options.success);
			
		},
		
		some_del: function( options ){
			
			window.AjaxApi.post( $.crm.url["some_del"], options.data, options.success);
			
		},
		
	};
	
	// Local Handlebars helpers goes here
	// <----- 
	
	// Set app to window
	
	window.my_best_application = app;
	
})(jQuery);
