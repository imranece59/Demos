var currentKey = 1002;

//var currentdriverkey ="";
var tenantswitch = "N"

var breaktime    = "30 minutes";
var cumbreaktime = "90 minutes" ;

var dataSet;

var dataSet2;


var filterdata;

var egolanesw;

var currentdate = new Date();
var currentMonth = (currentdate.getMonth() + 1).toString();
    currentMonth = currentMonth.length > 1 ? currentMonth : 0 + currentMonth;
var currentDate = currentdate.getDate().toString();
    currentDate = currentDate.length > 1 ? currentDate : 0 + currentDate;
var currentYear = currentdate.getFullYear();

var todate_fmt = currentYear + currentMonth + currentDate
currentdate.toLocaleString();
var thirtystartdate = new Date(currentdate.getTime() -(30 * 24 * 60 * 60 * 1000));

var thirtystartMonth = (thirtystartdate.getMonth()+1).toString();
    thirtystartMonth = thirtystartMonth.length > 1 ? thirtystartMonth : 0 + thirtystartMonth;
var thirtystartdateDate = thirtystartdate.getDate().toString()
    thirtystartdateDate = thirtystartdateDate.length > 1 ? thirtystartdateDate : 0 + thirtystartdateDate;
var thirtystartdateYear = thirtystartdate.getFullYear();

var thirtystartdate_fmt = thirtystartdateYear + thirtystartMonth + thirtystartdateDate
//remove


d3.selectAll("#vehiclesw input").on("change", function(){

egolanesw = d3.select(this).property('value')

//console.log(d3.select(this).property('value'))
loaddata();
});

//remove


d3.json("/api/tenants",function (error,data) {
		  
		  tenantdata = data

		  d3.select("#clientselect")
          .selectAll("option")
          .data(tenantdata)
          .enter()
		  .append("option")
		  .property("selected", function(d){ 
			return d.tenant_id === 1002; })
		  .attr("value", function(option) { 
			return option.tenant_id; })
          .text(function(option) { return option.tenant_display_name; });
		 
})		 


 // populate drop-down
        


//test starts
    
$('#fromdate').datepicker({
        inline: true,
        showOtherMonths: true,
        dayNamesMin: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
		dateFormat: 'dd MM,yy',
		maxDate: new Date (),
		onSelect: function (selectedDate, instance) {
            if (selectedDate != '') {

                //$("#todate").datepicker("option", "minDate", selectedDate);
				//from date picker
				
				var tenantswitch = "N"
                var changedfromdate = new Date(selectedDate);
                var changedfromdateMonth = (changedfromdate.getMonth() + 1).toString();
	            changedfromdateMonth = changedfromdateMonth.length > 1 ? changedfromdateMonth : 0 + changedfromdateMonth;
                var changedfromdateDate = changedfromdate.getDate().toString();
                changedfromdateDate = changedfromdateDate.length > 1 ? changedfromdateDate : 0 + changedfromdateDate;
                 var changedfromdateYear = changedfromdate.getFullYear();
                 thirtystartdate_fmt= changedfromdateYear + changedfromdateMonth + changedfromdateDate
	
				var date = new Date(selectedDate);
				

				date.setDate(date.getDate() +30)
				//console.log(date)
				

				if (date > new Date ()) {

					
				date = new Date();
				  }
					  
				else {
					date}
				
		        
                //console.log(selectedDate, date);
                $("#todate").datepicker("option", "minDate", selectedDate);
				$("#todate").datepicker("option", "maxDate", date);
				$("#todate").datepicker("setDate", date);

				//to date picker fmt

				 var changedtodate = date;
                 var changedtodateMonth = (changedtodate.getMonth() + 1).toString();
                 changedtodateMonth = changedtodateMonth.length > 1 ? changedtodateMonth : 0 + changedtodateMonth;
                 var changedtodateDate = changedtodate.getDate().toString();
                 changedtodateDate = changedtodateDate.length > 1 ? changedtodateDate : 0 + changedtodateDate;
                 var changedtodateYear = changedtodate.getFullYear();
                 todate_fmt = changedtodateYear + changedtodateMonth + changedtodateDate


				 loaddata();
				
            }
        }
	});	
	
$('#todate').datepicker({
        inline: true,
        showOtherMonths: true,
        dayNamesMin: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
		dateFormat: 'dd MM,yy',
		maxDate : new Date (),
		minDate : thirtystartdate,
		onSelect: function (selectedDate, instance) {
            if (selectedDate != '') {
                
				var tenantswitch = "N"
				//to date picker fmt

				 var changedtodate = new Date(selectedDate);
                 var changedtodateMonth = (changedtodate.getMonth() + 1).toString();
                 changedtodateMonth = changedtodateMonth.length > 1 ? changedtodateMonth : 0 + changedtodateMonth;
                 var changedtodateDate = changedtodate.getDate().toString();
                 changedtodateDate = changedtodateDate.length > 1 ? changedtodateDate : 0 + changedtodateDate;
                 var changedtodateYear = changedtodate.getFullYear();
				 todate_fmt = changedtodateYear + changedtodateMonth + changedtodateDate
				  loaddata();}}

    });		

$("#fromdate" ).datepicker("setDate", thirtystartdate);

$("#todate" ).datepicker("setDate", new Date());

//test ends
d3.select('#clientselect').on('change', function(a) {
   
  tenantswitch     = 'N'	
//  currentdriverkey =""	
//  breaktime        = "30 minutes";
//  cumbreaktime     = "90 minutes" ;
  currentKey       =  parseInt(d3.select(this).property('value'));
 //console.log(currentKey)	
  loaddata();
  //plotgraphs(dataSet,tenantswitch,currentdriverkey,breaktime,cumbreaktime)
	
});



d3.select('#breaktimeselect')
  .on('change', function() {
	
	
	tenantswitch = 'N'
    breaktime = d3.event.target.value;
    
	//console.log(breaktime)
	loaddata()

});

