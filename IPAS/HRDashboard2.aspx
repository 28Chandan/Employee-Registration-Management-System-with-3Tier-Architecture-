<%@ Page Title="" Language="C#" MasterPageFile="~/Post_Login.Master" AutoEventWireup="true" CodeBehind="HRDashboard2.aspx.cs" Inherits="IPAS.HRDashboard2" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder2" runat="server">
    <button id="logOutBtn1" type="button" class="logOutBtn" onclick="LogOutBtnClick();"><%= GetGlobalResourceObject("EmployeePage_Resource", "logOut") %></button>
    <button id="lightMode" type="button" class="lightMode" onclick="LightModeBtnClick();"><%= GetGlobalResourceObject("EmployeePage_Resource", "LightMode") %></button>

</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder3" runat="server">

    <style>
        body {
            background-color: #1f2937;
            color: #f9fafb;
        }

        #lightMode {
            margin-left: 30px;
            font-size: 18px;
            background-color: #374151;
            height: 30px;
            width: 110px;
            display: flex;
            border-radius: 6px;
            color: #f9fafb;
            cursor: pointer;
        }

            #lightMode:hover {
                background-color: #4b5563;
                color: white;
            }

        #logOutBtn1 {
            margin-left: 720px;
        }

        #actionContainer {
            display: flex;
            justify-content: space-evenly;
            align-items: center;
        }

        .navItem {
            font-size: 15px;
            background-color: #374151;
            color: #f9fafb;
            height: 30px;
            width: 120px;
            display: flex;
            justify-content: center;
            align-items: center;
            border: 2px solid #4b5563;
            border-radius: 6px;
            margin-right: 25px;
        }

            .navItem:hover {
                background-color: #4b5563;
                color: #ffffff;
            }

        .actBtn {
            background-color: #EF4444;
            color: white;
            font-size: 15px;
            height: 30px;
            width: 120px;
            display: flex;
            justify-content: center;
            align-items: center;
            border: 2px solid #b91c1c;
            border-radius: 6px;
            margin-right: 25px;
        }

        .logOutBtn, .logOutAnchor {
            font-size: 18px;
            background-color: #374151;
            height: 30px;
            width: 110px;
            display: flex;
            justify-content: center;
            align-items: center;
            border: 2px solid #4b5563;
            border-radius: 6px;
            color: #f9fafb;
            cursor: pointer;
        }

            .logOutBtn:hover, li:hover {
                background-color: #4b5563;
                color: white;
            }


        .HDDivs, .HDDivss, #deptOverView {
            background-color: #374151;
            color: #f9fafb;
            margin-bottom: 10px;
            padding-left: 30px;
        }

        #deptOverView {
            padding-left: 600px;
            flex-direction: column;
            justify-content: center;
        }

        .countDivs {
            border: 2px solid #4b5563;
            background-color: #4b5563;
            color: #f9fafb;
            margin-right: 80px;
            height: 100px;
            width: 150px;
            border-radius: 10px;
            display: flex;
            justify-content: center;
            align-items: center;
            margin-bottom: 50px;
        }


        .labels {
            height: 50px;
            width: 50px;
            color: #f9fafb;
            font-size: 25px;
            font-weight: bolder;
            background-color: #1f2937;
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 10px;
        }

        table {
            background-color: #1f2937;
            color: #f9fafb;
            border-collapse: collapse;
            width: 100%;
        }

            table th, table td {
                border: 1px solid #4b5563;
                padding: 8px;
                text-align: center;
            }

            table th {
                background-color: #374151;
            }

        input[type="submit"], button {
            cursor: pointer;
        }

        button {
            color: #f9fafb;
        }

        #footer {
            background-color: #374151;
            color: #f9fafb;
            text-align: center;
            padding: 15px 0;
            font-size: 14px;
            width: 100%;
        }

        #HRDashboardContainer {
            display: flex;
        }

        .submitNewDeptBtnClass {
            background-color: #10B981;
            color: #ffffff;
            border: 1px solid #059669;
            border-radius: 4px;
            padding: 4px 12px;
            cursor: pointer;
        }

            .submitNewDeptBtnClass:hover {
                background-color: #059669;
            }

        .addNewDeptTxtClass {
            margin-left: 630px;
            background-color: #374151;
            color: #f9fafb;
            border: 1px solid #4b5563;
            border-radius: 4px;
            padding: 4px 8px;
        }

        .addNewDeptLblClass {
            margin-bottom: 50px;
        }

        .addDivContainerClass {
            margin-bottom: 20px;
        }

        .noRecords {
            text-align: center;
            font-weight: bolder;
            font-size: 30px;
            color: red;
        }

        .pagination-btn {
            background-color: #1e1e2f;
            color: #ffffff;
            border: 1px solid #3a3a5a;
            padding: 8px 16px;
            margin: 0 5px;
            font-size: 14px;
            border-radius: 6px;
            cursor: pointer;
            transition: background-color 0.3s, color 0.3s, opacity 0.3s;
        }

            .pagination-btn:hover:enabled {
                background-color: #2a2a40;
            }

            /* Disabled state */
            .pagination-btn:disabled {
                background-color: #3a3a5a; /* Darker gray to indicate disabled */
                color: #a0a0a0; /* Light gray text */
                border-color: #555; /* Slightly lighter border */
                cursor: not-allowed;
                opacity: 0.6;
            }
    </style>


    <div id="HRContainer">
        <h1 style="text-align: center">Welcome to HR DashBoard</h1>


        <div id="HRDashboard" class="HDDivs">
            <label id="countErrorLabel"></label>
            <div id="HRDashboardContainer">
                <div style="display: flex; flex-direction: column;">
                    <h4 style="margin-left: 70px; margin-bottom: 0px;">Total Count</h4>
                    <div id="totalEmpCount" class="countDivs">
                        <%--<asp:Label ID="totalCountLbl" CssClass="labels" runat="server"></asp:Label>--%>
                        <label id="totalCountLbl" class="labels" data-bind="text: remaingTotalEmpCount"></label>
                    </div>
                </div>

                <div style="display: flex; flex-direction: column;">
                    <h4 style="margin-left: 0px; margin-bottom: 0px;">Total Accepted Employee Count</h4>
                    <div id="totalAcceptedEmpCount" class="countDivs">
                        <%--<asp:Label ID="totalAcceptedEmpCountLbl" CssClass="labels" runat="server"></asp:Label>--%>
                        <label id="totalAcceptedEmpCountLbl" class="labels" data-bind="text: remaingAcceptedEmpCount"></label>
                    </div>
                </div>


                <div style="display: flex; flex-direction: column;">
                    <h4 style="margin-left: 0px; margin-bottom: 0px;">Total Rejected Employee Count</h4>
                    <div id="totalRejectedEmpCount" class="countDivs">
                        <%-- <asp:Label ID="totalRejectedEmpCountLbl" CssClass="labels" runat="server"></asp:Label>--%>
                        <label id="totalRejectedEmpCountLbl" class="labels" data-bind="text: remaingRejectedEmpCount"></label>
                    </div>
                </div>

                <div style="display: flex; flex-direction: column;">
                    <h4 style="margin-left: 0px; margin-bottom: 0px;">Total Pending Employee Count</h4>
                    <div id="totalPendingEmpCount" class="countDivs">
                        <%-- <asp:Label ID="totalPendingEmpCountLbl" CssClass="labels" runat="server"></asp:Label>--%>
                        <label id="totalPendingEmpCountLbl" class="labels" data-bind="text: remaingPendingEmpCount"></label>
                    </div>
                </div>

                <div style="display: flex; flex-direction: column;">
                    <h4 style="margin-left: 0px; margin-bottom: 0px;">Total Department Count</h4>
                    <div id="totalDeptCount" class="countDivs">
                        <%-- <asp:Label ID="totalDeptCountLbl" CssClass="labels" runat="server"></asp:Label>--%>
                        <label id="totalDeptCountLbl" class="labels" data-bind="text: remaingDeptCount"></label>
                    </div>
                </div>

                <div style="display: flex; flex-direction: column;">
                    <h4 style="margin-left: 0px; margin-bottom: 0px;"><%= GetGlobalResourceObject("HRPage_Resource", "TotalHRCount") %></h4>
                    <div id="totalHRCount" class="countDivs">

                        <label id="totalHRCountLbl" class="labels" data-bind="text:remaingHRCount"></label>
                    </div>
                </div>
            </div>


        </div>

        <%--for pending employees--%>
        <div id="pending" class="HDDivs">
            <h1 style="text-align: center">List of Pending Employees</h1>
            <br />
            <br />

            <table border="1">
                <thead>
                    <tr>
                        <%--<th><%= GetGlobalResourceObject("HRPage_Resource", "EmpIDCol") %></th>--%>
                        <th><%= GetGlobalResourceObject("HRPage_Resource", "UserNameCol") %></th>
                        <th><%= GetGlobalResourceObject("HRPage_Resource", "FirstNameCol") %></th>
                        <th><%= GetGlobalResourceObject("HRPage_Resource", "LastNameCol") %></th>
                        <th><%= GetGlobalResourceObject("HRPage_Resource", "EmailIDCol") %></th>
                        <th><%= GetGlobalResourceObject("HRPage_Resource", "DepartmentCol") %></th>
                        <th><%= GetGlobalResourceObject("HRPage_Resource", "ResumeCol") %></th>
                        <th><%= GetGlobalResourceObject("HRPage_Resource", "StatusCol") %></th>
                        <th><%= GetGlobalResourceObject("HRPage_Resource", "ActionCol") %></th>
                    </tr>
                </thead>
                <tbody data-bind="foreach: PendingEmployees">
                    <tr>
                        <%-- <td data-bind="text: EmpID"></td>--%>
                        <td data-bind="text: UserName"></td>
                        <td data-bind="text: FirstName"></td>
                        <td data-bind="text: LastName"></td>
                        <td data-bind="text: EmailID"></td>
                        <td data-bind="text: Department"></td>
                        <td data-bind="text: ResumeUpload"></td>
                        <td data-bind="text: Status"></td>
                        <td>
                            <button class="acceptBtn" type="button" style="background-color: green; color: white;" data-bind="click: AcceptBtnClick"><%= GetGlobalResourceObject("HRPage_Resource", "AcceptBtn") %></button>
                            <button class="rejectBtn" type="button" style="background-color: red; color: white;" data-bind="click: RejectBtnClick"><%= GetGlobalResourceObject("HRPage_Resource", "RejectBtn") %></button>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div id="noRecordsOfPending" class="records">
            </div>
            <div id="paggingBtn">
                <button id="nextBtn" class="pagination-btn" type="button" style="height: 30px; width: 100px" data-bind="click:nextBtnOfPendingEmp">
                    <%= GetGlobalResourceObject("HRPage_Resource", "NextBtn") %>
                </button>
                <button id="prevBtn" class="pagination-btn" type="button" style="height: 30px; width: 100px" data-bind="click:prevBtnOfPendingEmp">
                    <%= GetGlobalResourceObject("HRPage_Resource", "PrevBtn") %>
                </button>
            </div>




            <br />
            <br />
        </div>
        <%--for approves employees--%>
        <div id="approved" class="HDDivs">
            <h1 style="text-align: center">List of Approved Employees</h1>
            <br />
            <br />

            <table border="1">
                <thead>
                    <tr>
                        <th><%= GetGlobalResourceObject("HRPage_Resource", "EmpIDCol") %></th>
                        <th><%= GetGlobalResourceObject("HRPage_Resource", "UserNameCol") %></th>
                        <th><%= GetGlobalResourceObject("HRPage_Resource", "FirstNameCol") %></th>
                        <th><%= GetGlobalResourceObject("HRPage_Resource", "LastNameCol") %></th>
                        <th><%= GetGlobalResourceObject("HRPage_Resource", "EmailIDCol") %></th>
                        <th><%= GetGlobalResourceObject("HRPage_Resource", "DepartmentCol") %></th>
                        <th><%= GetGlobalResourceObject("HRPage_Resource", "ResumeCol") %></th>
                        <th><%= GetGlobalResourceObject("HRPage_Resource", "StatusCol") %></th>
                        <th><%= GetGlobalResourceObject("HRPage_Resource", "ActionCol") %></th>
                    </tr>
                </thead>
                <tbody data-bind="foreach: AcceptedEmployees">
                    <tr>
                        <td data-bind="text: EmpID"></td>
                        <td data-bind="text: UserName"></td>
                        <td data-bind="text: FirstName"></td>
                        <td data-bind="text: LastName"></td>
                        <td data-bind="text: EmailID"></td>
                        <td data-bind="text: Department"></td>
                        <td data-bind="text: ResumeUpload"></td>
                        <td data-bind="text: Status"></td>
                        <td>
                            <button class="deleteBtn" type="button" data-bind="click: deleteSelectedEmployeeBtnClick">
                                <img src="Images/delete.png" alt="Delete" style="width: 16px; height: 16px; vertical-align: middle;"></button>
                            <button class="viewBtn" type="button" data-bind="click: viewSelectedEmployeeBtnClick">
                                <img src="Images/view.png" alt="Delete" style="width: 16px; height: 16px; vertical-align: middle;"></button>

                        </td>
                    </tr>
                </tbody>
            </table>
            <div id="noRecordsOfAccept" class="records">
            </div>
            <div id="paggingBtnOfAcceptedEmp">
                <button id="nextBtnOfAcceptedEmp" class="pagination-btn" type="button" style="height: 30px; width: 100px" data-bind="click:nextBtnOfAcceptedEmp">
                    <%= GetGlobalResourceObject("HRPage_Resource", "NextBtn") %>
                </button>
                <button id="prevBtnOfAcceptedEmp" class="pagination-btn" type="button" style="height: 30px; width: 100px" data-bind="click:prevBtnOfAcceptedEmp">
                    <%= GetGlobalResourceObject("HRPage_Resource", "PrevBtn") %>
                </button>
            </div>

            <br />
            <br />
        </div>
        <%-- list of rejected--%>
        <div id="rejected" class="HDDivs">
            <h1 style="text-align: center">List of Rejected Employees</h1>
            <br />
            <br />


            <table border="1">
                <thead>
                    <tr>
                        <th><%= GetGlobalResourceObject("HRPage_Resource", "EmpIDCol") %></th>
                        <th><%= GetGlobalResourceObject("HRPage_Resource", "UserNameCol") %></th>
                        <th><%= GetGlobalResourceObject("HRPage_Resource", "FirstNameCol") %></th>
                        <th><%= GetGlobalResourceObject("HRPage_Resource", "LastNameCol") %></th>
                        <th><%= GetGlobalResourceObject("HRPage_Resource", "EmailIDCol") %></th>
                        <th><%= GetGlobalResourceObject("HRPage_Resource", "DepartmentCol") %></th>
                        <th><%= GetGlobalResourceObject("HRPage_Resource", "ResumeCol") %></th>
                        <th><%= GetGlobalResourceObject("HRPage_Resource", "StatusCol") %></th>
                        <th><%= GetGlobalResourceObject("HRPage_Resource", "RejectedReasonCol") %></th>
                    </tr>
                </thead>
                <tbody data-bind="foreach: RejectedEmployees">
                    <tr>
                        <td data-bind="text: EmpID"></td>
                        <td data-bind="text: UserName"></td>
                        <td data-bind="text: FirstName"></td>
                        <td data-bind="text: LastName"></td>
                        <td data-bind="text: EmailID"></td>
                        <td data-bind="text: Department"></td>
                        <td data-bind="text: ResumeUpload"></td>
                        <td data-bind="text: Status"></td>
                        <td data-bind="text: RejectedReason"></td>

                    </tr>
                </tbody>
            </table>

            <div id="noRecordsOfReject" class="records">
            </div>
            <div id="paggingBtnOfRejectedEmp">
                <button id="nextBtnOfRejectedEmp" class="pagination-btn" type="button" style="height: 30px; width: 100px" data-bind="click:nextBtnOfRejectedEmp">
                    <%= GetGlobalResourceObject("HRPage_Resource", "NextBtn") %>
                </button>
                <button id="prevBtnOfRejectedEmp" class="pagination-btn" type="button" style="height: 30px; width: 100px" data-bind="click:prevBtnOfRejectedEmp">
                    <%= GetGlobalResourceObject("HRPage_Resource", "PrevBtn") %>
                </button>
            </div>


            <br />
            <br />
        </div>



        <%-- list of departments--%>
        <div id="departments" class="HDDivs">
            <h1 style="text-align: center">List of Departments</h1>
            <br />
            <br />




            <div id="addDivContainer" class="addDivContainerClass">
                <input type="text" id="addNewDeptTxt" class="addNewDeptTxtClass" />
                <button type="button" id="submitNewDeptBtn" class="submitNewDeptBtnClass" onclick="addDeptBtnClick();">Add</button>
                <label id="addNewDeptLbl" class="addNewDeptLblClass"></label>
            </div>
            <table border="1">

                <thead>
                    <tr>
                        <%--<th><%= GetGlobalResourceObject("HRPage_Resource", "DeptIdCol") %></th>--%>
                        <th><%= GetGlobalResourceObject("HRPage_Resource", "DepartmentCol") %></th>
                        <th><%= GetGlobalResourceObject("HRPage_Resource", "ActionCol") %></th>
                    </tr>
                </thead>
                <tbody data-bind="foreach: totDept">
                    <tr>
                        <%--<td data-bind="text: DeptID"></td>--%>
                        <td data-bind="text: DeptName"></td>
                        <td>
                            <button type="button" data-bind="click: deleteSelectedDeptBtnClick">
                                <img src="Images/delete.png" alt="Delete" style="width: 16px; height: 16px; vertical-align: middle;"></button>
                        </td>
                    </tr>
                </tbody>
            </table>


            <%--            <div class="noRecords">
                No Record Found
            </div>--%>


            <br />
            <br />

        </div>



        <div id="HRCount" class="HDDivs">
            <h1 style="text-align: center">List of HRs</h1>
            <br />
            <br />


            <div id="addHRContainer" class="addDivContainerClass">

                <input type="text" id="addNewHRTxt" class="addNewDeptTxtClass" />

                <input type="password" id="addNewHRPassword" class="addNewDeptTxtClass" />
                <button type="button" id="addNewHRBtn" class="submitNewDeptBtnClass" onclick="AddNewHRBtnClick();">Add</button>
                <label id="addNewHRLbl" class="addNewDeptLblClass"></label>
            </div>
            <br />
            <table border="1">
                <thead>
                    <tr>
                        <%--<th>HR ID</th>--%>
                        <th>HR Name</th>
                        <th>Delete</th>

                    </tr>
                </thead>
                <tbody data-bind="foreach: getTotalHR">
                    <tr>
                        <%-- <td data-bind="text: "></td>--%>
                        <td data-bind="text: UserName"></td>
                        <td>
                            <button type="button" data-bind="click: deleteSelectedEmployeeBtnClick">
                                <img src="Images/delete.png" alt="Delete" style="width: 16px; height: 16px; vertical-align: middle;"></button>

                        </td>
                    </tr>
                </tbody>
            </table>
            <%--  <div class="noRecords" >
                No Record Found
            </div>--%>

            <br />
            <br />

        </div>
    </div>
    <!-- Load jQuery first -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>

    <!-- THEN load Knockout -->
    <script src='<%= System.Configuration.ConfigurationManager.AppSettings["Knockout"] %>'></script>

    <!-- THEN your JS that uses Knockout -->
    <%--    <script src='<%= ResolveUrl(System.Configuration.ConfigurationManager.AppSettings["HR2JsPath"] + "HR2.js") %>'></script>--%>
    <script src='<%= System.Configuration.ConfigurationManager.AppSettings["HR2JsPath"] %>HR.js'></script>






</asp:Content>
