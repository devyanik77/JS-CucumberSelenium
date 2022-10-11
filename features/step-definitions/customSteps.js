const { When, Then, After, Before, Given } = require('@cucumber/cucumber')
const { expect } = require('chai')

const { By } = require('selenium-webdriver')
const { initDriver } = require('../utils/driverUtil')
require('chromedriver');

var driver;
let sum = 0;

Before(function () {
  driver = initDriver()
});
After(function () {
  driver.quit();
});


When('I add {int} and {int}', function (num1, num2) {
  sum = num1 + num2;
});
Then('the result should be {int}', function (result) {
  expect(sum).equal(result);
});


When('I visit google homepage', { timeout: 60 * 1000 }, async () => {
  await driver.get('https://www.google.com/');
});
When('I search for india', { timeout: 60 * 1000 }, async () => {
  await driver.findElement(By.name('q')).sendKeys('india');
  await driver.findElement(By.name('btnK')).click();
});
Then('I should see result', { timeout: 60 * 1000 }, async () => {
  let text = await driver.findElement(By.xpath("//h3[contains(text(),'India - Wikipedia')]")).getText();
  console.log(text);
});