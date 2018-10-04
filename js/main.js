// Arrays of Error
var arrErrors = [
    "Please enter name", //0
    "Please enter ID", //1
    "Please choose a position", //2
    "Please enter email", //3
    "Please enter phone", //4
    "Please enter DOB", //5
    "Please enter salary", //6
    "Please enter number of working day", //7
    "Please enter bonus", //8
    "This field does not contain letters", //9
    "This field does not contain numbers", //10  
    "Please enter a ", //11  
    "Email is not in correct format", //12
    "This ID Number is existing already" //13
];
//  Array of RegExp
var arrRexEg = [
    /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
    /^[A-z]+$/g,
    /^[0-9]*$/
];

// Create vars
var toggleNavStatus = false;
var tableStuff = document.getElementById('tableStuff');
var StaffList = new STAFFLIST();


// Call events
var btnToggle = document.querySelector('.nav-aside-toggle-btn');
btnToggle.addEventListener('click', toggleNav);
var btnAdd = document.getElementById('btnAdd');
btnAdd.addEventListener('click', AddStaff);



//----------------------- Functions Area -------------------//

// Helper Functions

// document.getElementById()
var gettingID = function (id) {
    return document.getElementById(id);
}
// Clear Fields Function
function ClearFields() {
    var inputFields = document.querySelectorAll('.input-field');
    for (var i = 0; i < inputFields.length; i++) {
        inputFields[i].value = "";
    }
    var selectField = gettingID('staffPosition');
    selectField.value = selectField.options[0].value;
}


// Toggle Input Form
function toggleNav() {
    var getSidebar = document.querySelector('.nav-sidebar');
    var getSidebarUl = document.querySelector('.nav-sidebar ul');
    var getSideBarLis = document.querySelectorAll('.nav-sidebar li');


    if (toggleNavStatus === false) {
        getSidebarUl.style.display = "block";
        getSidebar.style.width = "350px";

        let arrayLength = getSideBarLis.length;
        for (var i = 0; i < arrayLength; i++) {
            getSideBarLis[i].style.opacity = "1";
        }
        tableStuff.classList.remove('col-lg-12');
        tableStuff.classList.add('col-lg-9');
        toggleNavStatus = true;
    } else if (toggleNavStatus === true) {
        getSidebarUl.style.display = "none";
        getSidebar.style.width = "62px";

        let arrayLength = getSideBarLis.length;
        for (var i = 0; i < arrayLength; i++) {
            getSideBarLis[i].style.opacity = "0";
        }
        tableStuff.classList.remove('col-lg-9');
        tableStuff.classList.add('col-lg-12');
        toggleNavStatus = false;
    }
}

// Input-required Function
function CheckRequiredInput(inputField, textError, index) {
    var valueField = gettingID(inputField).value;
    var error = gettingID(textError);
    if (valueField === "") {
        error.style.display = "block";
        error.innerHTML = arrErrors[index];
        return false;
    } else {
        error.innerHTML = "";
        return true;
    }
}

// RegExp Checking Function
function CheckRegExp(textField, textError, regExIndex, index) {
    var valueField = gettingID(textField).value;
    var error = gettingID(textError);

    var re = arrRexEg[regExIndex];
    if (valueField.match(re) === null) {
        error.style.display = "block";
        error.innerHTML = arrErrors[index];
        return false;
    } else {
        error.style.display = "none";
        return true;
    }
}

// Cheking Range Function
function CheckRangeOfLetter(textField, textError, index, acceptLength) {
    var valueText = document.getElementById(textField).value;
    var error = document.getElementById(textError);
    //var length = valueText.length;
    if (valueText.length != acceptLength) {
        error.style.display = "block";
        error.innerHTML = arrErrors[index] + acceptLength + "-digit-number ID";
        return false;
    } else {
        error.style.display = "none";
        return true;
    }
}

// Check Position Function
function CheckPosition() {
    var selectField = gettingID('staffPosition');
    var index = selectField.selectedIndex;
    var errorPosition = gettingID('error-position');

    if (index === 0) {
        errorPosition.style.display = "block";
        errorPosition.innerHTML = arrErrors[2];
        return false;
    } else {
        errorPosition.style.display = "none";
        return true;
    }
}

//Check ID Availability
function CheckIdAvailability() {
    if (StaffList.StfLst.length < 1) {
        return true; // if there's no staff in list, return true
    } else { // nếu có nv thì chạy vòng lặp
        var id = gettingID('txtIdNumber').value;
        var errorId = gettingID('error-id');
        for (var i = 0; i < StaffList.StfLst.length; i++) { // if there's staff, loop through to check if Id is already taken
            if (id == StaffList.StfLst[i].Id) {
                errorId.style.display = "block";
                errorId.innerHTML = arrErrors[13];
                return false;
            } else {
                errorId.style.display = "none;"
            }
        }
        return true;

    }
}

