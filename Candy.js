

var Sent1='I ate.';
var Sent2='The boy ate the apple.';

var Mold='NP$VP$.'

var Data={Sent:Sent1};

Data=PeriodFinder(Data)
Data=FindNounPhrase(Data);
Data=FindVerbPhrase(Data);

console.log(Data);


function FindNounPhrase(dataz){
	var Pieces=[];
	Pieces=dataz.Sent.split(' ');

	if (Pieces.length==2){
		dataz.np=Pieces[0];
	} else {
		console.log("Couldn't find NP");
	}
	return dataz;

}


function FindVerbPhrase(dataz){
	var Pieces2=[];
	Pieces2=dataz.Sent.split(' ');
	if (Pieces2.length==2) {
		dataz.vp=Pieces2[1]
	} else {
		console.log("Couldn't find VP");
	}
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

