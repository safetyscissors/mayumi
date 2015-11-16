var heuristicEngine = function(text){
  var req = formatInput(text);
  var outputHtml = '';
//  var outputHtml = '<ul>';
  _.each(req.sentences, function(sentence){
    analyze(sentence);
    outputHtml+= formatOutput(sentence.wordList);
  });

  return outputHtml;
};


//reads input blob into sentences of words
var formatInput = function(inputBlob){
  var req = {};

  //clean input from special characters
  inputBlob = inputBlob.replace(/<(?:.|\n)*?>/gm, ''); //html tags
  inputBlob = inputBlob.replace(/(\r\n|\n|\r)/gm,""); //newlines
  inputBlob = inputBlob.replace(/\s+/g, " "); //extra spaces

  //separate sentences
  var inputSentences = inputBlob.split(/[\!\.]/g);
  inputSentences = _.filter(inputSentences, function(a){ return (a!='' && a!=' ')});

  //separate sentences into words
  req.sentences = [];
  _.each(inputSentences, function(eachSentence, sentenceIndex){

    //add sentence to object
    var outputSentence = {};
    outputSentence.sentenceIndex = sentenceIndex;
    outputSentence.originalSentence = eachSentence;

    //add words to object
    var words = eachSentence.split(' ');
    words = _.filter(words, function(a){ return (a!='' && a!=' ')});
    outputSentence.wordList = [];
    _.each(words, function(wordText, wordIndex){
      outputSentence.wordList.push(new Word(wordText, wordIndex, sentenceIndex));
    });

    //add sentence object to req
    req.sentences.push(outputSentence);
  });

  return req;
};

var analyze = function(sentence){
  //dictionary articles, prepositions, beVerbs
  dictionaryFilter(sentence);
  naiveObjectOfPreposition(sentence);
  naiveAdverb(sentence);

  patternOne(sentence);
  console.log(sentence);
};

var dictionaryFilter = function(sentence){
  var articles = ('a,the,an').split(',');
  var prepositions = ('aboard,about,above,across,after,against,along,amid,among,anti,around,as,at,before,behind,below,beneath,beside,besides,between,beyond,but,by,concerning,considering,despite,down,during,except,excepting,excluding,following,for,from,in,inside,into,like,minus,near,of,off,on,onto,opposite,outside,over,past,per,plus,regarding,round,save,since,than,through,to,toward,towards,under,underneath,unlike,until,up,upon,versus,via,with,within,without').split(',');
  var beVerbs = ('am,is,are,was,be,being,been').split(',');

  _.each(sentence.wordList, function(word){
    if(articles.indexOf(word.text) >=0 ){
      word.pos = 'a';
      word.confidence = .9;
    }

    if(prepositions.indexOf(word.text) >=0 ){
      word.pos = 'p';
      word.confidence = .9;
    }

    if(beVerbs.indexOf(word.text) >=0 ){
      word.pos = 'lv';
      word.confidence = .7;
    }
  })

};

var naiveObjectOfPreposition = function(sentence){
  for(var i=0;i<sentence.wordList.length;i++){
    //noun follows the preposition.
    if(sentence.wordList[i].pos === 'p'){
      var j=i;
      while(j<sentence.wordList.length){
        if(sentence.wordList[j].pos==='x'){
          sentence.wordList[j].pos = 'n';
          sentence.wordList[j].confidence = .5;
          break;
        }
        j++;
      }
    }
  }
};

var naiveAdverb = function(sentence){
  _.each(sentence.wordList, function(word){
    if(word.text.length>2 && word.text.slice(-2) == 'ly'){
      if(word.pos==='x' || word.confidence <=.5){
        word.pos = 'adv';
        word.confidence=.5;
      }
    }
  });
};

var patternOne = function(sentence){
  var patternOnePOS=['n','v'];
  var processed = _.pluck(sentence.wordList,'pos');
  var unprocessed = _.filter(processed, function(val){ return (val==='x')});

  //must have exactly 2 to be pattern 1.
  if(unprocessed.length!=patternOnePOS.length) return;


  _.each(sentence.wordList, function(word){
    if(word.pos==='x'){
      word.pos = patternOnePOS.shift();
      word.confidence  =.6;
    }
  });
};

var naiveNoun = function(sentence){
  //noun follows an artical or preposition

};


//word constructor
var Word = function(text, position, sentence){
  return {
    originalText:text,
    text:text.toLowerCase(),
    position:position,
    pos:'x',
    confidence:0,
    capitalization:(text.match(/[A-Z]/))?true:false,
    sentenceIndex:sentence
  };
};


//data format [{text:'word', confidence:100, pos:'n'}]
var formatOutput = function(data){
  var output = ['<ul class="wordList">'];

  _.each(data, function(word){
    output.push('<li class="word">', '<table>');
    output.push('<tr title="confidence: ', 100*word.confidence,'%"><td><div class="statusCircle" style="background-color:', getColor(word.confidence), '"></div>', word.pos,'</td></tr>');
    output.push('<tr><td>', word.text,'</td></tr>', '</table></li>');
  });

  output.push('</ul>');
  return output.join('');
};


var getColor = function(value){
  //value from 0 to 1
  value = 1-value;

  //value from 1 to 0
  var hue=((1-value)*120).toString(10);
  return ["hsl(",hue,",100%,50%)"].join("");
};
