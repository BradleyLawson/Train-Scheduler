
// Initialize Firebase
var config = {
  apiKey: "AIzaSyBGme2CRJizH-P7wQdf1R5SZa4SZvELOz0",
  authDomain: "trainstation-2afab.firebaseapp.com",
  databaseURL: "https://trainstation-2afab.firebaseio.com",
  projectId: "trainstation-2afab",
  storageBucket: "",
  messagingSenderId: "457742595780"
};

firebase.initializeApp(config);

// Created variable to reference the database.
var database = firebase.database();

// Submit Click Event
// Captures input values and sends to firebase as object
$('#submitButton').on("click", function(event){
	event.preventDefault(event)

	// Storing input values in variables to be sent to firebase
	var newTrain = $('#trainNameInput').val().trim();
	var newDestination = $('#destinationInput').val().trim();
	var firstTrainTime = $('#firstTrainTimeInput').val().trim();
	var frequency = $('#frequencyInput').val().trim();

	// object of captured information to be pushed to firebase
	var trainData = {
		trainName: newTrain,
		destination: newDestination,
		time: firstTrainTime,
		frequency: frequency
	}

	// pushing object to firebase
	database.ref().push({
		trainData
	});
}); // end of click event

// database child added event
// When new database info is added the following code runs
database.ref().on("child_added", function(snapshot){
		
// creating table rows
	var row = $('<tr>');
		
	// creating table data tags to store information
	// will be appended to table body when all is calculated and returned
	var trainNameData = $('<td>');
	var destinationData = $('<td>');
	var frequencyData = $('<td>');
	var nextArrivalData = $('<td>');
	var minutesAwayData = $('<td>');

		// variable storing the time of the first train
		// to be used in calculation of next arrival and minutes away
		var returnedFirstTrainData = snapshot.val().trainData.time;

		// variable storing the frequency of each train
		// to be used in calcualtion of next arrival and minutes away
		var trainFrequency = parseInt(snapshot.val().trainData.frequency);

		// First Train time pushed back 1 year to make sure it comes before current time
		var trainConverted = moment(returnedFirstTrainData, "hh:mm").subtract(1, "years");

	  // variable to store current time
	  var now = moment().format('hh:mm');

	  // difference in current time from first train time (converted) in minutes
	  var difference = moment().diff(moment(trainConverted), "minutes");

	  // remainder of minutes left between the difference of two times
	  var modRemainder = difference % trainFrequency;

	  // minutes away to next train
	  var minutesAway = trainFrequency - modRemainder;

	  // actual time next train will arrive
	  var nextArrival = moment().add(minutesAway, "minutes").format("hh:mm A");

		// Adding the values to the table data	  
		trainNameData.text(snapshot.val().trainData.trainName);
		destinationData.text(snapshot.val().trainData.destination);
		frequencyData.text(snapshot.val().trainData.frequency);
		nextArrivalData.text(nextArrival);
		minutesAwayData.text(minutesAway);

		// Appending data in data tables to the row
		row.append(trainNameData, destinationData, frequencyData, nextArrivalData, minutesAwayData);

		// Adding all data to page
		$('.tableBody').append(row);
}); // end of child added event


