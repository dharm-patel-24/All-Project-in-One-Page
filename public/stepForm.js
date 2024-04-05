
const hello = document.getElementsByClassName('tab');

let current = 0;

function page() {
  for (let i = 0; i < hello.length; i++) {
    hello[i].style.display = "none";
  }
  hello[current].style.display = "block";
}
page();
function next() {
  if (current == 0) {
    if (basicDetailValidation()) {
      if (current >= 0 && current < 6) {
        current++;
      }
    }
  } else if (current == 1) {
    if (educationDetailValidation()) {
      if (current >= 0 && current < 6) {
        current++;
      }
    }
  } else if (current == 2) {
    if (validation()) {
      if (current >= 0 && current < 6) {
        current++;
      }
    }
  } else if (current == 5) {
    if (referenceContactValidation()) {
      if (current >= 0 && current < 6) {
        current++;
      }
    }
  } else {
    if (current >= 0 && current < 6) {
      current++;
    }
  }
  console.log("Page", current);
  page();
}

function previous() {
  if (current > 0 && current < 7) {
    current--;
  }
  for (let i = 0; i < hello.length; i++) {
    hello[i].style.display = "none";
  }

  hello[current].style.display = "block";
  console.log("Previous", current);
}

function showState(val) {
  const xhttp = new XMLHttpRequest();
  let state_select = document.getElementById('state');
  let cities_select = document.getElementById('city');

  if (!val) {
    cities_select.innerHTML = `<option value="">Select City</option>`;
    xhttp.onload = function () {
      let allfetchedStates = JSON.parse(this.responseText);
      allfetchedStates.forEach(singleState => {
        let new_option = `<option value="${singleState.id}">${singleState.name}</option>`
        state_select.innerHTML += new_option;
      });
    }
    xhttp.open("GET", "/getAllStates");
  } else {
    cities_select.innerHTML = `<option value="">Select City</option>`;
    xhttp.onload = function () {
      let allfetchedCities = JSON.parse(this.responseText);
      allfetchedCities.forEach(singleCity => {
        let new_option = `<option value="${singleCity.id}">${singleCity.name}</option>`
        cities_select.innerHTML += new_option;
      });
    }
    xhttp.open("GET", "/getAllStates?state_id=" + val);
  }
  xhttp.send();
}
showState();

function add() {
  let hello = document.getElementById('addInput');
  let data = `<div><label for="compName">Company Name</label>
        <input type="text" name="fCompanyName[]" id="fCompanyName">
        &nbsp; &nbsp;
        <label for="designation">Designation</label>
        <input type="text" name="fDesignation[]" id="fDesignation">
        &nbsp; &nbsp;
        <label for="from">From</label>
        <input type="text" name="fFrom[]" id="fFrom">
        &nbsp; &nbsp;
        <label for="to">To</label>
        <input type="text" name="fTo[]" id="fTo">
        &nbsp; &nbsp; 
        <br><br></div>`;
  hello.innerHTML += data;
}

function remove() {
  let hello = document.getElementById('addInput');
  hello.removeChild(hello.lastChild);
}

function callFunction() {
  let data = `<div><label for="">Name</label>
            <input type="text" name="refName[]" id="refName">
            &nbsp; &nbsp;
            <label for="">Contact Number</label>
            <input type="text" name="refNumber[]" id="refNumber">
            &nbsp; &nbsp;
            <label for="">Relation</label>
            <input type="text" name="refRelation[]" id="refRelation">
            <br><br></div>`;

  document.getElementById('callInput').innerHTML += data;
}

function removeFunction() {
  let hello = document.getElementById('callInput');
  hello.removeChild(hello.lastChild);
}

