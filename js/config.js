var Config = {
	crawlerInfo: [{
		name: 'Màu',
		jquery: '.specification-table td:contains("Màu") + td'
	},{
		name: 'Pin',
		jquery: '.specification-table td:contains("Loại pin") + td'
	},{
		name: 'Tốc độ CPU (GHz)',
		jquery: '.specification-table td:contains("Tốc độ CPU (GHz)") + td'
	},{
		name: 'Kích thước màn hình',
		jquery: '.specification-table td:contains("Kích thước màn hình") + td'
	},{
		name: 'Độ phân giải màn hình (pixels)',
		jquery: '.specification-table td:contains("Độ phân giải màn hình (pixels)") + td'
	},{
		name: 'Đặc điểm hiển thị',
		jquery: '.specification-table td:contains("Đặc điểm hiển thị") + td'
	},{
		name: 'Độ phân giải camera (MP)',
		jquery: '.specification-table td:contains("Độ phân giải camera (MP)") + td'
	},{
		name: 'Model',
		jquery: '.specification-table td:contains("Model") + td'
	},{
		name: 'Hệ điều hành',
		jquery: '.specification-table td:contains("Hệ điều hành") + td'
	},{
		name: 'Kích thước sản phẩm (D x R x C cm)',
		jquery: '.specification-table td:contains("Kích thước sản phẩm (D x R x C cm)") + td'
	},{
		name: 'Bảo hành',
		jquery: '.specification-table td:contains("Bảo hành") + td'
	},{
		name: 'Trọng lượng (KG)',
		jquery: '.specification-table td:contains("Trọng lượng (KG)") + td'
	},{
		name: 'Sản xuất tại',
		jquery: '.specification-table td:contains("Sản xuất tại") + td'
	},{
		name: 'Bộ nhớ trong (GB)',
		jquery: '.specification-table td:contains("Bộ nhớ trong (GB)") + td'
	},{
		name: 'Độ phân giải camera (MP)',
		jquery: '.specification-table td:contains("Độ phân giải camera (MP)") + td'
	},{
		name: 'Dung lượng ổ cứng (GB)',
		jquery: '.specification-table td:contains("Dung lượng ổ cứng (GB)") + td'
	}],

	nameProduct: {
		name: '',
		jquery: '#prod_title'
	},
	rating: {
		name: '',
		jquery: '#rating .itm-ratStars.itm-ratRating'
	},
	countRating: {
		name: '',
		jquery: '#review > a.prd-reviews'
	},

	image: {
		name: 'Hình ảnh',
		jquery: '#productImageBox > .productImage'
	},
	price: {
		name: 'Giá',
		jquery: '.specification-table td:contains("Giá") + td'
	},
	inStock: {
		name: 'Còn hàng',
		jquery: '.outofstock'
	},
	inBox: {
		name: 'Trong hộp',
		jquery: '.inbox__wrap .inbox__item span'
	}


};