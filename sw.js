const cacheName = 'v1';

const cacheItems = [
	'/',
	'/index.html',
	'/restaurant.html',
	'/README.md',
	'/css/styles.css',
	'/js/dbhelper.js',
	'/js/main.js',
	'/js/registerSW.js',
	'/js/restaurant_info.js',
	'/data/restaurants.json',
	'/img/1.jpg',
	'/img/2.jpg',
	'/img/3.jpg',
	'/img/4.jpg',
	'/img/5.jpg',
	'/img/6.jpg',
	'/img/7.jpg',
	'/img/8.jpg',
	'/img/9.jpg',
	'/img/10.jpg'
];

console.log('SW Registered!');

self.addEventListener('install', function(e) {
	console.log('caching files');
	e.waitUntil(
		caches.open(cacheName)
		.then(function(cache) {
			console.log('cache now')
			return cache.addAll(cacheItems);
		})
		.catch(function(error) {
			console.log(error);
		})
	);
});


self.addEventListener('fetch', function(e) {
	e.respondWith(
		caches.match(e.request).then(function(response){
			if(response) return response;
			return fetch(e.request)
			.then(function(response){
				const resp = response.clone();
				caches.open(cacheName).then(function(cache) {
					cache.put(e.request, resp);
				})
				return response;
			})						
		})
	);
});