////jQuery.HRDashboardProfileNameSpace = jQuery.HRDashboardProfileNameSpace || {};
////jQuery.HRDashboardProfileNameSpace.ServicePath = "";


function PageLoadFunctions(webservicePath) {
    jQuery.HRDashboardProfileNameSpace.ServicePath = webservicePath;
    //console.log("The error is: ", jQuery.HRDashboardProfileNameSpace.ServicePath);
    LoadCountInfo();
    //const PendingVM = new EmployeeViewModel2();
    //ko.applyBindings(PendingVM);
    //LoadSession();
    TotalBtnView();
    jQuery("#deptContainer").hide();
    jQuery("#hrContainer").hide();
    ko.applyBindings(EmployeeViewModel2);
}


var EmployeeViewModel2 = {

    //for overview toggle button
    PendingEmployees: ko.observableArray([]),
    deptBtnVisibility: ko.observable(true),

    //for total Department binding
    totDept: ko.observableArray([]),

    //for total HR binding
    getTotalHR: ko.observableArray([]),

    //for pagination current page
    currentPage: ko.observable(0),


    //for the current status clicked
    currentStatus: ko.observable(),

    //for the page size i.e num of rows u want
    pageSize: ko.observable(2),

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

    //for new dept entry
    deptTextBox: ko.observable(),

    //for new HR entry
    hrTextBox: ko.observable(),

    //for new HR password entry
    hrPasswordTextBox: ko.observable(),

    //for employee count for specific status  requored for comparing in the pagination 
    empCount: ko.observable(),
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
function DarkModeBtnClick() {
    window.location.href = "HRDashboard2.aspx";
}

//this is for loading all the CountInfo at page load
function LoadCountInfo() {

   // console.log("The error is: ", jQuery.HRDashboardProfileNameSpace.ServicePath);
 $.ajax({
        type: "POST",
        //url: jQuery.HRDashboardProfileNameSpace.ServicePath +"/iPAS_HRDashboard.asmx/GetCountASMX",
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
            jQuery('#statusLabel').text("Error fetching CountInfo :", error);
        }
    });
}

function PendingBtnView() {
    $('.navItem').removeClass("actBtn");
    $('#pendingBtn').addClass("actBtn");
    EmployeeViewModel2.deptBtnVisibility(true);
    EmployeeViewModel2.currentStatus("Pending");
    EmployeeViewModel2.currentPage(0);
    EmployeeViewModel2.empCount(EmployeeViewModel2.remaingPendingEmpCount());
    loadPendingEmployees({ ispending:true }, EmployeeViewModel2.pageSize(), 0);
};

AcceptBtnView = function () {
    $('.navItem').removeClass("actBtn");
    $('#acceptBtn').addClass("actBtn");
    EmployeeViewModel2.deptBtnVisibility(true);
    EmployeeViewModel2.currentStatus("Accept");
    EmployeeViewModel2.currentPage(0);
    EmployeeViewModel2.empCount(EmployeeViewModel2.remaingAcceptedEmpCount());
    loadPendingEmployees({ isaccept:true }, EmployeeViewModel2.pageSize(), 0);
 };

RejectBtnView = function () {
    $('.navItem').removeClass("actBtn");
    $('#rejectBtn').addClass("actBtn");
    EmployeeViewModel2.deptBtnVisibility(true);
    EmployeeViewModel2.currentStatus("Reject");
    EmployeeViewModel2.currentPage(0);
    EmployeeViewModel2.empCount(EmployeeViewModel2.remaingRejectedEmpCount());
    loadPendingEmployees({ isreject:true }, EmployeeViewModel2.pageSize(), 0);
};

TotalBtnView = function () {
    //sessionStorage.setItem("newCSS", "TotalBtn")
    $('.navItem').removeClass("actBtn");
    $('#totalBtn').addClass("actBtn");
    EmployeeViewModel2.deptBtnVisibility(false);
    EmployeeViewModel2.currentStatus("all");
    EmployeeViewModel2.currentPage(0);
    EmployeeViewModel2.empCount(EmployeeViewModel2.remaingTotalEmpCount());
    loadPendingEmployees({ istotal:true }, EmployeeViewModel2.pageSize(), 0);
};

