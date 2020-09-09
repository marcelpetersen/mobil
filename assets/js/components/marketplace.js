var form = {
  init: function() {
    var recaptchaLoaded = false;
    $('input, textarea, select').focus(function(){
      if(!recaptchaLoaded) {
        recaptchaLoaded = true;
        var head = document.getElementsByTagName('head')[0];
    		var script = document.createElement('script');
    		script.type = 'text/javascript';
    		script.src = 'https://www.google.com/recaptcha/api.js?render=6LeHSagUAAAAACPB5JfFS9ihSEbW-PJHqbBjlDgR';
    		head.appendChild(script);
      }
      if($(this).parents('.form-group')) {
        $(this).parents('.form-group').addClass('focused');
      }
    });
    $('input, textarea').blur(function(){
      var inputValue = $(this).val();
      if ( inputValue == "" ) {
        $(this).parents('.form-group').removeClass('focused');
      }
    });
  },

  submit: function(contactForm) {
    var postURL = contactForm.attr('action');
    var data = form.serializeObject(contactForm);
    var capitalizedName = data.name.toLowerCase().replace(/\b[a-z]/g, function(txtVal) {
      return txtVal.toUpperCase();
    });
    data.name = capitalizedName;
    //console.log(data);

    $.ajax({
      url: postURL,
      method: "POST",
      data: data,
      dataType: "json",
      headers: {
        "Accept": "application/json"
      }
    }).done(function (response) {
      $("#modal-form").slideUp(400);
      $("#modalheader").removeClass('bg-dark').addClass('bg-success');
      $('#mkt-formtitle').text("Thanks for reaching out");
      $('#mkt-formintro').text("Your message has been sent successfully. We’ll get back to you in no time.");
    }).fail(function (error) {
      console.log(error);
      $("#modalheader").removeClass('bg-dark').addClass('bg-danger');
      $('#mkt-formtitle').text("Message failed to send");
      $('#mkt-formintro').text("Your message failed to send. You can try again or reach out to moritz.dreger@wundermobility.com.");
      $("#form-submit").attr("disabled", false);
    });

  },

  serializeObject: function($form){
    var unindexed_array = $form.serializeArray();
    var indexed_array = {};
    $.map(unindexed_array, function(n, i){
        if(indexed_array[n['name']]) {
          indexed_array[n['name']] = indexed_array[n['name']] + ", " + n['value'];
        } else {
          indexed_array[n['name']] = n['value'];
        }
    });
    return indexed_array;
  },
  initializeSelect2: function(selector) {
    $(selector).select2({
      minimumResultsForSearch: Infinity
    });
    $(selector).on('select2:select', function (e) {
      $(this).siblings('.select2').addClass('selected');
    });
  },

  htmlValidityCheck: function($form) {
    $form[0].checkValidity();
    return $form[0].reportValidity();
  },
  customValidityChecks: function($form) {
    $form.find(".select2:visible.selected").popover('dispose');
    if($form.find(".select2:visible:not(.selected)").length > 0) {
      console.log('incomplete select2');
      $form.find(".select2:visible:not(.selected)").popover({
        content: "Please make a selection",
      }).popover('show');
      return false;
    } else {
      return true;
    }
  }
};

form.init();

function mktplaceSubmit(e) {
  e.preventDefault();
  $(e.target).attr("disabled", true);
  var $form = $(e.target).closest("form");
  if(form.htmlValidityCheck($form) && form.customValidityChecks($form)) {
    console.log('form clean');
    try {
      grecaptcha.execute("6LeHSagUAAAAACPB5JfFS9ihSEbW-PJHqbBjlDgR", {action: "submission"}).then(function(token) {
        recaptchaSubmit(token);
      }).catch(function(e) { throw(e) });
    } catch(e) {
      console.log(e);
      $("#modalheader").removeClass('bg-dark').addClass('bg-danger');
      $('#mkt-formtitle').text("Message failed to send");
      $('#mkt-formintro').text("Your message failed to send because of a reCaptcha issue. You can try again or reach out to moritz.dreger@wundermobility.com.");
      $("#form-submit").attr("disabled", false);
    }
  } else {
    console.log('form NOT clean');
    $(e.target).attr("disabled", false);
  }
}

function recaptchaSubmit(token) {
  console.log(token);
  var $form = $("#captchaResponse").parents("form");
  $('#captchaResponse').val(token);
  form.submit($form);
}



$(document).ready(function() {

  form.initializeSelect2('.select2-init');

  $('#partnerModal').on('shown.bs.modal', function (e) {
    $('#extension-interest').select2({
      placeholder: "Pick an extension from the list"
    });
  })

  $('input:radio[name="customer"]').change(function() {
    if ($(this).val() == 'customerNo') {
      $('.conditional-hide').fadeIn(100).find('input').attr('required', true);
    } else {
      $('.conditional-hide').fadeOut(100).find('input').attr('required', false);
    }
  });

  $('[data-toggle="lightbox"]').click(function(event) {
      event.preventDefault();
      $(this).ekkoLightbox({
        alwaysShowClose: true,
        leftArrow: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M20 11H7.83L13.42 5.41L12 4L4 12L12 20L13.41 18.59L7.83 13H20V11Z" fill="#141414"/>
        </svg>`,
        rightArrow: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 4L10.59 5.41L16.17 11H4V13H16.17L10.59 18.59L12 20L20 12L12 4Z" fill="#141414"/>
        </svg>`,
        onShown: function() {
          $('.ekko-lightbox button.close').html('<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z" fill="#141414"/></svg>');
        },
      });
  });



});