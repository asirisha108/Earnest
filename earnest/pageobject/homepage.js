var homepage = function(){
	this.header = element(by.xpath("/html/body/h1"))
	this.helptext = element(by.xpath("/html/body/p"))
	this.tableheaders = element.all(by.xpath("/html/body/form/table[1]/tbody/tr[1]"))
	this.table = element.all(by.xpath("/html/body/form/table[1]"))
	
	this.state = element(by.xpath("/html/body/form/table[2]/tbody/tr/td[2]/select"))
	this.checkout = element(by.name("commit"))
	
	this.selectDropdownbyNum = function(elm, name ) {
		  if (name){
		    var option = elm.all(by.xpath('//option[@value="'+name+'"]')).get(0).click();
		      
		  }
	};
}
module.exports = homepage