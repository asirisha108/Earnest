exports.config = {
  framework: 'jasmine',
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: ['./specs/T1.js',
	      './specs/T2.js'],
  onPrepare : function(){
	  browser.waitForAngularEnabled(false)
	  browser.get('https://jungle-socks.herokuapp.com/');
	  browser.manage().window().maximize();
  }
}