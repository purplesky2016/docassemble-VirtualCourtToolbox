//this is a revision of Jonathan Pyle's datereplace.js
$(document).on('daPageLoad', function(){
  $('input[type="textdate"]').each(function(){
    var $daDate = $(this);
    $daDate.hide();
    $daDate.attr('type', 'hidden');
    $daDate.attr('aria-hidden', 'true');
    
    var $parentElement = $('<div class="form-row">');
    var $yearParent = $('<div class="col"><div style="text-align:center">Year</div></div>');
    var $monthParent = $('<div class="col"><div style="text-align:center">Month</div></div>');
    var $dayParent = $('<div class="col"><div style="text-align:center">Day</div></div>');

    var $monthElement = $('<select class="form-control" style="width:7.5em" required>');
    var $dayElement = $('<input type="text" class="form-control" type="number" min="1" max="31" required>' );
    var $yearElement = $('<input type="text" class="form-control" type="number" min="1901" max="2020" required>');
      
  // If we're returning to a variable that has already been defined
  // prepare to use that variable's values
  var dateParts;
  if ( $daDate.val() ) {
    dateParts = $daDate.val().split( '/' );
    dateParts.forEach( function( part, index, dateParts ) {
      dateParts[ index ] = parseInt( part );
    });
  } else {
    dateParts = null;
  }
      
  // Create contents of visible input fields
	
  // "No month selected" option
	var opt = $("<option>");
	opt.val("");
	opt.text("    ");
	$monthElement.append(opt);
  // Add every calendar month (based on user's computer's date system? lanugage?)
	for(var month=0; month < 12; month++){
	    opt = $("<option>");
	    if (month < 9){
		opt.val('0' + (month + 1));
	    }
	    else{
		opt.val(month + 1);
	    }
	    var dt = new Date(1970, month, 1);
	    opt.text(dt.toLocaleString('default', { month: 'long' }));
      // Use previous values if possible
      if ( dateParts && parseInt( opt.val()) == dateParts[ 0 ]) {
        opt.attr('selected', 'selected');
      }
	    $monthElement.append(opt);
	}

  // Use previous values if possible
	if ( dateParts ) {		
		$dayElement.val( dateParts[ 1 ]);
		$yearElement.val( dateParts[ 2 ]);
	}

	function updateDate(){
		$daDate.val( $monthElement.val() + '/' + $dayElement.val() + '/' + $yearElement.val());	
	}	
	
    // Put all the elements in the doc in the right place
	$daDate.before($parentElement);  // needed?
	$monthParent.append($monthElement);
	$parentElement.append($monthParent);
	$dayParent.append($dayElement);
	$parentElement.append($dayParent);
	$yearParent.append($yearElement);
	$parentElement.append($yearParent);
	
	$monthElement.on('change', updateDate);
	$dayElement.on('change', updateDate);
	$yearElement.on('change', updateDate);
	updateDate();
    });
});