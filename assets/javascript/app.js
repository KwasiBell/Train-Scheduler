    // Initialize Firebase
    var config = {
      apiKey: "AIzaSyDFYxdGtmGi4TgbCCbnbwx4xKreONZCPw8",
      authDomain: "train-schedule-fcc85.firebaseapp.com",
      databaseURL: "https://train-schedule-fcc85.firebaseio.com",
      projectId: "train-schedule-fcc85",
      storageBucket: "train-schedule-fcc85.appspot.com",
      messagingSenderId: "461248398291"
    };
    firebase.initializeApp(config);

    var database=firebase.database();

  // Initial Values
  var trainName = "";
  var destination = "";
  var firstTrainTime = 0;
  var frequency = "";

     // Capture Button Click
     $("#form-submit-button").on("click", function(event) {
      event.preventDefault();

      trainName = $("#trainName-input").val().trim();
      destination = $("#destination-input").val().trim();
      firstTrainTime = $("#firstTrainTime-input").val().trim();
      frequency = $("#frequency-input").val().trim();
      console.log(trainName, destination, firstTrainTime, frequency);

      database.ref().push({

        trainName: trainName,
        destination: destination,
        firstTrainTime: firstTrainTime,
        frequency: frequency,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
      });
    });

    database.ref().on("child_added", function(childSnapshot) {

      // Log everything that's coming out of snapshot
      console.log(childSnapshot.val().trainName);
      console.log(childSnapshot.val().destination);
      console.log(childSnapshot.val().firstTrainTime);
      console.log(childSnapshot.val().frequency);

      var firstT = moment(childSnapshot.val().firstTrainTime,"hh:mm");
      var now = moment();
      var timeBetween = now.diff(firstT, "minutes");
      var minutesAway = childSnapshot.val().frequency - (timeBetween%childSnapshot.val().frequency);
      console.log(minutesAway);

          // Difference between the times
    // var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    // console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    // var tRemainder = diffTime % tFrequency;
    // console.log(tRemainder);

    // Minute Until Train
    var minutesTillTrain = childSnapshot.val().frequency - minutesAway;
    console.log("MINUTES TILL TRAIN: " + minutesTillTrain);

    // Next Train
    var etaNextTrain = moment().add(minutesTillTrain, "minutes").format("hh:mm");
    console.log("ARRIVAL TIME: " + moment(etaNextTrain).format("hh:mm"));


    $("#train-schedule").append("<tr><td>"+childSnapshot.val().trainName+"</td><td>"+childSnapshot.val().destination+"</td><td>"+childSnapshot.val().frequency+"</td><td>"+etaNextTrain+"</td><td>"+minutesAway+"</td></tr>")

    });
    console.log(moment());




    /*
Train Name

Destination

First Train Time -- in military time

Frequency -- in minutes
  */