function basicDetailValidation() {
  let basicID = ['firstname', 'lastname', 'designation', 'email', 'phone', 'addressOne', 'addressTwo', 'gender', 'state', 'city', 'status', 'dob', 'pin'];

  let res = basicValidation(basicID);
  if (res == true) {
    return true;
  } else {
    return false;
  }
}
function basicValidation(basicID) {
  for (i = 0; i < basicID.length; i++) {
    if (basicID[i] == "gender") {
      const gender = document.getElementsByClassName("gender");
      if (!(gender[0].checked) && !(gender[1].checked)) {
        document.getElementsByClassName('errors')[0].innerHTML = "Please select Gender";
        return gender[0];
      } else {
        document.getElementsByClassName('errors')[0].innerHTML = "";
      }
    } else {
      let str = document.getElementById(basicID[i]).value;
      if (!(str)) {
        document.getElementsByClassName('error')[i].innerHTML = basicID[i] + " should not be empty";
        return str;
      } else if (basicID[i] == 'email') {
        if (!(str.match(/^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/))) {
          document.getElementsByClassName('error')[i].innerHTML = basicID[i] + " should be in proper format";
          return (str.match(/^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/));
        } else {
          document.getElementsByClassName('error')[i].innerHTML = "";
        }
      } else if (basicID[i] == 'phone') {
        if (!(str.match(/^[0-9]+$/)) || str.length != 10) {
          document.getElementsByClassName('error')[i].innerHTML = basicID[i] + " should be a number with 10 digits";
          return (str.match(/^[0-9]+$/));
        } else {
          document.getElementsByClassName('error')[i].innerHTML = "";
        }
      } else if (basicID[i] == 'pin') {
        if (!(str.match(/^[0-9]+$/)) || str.length != 6) {
          document.getElementsByClassName('error')[i].innerHTML = basicID[i] + " should be a number with 6 digits";
          return (str.match(/^[0-9]+$/));
        } else {
          document.getElementsByClassName('error')[i].innerHTML = "";
        }
      } else {
        document.getElementsByClassName('error')[i].innerHTML = "";
      }
    }
  }
  return true;
}

function educationDetailValidation() {
  let eduID = ['courseName', 'sscPassingYear', 'sscPercentage', 'acourseName', 'hscPassingYear', 'hscPercentage', 'beCourseName', 'bePassingYear', 'bePercentage', 'meCourseName', 'mePassingYear', 'mePercentage'];

  let res = educationValidation(eduID);
  if (res == true) {
    return true;
  } else {
    return false;
  }
}

function educationValidation(eduID) {
  let start = 13;
  for (i = 0; i < eduID.length; i++) {
    let str = document.getElementById(eduID[i]).value;
    if (!(str)) {
      document.getElementsByClassName('error')[start].innerHTML = `${eduID[i]} should not be empty`;
      return false;
    } else if (eduID[i] == 'sscPassingYear' || eduID[i] == 'hscPassingYear' || eduID[i] == 'bePassingYear' || eduID[i] == 'mePassingYear') {
      if (!(str.match(/^[0-9]+$/)) || str.length != 4) {
        document.getElementsByClassName('error')[start].innerHTML = eduID[i] + " should be a number with 4 digits";
        return (str.match(/^[0-9]+$/));
      } else {
        document.getElementsByClassName('error')[start].innerHTML = "";
      }
    } else if (eduID[i] == 'sscPercentage' || eduID[i] == 'hscPercentage' || eduID[i] == 'bePercentage' || eduID[i] == 'mePercentage') {
      if (!(str.match(/^(100(\.0{1,2})?|([0-9]?[0-9](\.[0-9]{1,2})))$/))) {
        document.getElementsByClassName('error')[start].innerHTML = eduID[i] + " should be a number with float";
        return (str.match(/^(100(\.0{1,2})?|([0-9]?[0-9](\.[0-9]{1,2})))$/));
      } else {
        document.getElementsByClassName('error')[start].innerHTML = "";
      }
    } else {
      document.getElementsByClassName('error')[start].innerHTML = "";
    }
    start++;
  }
  return true;
}

function referenceContactValidation() {
  let refID = ['refName', 'refNumber', 'refRelation', 'refName1', 'refNumber1', 'refRelation1'];

  let res = referenceValidation(refID);
  if (res == true) {
    return true;
  } else {
    return false;
  }
}

function referenceValidation(refID) {
  let initial = 25;
  for (i = 0; i < refID.length; i++) {
    let str = document.getElementById(refID[i]).value;
    if (!(str)) {
      document.getElementsByClassName('error')[initial].innerHTML = `${refID[i]} should not be empty`;
      return false;
    } else if (refID[i] == 'refNumber') {
      if (!(str.match(/^[0-9]+$/)) || str.length != 10) {
        document.getElementsByClassName('error')[initial].innerHTML = refID[i] + " should be a number with 10 digits";
        return (str.match(/^[0-9]+$/));
      } else {
        document.getElementsByClassName('error')[initial].innerHTML = "";
      }
    } else {
      document.getElementsByClassName('error')[initial].innerHTML = "";
    }
    initial++;
  }
  return true;
}

