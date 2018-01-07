
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

  // Create a variable to reference the database.
var database = firebase.database();

$('#submitButton').on("click", function(event){
	event.preventDefault(event)
	
	var newTrain = $('#trainNameInput').val().trim();
	var newDestination = $('#destinationInput').val().trim();
	var firstTrainTime = $('#firstTrainTimeInput').val().trim();
	var frequency = $('#frequencyInput').val().trim();

	var trainData = {
		trainName: newTrain,
		destination: newDestination,
		time: firstTrainTime,
		frequency: frequency
	}

	database.ref().push({
		trainData
	});

	

	});

	database.ref().on("child_added", function(snapshot){
		var row = $('<tr>');
		var trainNameData = $('<td>');
		var destinationData = $('<td>');
		var frequencyData = $('<td>');
		var nextArrivalData = $('<td>');
		var minutesAwayData = $('<td>');

		trainNameData.text(snapshot.val().trainData.trainName);
		destinationData.text(snapshot.val().trainData.destination);
		frequencyData.text(snapshot.val().trainData.frequency);

		row.append(trainNameData, destinationData, frequencyData, nextArrivalData, minutesAwayData);

		$('.tableBody').append(row);
	});

var now = moment();
console.log(now);

var timeNow = getTime();
console.log(timeNow);
	// var newTableRow = $('<tr>');
	
	// var newTableDataTrain = $('<td>');
	// var newTableDataDestination = $('<td>');
	// var newTableDataFirstTrainTime = $('<td>');
	// var newTableDataFrequency = $('<td>');

	
	// newTableDataTrain.append(newTrain);
	// newTableDataDestination.append(newDestination);
	// newTableDataFirstTrainTime.append(firstTrainTime);
	// newTableDataFrequency.append(frequency);

	// newTableRow.append(newTableDataTrain);
	// newTableRow.append(newTableDataDestination);
	// newTableRow.append(newTableDataFirstTrainTime);
	// newTableRow.append(newTableDataFrequency);


	// var mainTable = $('.table')
	// mainTable.append(newTableRow);

	// newTableBody.append(newTableRow);
//});


// var newTrain = $('trainNameInput').text();
// console.log(newTrain);