// Validating Function
function ValidateInput() {
    var nameValidating = CheckRequiredInput('txtName', 'error-name', 0);
    if (nameValidating) {
        var nameRegExValidate = CheckRegExp('txtName', 'error-name', 1, 10);
    }
    var idValidating = CheckRequiredInput('txtIdNumber', 'error-id', 1);
    if (idValidating) {
        var idRegExValidate = CheckRegExp('txtIdNumber', 'error-id', 2, 9);
        if (idRegExValidate) {
            var idRangeCheck = CheckRangeOfLetter('txtIdNumber', 'error-id', 11, 4)
            if (idRangeCheck) {
                var idAvailabilityCheck = CheckIdAvailability();
            }
        }
    }

    var positionValidating = CheckPosition();

    var emailValidating = CheckRequiredInput('txtEmail', 'error-email', 3);
    if (emailValidating) {
        var emailRegExValidate = CheckRegExp('txtEmail', 'error-email', 0, 12)
    }

    var phoneValidating = CheckRequiredInput('txtPhone', 'error-phone', 4);
    if (phoneValidating) {
        var phoneRegExValidate = CheckRegExp('txtPhone', 'error-phone', 2, 9);
    }

    var dobValidating = CheckRequiredInput('txtDOB', 'error-dob', 5);

    var salaryValidating = CheckRequiredInput('txtSalary', 'error-salary', 6);
    if (salaryValidating) {
        var salaryRegExValidate = CheckRegExp('txtSalary', 'error-salary', 2, 9);
    }

    var workingDayValidating = CheckRequiredInput('txtWorkingDays', 'error-day', 7);
    if (workingDayValidating) {
        var dayRegExValidate = CheckRegExp('txtWorkingDays', 'error-day', 2, 9);
    }

    var bonusValidating = CheckRequiredInput('txtBonus', 'error-bonus', 8);
    if (bonusValidating) {
        var bonusRegExValidate = CheckRegExp('txtBonus', 'error-bonus', 2, 9);
    }

    if (!nameValidating || !idValidating || !positionValidating || !emailValidating || !phoneValidating || !dobValidating || !salaryValidating || !workingDayValidating || !bonusValidating || !nameRegExValidate || !idRegExValidate || !idRangeCheck || !emailRegExValidate || !phoneRegExValidate || !salaryRegExValidate || !dayRegExValidate || !bonusRegExValidate || !idAvailabilityCheck) {
        return false;
    } else return true;
}


// Adding staff Function
function AddStaff() {

    if (ValidateInput()) {
        var getName = gettingID('txtName').value;
        var getId = gettingID('txtIdNumber').value;
        var getPosition = gettingID('staffPosition').value;
        var getEmail = gettingID('txtEmail').value;
        var getPhone = gettingID('txtPhone').value;
        var getDob = gettingID('txtDOB').value;
        var getSalary = gettingID('txtSalary').value;
        var getWorkingDay = gettingID('txtWorkingDays').value;
        var getBonus = gettingID('txtBonus').value;

        var staff = new STAFF(getName, getId, getPosition, getEmail, getPhone, getDob, getWorkingDay, getSalary, getBonus);

        StaffList.AddStaff(staff);

        CreateTable(StaffList.StfLst);
    }
}

// Create Dynamic Table Funcion
function CreateTable(staffArr) {
    var tableBody = document.getElementById('tableBody');
    tableBody.innerHTML = "";

    for (var i = 0; i < staffArr.length; i++) {
        var staff = staffArr[i];

        var tr = document.createElement('tr');

        var tdName = document.createElement('td');
        tdName.innerHTML = staff.Name;
        var tdID = document.createElement('td');
        tdID.innerHTML = staff.Id;
        var tdPosition = document.createElement('td');
        tdPosition.innerHTML = staff.Position;
        var tdEmail = document.createElement('td');
        tdEmail.innerHTML = staff.Email;
        var tdWorkingDay = document.createElement('td');
        tdWorkingDay.innerHTML = staff.WorkingDay;
        var tdSalary = document.createElement('td');
        tdSalary.innerHTML = staff.paySalary();
        var tdAction = document.createElement('td');
        var Action = "<div class='btn-group'><button class='btn btn-danger' id='btnRemove_" + staff.Id + "'>Remove</button><button class='btn btn-primary' data-toggle='modal' data-target='#updateModal' id='btnUpdate_" + staff.Id + "'>Update</button></div>"

        tdAction.innerHTML = Action;

        tr.appendChild(tdName);
        tr.appendChild(tdID);
        tr.appendChild(tdPosition);
        tr.appendChild(tdEmail);
        tr.appendChild(tdWorkingDay);
        tr.appendChild(tdSalary);
        tr.appendChild(tdAction);

        tableBody.appendChild(tr);

        ClearFields();
        RemovingStaff("btnRemove_" + staff.Id);
        UpdatingInfo("btnUpdate_" + staff.Id);
    }
}

