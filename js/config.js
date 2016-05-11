var Config = {
	crawlerInfo: [{
		name: 'Color',
		jquery: '.specification-table td:contains("Màu") + td'
	},{
		name: 'Battery',
		jquery: '.specification-table td:contains("Loại pin") + td'
	},{
		name: 'CPU Speed (GHz)',
		jquery: '.specification-table td:contains("Tốc độ CPU (GHz)") + td'
	},{
		name: 'Screen Size',
		jquery: '.specification-table td:contains("Kích thước màn hình") + td'
	},{
		name: 'Screen Solution (pixels)',
		jquery: '.specification-table td:contains("Độ phân giải màn hình (pixels)") + td'
	},{
		name: 'Display specific',
		jquery: '.specification-table td:contains("Đặc điểm hiển thị") + td'
	},{
		name: 'Camera (MP)',
		jquery: '.specification-table td:contains("Độ phân giải camera (MP)") + td'
	},{
		name: 'Model',
		jquery: '.specification-table td:contains("Model") + td'
	},{
		name: 'OS',
		jquery: '.specification-table td:contains("Hệ điều hành") + td'
	},{
		name: 'Size (D x R x C cm)',
		jquery: '.specification-table td:contains("Kích thước sản phẩm (D x R x C cm)") + td'
	},{
		name: 'Warranty',
		jquery: '.specification-table td:contains("Bảo hành") + td'
	},{
		name: 'Weight (KG)',
		jquery: '.specification-table td:contains("Trọng lượng (KG)") + td'
	},{
		name: 'Made in',
		jquery: '.specification-table td:contains("Sản xuất tại") + td'
	},{
		name: 'RAM (GB)',
		jquery: '.specification-table td:contains("Bộ nhớ trong (GB)") + td'
	},{
		name: 'Storage (GB)',
		jquery: '.specification-table td:contains("Dung lượng ổ cứng (GB)") + td'
	}],

	nameProduct: {
		name: '',
		jquery: '#prod_title'
	},
	rating: {
		name: '',
		jquery: '.rating .product-card__rating__stars div:eq(1)'
	},
	countRating: {
		name: '',
		jquery: '#review > a.prd-reviews'
	},

	image: {
		name: 'Image',
		jquery: '#productImageBox > .productImage'
	},
	price: {
		name: 'Price',
		jquery: '#special_price_box'
	},
	inStock: {
		name: 'In stock',
		jquery: '.outofstock'
	},
	inBox: {
		name: 'Inbox',
		jquery: '.inbox__wrap .inbox__item span'
	}


};