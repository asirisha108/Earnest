var homepage = require("../pageobject/homepage.js")
var summarypage = require("../pageobject/summarypage.js")
var catalog = require("../catalog.json")
var testdata = require("../testdata.json")
var ntestdata = require("../negativetestdata.json")

describe("T2", function(){
	var hpage = new homepage;
	var spage = new summarypage;

	testdata.forEach(function(data, i) {
		it('select quantity', function(){
			var rows = hpage.table.all(by.name('line_items[][quantity]')).then(function(rows){
				rows.forEach(function(row, j){
						row.click().sendKeys(data['quantity'][j])
				})
			});
			hpage.selectDropdownbyNum(hpage.state, data['state'])
			hpage.checkout.click().then(function() {
				spage.header.getText().then(function(text){
					expect(text).toBe("Please Confirm Your Order")
					var stotal = 0.0
					catalog['products'].forEach(function(product,k){
						stotal += parseFloat(product['price'])*parseFloat(data['quantity'][k])
					})
					var staxes = stotal * parseFloat(data['taxes'])
					var total = stotal +staxes
					spage.subtotal.getText().then(function (text){
						var price = Number(text.replace(/[^0-9\.-]+/g,""));
						expect(price).toBe(stotal);	
					})
					spage.taxes.getText().then(function (text) {
						var taxes = Number(text.replace(/[^0-9\.-]+/g,""));
						expect(taxes).toBe(staxes);
					})
					spage.total.getText().then(function(text){
						text = Number(text.replace(/[^0-9\.-]+/g,""))
						expect(text).toBe(total,"total incorrect")
					})
					browser.navigate().back();
					browser.refresh();
					}); 
				
			})
		})
	})
	
	it("verifies negative data", function(){
		ntestdata.forEach(function(data, i){
			var rows = hpage.table.all(by.name('line_items[][quantity]')).then(function(rows){
				rows.forEach(function(row, j){
						row.click().sendKeys(data['quantity'][j])
				})
			});
			hpage.selectDropdownbyNum(hpage.state, data['state'])
			hpage.checkout.click().then(function(){
		    spage.header.getText().then(function(text){
		    	     expect(text).not.toBe("Please Confirm Your Order")
		    })
			})
		})
	})


})