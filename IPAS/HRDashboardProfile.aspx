<%@ Page Title="" Language="C#" MasterPageFile="~/Post_Login.Master" AutoEventWireup="true" CodeBehind="HRDashboardProfile.aspx.cs" Inherits="IPAS.HRDashboardProfile" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder2" runat="server">
    <button id="logOutBtn" type="button" class="logOutBtn" onclick="LogOutBtnClick();"><%= GetGlobalResourceObject("EmployeePage_Resource", "logOut") %></button>
    <button id="darkMode" type="button" class="darkMode" onclick="DarkModeBtnClick();"><%= GetGlobalResourceObject("EmployeePage_Resource", "DarkMode") %></button>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder3" runat="server">



    <style>
        .darkMode {
            font-size: 18px;
            background-color: #14B8A6;
            height: 30px;
            width: 110px;
            display: flex;
            justify-content: center; 
            align-items: center;
            border: 2px solid #0f766e;
            border-radius: 6px;
            margin-right: 25px;
            cursor: pointer;
        }

            .darkMode:hover {
                background-color: dimgray;
                color: white;
                cursor: pointer;
            }

        #actionContainer {
            display: flex;
            justify-content: space-evenly;
            align-items: center;
        }

        .navItem {
            font-size: 15px;
            background-color: #14B8A6;
            height: 30px;
            width: 120px;
            display: flex;
            flex-direction: row;
            align-items: center;
            border: 2px solid #0f766e;
            border-radius: 6px;
            margin-right: 25px;
        }

        .actBtn {
            background-color: #EF4444;
            color: white;
            font-size: 15px;
            height: 30px;
            width: 120px;
            /*display: flex;*/
            justify-content: center;
            align-items: center;
            /*  border: 2px solid black;*/
            border: 2px solid #b91c1c;
            border-radius: 6px;
            margin-right: 25px;
        }

        .logOutBtn {
            margin-left: 720px;
            font-size: 18px;
            background-color: #14B8A6;
            height: 30px;
            width: 110px;
            display: flex;
            justify-content: center;
            align-items: center;
            border: 2px solid #0f766e;
            border-radius: 6px;
            margin-right: 25px;
            cursor: pointer;
        }

            .logOutBtn:hover {
                background-color: dimgray;
                color: white;
                cursor: pointer;
            }

        .logOutAnchor {
            font-size: 20px;
            background-color: #14B8A6;
            height: 30px;
            width: 110px;
            display: flex;
            justify-content: center;
            align-items: center;
            border: 2px solid #0f766e;
            border-radius: 6px;
            margin-right: 25px;
            cursor: pointer;
        }

            .logOutAnchor:hover {
                background-color: dimgray;
                background-color: #374151;
                color: white;
                cursor: pointer;
            }




        .HDDivs {
            height: auto;
            margin-bottom: 10px;
            background-color: beige;
            padding-left: 30px;
            display: flex;
            justify-content: space-around;
            align-items: center;
        }


        .HDDivss {
            height: auto;
            margin-bottom: 10px;
            display: flex;
            background-color: beige;
        }

        #deptOverView {
            height: auto;
            margin-bottom: 10px;
            background-color: beige;
            padding-left: 600px;
            flex-direction: column;
            justify-content: center;
        }

        #HRDashboard {
            height: 200px;
        }

        #ARButton {
            background-color: green;
        }

        #pending {
            display: flex;
            flex-direction: column;
        }

        #approved {
            display: flex;
            flex-direction: column;
        }

        #allInOne {
            display: flex;
            flex-direction: column;
        }

        #rejected {
            display: flex;
            flex-direction: column;
        }

        #departments {
            display: flex;
            flex-direction: column;
        }

        #HRCount {
            display: flex;
            flex-direction: column;
        }

        #addDivContainer {
            display: flex;
            flex-direction: row;
        }

        #HRDashboardContainer {
            display: flex;
            flex-direction: row;
        }

        .countDivs {
            border: 2px solid black;
            margin-right: 80px;
            height: 100px;
            width: 150px;
            border-radius: 10px;
            background-color: pink;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .labels {
            Height: 50px;
            Width: 50px;
            border: 2px solid black;
            color: white;
            font-size: 25px;
            font-weight: bolder;
            background-color: black;
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 10px;
        }

        .HRBtn {
            margin-left: 74px;
        }

        .centered-grid {
            margin: 0 auto;
        }

            .centered-grid td,
            .centered-grid th {
                text-align: center;
            }

        #GridView1 {
            margin-left: 50px;
        }

        #GridView2 {
            margin-left: 50px;
        }

        input[type="submit"] {
            cursor: pointer;
        }

        button {
            cursor: pointer;
        }

        #addDivContainer {
            margin-bottom: 20px;
        }

        #noRecords {
            text-align: center;
            font-weight: bolder;
            font-size: 30px;
        }

        .navButtons:disabled{
            cursor: not-allowed;
        }
    </style>
    <div id="HRContainer">
        <h1 style="padding-left: 600px"><%= GetGlobalResourceObject("HRPage_Resource", "HRPageHeading") %></h1>


        <div id="HRDashboard" class="HDDivs">

            <div id="HRDashboardContainer">
                <div style="display: flex; flex-direction: column;">
                    <h4 style="margin-left: 70px; margin-bottom: 0px;"><%= GetGlobalResourceObject("HRPage_Resource", "TotalEmpCount") %></h4>
                    <div id="totalEmpCount" class="countDivs">

                        <label id="totalCountLbl" class="labels" data-bind="text:remaingTotalEmpCount "></label>
                    </div>
                </div>

                <div style="display: flex; flex-direction: column;">
                    <h4 style="margin-left: 0px; margin-bottom: 0px;"><%= GetGlobalResourceObject("HRPage_Resource", "TotalAcceptedEmpCount") %></h4>
                    <div id="totalAcceptedEmpCount" class="countDivs">

                        <label id="totalAcceptedEmpCountLbl" class="labels" data-bind="text:remaingAcceptedEmpCount "></label>
                    </div>
                </div>


                <div style="display: flex; flex-direction: column;">
                    <h4 style="margin-left: 0px; margin-bottom: 0px;"><%= GetGlobalResourceObject("HRPage_Resource", "TotalRejectedEmpCount") %></h4>
                    <div id="totalRejectedEmpCount" class="countDivs">

                        <label id="totalRejectedEmpCountLbl" class="labels" data-bind="text:remaingRejectedEmpCount "></label>
                    </div>
                </div>

                <div style="display: flex; flex-direction: column;">
                    <h4 style="margin-left: 0px; margin-bottom: 0px;"><%= GetGlobalResourceObject("HRPage_Resource", "TotalPendingEmpCount") %></h4>
                    <div id="totalPendingEmpCount" class="countDivs">

                        <label id="totalPendingEmpCountLbl" class="labels" data-bind="text:remaingPendingEmpCount "></label>
                    </div>
                </div>

                <div style="display: flex; flex-direction: column;">
                    <h4 style="margin-left: 0px; margin-bottom: 0px;"><%= GetGlobalResourceObject("HRPage_Resource", "TotalDeptCount") %></h4>
                    <div id="totalDeptCount" class="countDivs">

                        <label id="totalDeptCountLbl" class="labels" data-bind="text:remaingDeptCount"></label>
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

        <div id="actionContainer">
            <button type="button" id="totalBtn" class="navItem" style="width: 100px; height: 40px; margin-left: 150px;" data-bind="click: TotalBtnView"><%= GetGlobalResourceObject("HRPage_Resource", "TotalBtn") %></button>
            <button type="button" id="pendingBtn" class="navItem" style="width: 100px; height: 40px; margin-left: 150px;" data-bind="click: PendingBtnView"><%= GetGlobalResourceObject("HRPage_Resource", "PendingBtn") %></button>
            <button type="button" id="rejectBtn" class="navItem" style="width: 100px; height: 40px; margin-left: 150px;" data-bind="click: RejectBtnView"><%= GetGlobalResourceObject("HRPage_Resource", "RejectedBtn") %></button>
            <button type="button" id="acceptBtn" class="navItem" style="width: 100px; height: 40px; margin-left: 150px;" data-bind="click: AcceptBtnView"><%= GetGlobalResourceObject("HRPage_Resource", "AcceptedBtn") %></button>
            <button type="button" id="deptBtn" class="navItem" style="width: 100px; height: 40px; margin-left: 150px;" data-bind="click: deptBtn"><%= GetGlobalResourceObject("HRPage_Resource", "DepartmentBtn") %></button>
            <button type="button" id="hrBtn" class="navItem" style="width: 100px; height: 40px; margin-left: 100px;" data-bind="click: HRBtnClick"><%= GetGlobalResourceObject("HRPage_Resource", "HRBtn") %></button>
        </div>
        <label id="statusLabel"> </label>

        <div id="pending" class="HDDivss">
            <%--  <h1>List of Pending Employees</h1>--%>
            <br />
            <br />

            <table id="employeeTble" border="1">
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
                        <%--<td data-bind="text: EmpID"></td>--%>
                        <td data-bind="text: UserName"></td>
                        <td data-bind="text: FirstName"></td>
                        <td data-bind="text: LastName"></td>
                        <td data-bind="text: EmailID"></td>
                        <td data-bind="text: Department"></td>
                        <td data-bind="text: ResumeUpload"></td>
                        <td data-bind="text: Status"></td>
                        <td>
                           <%-- ,visible: $parent.deptBtnVisibility() && (Status==='Reject' || Status==='Pending')"
                               , visible: $parent.deptBtnVisibility() && (Status==='Accept' || Status==='Pending')
                            --%>
                            <button  class="acceptButton" type="button" style="background-color: green; color: white;" data-bind="click: AcceptBtnClick,visible: $parent.deptBtnVisibility() && (Status==='Reject' || Status==='Pending')"><%= GetGlobalResourceObject("HRPage_Resource", "AcceptBtn") %></button>
                            <button  class="rejectButton" type="button" style="background-color: red; color: white;" data-bind="click: RejectBtnClick, visible: $parent.deptBtnVisibility() && (Status==='Accept' || Status==='Pending') "><%= GetGlobalResourceObject("HRPage_Resource", "RejectBtn") %></button>
                            <button class="deleteButton" type="button" data-bind="click: deleteSelectedEmployeeBtnClick">
                                <img src="Images/delete.png" alt="Delete" style="width: 16px; height: 16px; vertical-align: middle;"></button>
                            <button class="viewBtn" type="button" data-bind="click: viewSelectedEmployeeBtnClick">
                                <img src="Images/view.png" alt="Delete" style="width: 16px; height: 16px; vertical-align: middle;"></button>

                        </td>
                    </tr>
                </tbody>
            </table>
            <div id="noRecords">
              
            </div> 

            <div id="paggingBtn">
               <button id="nextBtn" class="navButtons"  type="button" style="height:30px;  width:100px;" data-bind="click:nextBtnClick"> 
                  <%= GetGlobalResourceObject("HRPage_Resource", "NextBtn") %> Next
               </button>
                <button id="prevBtn" class="navButtons" type="button" style="height:30px; width:100px" data-bind="click:prevBtnClick"> 
                   <%= GetGlobalResourceObject("HRPage_Resource", "PrevBtn") %>
               </button>
            </div>
       
         </div>


        <%--  dept table overview--%>
        <div id="deptContainer">
            <h1 style="text-align: center"><%= GetGlobalResourceObject("HRPage_Resource", "TotDeptHeading") %> </h1>
        <div id="deptOverView">
        
            <br />
            <br />

            <div id="addDivContainer">
                <input type="text" id="addNewDeptTxt" data-bind="value: deptTextBox" />
                <button type="button" id="submitNewDeptBtn" onclick="addDeptBtnClick();"><%= GetGlobalResourceObject("HRPage_Resource", "AddBtn") %></button>
                <label id="addNewDeptLbl"></label>
            </div>
            <table id="deptTbl" border="1">

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
        </div>
