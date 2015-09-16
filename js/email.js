/*
    File: /~jason/js/email.js
    91.461 Assignment: Add CSS / Go crazy
    Jason Downing - student at UMass Lowell in 91.461 GUI Programming I
    Contact: jdowning@cs.uml.edu or jason_downing@student.uml.edu
    MIT Licensed - see http://opensource.org/licenses/MIT for details.
    Anyone may freely use this code. Just don't sue me if it breaks stuff.
    Created: September 16th, 2015.
    Last Updated: September 16th at 4PM

    This JavaScript file contains a function called sendEmail which whenever the user clicks on the "Submit" button
    it gets called. It will email me their message assuming they entered a name / valid email address.

    This function is based off of an earlier piece of JS I wrote for a friend's website. I simplified it since I didn't use
    a form on this website. You can find the code for that JavaScript file here:
    https://raw.githubusercontent.com/JasonD94/repair/gh-pages/js/email.js
*/
function sendEmail() {

  var email_name, email_address, email_message;

  /* This post was really helpful for this part:
      https://stackoverflow.com/questions/11563638/javascript-get-input-text-value
  */
  email_name = document.getElementById('name').value;

  // Error checking, with a return to break out of this function if users didn't follow directions.
  if ( !email_name) {
    alert('Please enter a name - thanks!');
    return;
  }

  email_address = document.getElementById('email').value;

  if ( !email_address) {
    alert('Please enter a valid email address - thanks!');
    return;
  }

  email_message = document.getElementById('msg').value;

  if ( !email_message) {
    alert('Please enter a message to send me - thanks!');
    return;
  }

  // Debugging, to make sure this thing works.
  console.log("Email name: ", email_name);
  console.log("Email address: ", email_address);
  console.log("Email message: ", email_message);

  // Formatted message to send to myself.
  var message_body;
  message_body = "<br/><br/>Greetings, Jason. <br/>You have a new email from: " +
  email_name + "<br/>Email address: " + email_address +
  "<br/>Email message: <br/>" + email_message + "<br/><br/>Sent via the awesome Mandrill API";

  $.ajax({
    type: 'POST',
    url: 'https://mandrillapp.com/api/1.0/messages/send.json',
    data: {
      "key": "PUZvXW1BZFD6SZHSBpVH7Q",
      "message": {
        "from_email": email_address,
        "to": [
        {
          "email": "jdown1994@gmail.com",   // jtsheppleitech@gmail.com
          "name": "Jason Downing",
          "type": "to"
        }
        ],
        "autotext": "true",
        "subject": "You have a new email from your website!",
        "html": message_body
      }
    }
  })

  .done(function(response) {
    // Debug output
    console.log(response);

    if(response[0]["status"] == "sent")
    {
      console.log("Email send successfully..");
      alert('Your message has been sent. Thanks!');

      // Reset the fields after a successful email to prevent spamming. (TODO: Captchas)
      $('#name').val('');
      $('#email').val('');
      $('#msg').val('');
    }
    else{
      console.log("Failure to send email...");
      alert('Sorry, your email didn\'t go through for some reason.');
    }
  })

  .fail(function(response) {
          alert('Error sending the email message. Please make sure to provide a valid email address and name.');
  });

  return false;       // prevent page refresh
}