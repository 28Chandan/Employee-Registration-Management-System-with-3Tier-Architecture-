jQuery.HRDashboardProfile2NameSpace = jQuery.HRDashboardProfile2NameSpace || {};
jQuery.HRDashboardProfile2NameSpace.ServicePath = "";

function PageLoadFunctions(webservicePath) {
    LoadCountInfo();
    jQuery.HRDashboardProfile2NameSpace.ServicePath = webservicePath;
    //const PendingVM = new EmployeeViewModel2();
    //ko.applyBindings(PendingVM);
    //LoadSession();
    $('#employeeTble').hide();
    ko.applyBindings(EmployeeViewModel2);
    //function loadPendingEmployees(status, role, pageSize, offsetValue)

    loadPendingEmployees({ ispending: true }, EmployeeViewModel2.pageSize(), 0);
    loadPendingEmployees({ isaccept: true }, EmployeeViewModel2.pageSize(), 0);
    loadPendingEmployees({ isreject: true }, EmployeeViewModel2.pageSize(), 0);
    //EmployeeViewModel2.currentStatus("Pending");
    EmployeeViewModel2.currentPageOfAcceptedEmpl(0);
    EmployeeViewModel2.currentPageOfRejectedEmpl(0);
    EmployeeViewModel2.currentPageOfPendingEmpl(0);
    DeptBinding();
    loadAllHRDetails();

}


var EmployeeViewModel2 = {
    //for overview toggle button
    PendingEmployees: ko.observableArray([]),
    AcceptedEmployees: ko.observableArray([]),
    RejectedEmployees: ko.observableArray([]),
    TotalHR: ko.observableArray([]),


    deptBtnVisibility: ko.observable(true),

    //for total Department binding
    totDept: ko.observableArray([]),

    //for total HR binding
    getTotalHR: ko.observableArray([]),

    //for pagination current page
    currentPageOfPendingEmpl: ko.observable(0),
    //for pagination current page
    currentPageOfRejectedEmpl: ko.observable(0),
    //for pagination current page
    currentPageOfAcceptedEmpl: ko.observable(0),


    //for the current status clicked
    currentStatus: ko.observable(),

    //for the page size i.e num of rows u want
    pageSize: ko.observable(5),

    //for the remaining count of employee during pagination time
    remaingTotalEmpCount: ko.observable(),

    //for the Pending count of employee during pagination time
    remaingPendingEmpCount: ko.observable(),

    //for the Accepted count of employee during pagination time
    remaingAcceptedEmpCount: ko.observable(),

    //for the Rejected count of employee during pagination time
    remaingRejectedEmpCount: ko.observable(),

    //for the HR count during pagination
    remaingHRCount: ko.observable(),

    //for the Dept during pagination time
    remaingDeptCount: ko.observable(),





}

function LoadSession() {
    const userRoleSession = sessionStorage.getItem("role");
    console.log("user session recieved", userRoleSession);
    //if (userRoleSession !=="1") {
    //    window.location.href = "Login.aspx";
    //}
}

function LogOutBtnClick() {
    window.location.href = "Login.aspx";
}

function LightModeBtnClick() {
    window.location.href = "HRDashboardProfile.aspx";
}


//this is for loading all the CountInfo at page load
function LoadCountInfo() {
    $.ajax({
        type: "POST",
        url: "/WEB_SERVICES/iPAS_HRDashboard.asmx/GetCountASMX",
        data: {},
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            const countData = response.d;
            EmployeeViewModel2.remaingTotalEmpCount(countData.TotalCount);
            EmployeeViewModel2.remaingPendingEmpCount(countData.PendingCount);
            EmployeeViewModel2.remaingAcceptedEmpCount(countData.AcceptedCount);
            EmployeeViewModel2.remaingRejectedEmpCount(countData.RejectedCount);
            EmployeeViewModel2.remaingHRCount(countData.HRCount);
            EmployeeViewModel2.remaingDeptCount(countData.DeptCount);

        },
        error: function (xhr, status, error) {
            jQuery('#countErrorLabel').text("Error fetching CountInfo :", error);
        }
    });
}

