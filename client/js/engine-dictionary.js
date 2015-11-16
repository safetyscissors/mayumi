var dictionaryEngine = function(text,div){
  var req = formatInput(text);
  var outputHtml = '';

  _.each(req.sentences, function(sentence){
    dictionary_analyze(sentence,div);
    $(div).html('Thinking...');
    //outputHtml+= formatOutput(sentence.wordList);
  });

  return outputHtml;
};

var dictionary_analyze = function(inputSentence, div){
  //inefficient naive method
  for(var i=0; i<inputSentence.wordList.length;i++){
    $.get('server/word?word=' + inputSentence.wordList[i].text, function(result){

      //get part of speech from dictionary entries
      var end, start = 0;
      var partOfSpeech = [];
      while(result.indexOf('<fl>', start) > -1){
        start = result.indexOf('<fl>', start)+ 4;
        end = result.indexOf('</fl>', start);
        partOfSpeech.push(abbreviatePOS(result.substr(start,end-start)))
      }

      //get word from server
      start = result.indexOf('[mayumi server word]')+20;
      end = result.indexOf('[/mayumi server word]');
      var serverWord = result.substr(start,end-start);

      //calculate confidence and pos
      var serverPos = 'x';
      var serverConfidence = 0;
      if(partOfSpeech.length>0){
        serverPos = partOfSpeech[0];

        var duplicates = _.filter(partOfSpeech, function(val){return val===serverPos});
        serverConfidence = duplicates.length/partOfSpeech.length;
        serverConfidence = Math.round(serverConfidence * 100) / 100
      }

      //get all words
      var matchingWords = _.where(inputSentence.wordList, {text:serverWord});
      _.each(matchingWords, function(searchedWord){
        var originalPos = searchedWord.position;
        inputSentence.wordList[originalPos].confidence = serverConfidence;
        inputSentence.wordList[originalPos].pos = serverPos;
        formatOutput(inputSentence.wordList, div);
      });

      console.log(serverWord, serverPos, serverConfidence);
    });
  }

};

var abbreviatePOS = function(longWord){
  switch(longWord){
    case 'noun': return 'n';
    case 'verb': return 'v';
    case 'preposition': return 'p';
    case 'definite article': return 'a';
    case 'adverb': return 'adv';
    case 'geographical name': return 'n';
    case 'adjective': return 'adj';
    case 'pronoun': return 'pn';
    default: return longWord;
  }
};