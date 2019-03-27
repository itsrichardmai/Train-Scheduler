// train scheduler application objectives: 
// Firebase should host arrival and departure data. 
// when adding Trains, administrators should be able to submit the following: 
// [ Train name, Destination, First train time( in military time ), Frequency ( in minutes ), ]
// code this app to calculate when the next train will arrive; this should be relative to the current time. 
// users from other machines should be able to view same train times. 

/* BONUSES: 
Consider updating your "minutes to arrival" and "next train time" text once every minute.
Try adding 'update' and 'remove' buttons for each train.
As a final challenge, make it so that only users who log into the site with their Google or Github accounts can use your site.
*/ 

// TODO: Replace with your project's customized code snippet

 // Initialize Firebase
 var config = {
  apiKey: "AIzaSyAtY4djjYIpYCCCNLqF5p4dkf6l5vgNcu8",
    authDomain: "fir-proj1-cf357.firebaseapp.com",
    databaseURL: "https://fir-proj1-cf357.firebaseio.com",
    projectId: "fir-proj1-cf357",
    storageBucket: "",
    messagingSenderId: "1044108030783"
  };
  firebase.initializeApp(config);
  
  var database = firebase.database();
  // when the button is clicked, we want to store those values in our firebase database. 
  $("#add-train").on("click", function(){
    event.preventDefault();
    
    var name = $("#train-name-input").val().trim();
    var destination = $("#destination-input").val().trim();
    var trainTime = $("#train-time-input").val().trim();
    var frequency = $("#frequency-input").val();
    

    database.ref().push({
      name: name,
      destination: destination,
      trainTime: trainTime,
      frequency: frequency,
      dateAdded: firebase.database.ServerValue.TIMESTAMP
    })

    console.log(database)
    
  })

  function renderData(sv) {
    var newRow = $("<div><br>");
    newRow.addClass("row");
    var name1 = $("<div>");
    name1.addClass("col-sm")
    var destination1 = $("<div>");
    destination1.addClass("col-sm")
    var trainTime1 = $("<div>");
    trainTime1.addClass("col-sm")
    var frequency1 = $("<div>")
    frequency1.addClass("col-sm")
    
    name1.text(sv.name);
    destination1.text(sv.destination);
    trainTime1.text(sv.trainTime); 
    frequency1.text(sv.frequency);

    $("#displaycard").append(newRow);
    $("#train-name-display").append(name1)
    $("#destination-display").append(destination1);
    $("#train-time-display").append(trainTime1);
    $("#frequency-display").append(frequency1);
  }

  database.ref().on("child_added", function(snapshot) {
    var sv = snapshot.val();
    console.log(sv.name);
    console.log(sv.destination);
    console.log(sv.trainTime);
    console.log(sv.frequency);
    renderData(sv)
    var firstTimeConverted = moment(snapshot.val().trainTime, "HH:mm").subtract(1, "years");
    console.log("firstTimeConverted=" + firstTimeConverted)
    var currentTime = moment();
    console.log("Current time: " + moment(currentTime).format("hh:mm"));
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    let tRemainder = diffTime % sv.frequency;
    console.log(tRemainder);
    // Minute Until Train
    var tMinutesTillTrain = sv.frequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);
    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    nextTrain = moment(nextTrain).format("hh:mm");
    var newRow = $("<tr></tr>");
    newRow.append(`<td> ${snapshot.val().trainLine}</td>`);
    newRow.append(`<td> ${snapshot.val().destination}</td>`);
    newRow.append(`<td> ${snapshot.val().frequency}</td>`);
    console.log(snapshot.val().trainLine);
    newRow.append("<td>" + nextTrain + "</td>");
    newRow.append("<td>"+tMinutesTillTrain+ "</td>");
  
 $('#currentTrains').append(newRow);
 })
//   })


//   var time = moment("20111031", "YYYYMMDD").fromNow(); 
//   console.log("time= " + time)





// //   database.ref().on("child_added", function (snapshot) {
// //     //values for time difference
// // var firstTimeConverted = moment(snapshot.val().firstTrainTime, "HH:mm").subtract(1, "years");
// // console.log(firstTimeConverted);
// // var currentTime = moment();
// console.log("Current time: " + moment(currentTime).format("hh:mm"));
// //difference between the times
// var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
// console.log("DIFFERENCE IN TIME: " + diffTime);
// // Time apart (remainder)
// tRemainder = diffTime % frequency;
// console.log(tRemainder);
// // Minute Until Train
//  tMinutesTillTrain = frequency - tRemainder;
// console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);
// // Next Train
// nextTrain = moment().add(tMinutesTillTrain, "minutes");
// nextTrain = moment(nextTrain).format("hh:mm");
// var newRow = $("<tr></tr>");
// newRow.append(`<td> ${childSnapshot.val().trainLine}</td>`);
// newRow.append(`<td> ${childSnapshot.val().destination}</td>`);
// newRow.append(`<td> ${childSnapshot.val().frequency}</td>`);
// console.log(childSnapshot.val().trainLine);
// newRow.append("<td>" + nextTrain + "</td>");
// newRow.append("<td>"+tMinutesTillTrain+ "</td>");

// $('#currentTrains').append(newRow);
// })