d3.select('#cumbreaktimeselect')
  .on('change', function() {
	
	
	tenantswitch = 'N'
    cumbreaktime = d3.event.target.value;
    
	//console.log(cumbreaktime)
	loaddata()
});

loaddata();

	function loaddata(){
	 
     	$("#loading").fadeIn();
	
	    //console.log(currentKey + " " + thirtystartdate_fmt + " " + todate_fmt + " " + breaktime + " " +  cumbreaktime)
		
	    d3.json("/data/"+ currentKey+ "/" + thirtystartdate_fmt + "/" + todate_fmt +"/" + breaktime + "/" + cumbreaktime,function makeGraphs(error,apiData) {
		  
		 //console.log(currentKey)

		  dataSet = apiData
		 
		 d3.json("/trip/"+ currentKey+ "/" + thirtystartdate_fmt + "/" + todate_fmt +"/" + breaktime + "/" + cumbreaktime,function makeGraphs2(error,apiData2) {
	     
	     dataSet2 = apiData2

		  plotgraphs(dataSet,dataSet2,tenantswitch,breaktime,cumbreaktime)
		   
		 })
	
	   }) 
	    
	}
	  
function plotgraphs(dataSet,dataSet2,tenantswitch,breaktime,cumbreaktime) {	  

	
	if (tenantswitch == 'N') {
	
	  //var UIbreaktimedesc = "Max Continuous break time in a trip: 30 Minutes"
	  //var UIcumbreaktimedesc = "Cumulative max break time in a trip: 90 Minutes"
	  /*var lookbacktime = "Time Considered towards the end of trip for Following Distance count : 60 Minutes"
	  var weightedavge = "Average# Following Distance count = Sum(Following Distance"
	  var weightedavgcont = "Count for each trip)/"
	  var wieghtedavdend = "Sum (ActualDriveTimeDuringLookbackTime for all trips)"
	 
	  
	  var weightedavge2 = "Average# no of events= Sum(Total Alert count"
	  var weightedavgcont2 = "for each trip)/"
	  var wieghtedavdend2 = "Sum (ActualDriveTimeDuringLookbackTime for all trips)"
	  
	  
	  //document.getElementById('breakTime').innerHTML=UIbreaktimedesc;
	  //document.getElementById('cumbreakTime').innerHTML=UIcumbreaktimedesc;
	  document.getElementById('lookbackTime').innerHTML=lookbacktime;
	  document.getElementById('weightedavg').innerHTML=weightedavge;
	  document.getElementById('weightedavgcont').innerHTML=weightedavgcont;
	  document.getElementById('weightedavgend').innerHTML=wieghtedavdend;

	
	  //document.getElementById('breakTime2').innerHTML=breaktime;
	  //document.getElementById('cumbreakTime2').innerHTML=cumbreaktime;
	  //document.getElementById('lookbackTime2').innerHTML=lookbacktime;
	  //document.getElementById('weightedavg2').innerHTML=weightedavge2;
	  //document.getElementById('weightedavgcont2').innerHTML=weightedavgcont2;
	  //document.getElementById('weightedavgend2').innerHTML=wieghtedavdend2;*/


	 

		
		var recordcount=0;
		var inputdata = dataSet
			
		var inputdata2 = dataSet2
		

		   console.log(inputdata2)

	 inputdata.forEach(function(d) {
		
		recordcount =+ 1;	
        d.triphour =+ d.triphour;
		
        d.alerttype.value =+ d.alerttype.value;
		d.tenantid =+ d.tenantid;  
		d.tailgatingcount =+ d.tailgatingcount;
		d.tailgatingoverallcount =+ d.tailgatingoverallcount;
		d.actualtripdrivetime =+ d.actualtripdrivetime;  

		d.driverfname.value =+ d.driverfname.value;  
	    d.driverlname.value =+ d.driverlname.value;
		d.startdateskey =+ d.startdateskey;   
		d.tripstarttime =+ (new Date(d.tripstarttime).getTime()) /1000   
		d.tripendtime =+ (new Date(d.tripendtime).getTime()) /1000  
		d.breaktimedesc.value =+ d.breaktimedesc.value;
		d.cumulativebreaktimedesc.value =+ d.cumulativebreaktimedesc.value;   
		
       });
		
		
        inputdata2.forEach(function(d) {
		
		recordcount =+ 1;	
        d.triphour =+ d.triphour;
		
        d.alerttype_novehicle.value =+ d.alerttype_novehicle.value;
		d.tenantid =+ d.tenantid;  
		
		d.tailgateoverallcount_novehicle =+ d.tailgateoverallcount_novehicle;  
		
		
		d.actualtripdrivetime =+ d.actualtripdrivetime;  

		d.driverfname.value =+ d.driverfname.value;  
	    d.driverlname.value =+ d.driverlname.value;
		d.startdateskey =+ d.startdateskey;   
		d.tripstarttime =+ (new Date(d.tripstarttime).getTime()) /1000   
		d.tripendtime =+ (new Date(d.tripendtime).getTime()) /1000  
		d.breaktimedesc.value =+ d.breaktimedesc.value;
		d.cumulativebreaktimedesc.value =+ d.cumulativebreaktimedesc.value;   
		
       });
		
	
    
		 
		filterdata = inputdata

		filterdata2 = inputdata2

	      
	    inputdata = inputdata.filter(function (a) {
			 
			 //console.log(cumbreaktime)

	         return (a.breaktimedesc == breaktime) && (a.cumulativebreaktimedesc === cumbreaktime);
        });
		
		
        inputdata2 = inputdata2.filter(function (a) {
			 
			 //console.log(cumbreaktime)

	         return (a.breaktimedesc == breaktime) && (a.cumulativebreaktimedesc === cumbreaktime);
        });
		


     	}
	
		// speedanalysischart(inputdata)
			   
	var ndx = crossfilter(inputdata);

	var ndx2 = crossfilter(inputdata2);


	
    //Define Dimensions
	
	 var tenantdimension = ndx.dimension(function(d) {return d.tenantid;});
	
	 var startdatedimension = ndx.dimension(function(d) {return d.startdateskey;});
	 
	 var driverdimension    = ndx.dimension(function(d) {return [d.driverfname,d.driverlname];});
	
     var heapchartdimension = ndx.dimension(function(d) {return [d.triphour, d.alerttype];});
     
	 var barchartdimension = ndx.dimension(function(d) {return [d.triphour];});

	 //var rowchartdimension = ndx.dimension(function(d) {return d.alerttype;});
	
	  var driverdimension2    = ndx2.dimension(function(d) {return [d.driverfname,d.driverlname];});
     var rowchartdimension2 = ndx2.dimension(function(d) {return d.alerttype_novehicle;});
	
	 
													 
																										
	
//start heatmap
	
	 function reduceAdd(p, v) {
		 
	  var filterFloat = function(value) {
       if (/^(\-|\+)?([0-9]+(\.[0-9]+)?|Infinity)$/
       .test(value))
       return Number(value);
       return NaN;
       }
	 
     
      //p.calweightalertcount += (v.tailgatingcount * v.actualtripdrivetime); 	 
	  p.calweightalertcount += v.tailgatingcount ; 	 	 
      p.totalactualtripdrivetime += v.actualtripdrivetime;
	
   	  
	  if(Math.abs(p.totalactualtripdrivetime) > 0.01) {	 
		  
	  //console.log(  p.totalactualtripdrivetime + " " + p.calweightalertcount)	  
		 
    
	  p.weightedalertcount = Math.round((p.calweightalertcount / p.totalactualtripdrivetime) * 10);
	  //console.log(p.calweightalertcount + " " + p.totalactualtripdrivetime)	
	  }else if (isNaN(filterFloat(p.totalactualtripdrivetime)) || p.totalactualtripdrivetime ==0) {
		  
		  p.weightedalertcount =-1;  
		 
	  } else
	  { p.weightedalertcount = 0 ;}
		  
      return p;
      }

      function reduceRemove(p, v) {
      //p.calweightalertcount -= (v.tailgatingcount * v.actualtripdrivetime); 	 
      
	  var filterFloat = function(value) {
       if (/^(\-|\+)?([0-9]+(\.[0-9]+)?|Infinity)$/
       .test(value))
       return Number(value);
       return NaN;
       }	  
		  
      p.calweightalertcount -= v.tailgatingcount ; 	 	 
      p.totalactualtripdrivetime -= v.actualtripdrivetime;
		  
	 if(Math.abs(p.totalactualtripdrivetime) > 0.01) {	 
		 
      
    	
		p.weightedalertcount = Math.round((p.calweightalertcount / p.totalactualtripdrivetime) * 10);	
		  
		  
			 
	  }else if (isNaN(filterFloat(p.totalactualtripdrivetime)) || p.totalactualtripdrivetime ==0) {
		  
		  p.weightedalertcount =-1;  
		 
	  } else
	  { p.weightedalertcount = 0 ;}  
	
    	 
	
	  return p;
      }

      function reduceInitial(p,v) {
      return {calweightalertcount: 0,totalactualtripdrivetime :0, weightedalertcount: 0 };
	  
      }
	
	
	
		
//end heatmap

	
//start barchart
	
	 function reduceAddB(p, v) {
     
      //p.caltotal_alert_count += (v.total_alert_count * v.actualtripdrivetime); 	
      p.caltotal_alert_count += v.total_alert_count 
      p.totalactualtripdrivetime += v.actualtripdrivetime;
		 
	  if(Math.abs(p.totalactualtripdrivetime/4) > 0.01) {	 
		  
	  //console.log(  p.totalactualtripdrivetime + " " + p.calweightalertcount)	  
		 
    
	  p.weightotal_alert_count = Math.round(((p.caltotal_alert_count/4) / (p.totalactualtripdrivetime/4)) * 100 );
	  }else 	p.weightotal_alert_count =0;  
		 
	 
      return p;
      }

      function reduceRemoveB(p, v) {
      //p.caltotal_alert_count -= (v.total_alert_count * v.actualtripdrivetime); 	 
	  p.caltotal_alert_count -= v.total_alert_count ; 	 		 	  
      p.totalactualtripdrivetime -= v.actualtripdrivetime;
		 
	  if(Math.abs(p.totalactualtripdrivetime/4) > 0.01) {	 
		  
	  //console.log(  p.totalactualtripdrivetime + " " + p.calweightalertcount)	  
		 
    
	  p.weightotal_alert_count = Math.round(((p.caltotal_alert_count/4) / (p.totalactualtripdrivetime/4)) * 100);
	  }else 	p.weightotal_alert_count =0;  
		
	
	  return p;
      }
	
      function reduceInitialB(p,v) {
      return {caltotal_alert_count: 0,totalactualtripdrivetime :0, weightotal_alert_count: 0 };
	  
      }
	
	
	
		
//end barchart
	
	
	
	
//start rowchart
	
	 

 function reduceAddP(p, v) {
     
    
	  p.totaltailgatingcount     += v.tailgatingcount/(30 * 60);    
	  p.totalactualtripdrivetime += v.tailgatingoverallcount/(30 * 60);	 
	  
	 
	  if(Math.abs(p.totalactualtripdrivetime) > 0.01) {	 
	
	  p.followingdispercent = Math.round((((p.totaltailgatingcount) / p.totalactualtripdrivetime) * 100 *10))/10
      //console.log(p.totaltailgatingcount + " " +  p.totalactualtripdrivetime + " " + p.followingdispercent)
	  if (p.followingdispercent > 0.01) {
          p.followingdispercent = p.followingdispercent;

	  }
	  } else 	p.followingdispercent =0;  
	  
		 	
		 
	  return p;
		 
      }

      function reduceRemoveP(p, v) {
      

	  p.totaltailgatingcount     -= v.tailgatingcount/(30 * 60);	  
	  p.totalactualtripdrivetime -= v.tailgatingoverallcount/(30 * 60);
	  
	  if(Math.abs(p.totalactualtripdrivetime) > 0.01)  {	 
		  
	  //console.log(  p.totalactualtripdrivetime + " " + p.calweightalertcount)	  
		 
      	  
	  p.followingdispercent = Math.round((((p.totaltailgatingcount) /  p.totalactualtripdrivetime) * 100 *10))/10

	  if (p.followingdispercent > 0.01) {
          p.followingdispercent = p.followingdispercent;

	  }
	  } else 	p.followingdispercent =0;  
		 	  
	  
	  return p;
      }
	
      function reduceInitialP(p,v) {
      return {totaltailgatingcount : 0 ,totalactualtripdrivetime : 0, followingdispercent : 0};
	  
      }

	
	
	
		
//end rowchart	


	
//start rowchart
	
	 function reduceAddP2(p, v) {
     
    
	  p.totaltailgatingcount     += v.tailgatingcount_novehicle/(30 * 60);    
	  p.totalactualtripdrivetime += v.tailgateoverallcount_novehicle/(30 * 60);	 
	  
	 
	  
	  

	  if(Math.abs(p.totalactualtripdrivetime) > 0.01) {	 
		  
	  

	  p.followingdispercent = Math.round((((p.totaltailgatingcount) / p.totalactualtripdrivetime) * 100 * 10))/10
      //console.log(p.totaltailgatingcount + " " +  p.totalactualtripdrivetime)
	  if (p.followingdispercent > 0.01) {
          p.followingdispercent = p.followingdispercent;

	  }
	  } else 	p.followingdispercent =0;  
		 	
		 
	  return p;
		 
      }

      function reduceRemoveP2(p, v) {
      

	  p.totaltailgatingcount     -= v.tailgatingcount_novehicle/(30 * 60);	  
	  p.totalactualtripdrivetime -= v.tailgateoverallcount_novehicle/(30 * 60);
	  
	  if(Math.abs(p.totalactualtripdrivetime) > 0.01)  {	 
		  
	  //console.log(  p.totalactualtripdrivetime + " " + p.calweightalertcount)	  
		 
      	  
	  p.followingdispercent = Math.round(((p.totaltailgatingcount /  p.totalactualtripdrivetime) * 100 * 10))/10

	  if (p.followingdispercent > 0.01) {
          p.followingdispercent = p.followingdispercent;

	  }
	  } else 	p.followingdispercent =0;  
		 	  
	  
	  return p;
      }
	
      function reduceInitialP2(p,v) {
      return {totaltailgatingcount : 0 ,totalactualtripdrivetime : 0, followingdispercent : 0};
	  
      }
	
	
	
		
//end rowchart	
		
	
	 //calculate Groups
	
    // var tenantdimensiongroup      = tenantdimension.group();
	
	 var startdatedimensiongroup   = startdatedimension.group().reduceSum(function(d) { return d.tailgatingcount; })
	 
	 var driverdimensiongroup    =  driverdimension.group();
	
	 var drivinghoursVsclosedis    = heapchartdimension.group().reduce(reduceAdd, reduceRemove, reduceInitial)
	
	 var drivinghoursVsnoofalerts  = barchartdimension.group().reduce(reduceAddB, reduceRemoveB, reduceInitialB)
	 

	 if (egolanesw == 'vehicleexclude') {
		  //console.log("vehiclesw " + egolanesw)
					  
		  var drivingtimeVspercentoffollow  = rowchartdimension2.group().reduce(reduceAddP2, reduceRemoveP2, reduceInitialP2)

		  //console.log(drivingtimeVspercentoffollow.top(Infinity))
	 }else {

		  var drivingtimeVspercentoffollow  = rowchartdimension2.group().reduce(reduceAddP, reduceRemoveP, reduceInitialP)
		  //console.log(drivingtimeVspercentoffollow.top(Infinity))	
	 }

	 //console.log(drivingtimeVspercentoffollow.top(Infinity));
	 

	 var all = ndx.groupAll();
	
	
	 var heatmap = dc.heatMap("#No-of-instances");
	 var barChart = dc.barChart("#No-of-alerts");
	
	 var rowChart = dc.rowChart("#percentage-of-followingdis");

	 //speedchart tip

	 var stackbarTip = d3.tip()
				  .attr('class', 'd3-tip')
				  .style("visibility","visible")
					  .style("position", "absolute")
					  // .style("text-align", "center")
					   .style("width", "200px")
						//.style("color", "white")
						.style("background", "black")
					.style("padding", "8px")

					.style("border", "solid 1px #aaa")
					.style("font-weight", "bold")
					.style("font-size", "13px")
                  
				   .html(function (d) { console.log("check " + d.layer + d.x); 

				      if (d.layer == "speed_under_limit") {

						speed_desc = "Within Speed Limit"
						speed_count = Math.round((d.data.value.speed_underlimit_count/60) * 10 )/10
					  }else if (d.layer == "speed_upto5mph_above_limit") {
						speed_desc = "Speed < Speed limit + 5 mph" 
						speed_count = Math.round((d.data.value.speed_upto5mph_abovelimit_count/60) * 10)/10
						
					  }else if (d.layer == "speed_above5mph_above_limit") {
						speed_desc ="Speed > Speed limit + 5 mph" 
						speed_count = Math.round((d.data.value.speed_above5mph_abovelimit_count/60) * 10)/10
					  }


					  return  "<span style='color: #aeea00'>" +speed_desc + " : "  +  "<span style='color: white'>" +  d.y + "%, "+
					          speed_count + "/" + Math.round((d.data.value.total_speed_count/60) * 10)/10 + " Minutes"
					});

	
	  driverField = dc.selectMenu('#driverselect')
	  .dimension(driverdimension)
	  .group(driverdimensiongroup) 
  	   driverField.title(function (d){
            return d.key ;
        }).promptText("All Drivers")
	 
	
      function re_jmulti(clear) {
     return function() {
     if(clear)
      driverField.selectAll('.ms-parent.dc-select-menu').remove();
	  $('#driverselect select')
     .change(function() {
	  console.log($(this).val());
	   var newdriver = 	$(this).val();
		  console.log(newdriver.length)


	  //driverdimension2.filter(newdriver);	
         if (newdriver != "" ) {
			driverdimension2.filter(newdriver)
			inputdata3 = inputdata.filter(function (a) {
			 
			 

	         return (a.driverfname + "," + a.driverlname  ==newdriver );
		}); }
		else {inputdata3 = inputdata;
		driverdimension2.filterAll() }	
	  //console.log(inputdata3)
	  speedchart = speedanalysischart(inputdata3)
	  speedchart.render() 
	  speedchart.selectAll("g.stack rect").
				 call(stackbarTip);
      speedchart.selectAll("g.stack rect")
              .on('mouseover',stackbarTip.show)
			  .on('mouseout', stackbarTip.hide); 
	

		
	  })
    };
    }
	
     driverField.on('postRender', re_jmulti(true));


     dc.dataCount("#row-selection")
        .dimension(ndx)
        .group(all);
 
    var heatcolormapping = function(d){
	  
	  var min = d3.min(drivinghoursVsclosedis.all(), function (e) {
        return e.value.weightedalertcount != -1 ?  e.value.weightedalertcount :  0 ;
    });
	  
	  var max = d3.max(drivinghoursVsclosedis.all(), function (e) {
        return e.value.weightedalertcount != -1 ? e.value.weightedalertcount :  0;
    });
	  if (d==-1)
	  {
		  
	  var valuecheck = -1
	  }else{  var valuecheck = (d-min)/max-min}
	  
	  if (isNaN(Number(valuecheck))) {
		  valuecheck = 0  
	  }
	  
	  
      //console.log(min +   "      " + max)
	  //console.log(valuecheck + " " + d)
	  
	  if (valuecheck == -1){
		  return d3.scale.linear().domain([-1,-1]).range(["#f3f2ed","#f3f2ed"])(d);
	  } 
	  
	  else  if (valuecheck<0.01) {
	   //console.log("zero");
         return d3.scale.linear().domain([0,1]).range(["#dcedc8","#dcedc8"])(d)}
	  
	  else if ( valuecheck>=0.01 && valuecheck<=0.15) {
		 //   console.log("one");
         return d3.scale.linear().domain([0,max]).range(["#e6ee9c","#fff59d"])(d)}
	  
	  else if ( valuecheck>0.15 && valuecheck<=0.3) {
		  //console.log("two");
		  return d3.scale.linear().domain([0,max]).range(["#ffe082","#ffd54f"])(d)}
	  
	  else if ( valuecheck>0.3 && valuecheck<=0.45) {
		   //console.log("three");
		   return d3.scale.linear().domain([0,max]).range(["#ffb74d","#ffa726"])(d)}
	  
	  else if ( valuecheck>0.45 && valuecheck<=0.7) {
		   //console.log("four");
		  return d3.scale.linear().domain([0,max]).range(["#ff9800","#fb8c00"])(d)}
	  else if ( valuecheck>0.45 && valuecheck<=0.7) {
		   //console.log("five");
		  return d3.scale.linear().domain([0,max]).range(["#f57c00","#e65100"])(d)}
	  else if ( valuecheck>0.7 && valuecheck<=0.85	) {
		
		  //console.log("six");
		  
		  return d3.scale.linear().domain([0,max]).range(["#d84315","#bf360c"])(d);}
	  else if ( valuecheck > 0.85 && valuecheck <=1) {
		 // console.log("seven");
		  return d3.scale.linear().domain([0,max]).range(["#b71c1c","#b71c1c"])(d);}
	  
	  
	  
	 
	  
  }	  
  
  
   heatcolormapping.domain = function() {
	    
	   
	
	   
        return [0,1];
    };


   
 
   heatmap
     .width(950).height(350)
     .margins({ top: 1, right: 50, bottom: 30, left: 150 })
     .dimension(heapchartdimension)
     .group(drivinghoursVsclosedis)
     .colors(heatcolormapping)
     .keyAccessor(function(d) { 
	   
	    return d.key[0] ;})
     .valueAccessor(function(d) {
	   
	   return  d.key[1] == "Tail Gate between 0 and 0.1" ? "0 to 0.1s" :
			   d.key[1] == "Tail Gate between 0.1 and 0.2" ? "0.1 to 0.2s" :
			   d.key[1] == "Tail Gate between 0.2 and 0.3" ? "0.2 to 0.3s" :
			   d.key[1] == "Tail Gate between 0.3 and 0.4" ? "0.3 to 0.4s" :	  	  
			   d.key[1] +'s';		  

		  
	   ;})
     .colorAccessor(function(d) {
	   
	 
	   return  d.value.weightedalertcount;
	   })
	.renderTitle(false)
	 .transitionDuration(10)
    // .on("postRedraw", function(chart, filter){chart.render();})
     .ordering(function(d){return +d.key[0];})
	 .colOrdering(d3.ascending)
	   
   
   
   
	heatmap.filter = function() {};

 	
	var x = d3.max(drivinghoursVsnoofalerts.all(), function (e) {
          return e.key
		   });
           console.log(x)
	      	   if (x >=0 && x <=1 ) {
             var bardpadding = 0.85

		   } else	      	   if (x >1 && x <=2 ) {
             var bardpadding = 0.7 }
            else {
             var bardpadding = 0.5
		   }

	barChart
    	.width(850)
        .height(350)
       // .transitionDuration(1000)
        .dimension(barchartdimension)
        .group(drivinghoursVsnoofalerts
	    , function(d) { 
		 return d.value.weightotal_alert_count;})
	     .margins({ top: 30, right: 10, bottom: 40, left: 80 })
        .centerBar(false) 
	    .yAxisLabel("Number of Alerts per 100 Minutes of Drive")
	    .xAxisLabel("Hours")
        .barPadding(bardpadding)
	    .xAxisPadding(50)
        .elasticY(true)
	    .elasticX(true)
	    //.y(d3.scale.ordinal().domain(drivinghoursVsnoofalerts,function(d) { return [d.value.weightotal_alert_count];}))
        .x(d3.scale.ordinal().domain(drivinghoursVsnoofalerts))
        .xUnits(dc.units.ordinal)
        .renderHorizontalGridLines(true)
		.renderVerticalGridLines(true)
		 .renderTitle(false)
	    // .title(function (d) {
	               
        //         return 'Hour                     : ' + d.key[0] + '\n' +
        //                  'Alerts : ' + [d.value.weightotal_alert_count];
	                      
         //       })  
	    //.on("postRedraw", function(chart, filter){chart.render();})
	    .ordering(function(d){return +d.key;})
	    .ordinalColors(["#ff9100"])
	    .controlsUseVisibility(true) 
	    .calculateColorDomain()

	   
	
         barChart.filter = function() {};
	
	    
	
		// tooltips for pie chart
			
		/*var x = d3.scale.log ()
    .domain([1, 100])
    .range([0, 600])
	//.base(2)
	
	console.log(x(5))
	console.log(x(20))*/
	
         
	
	     rowChart
         .width(900)
         .height(280)
         .dimension(rowchartdimension2)
         .group(drivingtimeVspercentoffollow)
		 //.legend(dc.legend().x(0).y(10).itemHeight(18).gap(5))
		  .margins({ top: 10, right: 160, bottom: 60, left: 100 })
		 //.renderLabel(false)
		  .label(function(d) {
			 
			 return d.key == "Tail Gate between 0 and 0.5" ?  "Following Distance 0 to 0.5s" :
			   d.key == "Tail Gate between 0.5 and 1" ? "Following Distance 0.5 to 1.0s" :
			   d.key == "Tail Gate between 1 and 1.5" ? "Following Distance 1.0 to 1.5s" :
			   d.key == "Tail Gate between 1.5 and 2.0" ? "Following Distance 1.5 to 2.0s" :
			   d.key == "Tail Gate > 2.0" ? "Following Distance > 2.0s" :	  	  	  
			   d.key +'s'	;})
         .renderTitle(false)
		  .elasticX(false)
		 .valueAccessor(function(d) {

			console.log(d.value.followingdispercent)
	         return d.value.followingdispercent; })
			 .colors(d3.scale.ordinal().range([ '#e64a19','#f57c00','#fbc02d','#ffeb3b','#c6ff00']))
			  .ordering(function(d) {
               if(d.key == "Tail Gate between 0 and 0.5") return 4;
			   else if(d.key == "Tail Gate between 0.5 and 1") return 3;
			   else if(d.key == "Tail Gate between 1 and 1.5") return 2;
			   else if(d.key == "Tail Gate between 1.5 and 2.0") return 1;
			   else if(d.key == "Tail Gate > 2.0") return 0;
    // handle all days 
			   })
		     .x(d3.scale.log().clamp(true).domain([0.01,100]).range([0,600]).nice())
             .xAxis().scale(rowChart.x());
		      // rowChart.xAxis().tickFormat(function(v) { return ""; });
			 rowChart.xAxis().ticks(20).tickFormat(function(v) 
			  
			 
			 { return v == 0.01 ? v :
					  v == 0.1 ? v :
					  v == 0.5 ? v :
				      v == 5 ? v :
					  v == 10   ? v :
					  v == 30   ? v :
					  v == 50   ? v :
					  v == 70   ? v :
					  v == 100   ? v :			 			
		              "";					 
			
			});
			 //rowChart.xAxis().tickValues([10,20,30,40,50,60,70,80,90,100])


				
		 //'#bf360c','#e64a19','#f57c00','#fbc02d','#c6ff00'

    
             rowChart.filter = function() {};
	
	          speedchart = speedanalysischart(inputdata) 
              
	
dc.renderAll();
	
	    function AddXAxis(chartToUpdate, displayText) {
                     chartToUpdate.svg()
                     .append("text")
                     .attr("class", "x-axis-label")
					 .attr("text-anchor", "middle")
					 .style("position", "absolute")
                     .attr("x", chartToUpdate.width() / 2)
                     .attr("y", chartToUpdate.height() /1.02)
                     .text(displayText);
              }
		AddXAxis(rowChart, "Following distance %");
		

		    function AddYAxis(chartToUpdate, displayText) {
                     chartToUpdate.svg()
					 .append("text")
					 .style("font-family","'Lato', sans-serif")
					 .style("font-weight","300")
                     .attr("class", "y label")
					 .attr("text-anchor", "middle")
					 .style("position", "absolute")
					 .attr('transform', 'rotate(-90)')
                     .attr("x", -180)
					 .attr("y", 65)
					 .text(displayText)
					  
              }
		AddYAxis(heatmap, "Count of following distance/10 minutes of drive");
		
	console.log("record count " + recordcount)
   if (recordcount !=0) {
	//heatmap tool tip   
    var heatmaptip = d3.tip()
                      .attr('class', 'd3-tip')
					  .style("visibility","visible")
					  .style("position", "absolute")
					  // .style("text-align", "center")
					   .style("width", "150px")
						//.style("color", "white")
						.style("background", "black")
					.style("padding", "8px")
                    	.style("font-weight", "bold")
					.style("border", "solid 1px #aaa")
					.style("font-size", "13px")

					
					
					 
                      .html(function(d) {
						  //heatmap.select(".tooltip").remove();
                        return  d.value.weightedalertcount == -1 ? "<span style='color: #aeea00'>" + "No Data" : "<span style='color: #aeea00'>" + "Following Distance Count : " + "<span style='color: white'>" + d.value.weightedalertcount ;
                      });

   //d3.select(".d3-tip").remove();
   
   var heatMap = heatmap.selectAll("rect").
				 call(heatmaptip);
			  heatmap.selectAll("rect")	 
              .on('mouseover', heatmaptip.show)
			  .on('mouseout', heatmaptip.hide); 
    //rowchart tool tip			  					  
	var Tip = d3.tip()
				  .attr('class', 'd3-tip')
				  .style("visibility","visible")
					  .style("position", "absolute")
					   //.style("text-align", "center")
					   .style("width", "300px")
						//.style("height", "00px")  
						//.style("color", "white")
						.style("background", "black")
					.style("padding", "8px")
					.style("font-weight", "bold")
					.style("font-size", "13px")

					.style("border", "solid 1px #aaa")
                  
				  .html(function (d) { 
					  

						if (d.key == "Tail Gate between 0 and 0.5" ) {
								
							followdiskey = "Following Distance 0 to 0.5s" 
						}else if (d.key == "Tail Gate between 0.5 and 1" ) {
							followdiskey = "Following Distance 0.5 to 1.0s" 
						}else if (d.key == "Tail Gate between 1 and 1.5" ) {
							followdiskey = "Following Distance 1.0 to 1.5s" 
						}else if (d.key == "Tail Gate between 1.5 and 2.0" ) {
							followdiskey = "Following Distance 1.5 to 2.0s" 
						}else if (d.key == "Tail Gate > 2.0" ) {
							followdiskey = "Following Distance > 2.0s" 
						}	

										return  "<span style='color: #aeea00'>" +  followdiskey + " :" +  "<span style='color: white'>" +
										        d.value.followingdispercent + " %" + " ," +
										        Math.round(d.value.totaltailgatingcount)  +"/"	+				
											   Math.round(d.value.totalactualtripdrivetime) + " Minutes" 
											    ;  	  
											  
											  
			   	                               								
											
											});
	
	    
	      d3.selectAll("g.row").call(Tip);

           d3.selectAll("g.row")
          .on('mouseover', Tip.show )
		  .on("mouseout", Tip.hide);
		
	//bar chart tool tip
	
	var barTip = d3.tip()
				  .attr('class', 'd3-tip')
				  .style("visibility","visible")
					  .style("position", "absolute")
					   //.style("text-align", "center")
					   .style("width", "150px")
						//.style("color", "white")
						.style("background", "black")
					.style("padding", "8px")

					.style("border", "solid 1px #aaa")
					.style("font-weight", "bold")
					.style("font-size", "13px")

                  
				  .html(function (d) { return  "<span style='color: #aeea00'>" + "Number of Alerts :" + "<span style='color: white'>" +d.y; });
				  
     
	 var barchart = barChart.selectAll(".bar").
				 call(barTip);
			  barChart.selectAll(".bar")	 
              .on('mouseover', barTip.show)
			  .on('mouseout', barTip.hide); 			  
		



    

    console.log(speedchart.selectAll("g.stack rect"))
    speedchart.selectAll("g.stack rect").
				 call(stackbarTip);
	speedchart.selectAll("g.stack rect")
              .on('mouseover',stackbarTip.show)
			  .on('mouseout', stackbarTip.hide); 


		}
		  


function remove_empty_bins(source_group) {
    return {
        all:function () {
			return source_group.all().filter(function(d) {
            
				return d.key[0] !=0 ;
				
					
            });
        }
    };
}

  	$("#loading").fadeOut();

};

