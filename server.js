var express           = require('express'),
    app               = express(),
    bodyParser        = require('body-parser'),
   mongoose          = require('mongoose'),
    meetupsController = require('./server/controllers/meetups-controller');

//mongoose.connect('mongodb://localhost:27017/timewaste')

app.use(bodyParser());

var port = process.env.PORT || 8080;

// routes will go here

// start the server
app.listen(port);
console.log('Server started! At http://localhost:' + port);
//newer version
//app.use(bodyParser.urlencoded({ extended: false }))
//app.use(bodyParser.json())

app.get('/*', function(req, res) {
	var time = req.path.substr(1)
	var months = ['January','Febuary','March','April','May','June','July','Augest','September','October','November','December'];
	var temp;
	if (time.length===10 && time.match(/^[0-9]+$/) ){
		
		var a = new Date(time * 1000); 
  
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();
  
  var ans = '{ "unix": '+time+', "natural": "' +month+ ' ' + date + ', ' + year+'" }'
	}
	else{temp=(time.match(/%20/g)||[])} if(temp.length===2){
		
		var a = time.split("%20")
		a[1]=a[1].slice(0,-1)
		if(a[2].match(/^[0-9]+$/)&&parseInt(a[2])<2037){
			var year = a[2]

		}
		else{
			time=false
		}
		if(a[1].match(/^[0-9]+$/)&&(parseInt(a[1])<32)&&parseInt(a[1])>0){
				var date = a[1]
			
			}else{
			time=false
		}
		if(months.indexOf(a[0])>-1){
				var month = months.indexOf(a[0])+1
			
			}else{
		time=false
		}
		if(time){
			var ans = '{ "unix": '+new Date(year+"."+month+"."+date).getTime() / 1000+', "natural": "' +a[0]+ ' ' + a[1] + ', ' + a[2]+'" }'

		}
		else{
			ans=null
		}
		//ans="test"
		
	}
	else{
		ans=(null)
	}

  res.send( ans);
});