function loadPendingEmployees(status, pageSize, offsetValue) {
    $.ajax({
        type: "POST",
        //url: jQuery.HRDashboardProfile2NameSpace.ServicePath+"/iPAS_HRDashboard.asmx/GetEmployeeDetailsASMX",
        url: "/WEB_SERVICES/iPAS_HRDashboard.asmx/GetEmployeeDetails",
        data: JSON.stringify({
            employeeDetails: {
                isAccept: status.isaccept === true,
                isReject: status.isreject === true,
                isPending: status.ispending === true,
                isTotal: status.istotal === true,
                PageSize: pageSize,
                OffsetValue: offsetValue,

            }
        }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            LoadCountInfo();
            const isSuccess = response.d;
            const result = response.d.RegistrationInfoList;
            //validations in the svc is status is empty or null set the success flag as false
            if (isSuccess.isEmpDetailsLoaded) {
                $('#noRecords').text("");
                $('.records').text("");
                if (status.ispending === true) {
                    if (result.length === 0) {
                        $('#noRecordsOfPending').text("No Records Found");
                        return;
                    }
                    EmployeeViewModel2.PendingEmployees(result);
                    updatePaginationButtons(EmployeeViewModel2.currentPageOfPendingEmpl(), "Pending")
                }
                else if (status.isaccept === true) {
                    if (result.length === 0) {
                        $('#noRecordsOfAccept').text("No Records Found");
                        return;
                    }
                    EmployeeViewModel2.AcceptedEmployees(result);
                    updatePaginationButtons(EmployeeViewModel2.currentPageOfAcceptedEmpl(), "Accept")
                }
                else if (status.isreject === true) {
                    if (result.length === 0) {
                        $('#noRecordsOfReject').text("No Records Found");
                        return;
                    }
                    EmployeeViewModel2.RejectedEmployees(result);
                    updatePaginationButtons(EmployeeViewModel2.currentPageOfRejectedEmpl(), "Reject")
                }
            }
            else {
                //if error happense
            }

        },
        error: function (xhr, status, error) {
            console.error("xhr loading employees: ", xhr.responseText);
        }
    });
};


//for accept and reject button is clicked

function AcceptBtnClick(currentStudent) {
    
    if (confirm("Are you sure you want to reject this user?")) {
        StatusBtn(currentStudent, { isaccept: true });
    }
    else {
        //loadPendingEmployees({ ispending: true }, EmployeeViewModel2.pageSize(), EmployeeViewModel2.currentPage());
    }
};


RejectBtnClick = function (currentStudent) {
    if (confirm("Are you sure you want to reject this user?")) {
        StatusBtn(currentStudent, { isreject: true });
    }
    else {
        //loadPendingEmployees({ ispending: true }, EmployeeViewModel2.pageSize(), EmployeeViewModel2.currentPage());
    }
};


//when accept or reject btn is clicked from the table
function StatusBtn(currentStude, status) {
    $.ajax({
        type: "POST",
        url: "/WEB_SERVICES/iPAS_HRDashboard.asmx/AcceptRejectEmpASMX",
        data: JSON.stringify({
            employee: {
                EmpID: currentStude.EmpID,
                isAccept: status.isaccept === true,
                isReject: status.isreject === true
            }
        }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {

            if (response.d === true) {
                loadPendingEmployees({ ispending: true }, EmployeeViewModel2.pageSize(), EmployeeViewModel2.currentPageOfPendingEmpl);
                // if (status === "Accept") {
                //     loadPendingEmployees({ isaccept: true }, EmployeeViewModel2.pageSize(), );
                // }
                // else {
                //     loadPendingEmployees({ ispending: true }, EmployeeViewModel2.pageSize(), EmployeeViewModel2.currentPageOfPendingEmpl);
                //}
            }
            else {


            }
        },
        error: function (xhr, status, error) {
            console.log("the error is: ", error);
            console.log("The error status is: ", status);
            console.log("The xhr is: ", xhr.responseText);
        }
    });
};




//for dept binding
deptBtn = function () {
    $('.navItem').removeClass("actBtn");
    $('#deptBtn').addClass("actBtn");

    DeptBinding();
}

//for dept binding
function DeptBinding() {
    $.ajax({
        type: "POST",
        url: "/WEB_SERVICES/iPAS_Registration.asmx/GetDepartmentASMX",
        data: {},
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            LoadCountInfo();
            const result = response.d.DepartmentInfoList;
            //const mapped = result.map(dept => new DepartmentKO_Observable(dept));
            console.log("Dept Data: ", result);
            EmployeeViewModel2.totDept(result);
        },
        error: function (xhr, status, error) {
            console.error("Error loading employees: ", error);
            console.error("status loading employees: ", status);
            console.error("shr loading employees: ", xhr.responseText);
        }
    });
};




//for HR binding
HRBtnClick = function () {
    $('.navItem').removeClass("actBtn");
    $('#hrBtn').addClass("actBtn");
    $('#hrTbl').show();
    loadAllHRDetails();
}