function speedanalysischart(inputdata) {


    //remove

        
		 var inputdata2 = inputdata
		 var data1 = d3.nest()
        .key(function(d) { return  d.triphour })
        .rollup(function(d) { 
		 
		 return {
		  
		 speed_limit_percentage: 
		  
		  Math.round(( (d3.sum(d, function(g) {return g.speed_above5mph_abovelimit; })/4)/
			(d3.sum(d, function(g) {return g.speed_underlimit; })/4 + d3.sum(d, function(g) {return g.speed_above5mph_abovelimit; })/4 
			+d3.sum(d, function(g) {return g.speed_upto5mph_abovelimit; })/4) ) * 100 * 10)/10,
			speed_limit_type: "speed_above5mph_above_limit" ,
			speed_above5mph_abovelimit_count : d3.sum(d, function(g) {return g.speed_above5mph_abovelimit; })/4,
			speed_underlimit_count :0,
			speed_upto5mph_abovelimit_count :0 }
            
		  }).
		
		  entries(inputdata2);	

         var data2 = d3.nest()
        .key(function(d) { return  d.triphour })
        .rollup(function(d) { 
		 
		 return {
		  
		 
		 speed_limit_percentage: Math.round(((d3.sum(d, function(g) {return g.speed_underlimit; })/4)/
		  (d3.sum(d, function(g) {return g.speed_underlimit; })/4 + d3.sum(d, function(g) {return g.speed_above5mph_abovelimit; })/4 
		    +d3.sum(d, function(g) {return g.speed_upto5mph_abovelimit; })/4)) * 100 * 10)/10,
		 speed_limit_type: "speed_under_limit",
		 speed_underlimit_count : d3.sum(d, function(g) {return g.speed_underlimit; })/4,
		 speed_above5mph_abovelimit_count :0,
		 speed_upto5mph_abovelimit_count :0 
		}
            
		  }).		
		  entries(inputdata2);	

         var data3 = d3.nest()
        .key(function(d) { return  d.triphour })
        .rollup(function(d) { 
		 
		 return {
		  
		 
		speed_limit_percentage: Math.round(((d3.sum(d, function(g) {return g.speed_upto5mph_abovelimit; })/4)/
		(d3.sum(d, function(g) {return g.speed_underlimit; })/4 + d3.sum(d, function(g) {return g.speed_above5mph_abovelimit; })/4 
		    +d3.sum(d, function(g) {return g.speed_upto5mph_abovelimit; })/4)) * 100 * 10)/10,
		speed_limit_type: "speed_upto5mph_above_limit",
		 speed_upto5mph_abovelimit_count : d3.sum(d, function(g) {return g.speed_upto5mph_abovelimit; })/4,
		 speed_underlimit_count :0,
		 speed_above5mph_abovelimit_count :0			 }
	            
		  }).		
		  entries(inputdata2);	

		  
		  var speeddata = d3.merge([data1,data2,data3])
		  
		  console.log(speeddata)

		  var  speedndx = crossfilter(speeddata)
		  
		  var  triphourdimension = speedndx.dimension(function (d) { return d.key})

		  var  triphourdimensiongroup =  triphourdimension.group().reduce(function(p, v) {
				  p[v.values.speed_limit_type] = (p[v.values.speed_limit_type] || 0) + v.values.speed_limit_percentage 
				  p["total_speed_count"] = (p["total_speed_count"] || 0) + v.values.speed_underlimit_count + v.values.speed_upto5mph_abovelimit_count +
					                       v.values.speed_above5mph_abovelimit_count
				  p["speed_underlimit_count"] = (p["speed_underlimit_count"] || 0) + v.values.speed_underlimit_count	
				  p["speed_above5mph_abovelimit_count"] = (p["speed_above5mph_abovelimit_count"] || 0) + v.values.speed_above5mph_abovelimit_count
                  p["speed_upto5mph_abovelimit_count"] = (p["speed_upto5mph_abovelimit_count"] || 0) + v.values.speed_upto5mph_abovelimit_count							
							
                  return p;
              }, function(p, v) {
				  p[v.values.speed_limit_type] = (p[v.values.speed_limit_type] || 0) - v.values.speed_limit_percentage 
				  p["total_speed_count"] = (p["total_speed_count"] || 0) - (v.values.speed_underlimit_count + v.values.speed_upto5mph_abovelimit_count +
					                       v.values.speed_above5mph_abovelimit_count)
				  p["speed_underlimit_count"] = (p["speed_underlimit_count"] || 0) - v.values.speed_underlimit_count	
				  p["speed_above5mph_abovelimit_count"] = (p["speed_above5mph_abovelimit_count"] || 0) - v.values.speed_above5mph_abovelimit_count
                  p["speed_upto5mph_abovelimit_count"] = (p["speed_upto5mph_abovelimit_count"] || 0) - v.values.speed_upto5mph_abovelimit_count							
				
                  return p;
              }, function() {
                  return {};
              });

		 console.log(triphourdimensiongroup.top(Infinity))


		 
	      var x = d3.max(triphourdimensiongroup.all(), function (e) {
          return e.key
		   });
           //console.log(x)
	      	   if (x >=0 && x <=1 ) {
             var bardpadding = 0.85

		   } else	      	   if (x >1 && x <=2 ) {
             var bardpadding = 0.7 }
            else {
             var bardpadding = 0.5
		   }
		  

		  var speedchart = dc.barChart("#percentage-of-speed");

		  var colors = ["b33040", "#d25c4d", "#f2b447"];
		  
          speedchart
              .width(800)
              .height(350)
              .x(d3.scale.ordinal().domain(triphourdimensiongroup))
             .xUnits(dc.units.ordinal)
              .margins({left: 80, top: 80, right: 10, bottom: 50})
              .brushOn(false)
              
              .dimension(triphourdimension)
              .group(triphourdimensiongroup,"speed_under_limit").valueAccessor(function (d) {

               return d.value.speed_under_limit;



			  })
			 .stack(triphourdimensiongroup, "speed_upto5mph_above_limit", function (d) {

                return d.value.speed_upto5mph_above_limit;

			  })
			 .stack(triphourdimensiongroup, "speed_above5mph_above_limit", function (d) {

                return d.value.speed_above5mph_above_limit;

              })
			  //.renderLabel(true)
				.gap(0)
				.centerBar(true)
				.barPadding(bardpadding)
	    //.xAxisPadding(50)
        .elasticY(true)
		.elasticX(true)
		.centerBar(false)
		.yAxisLabel("Speeding %")
	    .xAxisLabel("Hours") 	
		.renderHorizontalGridLines(true)
		.renderVerticalGridLines(true)
		.renderTitle(false) 
		.ordering(function(d){return +d.key;})
		.controlsUseVisibility(true) 
	     .title(function(d) {
			      
                  return  this.layer == "speed_under_limit" ? "Within Speed Limit" + ': ' + d.value[this.layer] + '%' + " ," + d.value['speed_underlimit_count'] + " out of " + d.value['total_speed_count']:
		  this.layer == "speed_upto5mph_above_limit" ? "Overspeeding: Speed < Speed limit + 5 mph" + ': ' + d.value[this.layer] + '%' + " ," + d.value['speed_upto5mph_abovelimit_count'] + " out of " + d.value['total_speed_count']:
                  this.layer == "speed_above5mph_above_limit" ? "Overspeeding: Speed > Speed limit + 5 mph" + ': ' + d.value[this.layer] + '%' + " ," + d.value['speed_above5mph_abovelimit_count'] + " out of " + d.value['total_speed_count']:
                  this.layer + ': ' + d.value[this.layer] + '%' ;
                 


			  })
		.colors(d3.scale.ordinal().range([ '#fbc02d', '#f57c00', '#e64a19']))				
		 
		 speedchart
                 .legend(dc.legend().x(0).y(10).itemHeight(13).gap(5).legendText(
                      function(d) { //console.log(d) ;
                  return  d.name == "speed_under_limit" ? "Within Speed Limit" :
                  d.name == "speed_upto5mph_above_limit" ? "Overspeeding: Speed < Speed limit + 5 mph" :
                  d.name == "speed_above5mph_above_limit" ? "Overspeeding: Speed > Speed limit + 5 mph" :
                  d.name ; } 
                  ))
				speedchart.filter = function() {};
		 
		//speedchart.render();

		return speedchart
				
	
}	
	
		
	

	


