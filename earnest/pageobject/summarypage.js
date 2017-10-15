var summarypage = function(){
	this.header = element(by.xpath("/html/body/h1"))
	this.subtotal = element(by.xpath("//*[@id='subtotal']"))
	this.taxes = element(by.xpath('//*[@id="taxes"]'))
	this.total = element(by.xpath('//*[@id="total"]'))
}
module.exports = summarypage