function loadPendingEmployees(status, pageSize, offsetValue) {
    $.ajax({
        type: "POST",
        //url: jQuery.HRDashboardProfileNameSpace.ServicePath +"/iPAS_HRDashboard.asmx/GetEmployeeDetailsASMX",
        url: "/WEB_SERVICES/iPAS_HRDashboard.asmx/GetEmployeeDetails",
        data: JSON.stringify({
            employeeDetails:
            {
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
                updatePaginationButtons();
                if (result.length === 0) {
                    $('#pending').show();
                    $('#employeeTble').hide();
                    $('#noRecords').text("No Records Found").css('color', 'red');
                    jQuery('#prevBtn').hide();
                    jQuery('#nextBtn').hide();
                    return;
                }

                $('#pending').show();
                $('#employeeTble').show();
                jQuery('#deptContainer').hide();
                jQuery('#hrContainer').hide();
                EmployeeViewModel2.PendingEmployees(result);
                }
            else
            {
                //error message
            }
            },
        error: function (xhr, status, error) {
            jQuery('#statusLabel').text("Error loading Employees :", error);
        }
    });
};

// this is for delete , accept, pending, view btn visibility
//function UpdateBtnVisibility() {
//    // this is for delete , accept, pending, view btn visibility
//    let status = EmployeeViewModel2.currentStatus();
//    if (status === "all") {
//        jQuery(".acceptButton").hide();
//        jQuery(".rejectButton").hide();
//        jQuery(".deleteButton").show();

//    }
//    else if (status === "Pending") {
//        jQuery(".acceptButton").show();
//        jQuery(".rejectButton").show();
//        jQuery('.deleteButton').hide();
//    }
//    else if (status === "Accept") {
//        jQuery('.rejectButton ').show();
//        jQuery('.acceptButton').hide();
//        jQuery('.deleteButton').hide();
//    }
//    else {
//        jQuery('.acceptButton').show();
//        jQuery('.rejectButton').hide();
//        jQuery('.deleteButton').hide();
//    }
//}

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
        //url: jQuery.HRDashboardProfileNameSpace.ServicePath +"/iPAS_HRDashboard.asmx/AcceptRejectEmpASMX",
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
                loadPendingEmployees({ ispending: true }, EmployeeViewModel2.pageSize(), EmployeeViewModel2.currentPage());
                    LoadCountInfo();
                }
            else {
                //if accept reject status didnt updated
                }
        },
        error: function (xhr, status, error) {
            jQuery('#statusLabel').text("Something Went Wrong :", error);
        }
    });
};

//for dept binding
deptBtn = function () {
    $('.navItem').removeClass("actBtn");
    $('#deptBtn').addClass("actBtn");
    jQuery('#pending').hide();
    jQuery('#hrContainer').hide();
    jQuery("#deptContainer").show();
    DeptBinding();
}

//for dept binding
function DeptBinding() {
    $.ajax({
        type: "POST",
        //url: jQuery.HRDashboardProfileNameSpace.ServicePath +"/iPAS_Registration.asmx/GetDepartmentASMX",
        url: "/WEB_SERVICES/iPAS_Registration.asmx/GetDepartmentASMX",
        data: {},
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            LoadCountInfo();
            const result = response.d.DepartmentInfoList;
            EmployeeViewModel2.totDept(result);
        },
        error: function (xhr, status, error) {
            jQuery('#statusLabel').text("Error Loading the departments, Something Went Wrong :", error);
        }
    });
};

//for HR binding
HRBtnClick = function () {
    $('#hrBtn').toggleClass("actBtn");
    $('.navItem').not('#hrBtn').removeClass("actBtn");
    jQuery("#hrContainer").toggle();
    jQuery("#deptContainer").hide();
    jQuery("#pending").hide();
    if ($("#hrContainer").is(":visible")) {
        loadAllHRDetails();
    }
}

function loadAllHRDetails() {
    $.ajax({
        type: "POST",
        //url: jQuery.HRDashboardProfileNameSpace.ServicePath +"/iPAS_HRDashboard.asmx/GetAllHRDetails",
        url: "/WEB_SERVICES/iPAS_HRDashboard.asmx/GetAllHRDetails",
        data: {},
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            const result = response.d.RegistrationInfoList;
            EmployeeViewModel2.getTotalHR(result);
        },
        error: function (xhr, status, error) {
            jQuery('#statusLabel').text("Error Loading HRs, Something Went Wrong :", error);
        }
    });
};

