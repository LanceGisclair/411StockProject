stockApp.service('FactoryService',[function () {

this.makePortfolioObject = makePortfolioObject;
this.makeTransactionObject = makeTransactionObject;
this.makeWatchObject = makeWatchObject;
this.changeSqlArrayToPortfolioJsonObject = changeSqlArrayToPortfolioJsonObject;
this.changeSqlArrayToTransactionJsonObject = changeSqlArrayToTransactionJsonObject;
this.changeSqlArrayToWatchJsonObject = changeSqlArrayToWatchJsonObject;
this.tryCatchError = tryCatchError;
this.getCurrentStateInt = getCurrentStateInt;
this.formatDate = formatDate;
this.formatDatePickerDate = formatDatePickerDate;
this.formatDateToMMDDYYYY = formatDateToMMDDYYYY;
this.formatDateToYYYYMMDD = formatDateToYYYYMMDD;
this.getPreviousDay = getPreviousDay;
this.makeObjectForMarketPage = makeObjectForMarketPage;
this.formatDateForYahoo = formatDateForYahoo;
this.getPreviousDay = getPreviousDay;
this.getDateMinusOneDay = getDateMinusOneDay;
this.getDateAddDate = getDateAddDate;

function makeObjectForMarketPage(symbol, difference){
  difference = parseFloat(difference.toFixed(2));
  if(difference > 0){
    difference = "+"+difference;
  }
  difference +="";

  var stockObj = {
    "Symbol" : symbol,
    "ChangePercent" : difference
  }
  return stockObj;
}

function getPreviousDay(date){
  var isoDate = formatDatePickerDate(date, "/", "-");
  var currentDate = new Date(isoDate).toISOString();
  var yesterday = new Date(currentDate);
  var hyesterday = yesterday.toLocaleDateString();
  hyesterday = formatDateToYYYYMMDD(hyesterday);
  return hyesterday;
}

function formatDateToYYYYMMDD(date){
  var MMDD = date.substring(0,5);
  var year = date.substring(6,10);
  var newDate = year + '/' + MMDD;
  return newDate;
}

function formatDateToMMDDYYYY(date){
  var year = date.substring(0,4);
  var MMDD = date.substring(5,10);
  var newDate = MMDD + '/' + year;
  
  return newDate;
}

function formatDatePickerDate(date, charToChange, charToChangeTo) {
  for(i = 0; i< date.length; i++){
    date = date.replace(charToChange,charToChangeTo);
  }
  return date;
}

function formatDate(date){
  var month = date.getUTCMonth() + 1; //months from 1-12
  var day = date.getUTCDate()-1;
  var year = date.getUTCFullYear();

  return year + '/' + month + '/' + day + "";
}

function formatDateForYahoo(date){
  var month = date.getUTCMonth() + 1; //months from 1-12
  var day = date.getUTCDate()-1;
  var year = date.getUTCFullYear();

  return year + '-' + month + '-' + day + "";
}

function getCurrentStateInt(state){
  var isLive;
  var currentState= state.substr(0, state.indexOf('.'));
  if(currentState === 'live'){
    isLive = 0;
  }else{
    isLive = 1;
  }
  return isLive;
}

function changeSqlArrayToPortfolioJsonObject(array){
jsonObject = [];

for (object in array[0].values)
{
  var portfolio = {
    "portfolioId" : array[0].values[object][0],
    "portfolioName" : array[0].values[object][1],
    "isLive" : array[0].values[object][2],
    "startDate" : array[0].values[object][3],
    "endDate" : array[0].values[object][4],
    "currentDate" : array[0].values[object][5],
    "currency" : array[0].values[object][6],
    "active" : array[0].values[object][7]
  };
  jsonObject.push(portfolio);
  }
return jsonObject;
}

function changeSqlArrayToTransactionJsonObject(array){
jsonObject = [];

  for (object in array[0].values)
  {
    var transaction = {
      "portfolioId" : array[0].values[object][1],
      "symbol" : array[0].values[object][2],
      "tradeTime" : array[0].values[object][3],
      "stockValue" : array[0].values[object][4],
      "totalShares" : array[0].values[object][5],
      "totalSharesAtTransaction" : array[0].values[object][6],
      "numberOfShares" : array[0].values[object][7],
      "buyOrSell" : array[0].values[object][8],
      "currencyAtTransaction" : array[0].values[object][9],
      "totalPrice" : array[0].values[object][10],
      "portfolioBalance" : array[0].values[object][11]
  };
  jsonObject.push(transaction);
  }
return jsonObject;
}

function changeSqlArrayToWatchJsonObject(array){
jsonObject = [];

  for (object in array[0].values)
  {
    var watch = {
      "portfolioId" : array[0].values[object][1],
      "symbol" : array[0].values[object][2],
      "priceWhenAdded" : array[0].values[object][3],
      "dateWhenAdded" : array[0].values[object][4]
  };
  jsonObject.push(watch);
  }
return jsonObject;
}

function makePortfolioObject(portfolioName, isLive, startDate, endDate, currentDate, currency, active){
  var portfolio = {
    "portfolioName" : portfolioName,
    "isLive" : isLive,
    "startDate" : startDate,
    "endDate" : endDate,
    "currentDate" : currentDate,
    "currency" : currency,
    "active" : active
  };

  return portfolio;
}

function makeWatchObject(portfolioId, symbol, priceWhenAdded, dateWhenAdded){
  var watch = {
    "portfolioId" : portfolioId,
    "symbol" : symbol,
    "priceWhenAdded" : priceWhenAdded,
    "dateWhenAdded" : dateWhenAdded
  };

  return watch;
}

function makeTransactionObject(portfolioId, symbol, tradeTime, stockValue, totalShares, totalSharesAtTransaction, numberOfShares, buyOrSell, currencyAtTransaction, totalPrice, portfolioBalance){
  var transaction = {
    "portfolioId" : portfolioId,
    "symbol": symbol,
    "tradeTime" : tradeTime,
    "stockValue" : stockValue,
    "totalShares": totalShares,
    "totalSharesAtTransaction" : totalSharesAtTransaction,
    "numberOfShares" : numberOfShares,
    "buyOrSell" : buyOrSell,
    "currencyAtTransaction" : currencyAtTransaction,
    "totalPrice" : totalPrice,
    "portfolioBalance" : portfolioBalance
  };

  return transaction;
}

function tryCatchError(message){
  var errorObject = {
    "errorMessage" : message
  }
  return [errorObject];
}

function getDateMinusOneDay(date){

  var yearMinusOne = date.getFullYear();
  var month = date.getMonth() + 1;
  var day = date.getDate()-1;

  var returnDate = yearMinusOne + "-" + month + "-" + day;

  return returnDate;
}

function getDateAddDate(date){

  var yearMinusOne = date.getFullYear();
  var month = date.getMonth() + 1;
  var day = date.getDate() + 1;

  var returnDate = yearMinusOne + "-" + month + "-" + day;

  return returnDate;
}
}]);
