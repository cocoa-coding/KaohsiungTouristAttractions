var xhr = new XMLHttpRequest();
xhr.open('get' , 'https://raw.githubusercontent.com/hexschool/KCGTravel/master/datastore_search.json' ,true);
xhr.send(null);

//DOM
var allArea = document.querySelector('.allArea');
var options = document.querySelector('.options');
var hotArea = document.querySelector('.hotArea .clearfix');
var area = document.querySelector('.areaContent h4');

//addEventListener
allArea.addEventListener('click' , showList , false);
document.addEventListener('click' , hideList , false);
options.addEventListener('click' , hideListAndClickArea , false);
hotArea.addEventListener('click' , clickArea , false);

//function
var data;
xhr.onload = function() {
  data = JSON.parse(xhr.responseText).result.records;
  webpageRefresh();
}

function webpageRefresh(){
  emptyContent();
  for (var i = 0 ; i < data.length ; i++) {
    updataPage(data[i]);
  }
}

function showList(e) {
  e.stopPropagation();
  options.style.display = "block";
}

function hideList(e) {
  e.stopPropagation();
  options.style.display = "none";
}


function hideListAndClickArea(e){
  hideList(e)
  clickArea(e)
}

function clickArea(e){
  if(e.target.nodeName !== "A"){return};
  e.preventDefault();
  emptyContent()
  area.textContent = e.target.textContent;

  for (var i = 0 ; i < data.length ; i++) {
    var dataZone = data[i].Zone;
    if(dataZone == e.target.textContent){
      updataPage(data[i]);
    }
  }
}

function emptyContent(){
  document.querySelector('.row').innerHTML = "";
}

function updataPage(index){
  var dataPicture = index.Picture1;
  var dataName = index.Name;
  var dataZone = index.Zone;
  var dataOpentime = index.Opentime;
  var dataAdd = index.Add;
  var dataTel = index.Tel;
  var dataTicketinfo = index.Ticketinfo;

  var colDOM = document.createElement('div')
  colDOM.setAttribute('class' , 'col-sm-6');

  var areaImgDOM = document.createElement('div')
  areaImgDOM.setAttribute('class' , 'areaImg');
  areaImgDOM.style.backgroundImage = 'url('+dataPicture+')';

  var areaInfoDOM = document.createElement('div')
  areaInfoDOM.setAttribute('class' , 'areaInfo');

  colDOM.appendChild(areaImgDOM);
  colDOM.appendChild(areaInfoDOM);

  //areaImgDOM
  var areaImgDOM1 = document.createElement('p');
  areaImgDOM1.setAttribute('class' , 'attraction');
  areaImgDOM1.textContent = dataName;

  var areaImgDOM2 = document.createElement('p') ;
  areaImgDOM2.setAttribute('class' , 'area');
  areaImgDOM2.textContent = dataZone;

  areaImgDOM.appendChild(areaImgDOM1);
  areaImgDOM.appendChild(areaImgDOM2);

  //areaInfoDOM
  var areaInfoDOM1 = createAreaInfoDOM(dataOpentime, 'openTime', 'images/icons_clock.png')
  var areaInfoDOM2 = createAreaInfoDOM(dataAdd, 'address', 'images/icons_pin.png')
  var areaInfoDOM3 = createAreaInfoDOM(dataTel, 'tel', 'images/icons_phone.png')
  var areaInfoDOM4 = createAreaInfoDOM(dataTicketinfo, 'ticket', 'images/icons_tag.png')
  
  areaInfoDOM.appendChild(areaInfoDOM1);
  areaInfoDOM.appendChild(areaInfoDOM2);
  areaInfoDOM.appendChild(areaInfoDOM3);
  areaInfoDOM.appendChild(areaInfoDOM4); 

  document.querySelector('.row').appendChild(colDOM);
 }

 function createAreaInfoDOM(textContent, className, imageSrc) {
  var areaInfoDOM = document.createElement('p');
  areaInfoDOM.setAttribute('class' , className);
  areaInfoDOM.textContent = textContent;
  var areaInfoDOMImg = document.createElement('img')
  areaInfoDOMImg.setAttribute('src' , imageSrc);
  areaInfoDOM.prepend(areaInfoDOMImg);
  return areaInfoDOM
}