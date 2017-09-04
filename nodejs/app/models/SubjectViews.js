
// define our nerd model
// module.exports allows us to pass this to other files when it is called
var tripobservation = module.exports = connectionsubject.model('tripobservation', {}, 'ndtripobservationdetails');

module.exports.getTripbytenantid = function (tenantid,startdate,enddate,breaktime,cumbreaktime,callback){

	var tenant_id  = parseInt(tenantid)
	var start_date = parseInt(startdate)
	var end_date   = parseInt(enddate)

	console.log(tenant_id + " " + startdate + " "+ enddate + " " + breaktime + " " + cumbreaktime)

	tripobservation.find({'$and': [{'tenantid' : tenant_id, 'breaktimedesc' : breaktime, 'cumulativebreaktimedesc' : cumbreaktime, 'startdateskey' : {'$gte' : start_date,'$lte' : end_date}}]},callback);
}


