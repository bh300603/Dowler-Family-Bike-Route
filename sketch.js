const key = 'pk.eyJ1IjoicG9zdHBsYXN0aWMiLCJhIjoiY2tpamJyNm1zMDE0OTJ0czU5cDkyNjE3ciJ9.VRXSaQR1sQoWudM3Bgp9Lg';

const options = {
  lat: 39.329239,
  lng: -82.101257,
  zoom: 12,
  style: 'mapbox://styles/bri-dowler-97/ckm42ilc16uwr17o0mk7etwlc',
  pitch: 0
};

const mappa = new Mappa('MapboxGL', key);
let myMap;
let canvas;

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  myMap = mappa.tileMap(options);
  myMap.overlay(canvas);
  miles = loadTable('Dowler_Family_Biking.csv','csv','header');
  img = createImg('https://scontent-ort2-1.xx.fbcdn.net/v/t1.0-9/159319931_3784747444896179_2147127338893201261_o.jpg?_nc_cat=102&ccb=1-3&_nc_sid=0debeb&_nc_ohc=JxfRBuR3qR0AX9ypb0B&_nc_ht=scontent-ort2-1.xx&oh=605bc21bf1b602a7d1d743dd6c4daf00&oe=60702ACE');
  img.hide();

}


function draw() {
   clear();
  //noFill();
  stroke(29,36,121);
  strokeWeight(3);
  const zoom = myMap.zoom();
  const athens = myMap.latLngToPixel(39.32322,-82.105892);
  ellipse(athens.x, athens.y, 10 * zoom, 10 * zoom);
  if (dist(athens.x, athens.y, mouseX, mouseY) < (zoom * 10) / 2) {
   
    textSize(32);
    noFill();
    text("Dowler Family Bike Route",athens.x,athens.y);
    image(img,athens.x,athens.y,175,200);
     
     fill(0, 25);
  } else {
    fill(255, 100);
  }


  for (let i = 0; i < miles.getRowCount(); i++) {
    // Get the lat/lng of each mile 
    const latitude = Number(miles.getString(i, 'reclat'));
    const longitude = Number(miles.getString(i, 'reclong'));
    const pos = myMap.latLngToPixel(latitude, longitude);

    const place = miles.getString(i,'name');
    
    let size = miles.getString(i, 'mass (g)');
    size = map(size, 558, 60000000, 1, 25) + myMap.zoom();
    ellipse(pos.x, pos.y, size, size);
    
    if(dist(pos.x,pos.y,mouseX,mouseY) < size){
      textSize(32);
      text(place,pos.x,pos.y);
    }
  
}
  
  
 
}

$(window).bind('resize', function(e)
{
  if (window.RT) clearTimeout(window.RT);
  window.RT = setTimeout(function()
  {
    this.location.reload(false); /* false to get page from cache */
  }, 200);
});