// adding the new dept 
addDeptBtnClick = function () {
    //var newDept = $('#addNewDeptTxt').val().trim();
    if (confirm("Do you really want to add the new HR?")) {
        addNewDept(EmployeeViewModel2.deptTextBox());
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
    
    //this code is to check if the dept already exist if not then add 
    $.ajax({
        type: "POST",
       // url: jQuery.HRDashboardProfileNameSpace.ServicePath +"/iPAS_HRDashboard.asmx/TotDeptCountASMX",
        url: "/WEB_SERVICES/iPAS_HRDashboard.asmx/TotDeptCountASMX",
        data: JSON.stringify({ dept: { DeptName: newerDept } }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            const deptCount = response.d;
            if (deptCount) {
                //if dept is not existed before
                // $("#addNewDeptLbl").css("color", "red");
                $("#addNewDeptLbl").text("department added successfully").css("color", "green");
                $("#addNewDeptLbl").fadeOut(5000);
                EmployeeViewModel2.deptTextBox("");
                DeptBinding();

            }
            else {
                //if dept existed
                $("#addNewDeptLbl").text("Entered Department Already Exist").css("color", "red");;
                jQuery('#addNewDeptLbl').fadeOut(5000);
                EmployeeViewModel2.deptTextBox("");

            }
        },
        error: function (xhr, status, error) {
            jQuery('#statusLabel').text("Failed to load departments, Something Went Wrong :", error);
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
        //url: jQuery.HRDashboardProfileNameSpace.ServicePath +"/iPAS_HRDashboard.asmx/DeleteEmpOrDeptASMX",
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

                    jQuery("#addNewDeptLbl").text("Department has been deleted successfully").css("color", "green");
                    jQuery("#addNewDeptLbl").fadeOut(5000);
                    DeptBinding();

                }
                else {
                    jQuery('#statusLabel').text("User has been deleted successfully").css("color", "green");
                    jQuery('#statusLabel').fadeOut(5000);
                    loadPendingEmployees({ istotal: true }, EmployeeViewModel2.pageSize(), EmployeeViewModel2.currentPage);
                }
            }
            else {
                //if not deleted
            }
        },
        error: function (xhr, status, error) {

            jQuery('#statusLabel').text("error Deleting the user").css("color", "red");
            jQuery('#statusLabel').fadeOut(5000);
        }
    });

}

AddNewHRBtnClick = function () {
    var newUsername = EmployeeViewModel2.hrTextBox();
    var newPassword = EmployeeViewModel2.hrPasswordTextBox();
    addNewHR(newUsername, newPassword);
}

function addNewHR(newUsername, newPassword) {
    if (!hrValidation()) {
        return false;
    }
    //this code is to check if the HR already exist
    $.ajax({
        type: "POST",
       // url: jQuery.HRDashboardProfileNameSpace.ServicePath +"/iPAS_HRDashboard.asmx/AddNewHR",
        url:"/WEB_SERVICES/iPAS_HRDashboard.asmx/AddNewHR",
        data: JSON.stringify({ userName: newUsername, password: newPassword }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            if (response.d.ErrorCode === 0) {

                EmployeeViewModel2.hrTextBox("");
                EmployeeViewModel2.hrPasswordTextBox("");
                
                jQuery('#addNewHRTxt,#addNewHRPassword').css('border', 'black')
                //jQuery('#addNewHRPassword').css('border', 'black');
                jQuery('#addNewHRLbl').text("New HR  added successfully ").css('color', 'green');
                jQuery('#addNewHRLbl').fadeOut(5000);
                LoadCountInfo();
                loadAllHRDetails();
            }
            else {
                EmployeeViewModel2.hrTextBox("");
                EmployeeViewModel2.hrPasswordTextBox("");

                jQuery('#addNewHRTxt,#addNewHRPassword').css('border', 'red')
                //jQuery('#addNewHRPassword').css('border', 'red');
                jQuery('#addNewHRLbl').text(response.d.ErrorMessage).css('color', 'red');
                jQuery('#addNewHRLbl').fadeOut(2000);
                
            }

        },
        error: function (xhr, status, error) {
            
            jQuery('#statusLabel').text("Failed to Add new HR: " + error).css("color", "red");
            jQuery('#statusLabel').fadeOut(5000);
        }
    });

}