function loadAllHRDetails() {
    $.ajax({
        type: "POST",
        url: "/WEB_SERVICES/iPAS_HRDashboard.asmx/GetAllHRDetails",
        data: {},
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            const result = response.d.RegistrationInfoList;
            console.log("THe total HR details", response.d.RegistrationInfoList);
            EmployeeViewModel2.getTotalHR(result);
        },
        error: function (xhr, status, error) {
            console.error("xhr loading employees: ", xhr.responseText);
        }
    });
};


// adding the new dept 
addDeptBtnClick = function () {
    if (confirm("Do you really want to add the new HR?")) {
        //addNewDept(EmployeeViewModel2.deptTextBox());
        var newDept = $('#addNewDeptTxt').val().trim();
        addNewDept(newDept);
    }
    else {
        //loadPendingEmployees({ ispending: true }, EmployeeViewModel2.pageSize(), EmployeeViewModel2.currentPage());
    }
    
}


//when add new dept btn is clicked
function addNewDept(newerDept) {

    if (!validation()) {
        return false;
    }
    //jere
    //this code is to check if the dept already exist if not then add 
    $.ajax({
        type: "POST",
        url: "/WEB_SERVICES/iPAS_HRDashboard.asmx/TotDeptCountASMX",
        data: JSON.stringify({ dept: { DeptName: newerDept } }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            const deptCount = response.d;
            if (deptCount) {
                //if dept is not existed before
                // $("#addNewDeptLbl").css("color", "red");
                $("#addNewDeptLbl").text("department added successfully").css("color", "green");;
                $('#addNewDeptTxt').val("");
                DeptBinding(self);

            }
            else {
                //if dept existed
                $("#addNewDeptLbl").text("Entered Department Already Exist").css("color", "red");;
                $('#addNewDeptTxt').val("");

            }
        },
        error: function (xhr, status, error) {
            alert("Failed to load departments: " + error);
            console.error("Error loading employees: ", error);
            console.error("status loading employees: ", status);
            console.error("shr loading employees: ", xhr.responseText);
        }
    });

}



//if delete button is clicked for employee or dept or HR
deleteSelectedEmployeeBtnClick = function (currentEmployee) {
    

    if (confirm("Are you sure you want to Delete this Employee?")) {
        deleteDeptOrEmpBtnFun(currentEmployee.EmpID, 0)
    }
    else {
        //loadPendingEmployees({ ispending: true }, EmployeeViewModel2.pageSize(), EmployeeViewModel2.currentPage());
    }
}
deleteSelectedDeptBtnClick = function (currentDept) {
    
    if (confirm("Are you sure you want to Delete this Department?")) {
        deleteDeptOrEmpBtnFun(0, currentDept.DeptID)
    }
    else {
        //loadPendingEmployees({ ispending: true }, EmployeeViewModel2.pageSize(), EmployeeViewModel2.currentPage());
    }
}




//if delete button is clicked for employee or dept
function deleteDeptOrEmpBtnFun(currentEmpID, currentDeptID) {
    $.ajax({
        type: "POST",
        url: "/WEB_SERVICES/iPAS_HRDashboard.asmx/DeleteEmpOrDeptASMX",
        data: JSON.stringify({ empID: currentEmpID, deptID: currentDeptID }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            const isDeleted = response.d;
            if (isDeleted) {
                //if dept/employee deleted
                if (currentEmpID == 0) {
                    //dept
                    DeptBinding();

                }
                else {
                    loadPendingEmployees({ ispending: true }, EmployeeViewModel2.pageSize(), 0);
                    loadPendingEmployees({ istotal: true }, EmployeeViewModel2.pageSize(), EmployeeViewModel2.currentPage);
                }
            }
            else {


            }
        },
        error: function (xhr, status, error) {

            console.error("Error loading employees: ", error);
            console.error("status loading employees: ", status);
            console.error("shr loading employees: ", xhr.responseText);
        }
    });

}

AddNewHRBtnClick = function () {

    var newUsername = $('#addNewHRTxt').val().trim();
    var newPassword = $('#addNewHRPassword').val().trim();
    addNewHR(newUsername, newPassword);
}

