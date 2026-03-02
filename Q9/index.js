const fetchCountry = async () => {
  const response = await fetch("https://api.countrystatecity.in/v1/countries", {
    headers: {
      "X-CSCAPI-KEY":
        "c65c227da0b1d0690250bbd1cb1b4804306454bdb4babf7a7d74a1796a2d82d7",
    },
  });

  if (response.ok) {
    const country = await response.json();
    return country;
  } else {
    console.error("Api is not working");
  }
};

const getStatesByCountry = async (countryCode) => {
  const response = await fetch(
    `https://api.countrystatecity.in/v1/countries/${countryCode}/states`,
    {
      headers: {
        "X-CSCAPI-KEY":
          "c65c227da0b1d0690250bbd1cb1b4804306454bdb4babf7a7d74a1796a2d82d7",
      },
    },
  );

  if (response.ok) {
    const states = await response.json();
    return states;
  } else {
    console.error("Country not found or no states available");
  }
};

const addCountry = async () => {
  const country = await fetchCountry();

  country.forEach((element) => {
    const option = $("<option>");
    option.val(element.iso2);
    option.text(element.name);

    $("#country").append(option);
  });
};

const addState = async (countryCode) => {
  const state = await getStatesByCountry(countryCode);

  $("#state").val("");

  $("#state").empty().append("<option>Select the State</option>");

  state.forEach((element) => {
    const option = $("<option>");
    option.val(element.iso2);
    option.text(element.name);

    $("#state").append(option);
  });
};

const validateName = () => {
  const regrex = /^[A-Za-z ]+$/;
  const val = $("#username").val();

  if (val === "") {
    $("#usernameError").text("Username cannot be empty");
    return false;
  }

  if (!regrex.test(val)) {
    $("#usernameError").text("Username can only contains alphabet");
    return false;
  }

  $("#usernameError").text("");
  return true;
};

const validateEmail = () => {
  const regrex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const val = $("#email").val();

  if (val === "") {
    $("#emailError").text("Email cannot be empty");
    return false;
  }

  if (!regrex.test(val)) {
    $("#emailError").text("Invalid email format");
    return false;
  }

  $("#emailError").text("");
  return true;
};

const validatePassword = () => {
  const pwd = $("#password").val();
  let score = 0;

  if (pwd.length >= 8) score++;
  if (/[A-Z]/.test(pwd)) score++;
  if (/[a-z]/.test(pwd)) score++;
  if (/[0-9]/.test(pwd)) score++;
  if (/[^A-Za-z0-9]/.test(pwd)) score++;

  if(score < 5){
    $("#passwordError").text("Password is not strong enough");
    return false ; 
  }

  $("#passwordError").text("");
  return true ; 
};

$(document).ready(function () {
  addCountry();
});

$("#country").change(function (e) {
  e.preventDefault();
  const iso2 = $("#country").val();
  addState(iso2);
});

$("#username").on("input", function () {
    validateName() ; 
});


$("#email").on("input", function () {
    validateEmail() ; 
});


$("#password").on("input", function () {
    validatePassword() ;
});

$("#register").submit(function (e) { 
    e.preventDefault();
    if(validateEmail() && validatePassword() && validatePassword()){
        alert("Succesfully resgister") ; 
    }else {
        alert("Fix the error") ; 
    }
});