// Updating Staff Info Function
function UpdatingInfo(element) {
    gettingID(element).addEventListener('click', function () {
        var btnId = this.getAttribute('id').split('_'); // cut off the id part 

        var idUpdate = btnId[1]; // set Id var equals to the second part in the array of attributes of btnId

        var getStaffInfo = StaffList.FindStaffIndex(idUpdate); // Find the index of the staff whose update button is clicked

        var staff = StaffList.StfLst[getStaffInfo];

        // create var for inputs from modal
        var getUpdateName = gettingID('name-update');
        var getUpdateId = gettingID('id-update');
        var getUpdatePostion = gettingID('position-update');
        var getUpdateEmail = gettingID('email-update');
        var getUpdatePhone = gettingID('phone-update');
        var getUpdateDob = gettingID('dob-update');
        var getUpdateSalary = gettingID('salary-update');
        var getUpdateDay = gettingID('day-update');
        var getUpdateBonus = gettingID('bonus-update');

        // set popup input value with the found staff's value
        getUpdateName.value = staff.Name;
        getUpdateId.value = staff.Id;
        getUpdatePostion.value = staff.Position;
        getUpdateEmail.value = staff.Email;
        getUpdatePhone.value = staff.Phone;
        getUpdateDob.value = staff.DoB;
        getUpdateDay.value = staff.WorkingDay;
        getUpdateSalary.value = staff.Salary;
        getUpdateBonus.value = staff.Bonus;

        gettingID('btnUpdate').addEventListener('click', function () { // when the update btn is clicked

            var newStaff = new STAFF( // create new staff
                getUpdateName.value,
                getUpdateId.value,
                getUpdatePostion.value,
                getUpdateEmail.value,
                getUpdatePhone.value,
                getUpdateDob.value,
                getUpdateDay.value,
                getUpdateSalary.value,
                getUpdateBonus.value
            );

            var index = StaffList.FindStaffIndex(newStaff.Id); // use newStaff ID to find index of old staff
            for (var i = 0; i < StaffList.StfLst.length; i++) {

                if (index == i) { // set old staff's info with newStaff's info

                    StaffList.StfLst[i].Name = newStaff.Name;
                    StaffList.StfLst[i].Id = newStaff.Id;
                    StaffList.StfLst[i].Position = newStaff.Position;
                    StaffList.StfLst[i].Email = newStaff.Email;
                    StaffList.StfLst[i].DoB = newStaff.DoB;
                    StaffList.StfLst[i].Phone = newStaff.Phone;
                    StaffList.StfLst[i].WorkingDay = newStaff.WorkingDay;
                    StaffList.StfLst[i].Salary = newStaff.Salary;
                    StaffList.StfLst[i].Bonus = newStaff.Bonus;

                    CreateTable(StaffList.StfLst);
                }
            }
        })
    })
}

// Remove Staff Function
function RemovingStaff(element) {
    gettingID(element).addEventListener('click', function () {
        // cut off the id part 
        var btnId = this.getAttribute('id').split('_');
        // set Id var equals to the second part in the array of attributes of btnId
        var idRemove = btnId[1];
        // pass in the id to the RemoveStaff function
        StaffList.RemoveStaff(idRemove);
        // Re-generate the table
        CreateTable(StaffList.StfLst);
    })
}

// Find Staff by Name and ID
var inputSearch = gettingID('inputSearch');
inputSearch.addEventListener('keyup', function (e) {
    var arrStaffFound = [];
    var valueSearch = e.target.value;
    if (valueSearch == "") {
        arrStaffFound = StaffList.StfLst;
    } else {
        arrStaffFound = StaffList.FindStaff(valueSearch);
    }
    CreateTable(arrStaffFound);
});


// Sorting Functions
var sortStatus = false;

gettingID('salarySort').addEventListener('click', SortSalary);

function SortSalary() {
    if (sortStatus === false) {
        const sortedSalary = StaffList.StfLst.sort((a, b) => (a.paySalary() > b.paySalary()) ? 1 : -1)
        CreateTable(sortedSalary)
        sortStatus = true;
    } else if (sortStatus === true) {
        const sortedSalary = StaffList.StfLst.sort((a, b) => (a.paySalary() < b.paySalary()) ? 1 : -1)
        CreateTable(sortedSalary)
        sortStatus = false;
    }
}


gettingID('nameSort').addEventListener('click', SortName);

function SortName() {
    if (sortStatus === false) {
        const sortedName = StaffList.StfLst.sort((a, b) => (a.Name > b.Name) ? 1 : -1)
        CreateTable(sortedName)
        sortStatus = true;
    } else if (sortStatus === true) {
        const sortedName = StaffList.StfLst.sort((a, b) => (a.Name < b.Name) ? 1 : -1)
        CreateTable(sortedName)
        sortStatus = false;
    }
}

gettingID('idSort').addEventListener('click', SortID);

function SortID() {
    if (sortStatus === false) {
        const sortedId = StaffList.StfLst.sort((a, b) => (a.Id > b.Id) ? 1 : -1)
        CreateTable(sortedId)
        sortStatus = true;
    } else if (sortStatus === true) {
        const sortedId = StaffList.StfLst.sort((a, b) => (a.Id < b.Id) ? 1 : -1)
        CreateTable(sortedId)
        sortStatus = false;
    }
}