function addNewHR(newUsername, newPassword) {


    //this code is to check if the HR already exist
    $.ajax({
        type: "POST",
        url: "/WEB_SERVICES/iPAS_HRDashboard.asmx/AddNewHR",
        data: JSON.stringify({ userName: newUsername, password: newPassword }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            if (response.d.ErrorCode === 0) {
                $('#addNewHRLbl').css('color', 'green');
                $('#addNewHRLbl').text("New HR  added successfully ");
                $('#addNewHRTxt').text("");
                $('#addNewHRPassword').text("");
                LoadCountInfo();
                //loadPendingEmployees("all", "1", 0, 0);

            }

            else {
                $('#addNewHRTxt').css('border', 'red')
                $('#addNewHRPassword').css('border', 'red');
                $('#addNewHRTxt').text("");
                $('#addNewHRPassword').text("");
                $('#addNewHRLbl').css('color', 'red');
                $('#addNewHRLbl').text(response.d.ErrorMessage);
            }

        },
        error: function (xhr, status, error) {
            alert("Failed to Add new HR: " + error);
            console.error("Error adding HR: ", error);
            console.error("status adding HR: ", status);
            console.error("shr  adding HR: ", xhr.responseText);
        }
    });

}


//yet to add down

DeleteHRBtnClick = function (currentHRID) {
    if (confirm("Are you sure you want to Delete the HR?")) {
        DeleteHR(currentHRID.EmpID);
    }
}

function DeleteHR(empID) {
    $.ajax({
        type: "POST",
        // url: jQuery.HRDashboardProfileNameSpace.ServicePath +"/iPAS_HRDashboard.asmx/DeleteHR",
        url: "/WEB_SERVICES/iPAS_HRDashboard.asmx/DeleteHR",
        data: JSON.stringify({ empID: empID }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            if (response.d) {

                loadAllHRDetails();
            }
            else {
                loadAllHRDetails();
            }
        },
        error: function (xhr, status, error) {

            jQuery('#statusLabel').text("Failed to Delete  HR: " + error).css("color", "red");
            jQuery('#statusLabel').fadeOut(5000);
        }
    });
}


//to view the employee profile via hr ka via button
viewSelectedEmployeeBtnClick = function (viewCurrentEmployee) {
    sessionStorage.setItem("EmpID", viewCurrentEmployee.EmpID);
    sessionStorage.setItem("role", "1");
    window.location.href = "EmployeeProfile.aspx";
}

//yet to bind up


//validations
function validation() {
    var newDept = $('#addNewDeptTxt').val().trim();
    const deptNamePattern = /^[A-Za-z\/&]+$/;
    isValid = true;
    if (newDept === '' || !deptNamePattern.test(newDept)) {
        $("#addNewDeptTxt").css('border', '2px solid red');
        $("#addNewDeptLbl").text("DeptName is required and cannot contain numbers or special characters.").css('color', 'red');
        //$("#addNewDeptLbl").css('border', '2px solid red');
        isValid = false;
    } else {
        /* $("#addNewDeptLbl").css('border', '2px solid black');*/
    }
    return isValid;
}

//yet to bind
function hrValidation() {
    var newHR = EmployeeViewModel2.hrTextBox();
    var password = EmployeeViewModel2.hrPasswordTextBox();
    const errorLog = $("#addNewHRLbl");
    const hrNamePattern = /^[A-Za-z\/&]+$/;
    const passwordPattern = /^(?=.*\d).{8,}$/;
    isValid = true;

    //HR username
    if (!newHR || !hrNamePattern.test(newHR)) {
        $("#addNewHRTxt").css('border', '2px solid red');

        errorLog.html("HRName is required and cannot contain numbers or special characters. <br>").css('color', 'red');
        //$("#addNewDeptLbl").css('border', '2px solid red');
        isValid = false;
    } else {
        /* $("#addNewDeptLbl").css('border', '2px solid black');*/
    }

    //HR Password
    if (!password || !passwordPattern.test(password)) {
        errorLog.html(errorLog.html() + "Password must be at least 8 characters and contain a number.<br>");
        $("#addNewHRPassword").css('border', '2px solid red');
        isValid = false;
    } else {
        $("#addNewHRPassword").css('border', '2px solid black');
    }



    return isValid;
}











nextBtnOfPendingEmp = function () {
    EmployeeViewModel2.currentStatus("Pending");
    currentPage = EmployeeViewModel2.currentPageOfPendingEmpl();
    nextBtnClick(currentPage);
}

nextBtnOfAcceptedEmp = function () {

    EmployeeViewModel2.currentStatus("Accept");
    currentPage = EmployeeViewModel2.currentPageOfAcceptedEmpl();
    nextBtnClick(currentPage);
}

nextBtnOfRejectedEmp = function () {
    EmployeeViewModel2.currentStatus("Reject");
    currentPage = EmployeeViewModel2.currentPageOfRejectedEmpl();
    nextBtnClick(currentPage);

}

prevBtnOfPendingEmp = function () {
    EmployeeViewModel2.currentStatus("Pending");
    currentPage = EmployeeViewModel2.currentPageOfPendingEmpl();
    prevBtnClick(currentPage);
}