DeleteHRBtnClick = function (currentHRID) {
    if (confirm("Are you sure you want to Delete the HR?"))
    {
        DeleteHR(currentHRID.EmpID);
    }
}

function DeleteHR(empID)
{
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



//validations
function validation() {
    var newDept = EmployeeViewModel2.deptTextBox();
    const deptNamePattern = /^[A-Za-z\/&]+$/;
    isValid = true;
    if (!newDept || !deptNamePattern.test(newDept)) {
        $("#addNewDeptTxt").css('border', '2px solid red');
        $("#addNewDeptLbl").text("DeptName is required and cannot contain numbers or special characters.").css('color', 'red');
        //$("#addNewDeptLbl").css('border', '2px solid red');
        isValid = false;
    } else {
        /* $("#addNewDeptLbl").css('border', '2px solid black');*/
    }
    return isValid;
}


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



//function nextBtnClick() {
//    var count= EmployeeViewModel2.currentPage() * EmployeeViewModel2.pageSize();
//    if (EmployeeViewModel2.currentPage() * EmployeeViewModel2.pageSize() < EmployeeViewModel2.remaingEmpCount())
//    {


//        var offsetValue = (EmployeeViewModel2.currentPage() + 1) * EmployeeViewModel2.pageSize();
//        var status = EmployeeViewModel2.currentStatus();
//        loadPendingEmployees(status, "2", EmployeeViewModel2.pageSize(), offsetValue);
//        EmployeeViewModel2.currentPage(EmployeeViewModel2.currentPage() + 1);
//    }
//}


function nextBtnClick() {
    var currentPage = EmployeeViewModel2.currentPage();
    var pageSize = EmployeeViewModel2.pageSize();
    var totalRemaining = EmployeeViewModel2.empCount();

    var count = (currentPage + 1) * pageSize;
    //console.log("count:", count);

    if (count <= totalRemaining) {
        var newPage = currentPage + 1;
        EmployeeViewModel2.currentPage(newPage);

        var offsetValue = newPage * pageSize;
        var status = EmployeeViewModel2.currentStatus();

        let currentstatus = {};
        switch (status) {
            case "Accept":
                 currentstatus = { isaccept: true };
                break;
            case "Reject":
                currentstatus = { isreject: true };
                break;
            case "Pending":
                currentstatus = { ispending: true };
                break;
            case "all":
                currentstatus = { istotal: true };
                break;

        }
       
        loadPendingEmployees(currentstatus, pageSize, offsetValue);
    }
}


function prevBtnClick() {
    var currentPage = EmployeeViewModel2.currentPage();
    var pageSize = EmployeeViewModel2.pageSize();

    if (currentPage > 0) {
        var newPage = currentPage - 1;
        EmployeeViewModel2.currentPage(newPage);

        var offsetValue = newPage * pageSize;
        var status = EmployeeViewModel2.currentStatus();

        let currentstatus = {};
        switch (status) {
            case "Accept":
                currentstatus = { isaccept: true };
                break;
            case "Reject":
                currentstatus = { isreject: true };
                break;
            case "Pending":
                currentstatus = { ispending: true };
                break;
            case "all":
                currentstatus = { istotal: true };
                break;

        }
        loadPendingEmployees(currentstatus, pageSize, offsetValue);
    }


    //updatePaginationButtons();
}

function updatePaginationButtons() {
    const currentPage = EmployeeViewModel2.currentPage();
    const pageSize = EmployeeViewModel2.pageSize();
    let status = EmployeeViewModel2.currentStatus();
    let total;

    if (status === "all") {
        total = EmployeeViewModel2.remaingTotalEmpCount();

    }
    else if (status === "Accept") {
        total = EmployeeViewModel2.remaingAcceptedEmpCount();
    }
    else if (status === "Reject") {
        total = EmployeeViewModel2.remaingRejectedEmpCount();
    }
    else if (status === "Pending") {
        total = EmployeeViewModel2.remaingPendingEmpCount();
    }

    const maxPage = Math.floor((total - 1) / pageSize);


    if (total === 0) {
        jQuery('#prevBtn, #nextBtn').hide();
        return;
    } else {
        jQuery('#prevBtn, #nextBtn').show();
    }


    jQuery('#prevBtn').prop('disabled', currentPage === 0);
    jQuery('#nextBtn').prop('disabled', currentPage >= maxPage);

}






