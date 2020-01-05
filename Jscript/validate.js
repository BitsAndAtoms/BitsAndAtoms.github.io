    function validateForm(){
    var divElement = document.getElementsByTagName('p');
	if (document.forms[0].contactAddress.value == "" ){
		divElement[1].innerHTML = "Please enter an e-mail address.";
	   return false;
	   }// end if
	   return true;
	   }// end function validateForm
