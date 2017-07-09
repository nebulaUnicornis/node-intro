var request = require('request-promise');

// Euclidian distance between two points
function getDistance(pos1, pos2) {
  return Math.sqrt(Math.pow(pos1.lat - pos2.lat, 2) + Math.pow(pos1.lng - pos2.lng, 2));
}

function getIssPosition() {
  return request('http://api.open-notify.org/iss-now.json')
  .then(
    function(response) {
      // Parse as JSON
      var result = JSON.parse(response);
      // Return object with lat and lng
      var coordinates = { 
        "lat":  result.iss_position.latitude, 
        "lng":  result.iss_position.longitude
      };
      return coordinates;
    },
    function(error) {
      throw new Error("API not available");
    }
  );
}

getIssPosition().then(function(data) {
    console.log(data);
  },
  function(err) {
    console.log('Something went wrong: ', err);
  }
);


/**********************************************************************/


function getAddressPosition(address) {
  var formatAddress = address.replace(/ /g, '+');
  return request('https://maps.googleapis.com/maps/api/geocode/json?address=' + formatAddress + '&key=AIzaSyAzz8WeRaWMXo6Tt8uTof8c6ARHLY3wi3I')
  .then(
    function(data) {
      // Parse as JSON
      var result = JSON.parse(data);
      // Return object with lat and lng
      var coordinates = { 
        "lat":  result.results[0].geometry.location.lat, 
        "lng":  result.results[0].geometry.location.lng
      };
      return coordinates;
    },
    function(error) {
      throw new Error("API not available");
    }
  );
}

getAddressPosition('8871 Rue Meunier, Montreal, QC')
.then(function(data) {
    console.log(data);
    return data;
})
.catch(function(err) {
    console.log('Something went wrong: ', err);
    return err;
});

/**********************************************************************/

function getCurrentTemperatureAtPosition(position) {
  return request('https://api.darksky.net/forecast/ddc78902b33a3015b36c9228ea9f9313/'+ position)
  .then(
    function(data) {
      // Parse as JSON
      var result = JSON.parse(data);
      var currentTemperature = result.currently.temperature;
      return currentTemperature;
    },
    function(error) {
      throw new Error("API not available");
    }
  );
}

getCurrentTemperatureAtPosition('7.1193,73.1227')
.then(function(data) {
    console.log(data);
    return data;
})
.catch(function(err) {
    console.log('Something went wrong: ', err);
    return err;
});

/**********************************************************************/

function getCurrentTemperature(address) {
  getAddressPosition(address)
  .then(function(data) {
    // Convert data to string in order to pass it as argument
    data = data.lat.toString() + ',' + data.lng.toString();
      
    getCurrentTemperatureAtPosition(data)
    .then(function(value) {
        console.log('Temperature: ' + value);
        return value;
    });
      
      
  });
  
  // var position = getAddressPosition(address)
  // .then(function(data) {
  //   return data;
  // });
  // console.log(position);
  // return position;
}

getCurrentTemperature('8871 Rue Meunier, Montreal, QC');

/**********************************************************************/

function getDistanceFromIss(address) {
  
  getAddressPosition(address)
  .then(function(pos1) {
    // Convert data to string in order to pass it as argument
    //console.log('Position1: ', pos1);
      
    getIssPosition().then(function(pos2) {
    //console.log('Position2: ', pos2);
    
    var distance = getDistance(pos1, pos2);
    console.log('Final distance: ', distance);
    
    });
      
      
  });

}

getDistanceFromIss('8871 Rue Meunier, Montreal, QC');