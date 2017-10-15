var homepage = require("../pageobject/homepage.js")
var summarypage = require("../pageobject/summarypage.js")
var catalog = require("../catalog.json")

describe("T1", function(){
	var hpage = new homepage;
	var spage = new summarypage;
	
	it('Verify home page elements', function(){
		hpage.header.getText().then(function(text){
			expect(text).toBe("Welcome To Jungle Socks!")
			});
		hpage.helptext.getText().then(function(text){
			expect(text).toBe("Please enter the quantiy of each kind of sock and then click the checkout button")
			});
		var cols = hpage.tableheaders.all(by.tagName('th'));
		var columnNames = cols.map(function(elm) {
			return elm.getText();
		}).then(function(columnNames) {
			expect(columnNames).toEqual([ 'Name', 'Price', 'In Stock', 'Quantity' ])
			});
	})
	
	it('Verify inventory', function(){
		var products = catalog['products']
		var rows = hpage.table.all(by.tagName('tr')).then(function(rows){
			rows.forEach(function(row, i){
				var cols = row.all(by.tagName('td'));
				var colNames = cols.map(function(elm) {
					return elm.getText();
				}).then(function(text) {
					if (i > 0) {
						var info = catalog['products'][i-1]
						expect(text[0]).toBe(info['name'])
						expect(text[1]).toBe(info['price'])
						expect(text[2]).toBe(info['inventory_count'])
					}
				})
				
			})
		});
	})		
})