function preferenceDetailValidation() {
  let prefrenceID = ['location', 'noticePeriod', 'expectedCTC', 'currentCTC', 'depart'];

  let res = preferenceValidation(prefrenceID);
  if (res == true) {
    return true;
  } else {
    return false;
  }
}

function preferenceValidation(prefrenceID) {
  let initial = 31;
  for (i = 0; i < prefrenceID.length; i++) {
    let str = document.getElementById(prefrenceID[i]).value;
    if (!(str)) {
      document.getElementsByClassName('error')[initial].innerHTML = `${prefrenceID[i]} should not be empty`;
      return false;
    } else if (prefrenceID[i] == 'refNumber') {
      if (!(str.match(/^[0-9]+$/)) || str.length != 10) {
        document.getElementsByClassName('error')[initial].innerHTML = prefrenceID[i] + " should be a number with 10 digits";
        return (str.match(/^[0-9]+$/));
      } else {
        document.getElementsByClassName('error')[initial].innerHTML = "";
      }
    } else if (prefrenceID[i] == 'noticePeriod' || prefrenceID[i] == 'expectedCTC' || prefrenceID[i] == 'currentCTC') {
      if (!(str.match(/^[0-9]+$/))) {
        document.getElementsByClassName('error')[initial].innerHTML = prefrenceID[i] + " should be a number";
        return (str.match(/^[0-9]+$/));
      } else {
        document.getElementsByClassName('error')[initial].innerHTML = "";
      }
    } else {
      document.getElementsByClassName('error')[initial].innerHTML = "";
    }
    initial++;
  }
  return true;
}

function validation() {
  let ID = ['location', 'noticePeriod', 'expectedCTC', 'currentCTC', 'depart'];

  let res = another(ID);
  if (res == true) {
    return true;
  } else {
    return false;
  }
}

function another(ID) {
  let vals1 = ['fDesignation', 'fFrom', 'fTo'];
  let vals2 = ['sDesignation', 'sFrom', 'sTo'];
  let vals3 = ['tDesignation', 'tFrom', 'tTo'];
  let strValue = document.getElementById('fCompanyName').value;
  if (strValue != '') {
    for (let j = 0; j < vals1.length; j++) {
      let strData = document.getElementById(vals1[j]).value;
      if (strData == '') {
        document.getElementsByClassName('wrong1')[j].innerHTML = vals1[j] + " should not be empty";
        return strData;
      } else {
        document.getElementsByClassName('wrong1')[j].innerHTML = "";
      }
    }
  }

  let strValue1 = document.getElementById('sCompanyName').value;
  if (strValue1 != '') {
    for (let j = 0; j < vals2.length; j++) {
      let strData = document.getElementById(vals2[j]).value;
      if (strData == '') {
        document.getElementsByClassName('wrong2')[j].innerHTML = vals2[j] + " should not be empty";
        return strData;
      } else {
        document.getElementsByClassName('wrong2')[j].innerHTML = "";
      }
    }
  }

  let strValue2 = document.getElementById('tCompanyName').value;
  if (strValue2 != '') {
    for (let j = 0; j < vals3.length; j++) {
      let strData = document.getElementById(vals3[j]).value;
      if (strData == '') {
        document.getElementsByClassName('wrong3')[j].innerHTML = vals3[j] + " should not be empty";
        return strData;
      } else {
        document.getElementsByClassName('wrong3')[j].innerHTML = "";
      }
    }
  }
  return true;
}

const hindiRead = document.getElementById('red');
const hindiWrite = document.getElementById('wri');
const hindiSpeak = document.getElementById('sp');

const englishRead = document.getElementById('red1');
const englishWrite = document.getElementById('wri1');
const englishSpeak = document.getElementById('sp1');

const gujaratiRead = document.getElementById('red2');
const gujaratiWrite = document.getElementById('wri2')
const gujaratiSpeak = document.getElementById('sp2');

function checkboxdisabledhindi() {
  let hindi = document.getElementById('hin');
  if (!hindi.checked) {
    hindiRead.disabled = true;
    hindiWrite.disabled = true;
    hindiSpeak.disabled = true;
    hindiRead.checked = false;
    hindiWrite.checked = false;
    hindiSpeak.checked = false;
  } else {
    hindiRead.disabled = false;
    hindiWrite.disabled = false;
    hindiSpeak.disabled = false;
  }
}