</div>



        <div id="hrContainer">
        <%--  HR table overview--%>
        <h1 style="text-align: center"><%= GetGlobalResourceObject("HRPage_Resource", "HRHeading") %></h1>
        <div id="HRCount" class="HDDivs">

            <br />
            <br />


            <div id="addHRContainer" class="addDivContainerClass">
                <label><%= GetGlobalResourceObject("HRPage_Resource", "UserName") %> </label>
                <input type="text" id="addNewHRTxt" class="addNewDeptTxtClass" data-bind="value: hrTextBox" />
                <br />
                <label><%= GetGlobalResourceObject("HRPage_Resource", "Password") %> </label>
                <input type="password" id="addNewHRPassword" class="addNewDeptTxtClass" data-bind="value: hrPasswordTextBox"  />
                <button type="button" id="addNewHRBtn" class="submitNewDeptBtnClass" data-bind="click: AddNewHRBtnClick"><%= GetGlobalResourceObject("HRPage_Resource", "AddBtn") %></button>
                <br />
                <label id="addNewHRLbl" class="addNewDeptLblClass"></label>
            </div>
            <br />
            <table id="hrTbl" border="1">
                <thead>
                    <tr>
                        <%--<th><%= GetGlobalResourceObject("HRPage_Resource", "HRIDHeading") %></th>--%>
                        <th><%= GetGlobalResourceObject("HRPage_Resource", "HRNameHeading") %></th>
                        <th><%= GetGlobalResourceObject("HRPage_Resource", "DeleteBtn") %></th>

                    </tr>
                </thead>
                <tbody data-bind="foreach: getTotalHR">
                    <tr>
                        <%--<td data-bind="text: EmpID"></td>--%>
                        <td data-bind="text: UserName"></td>
                        <td>
                            <button type="button" data-bind="click: DeleteHRBtnClick">
                                <img src="Images/delete.png" alt="Delete" style="width: 16px; height: 16px; vertical-align: middle;"></button>

                        </td>
                    </tr>
                </tbody>
            </table>


            <br />
            <br />

        </div>

            </div>
    </div>
    <!-- Load jQuery first -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>

    <!-- THEN load Knockout -->
    <script src='<%= System.Configuration.ConfigurationManager.AppSettings["Knockout"] %>'></script>

    <!-- THEN your JS that uses Knockout -->
    <%--    <script src='<%= ResolveUrl(System.Configuration.ConfigurationManager.AppSettings["HR2JsPath"] + "HR2.js") %>'></script>--%>
    <script src='<%= System.Configuration.ConfigurationManager.AppSettings["HR2JsPath"] %>HR2.js'></script>








</asp:Content>
