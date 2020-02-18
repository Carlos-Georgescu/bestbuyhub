//function getDis() {
  var GeoPoint = require('geopoint');

  var lat1 = 49.246292;
  var long1 = -123.116226;

  var lat2 = 48.864716;
  var long2 = 2.349014;

  var point1 = new GeoPoint(lat1, long1);
  var point2 = new GeoPoint(lat2, long2);

  var distance = point1.distanceTo(point2, true);//output in kilometers

  console.log(distance);

//   return distance;
// }