function checkboxdisabledenglish() {
  let english = document.getElementById('eng');
  if (!english.checked) {
    englishRead.disabled = true;
    englishWrite.disabled = true;
    englishSpeak.disabled = true;
    englishRead.checked = false;
    englishWrite.checked = false;
    englishSpeak.checked = false;
  } else {
    englishRead.disabled = false;
    englishWrite.disabled = false;
    englishSpeak.disabled = false;
  }
}

function checkboxdisabledgujarati() {
  let gujarati = document.getElementById('guj');
  if (!gujarati.checked) {
    gujaratiRead.disabled = true;
    gujaratiWrite.disabled = true;
    gujaratiSpeak.disabled = true;
    gujaratiRead.checked = false;
    gujaratiWrite.checked = false;
    gujaratiSpeak.checked = false;
  } else {
    gujaratiRead.disabled = false;
    gujaratiWrite.disabled = false;
    gujaratiSpeak.disabled = false;
  }
}

function radiodisabledphp() {
  let php = document.getElementById('php');
  if (!php.checked) {
    document.getElementById('beg').disabled = true;
    document.getElementById('med').disabled = true;
    document.getElementById('exp').disabled = true;
    document.getElementById('beg').checked = false;
    document.getElementById('med').checked = false;
    document.getElementById('exp').checked = false;
  } else {
    document.getElementById('beg').disabled = false;
    document.getElementById('med').disabled = false;
    document.getElementById('exp').disabled = false;
  }
}

function radiodisabledmysql() {
  let mysql = document.getElementById('mysql');
  if (!mysql.checked) {
    document.getElementById('beg1').disabled = true;
    document.getElementById('med1').disabled = true;
    document.getElementById('exp1').disabled = true;
    document.getElementById('beg1').checked = false;
    document.getElementById('med1').checked = false;
    document.getElementById('exp1').checked = false;
  } else {
    document.getElementById('beg1').disabled = false;
    document.getElementById('med1').disabled = false;
    document.getElementById('exp1').disabled = false;
  }
}

function radiodisabledlaravel() {
  let laravel = document.getElementById('lara');
  if (!laravel.checked) {
    document.getElementById('beg2').disabled = true;
    document.getElementById('med2').disabled = true;
    document.getElementById('exp2').disabled = true;
    document.getElementById('beg2').checked = false;
    document.getElementById('med2').checked = false;
    document.getElementById('exp2').checked = false;
  } else {
    document.getElementById('beg2').disabled = false;
    document.getElementById('med2').disabled = false;
    document.getElementById('exp2').disabled = false;
  }
}

function radiodisabledoracle() {
  let oracle = document.getElementById('ora');
  if (!oracle.checked) {
    document.getElementById('beg3').disabled = true;
    document.getElementById('med3').disabled = true;
    document.getElementById('exp3').disabled = true;
    document.getElementById('beg3').checked = false;
    document.getElementById('med3').checked = false;
    document.getElementById('exp3').checked = false;
  } else {
    document.getElementById('beg3').disabled = false;
    document.getElementById('med3').disabled = false;
    document.getElementById('exp3').disabled = false;
  }
}

document.getElementById('form').addEventListener('submit', (event) => {
  event.preventDefault();
  if (preferenceDetailValidation()) {
    let form = document.getElementById('form');
    let form_data = new FormData(form);

    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/submitstepForm', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

    xhr.onload = function () {
      if (this.status == 200) {
        console.log(this.responseText);
      }
    }
    xhr.send(new URLSearchParams(form_data));
    document.getElementById("success").innerHTML = "Data Submitted Successfully!";
  }
  document.getElementById('lasterror').innerHTML = "";
});

console.log(document.getElementById('my-button'));
function mybtn(event) {
  event.preventDefault();

  let form = document.getElementById('form');
  let form_data = new FormData(form);
  let ID = document.getElementById('hideid').value;
  const xhr = new XMLHttpRequest();
  xhr.open('POST', '/stepForm-update/' + ID, true);
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

  xhr.onload = function () {
    if (this.status == 200) {
      console.log(this.responseText);
    }
  }
  xhr.send(new URLSearchParams(form_data));
  document.getElementById("form").reset();
};

