var fs = require("fs");
var cmudictFile = readCmudictFile('./cmudict.txt');


//format data from dictionary
function readCmudictFile(file){
	return fs.readFileSync(file).toString();
}


//creating two dimensional array that looks like ["word", "syllable format"] 
function formatData(data){    
  var lines = data.toString().split("\n"),
       lineSplit;
    var dictionaryArr = [];
  lines.forEach(function(line){    
    lineSplit = line.split("  ");    
      if (lineSplit[1] !== null) {
      //formatting the array of words to ["word", # of syllables]
      dictionaryArr.push([[lineSplit[0]], [lineSplit[1].replace(/\D/g, '').length]]);  
    }
  });
  return dictionaryArr ; 
}


var formattedData = formatData(cmudictFile);


//creating haiku 
function createHaiku(structure) {
  var lineOneRemaining = structure[0][0];
	var lineTwoRemaining = structure[1][0];
	var lineThreeRemaining = structure[2][0];
	var line1 = "";
	var line2 = "";
	var line3 = "";
  while ((lineOneRemaining+lineTwoRemaining+lineThreeRemaining) > 0) {
    //find random word in array
    var i = [Math.floor(Math.random() * formattedData.length)]; 
    //words for line, check if syllables still needed
    if (formattedData[i][1] <= lineOneRemaining) { 
      line1 += formattedData[i][0] + " ";
      //decrement syllables needed based on added word
      lineOneRemaining -= formattedData[i][1];
    
    } else if  (formattedData[i][1] <= lineTwoRemaining) { 
      line2 += formattedData[i][0] + " ";
      lineTwoRemaining -= formattedData[i][1]; 
    
    } else if (formattedData[i][1] <= lineThreeRemaining) { 
      line3 += formattedData[i][0] + " ";
      lineThreeRemaining -= formattedData[i][1];
    } 
  }
  return (line1+"\n"+line2+"\n"+line3).toLowerCase().replace(/[(\d)]/g, "");
}

module.exports = {
  createHaiku: createHaiku,
};