prevBtnOfAcceptedEmp = function () {

    EmployeeViewModel2.currentStatus("Accept");
    currentPage = EmployeeViewModel2.currentPageOfAcceptedEmpl();
    prevBtnClick(currentPage);
}

prevBtnOfRejectedEmp = function () {
    EmployeeViewModel2.currentStatus("Reject");
    currentPage = EmployeeViewModel2.currentPageOfRejectedEmpl();
    prevBtnClick(currentPage);

}



function nextBtnClick(currentPage) {

    var pageSize = EmployeeViewModel2.pageSize();
    let total;
    const status = EmployeeViewModel2.currentStatus();
    switch (status) {
        case "Accept":
            total = EmployeeViewModel2.remaingAcceptedEmpCount();
            break;
        case "Reject":
            total = EmployeeViewModel2.remaingRejectedEmpCount();
            break;
        case "Pending":
            total = EmployeeViewModel2.remaingPendingEmpCount();
            break;

    }
    var count = (currentPage + 1) * pageSize;
    //console.log("count:", count);
    if (count <= total) {
        var newPage = currentPage + 1;


        var offsetValue = newPage * pageSize;
        let currentstatus = {};
        switch (status) {
            case "Accept":
                currentstatus = { isaccept: true };
                EmployeeViewModel2.currentPageOfAcceptedEmpl(newPage);
                break;
            case "Reject":
                currentstatus = { isreject: true };
                EmployeeViewModel2.currentPageOfRejectedEmpl(newPage);
                break;
            case "Pending":
                currentstatus = { ispending: true };
                EmployeeViewModel2.currentPageOfPendingEmpl(newPage);
                break;
        }
        loadPendingEmployees(currentstatus, pageSize, offsetValue);
    }

}
function prevBtnClick(currenttPage) {
    var currentPage = currenttPage;
    var pageSize = EmployeeViewModel2.pageSize();

    if (currentPage > 0) {
        var newPage = currentPage - 1;


        var offsetValue = newPage * pageSize;
        var status = EmployeeViewModel2.currentStatus();

        let currentstatus = {};
        switch (status) {
            case "Accept":
                currentstatus = { isaccept: true };
                EmployeeViewModel2.currentPageOfAcceptedEmpl(newPage);
                break;
            case "Reject":
                currentstatus = { isreject: true };
                EmployeeViewModel2.currentPageOfRejectedEmpl(newPage);
                break;
            case "Pending":
                currentstatus = { ispending: true };
                EmployeeViewModel2.currentPageOfPendingEmpl(newPage);
                break;
        }
        loadPendingEmployees(currentstatus, pageSize, offsetValue);
    }


    //updatePaginationButtons();
}
function updatePaginationButtons(currenttPage, currentStatus) {
    const currentPage = currenttPage;
    const pageSize = EmployeeViewModel2.pageSize();
    let status = currentStatus;
    let total;

    let maxPage;

    if (status === "Accept") {
        total = EmployeeViewModel2.remaingAcceptedEmpCount();
        maxPage = Math.floor((total - 1) / pageSize);
        if (total === 0) {
            jQuery('#prevBtn, #nextBtn').hide();
            return;
        } else {
            jQuery('#prevBtn, #nextBtn').show();
        }
        jQuery('#prevBtnOfAcceptedEmp').prop('disabled', currentPage === 0);
        jQuery('#nextBtnOfAcceptedEmp').prop('disabled', currentPage >= maxPage);

    }
    else if (status === "Reject") {
        total = EmployeeViewModel2.remaingRejectedEmpCount();
        maxPage = Math.floor((total - 1) / pageSize);
        if (total === 0) {
            jQuery('#prevBtn, #nextBtn').hide();
            return;
        } else {
            jQuery('#prevBtn, #nextBtn').show();
        }
        jQuery('#prevBtnOfRejectedEmp').prop('disabled', currentPage === 0);
        jQuery('#nextBtnOfRejectedEmp').prop('disabled', currentPage >= maxPage);
    }
    else if (status === "Pending") {
        total = EmployeeViewModel2.remaingPendingEmpCount();
        maxPage = Math.floor((total - 1) / pageSize);
        if (total === 0) {
            jQuery('#prevBtn, #nextBtn').hide();
            return;
        } else {
            jQuery('#prevBtn, #nextBtn').show();
        }
        jQuery('#prevBtn').prop('disabled', currentPage === 0);
        jQuery('#nextBtn').prop('disabled', currentPage >= maxPage);
    }



   
}






















