// var customCheckout = customcheckout();
//       $(document).ready(function() {
//         /* global customcheckout */
//         (function() {
//           var customCheckout = customcheckout();

//           var isCardNumberComplete = false;
//           var isCVVComplete = false;
//           var isExpiryComplete = false;

//           var customCheckoutController = {
//             init: function() {
//               console.log("checkout.init()");
//               this.createInputs();
//               this.addListeners();
//             },
//             createInputs: function() {
//               console.log("checkout.createInputs()");
//               var options = {};

//               // Create and mount the inputs
//               options.placeholder = "Card number";
//               customCheckout.create("card-number", options).mount("#card-number");

//               options.placeholder = "CVV";
//               customCheckout.create("cvv", options).mount("#card-cvv");

//               options.placeholder = "MM / YY";
//               customCheckout.create("expiry", options).mount("#card-expiry");
//             },
//             addListeners: function() {
//               var self = this;

//               // listen for submit button
//               if (document.getElementById("cust-checkout-form") !== null) {
//                 document
//                   .getElementById("cust-checkout-form")
//                   .addEventListener("submit", self.onSubmit.bind(self));
//               }

//               customCheckout.on("brand", function(event) {
//                 console.log("brand: " + JSON.stringify(event));

//                 var cardLogo = "none";
//                 if (event.brand && event.brand !== "unknown") {
//                   var filePath =
//                     "https://cdn.na.bambora.com/downloads/images/cards/" +
//                     event.brand +
//                     ".svg";
//                   cardLogo = "url(" + filePath + ")";
//                 }
//                 document.getElementById("card-number").style.backgroundImage = cardLogo;
//               });

//               customCheckout.on("blur", function(event) {
//                 console.log("blur: " + JSON.stringify(event));
//               });

//               customCheckout.on("focus", function(event) {
//                 console.log("focus: " + JSON.stringify(event));
//               });

//               customCheckout.on("empty", function(event) {
//                 console.log("empty: " + JSON.stringify(event));

//                 if (event.empty) {
//                   if (event.field === "card-number") {
//                     isCardNumberComplete = false;
//                   } else if (event.field === "cvv") {
//                     isCVVComplete = false;
//                   } else if (event.field === "expiry") {
//                     isExpiryComplete = false;
//                   }
//                   self.setPayButton(false);
//                 }
//               });

//               customCheckout.on("complete", function(event) {
//                 console.log("complete: " + JSON.stringify(event));

//                 if (event.field === "card-number") {
//                   isCardNumberComplete = true;
//                   self.hideErrorForId("card-number");
//                 } else if (event.field === "cvv") {
//                   isCVVComplete = true;
//                   self.hideErrorForId("card-cvv");
//                 } else if (event.field === "expiry") {
//                   isExpiryComplete = true;
//                   self.hideErrorForId("card-expiry");
//                 }

//                 self.setPayButton(
//                   isCardNumberComplete && isCVVComplete && isExpiryComplete
//                 );
//               });

//               customCheckout.on("error", function(event) {
//                 console.log("error: " + JSON.stringify(event));

//                 if (event.field === "card-number") {
//                   isCardNumberComplete = false;
//                   self.showErrorForId("card-number", event.message);
//                 } else if (event.field === "cvv") {
//                   isCVVComplete = false;
//                   self.showErrorForId("card-cvv", event.message);
//                 } else if (event.field === "expiry") {
//                   isExpiryComplete = false;
//                   self.showErrorForId("card-expiry", event.message);
//                 }
//                 self.setPayButton(false);
//               });
//             },
//             onSubmit: function(event) {
//               var self = this;

//               console.log("checkout.onSubmit()");

//               event.preventDefault();
//               self.setPayButton(false);
//               self.toggleProcessingScreen();

//               var callback = function(result) {
//                 console.log("token result : " + JSON.stringify(result));

//                 if (result.error) {
//                   self.processTokenError(result.error);
//                 } else {
//                   self.processTokenSuccess(result.token);
//                 }
//               };

