
var photos = ['corgilob.jpg', 'scuba.jpeg', 'twodogs.jpg'];

function View(tagName, obj) {
	this.element = document.createElement(tagName);
	this.data = obj || null;
}

View.prototype.render = function () {};
View.prototype.bindEvents = function () {};
View.prototype.destroy = function () {

};

function GalleryView () {
	View.apply(this, arguments);
// runs a functon with this and some of the arguments or an array
}

GalleryView.prototype = Object.create(View.prototype);

GalleryView.prototype.render = function () {
	var _this = this;

	var largeImage = document.createElement('img');
	largeImage.classList.add('full');
	this.element.appendChild(largeImage);
	largeImage.src = this.data[0];
	
	var wrapper = document.createElement('div');
	wrapper.classList.add('wrapper');
	this.element.appendChild(wrapper);
	
	this.data.forEach(function (imgUrl) {
		var thumb = new ThumbnailView('img', imgUrl);
		thumb.render();
		_this.element.appendChild(thumb.element);
		wrapper.appendChild(thumb.element);

	});

	this.bindEvents();
};

GalleryView.prototype.bindEvents = function() {
	var _this = this;

	var fullImg = this.element.querySelector('.full');
	fullImg.addEventListener('click', function() {
		fullImg.classList.toggle('fullscreen');
	

  });
}

function ThumbnailView () {
	View.apply(this, arguments);
}

ThumbnailView.prototype = Object.create(View.prototype);

ThumbnailView.prototype.render = function () {
	
	this.element.setAttribute('src', this.data);
	this.element.classList.add('thumbnail');

	this.bindEvents();

};

ThumbnailView.prototype.bindEvents = function () {
	var _this = this;
	this.element.addEventListener('click', function() {
		var largeImage = document.querySelector('.full');
		largeImage.setAttribute('src', _this.data);
	});
	
};


	

var gv = new GalleryView('div', photos);

gv.render();

document.body.appendChild(gv.element);

