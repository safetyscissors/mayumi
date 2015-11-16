

var Sent1="The boy ate the cake.";
var Sent2='The boy ate the apple.';

var Mold='NP$VP$.'

var Data={Sent:Sent1};

Data=PeriodFinder(Data);
Data=SentSplitter(Data);
Data=FindVerb(Data);
Data=FindDet(Data);
Data=FindDetNoun(Data);
Data=FindNounPhrase(Data);
Data=FindVerbPhrase(Data);

console.log(Data);

function FindVerb(dataz){
	var VerbList= ['ate'];
	for (var index=0; index<dataz.words.length; index++) {
		var VerbPos = VerbList.indexOf(dataz.words[index]);
		if (VerbPos > -1) {
			dataz.pos[index] = 'verb';
		}
	}
	return dataz;
}

function FindDet(dataz){
	for (var index=0; index<dataz.words.length; index++) {
		if (dataz.words[index] == 'the' || dataz.words[index] == 'a' || dataz.words[index] == 'an') {
			dataz.pos[index] = 'det';
		}
	}
	return dataz;
}

function FindDetNoun(dataz){
	var currentPos = dataz.pos.indexOf('det');
	while(currentPos>=0){
		if (currentPos>=0){
			dataz.pos[currentPos+1] = 'noun';
		}
		currentPos=dataz.pos.indexOf('det', currentPos+1);

	}
	return dataz;
}

function FindNounPhrase(dataz){
	if (dataz.words.length==2){
		dataz.np=dataz.words[0];
	} else {
		console.log("Couldn't find NP");
	}
	return dataz;

}

function FindVerbPhrase(dataz){

	
		console.log("Couldn't find VP");

	return dataz;
}

function PeriodFinder(dataz){
	var Perd=[];
	Perd=dataz.Sent.split('.');
	if (Perd.length==2) {
		dataz.Sent=Perd[0];
		dataz.prd=true;
	}
	return dataz;
}

function SentSplitter(dataz){
	dataz.Sent=dataz.Sent.toLowerCase();
	dataz.words=dataz.Sent.split(' ');
	dataz.pos=[];

	return dataz;
}

