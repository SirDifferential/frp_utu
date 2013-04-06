$(document).ready(function() {
    // Initialize (users) datatables with constant data
    var dusers = $("#databox").dataTable( { 
        "bJQueryUI": true,
        "aaData" : studentData,
        "aoColumns": [
            { "sTitle": "Student number" },
            { "sTitle": "Name" },
            { "sTitle": "Degree" },
            { "sTitle": "Major" },
            { "sTitle": "Student points"},
            { "sTitle": "Enrollment date"}
        ]
   });

   var dataClicks = $("#databox").
       asEventStream("click", "tr").
       filter(function(ev) {
           var trg = $(ev.currentTarget);
           if(trg.attr("class") == "odd" || trg.attr("class") == "even")
               return true;
           return false;
       }).map(function(ev) {
           return dusers.fnGetData(ev.currentTarget);
       });
   var userModalClose = $("#modal_user a.close").asEventStream("click").map(false);
   var userModalOpen = dataClicks.map(true);
   userModalClose.merge(userModalOpen).skipDuplicates().onValue(function(open) {
       console.log(open);
       if(open)
           $("#modal_user").modal('show');
       else
           $("#modal_user").modal('hide');
   });
});