//               console.log("checkout.createToken()");
//               customCheckout.createToken(callback);
//             },
//             hideErrorForId: function(id) {
//               console.log("hideErrorForId: " + id);

//               var element = document.getElementById(id);

//               if (element !== null) {
//                 var errorElement = document.getElementById(id + "-error");
//                 if (errorElement !== null) {
//                   errorElement.innerHTML = "";
//                 }

//                 var bootStrapParent = document.getElementById(id + "-bootstrap");
//                 if (bootStrapParent !== null) {
//                   bootStrapParent.classList.remove("has-error");
//                   bootStrapParent.classList.add("has-success");
//                 }
//               } else {
//                 console.log("showErrorForId: Could not find " + id);
//               }
//             },
//             showErrorForId: function(id, message) {
//               console.log("showErrorForId: " + id + " " + message);

//               var element = document.getElementById(id);

//               if (element !== null) {
//                 var errorElement = document.getElementById(id + "-error");
//                 if (errorElement !== null) {
//                   errorElement.innerHTML = message;
//                 }

//                 var bootStrapParent = document.getElementById(id + "-bootstrap");
//                 if (bootStrapParent !== null) {
//                   bootStrapParent.classList.add("has-error");
//                   bootStrapParent.classList.remove("has-success");
//                 }
//               } else {
//                 console.log("showErrorForId: Could not find " + id);
//               }
//             },
//             setPayButton: function(enabled) {
//               console.log("checkout.setPayButton() disabled: " + !enabled);

//               var payButton = document.getElementById("pay-button");
//               if (enabled) {
//                 payButton.disabled = false;
//                 payButton.className = "btn btn-primary";
//               } else {
//                 payButton.disabled = true;
//                 payButton.className = "btn btn-primary disabled";
//               }
//             },
//             toggleProcessingScreen: function() {
//               var processingScreen = document.getElementById("processing-screen");
//               if (processingScreen) {
//                 processingScreen.classList.toggle("visible");
//               }
//             },
//             showErrorFeedback: function(message) {
//               var xMark = "\u2718";
//               this.feedback = document.getElementById("feedback");
//               this.feedback.innerHTML = xMark + " " + message;
//               this.feedback.classList.add("error");
//             },
//             showSuccessFeedback: function(message) {
//               var checkMark = "\u2714";
//               this.feedback = document.getElementById("feedback");
//               this.feedback.innerHTML = checkMark + " " + message;
//               this.feedback.classList.add("success");
//             },
//             processTokenError: function(error) {
//               error = JSON.stringify(error, undefined, 2);
//               console.log("processTokenError: " + error);

//               this.showErrorFeedback(
//                 "Error creating token: </br>" + JSON.stringify(error, null, 4)
//               );
//               this.setPayButton(true);
//               this.toggleProcessingScreen();
//             },
//             processTokenSuccess: function(token) {
//               console.log("processTokenSuccess: " + token);
//               //this.makeTokenPayment(token);
//               $("#token").val(token)

//               this.showSuccessFeedback("Success! Created token: " + token);
//               this.setPayButton(true);
//               this.toggleProcessingScreen();

//               // Use token to call payments api
//             },
//             makeTokenPayment: function(token) {
//               $.ajax({
//                 type: "POST",
//                 contentType: "application/json",
//                 url: "https://api.na.bambora.com/v1/payments",
//                 headers: { "Authorization": `Passcode ${btoa('300212875:Jeddac401')}` },
//                 data: {
//                   "order_number":"Sdsdsdsdsdsd1231331"+Date.now(),
//                   "amount": 100.00,
//                   "payment_method":"token",
//                   "token": {
//                     "name":"John Doe", 
//                     "code":`${token}`,
//                     "complete": true
//                   }
//                 },
//                 success: function(response) {
//                   alert("payment succeeded")
//                 },
//                 error: function(response) {
//                   console.log(response)
//                 }
//               })
//             }
//           };

//           customCheckoutController.init();
//         })();
//       });
