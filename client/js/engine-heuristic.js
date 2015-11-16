var heuristicEngine = function(text,div){
  var req = formatInput(text);
  var outputHtml = '';

  _.each(req.sentences, function(sentence){
    heuristic_analyze(sentence);
    outputHtml+= formatOutput(sentence.wordList,div);
  });

  return outputHtml;
};

var heuristic_analyze = function(sentence){
  //dictionary articles, prepositions, beVerbs
  heuristic_dictionaryFilter(sentence);
  heuristic_naiveObjectOfPreposition(sentence);
  heuristic_naiveAdverb(sentence);

  heuristic_patternOne(sentence);
  console.log(sentence);
};

var heuristic_dictionaryFilter = function(sentence){
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

var heuristic_naiveObjectOfPreposition = function(sentence){
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

var heuristic_naiveAdverb = function(sentence){
  _.each(sentence.wordList, function(word){
    if(word.text.length>=4 && word.text.slice(-2) == 'ly'){
      if(word.pos==='x' || word.confidence <=.5){
        word.pos = 'adv';
        word.confidence=.5;
      }
    }
  });
};

var heuristic_patternOne = function(sentence){
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

var heuristic_naiveNoun = function(sentence){
  //noun follows an artical or preposition

};

