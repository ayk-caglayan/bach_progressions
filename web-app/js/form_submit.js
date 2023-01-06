const formElem = document.querySelector('form');
const formData=[];
const key_dict = {0: "C", 1: "C#", 2: "D", 3: "Eb", 4: "E", 5: "F", 6: "F#", 7: "G", 8: "Ab", 9: "A", 10: "Bb", 11: "B"};
const mode_dict = {3: "minor", 4: "major"};
var folder_name;
const head_folder_name="xml_dirs";
var vrvToolkit = new verovio.toolkit();
var index=1;
var delay_time=100;
var cadenceAvailable=false;
var at_least_one_cadence=false;
var links_div="";
var displayed_xml_path="";

formElem.addEventListener('submit', (e) => {
  // on form submission, prevent default
  e.preventDefault();
  // construct a FormData object, which fires the formdata event
  new FormData(formElem);
});



// formdata handler to retrieve data
formElem.onformdata = (e) => {
    formData.splice(0, formData.length);
  // Get the form data from the event object
  let data = e.formData;
  for (var value of data.values()) {
    formData.push(value);
  }
  // console.log(formData);
  document.getElementById("user_input").innerHTML= "You've selected a cadence" + "<br>" + "starting with " + key_dict[Number(formData[0])] + " " + mode_dict[Number(formData[1])] + "<br>" + "ending with " + key_dict[Number(formData[2])] + " " + mode_dict[Number(formData[3])];
  //builds the folder name
  folder_name=String(formData[0])+"-"+String(formData[1])+"-"+String(formData[2])+"-"+String(formData[3]);
  // const file_path=head_folder_name+"/"+folder_name+"/"+String(1)+"-"+folder_name+".xml";
  index=1
  links_div="";
  document.getElementById("links").innerHTML = links_div;
  // loadXML();
  // loadNextXML();
  at_least_one_cadence=false;
  loadXML_URL();
  load_circular();
 
}


async function loadXMLtoSVG(index) {
  let file_path=head_folder_name+"/"+folder_name+"/"+String(index)+"-"+folder_name+".xml";
  //create download button for loaded xml file
  
  displayed_xml_path=file_path;
  
  let download_div = document.getElementById("download");
  download_div.innerHTML = "";
  let download_button = document.createElement("a");
  download_div.appendChild(download_button);
  download_button.setAttribute("href", displayed_xml_path);
  download_button.setAttribute("download", displayed_xml_path);
  download_button.innerHTML = "Download XML";
  console.log(file_path);
  
  fetch(file_path)
  .then( (response) => response.text() )
  .then( (meiXML) => {
    var data = vrvToolkit.loadData(meiXML);
    var svg = vrvToolkit.renderToSVG(data, {});
    document.getElementById("svg_output").innerHTML = svg;
  })
  .then( stop_midi() );
 
}

async function loadXML_URL() {
  let file_path=head_folder_name+"/"+folder_name+"/"+String(index)+"-"+folder_name+".xml";
  if (index==3) {
    at_least_one_cadence=true;
    // console.log("at_least_one_cadence", at_least_one_cadence);
  }
  
  console.log("index", index);
  fetch(file_path)
  .then( (response) => {
    if (response.ok) {
      cadenceAvailable=true;
      links_div=links_div+"<a href=javascript:loadXMLtoSVG("+ index + ");>Cadence No." + index + " - </a>";
      document.getElementById("links").innerHTML = links_div;
     
    } else {
      throw new Error('Network response was not ok.');
      cadenceAvailable=false;
    }
  })
  // .then(loadNextXML())
  .catch( (err) => {
    console.log(err);
    cadenceAvailable=false;
    if (!at_least_one_cadence) {
      document.getElementById("links").innerHTML = "No progressions found";
      // console.log("at_least_one_cadence", at_least_one_cadence)
    }
  });
}

function load_circular() {
  setTimeout(function() {
    index++;
    console.log("index updated", index); 
    loadXML_URL();
    if (index<=100 && cadenceAvailable) {
        load_circular()
    }
}, delay_time)
}

//download button for loaded xml file
function downloadXML(pathh) {
  // let file_path=head_folder_name+"/"+folder_name+"/"+String(index)+"-"+folder_name+".xml";
  console.log("downloadXML", pathh);
  // fetch(file_path)
  // .then( (response) => response.text() )
  // .then( (meiXML) => {
  //   var data = vrvToolkit.loadData(meiXML);
  //   // var svg = vrvToolkit.renderToSVG(data, {});
  //   // document.getElementById("svg_output").innerHTML = svg;
  //   var blob = new Blob([meiXML], {type: "text/plain;charset=utf-8"});
  //   saveAs(blob, "cadence.xml");
  // })
}







  
