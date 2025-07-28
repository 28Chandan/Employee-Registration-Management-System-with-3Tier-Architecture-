using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.Text;
using iPAS_Service_DAL;
using System.Data;
using System.Data.Common;
using Microsoft.Practices.EnterpriseLibrary.Data;
namespace iPAS_Service
{
    // NOTE: You can use the "Rename" command on the "Refactor" menu to change the class name "HRDashboardService" in code, svc and config file together.
    // NOTE: In order to launch WCF Test Client for testing this service, please select HRDashboardService.svc or HRDashboardService.svc.cs at the Solution Explorer and start debugging.
    public class HRDashboardService : IHRDashboardService
    {


        //here i have created the method that retrives the data from seperate HR_DAL 
        public CountInfo GetCountInfo()
        {
            IDataReader dataReader = null;
            try
            {
                //here sir asked to add the group by clause, i mean i can use either group by or datatable

                Database db = DatabaseFactory.CreateDatabase("MyDB");
                CountInfo TotalCountInfo = new CountInfo();
                string role = "2";

                dataReader = HRDashboard_DAL.GetTotalStatusCount(db, role);
                while (dataReader.Read())
                {
                    string status = dataReader["STATUS"].ToString();
                    if (status == "Accept")
                    {
                        TotalCountInfo.AcceptedCount = Convert.ToInt32(dataReader["Count"]);
                    }
                    else if (status == "Reject")
                    {
                        TotalCountInfo.RejectedCount = Convert.ToInt32(dataReader["Count"]);
                    }
                    else if (status == "Pending")
                    {
                        TotalCountInfo.PendingCount = Convert.ToInt32(dataReader["Count"]);
                    }
                }
                dataReader.Close();


                TotalCountInfo.TotalCount = TotalCountInfo.AcceptedCount + TotalCountInfo.RejectedCount + TotalCountInfo.PendingCount;
                TotalCountInfo.DeptCount = HRDashboard_DAL.GetDepartmentCount(db, null);
                dataReader = HRDashboard_DAL.GetTotalHRCount(db, "1");
                int hrCount = 0;
                while (dataReader.Read())
                {
                    hrCount = Convert.ToInt32(dataReader[0]);
                }
                TotalCountInfo.HRCount = hrCount;


                return TotalCountInfo;
            }
            catch (Exception ex)
            {
                throw ex;
            }
            finally
            {
                if (dataReader != null && !dataReader.IsClosed)
                {
                    dataReader.Close();
                }
            }
        }

        public bool TotDeptCountInfo(DepartmentInfo dept)
        {
            try
            {
                if (string.IsNullOrEmpty(dept.DeptName))
                {
                    return false;
                }
                Database db = DatabaseFactory.CreateDatabase("MyDB");
                int count = HRDashboard_DAL.GetDepartmentCount(db, dept.DeptName);
                return (count > 0) ? false : HRDashboard_DAL.InsertNewDept(db, dept.DeptName);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }



        public RegistrationInfoClass GetEmployeeDetails(RegistrationInfo employeeDetails)
        {
            IDataReader employeeReader = null;
            try
            {
                Database db = DatabaseFactory.CreateDatabase("MyDB");
                RegistrationInfoClass dtoInfo = new RegistrationInfoClass();
                RegistrationInfo regInfo = null;
                if (employeeDetails.PageSize == 0)
                     {

                    dtoInfo.isEmpDetailsLoaded = false;
                    return dtoInfo;
                }
                else
                    {
                    string role = "2";
                    dtoInfo.isEmpDetailsLoaded = true;
                    if (employeeDetails.isTotal)
                    {

                        employeeReader = HRDashboard_DAL.GetEmployeeByStatus(db, null, role, employeeDetails.PageSize, employeeDetails.OffsetValue, 0);

                    }
                    else if (employeeDetails.isAccept)
                    {

                        employeeReader = HRDashboard_DAL.GetEmployeeByStatus(db, "Accept", role, employeeDetails.PageSize, employeeDetails.OffsetValue, 0);
                    }
                    else if (employeeDetails.isPending)
                    {

                        employeeReader = HRDashboard_DAL.GetEmployeeByStatus(db, "Pending", role, employeeDetails.PageSize, employeeDetails.OffsetValue, 0);
                    }
                    else if (employeeDetails.isReject)
                    {

                        employeeReader = HRDashboard_DAL.GetEmployeeByStatus(db, "Reject", role, employeeDetails.PageSize, employeeDetails.OffsetValue, 0);
                    }
                    else
                    {
                        dtoInfo.isEmpDetailsLoaded = false;
                        return dtoInfo;
                    }

                }


                while (employeeReader.Read())
                {
                    regInfo = new RegistrationInfo();
                    regInfo.EmpID = Convert.ToInt32(employeeReader["empID"]);
                    regInfo.UserName = employeeReader["Username"].ToString();
                    regInfo.FirstName = employeeReader["FirstName"].ToString();
                    regInfo.LastName = employeeReader["LastName"].ToString();
                    regInfo.EmailID = employeeReader["EmailId"].ToString();
                    regInfo.Department = employeeReader["Department"].ToString();
                    regInfo.ResumeUpload = employeeReader["ResumePath"].ToString();
                    regInfo.Status = employeeReader["Status"].ToString();
                    regInfo.RejectedReason = employeeReader["RejectReason"].ToString();
                    regInfo.Role = employeeReader["Role"].ToString();
                    dtoInfo.RegistrationInfoList.Add(regInfo);
                }



                employeeReader.Close();
                return dtoInfo;

            }

            catch (Exception ex)
            {
                throw ex;
            }
            finally
            {
                if (employeeReader != null && !employeeReader.IsClosed)
                {
                    employeeReader.Close();
                }
            }

        }

        //public bool AcceptPendingEmployeeSVC(int empID, string status)
        //{
        //    try
        //    {//here he asked me to make the object and send it as isAccept or isReject and likewise
        //        Database db = DatabaseFactory.CreateDatabase("MyDB");
        //        if (empID!=0 && !string.IsNullOrEmpty(status))
        //        {
        //            int isUpdated = Registration_DAL.RejectedUserReRegister(db, empID, status);
        //            return (isUpdated > 0) ? true : false;
        //        }
        //        else
        //        {
        //            return false;
        //        }

        //    }
        //    catch(Exception ex)
        //    {
        //        throw ex;
        //    }
        //}







        //this is to delete the employee or the department based on HR preference
        public bool DeleteEmpOrDept(int empID, int deptID)
        {
            try
            {
                Database db = DatabaseFactory.CreateDatabase("MyDB");

                if (empID == 0)
                {
                    int isDeptDeleted = HRDashboard_DAL.DeleteDept(db, deptID);
                    return (isDeptDeleted > 0) ? true : false;
                }
                else
                {
                    DbConnection connection = db.CreateConnection();
                    connection.Open();
                    DbTransaction transaction = connection.BeginTransaction();
                    try
                    {
                        bool isEmpDeleted = false;
                        bool islangDeleted = false;
                        string status = "I";
                        isEmpDeleted = HRDashboard_DAL.DeleteEmp(db, transaction, empID, status);
                        islangDeleted = Employee_DAL.DeleteSelectedLang(db, transaction, empID, status);
                        if (isEmpDeleted && islangDeleted)
                        {
                            transaction.Commit();
                            return true;
                        }
                        else
                        {
                            transaction.Rollback();
                            return false;
                        }


                    }
                    catch
                    {
                        transaction.Rollback();
                        throw;
                    }
                    finally
                    {
                        connection.Close();
                    }
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }


        }




        public bool AcceptRejectEmpl(RegistrationInfo emp)
        {

            try
            {
                Database db = DatabaseFactory.CreateDatabase("MyDB");

                if (emp.isAccept)
                {
                    Registration_DAL.RejectedUserReRegister(db, emp.EmpID, "Accept");
                    return true;
                }
                else if (emp.isReject)
                {
                    Registration_DAL.RejectedUserReRegister(db, emp.EmpID, "Reject");
                    return true;
                }
                else
                {
                    return false;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }



        public ErrorInfo AddNewHR(string userName, string password)
        {
            IDataReader ifHRExistGetStatus = null;
            try
            {

                Database db = DatabaseFactory.CreateDatabase("MyDB");
                ErrorInfo errorInfo = new ErrorInfo();
                if (!string.IsNullOrEmpty(userName) && !string.IsNullOrEmpty(password))
                {
                    RegistrationInfo regInfo = new RegistrationInfo();
                    bool ifHRExists = HRDashboard_DAL.CheckIfUserNameExist(db, userName);
                    if (ifHRExists)
                    {
                        //if hr exist then check his status whether he is inactive or active 
                        ifHRExistGetStatus = Login_DAL.CheckLoginCredentials(db, userName);
                        if (ifHRExistGetStatus.Read())
                        {
                            string status = ifHRExistGetStatus["Status"].ToString();
                            if (status == "I")
                            {
                                errorInfo.ErrorCode = 1;
                                errorInfo.ErrorMessage = "Entered HR already exists and is in inactive state";
                            }
                            else
                            {
                                errorInfo.ErrorCode = 1;
                                errorInfo.ErrorMessage = "Entered HR already exists";
                            }
                        }

                    }
                    else
                    {
                        string role = "1";
                        string status = "A";
                        bool addNewHR = HRDashboard_DAL.AddNewHR(db, userName, password, role, status);
                        if (!addNewHR)
                        {
                            errorInfo.ErrorCode = 1;
                            errorInfo.ErrorMessage = "Something went wrong";
                        }
                    }

                    return errorInfo;
                }
                else
                {

                    errorInfo.ErrorCode = 1;
                    errorInfo.ErrorMessage = "userName or the Password cannot be empty";
                    return errorInfo;
                }

            }
            catch (Exception ex)
            {
                throw ex;
            }
            finally
            {
                if(ifHRExistGetStatus!=null && !ifHRExistGetStatus.IsClosed)
                {
                    ifHRExistGetStatus.Close();
                }
            }
        }




        public RegistrationInfoClass GetALLHRDetails()
        {
            IDataReader hrReader = null;
            try
            {
                Database db = DatabaseFactory.CreateDatabase("MyDB");
                string role = "1";
                hrReader = HRDashboard_DAL.GetAllHRDetail(db, role);
                RegistrationInfoClass hrDetails = new RegistrationInfoClass();
                RegistrationInfo hrInfo = null;
                while (hrReader.Read())
                {
                    hrInfo = new RegistrationInfo();

                    hrInfo.EmpID = Convert.ToInt32(hrReader["EmpID"]);
                    hrInfo.UserName = hrReader["UserName"].ToString();
                    hrInfo.Role = hrReader["Role"].ToString();
                    hrDetails.RegistrationInfoList.Add(hrInfo);
                }
                hrReader.Close();
                return hrDetails;
            }
            catch (Exception ex)
            {
                throw ex;
            }
            finally
            {
                if (hrReader != null && !hrReader.IsClosed)
                {
                    hrReader.Close();
                }
            }
        }





        public bool DeleteHR(int empID)
        {
            try
            {
                Database db = DatabaseFactory.CreateDatabase("MyDB");
                bool isHRDeleted = HRDashboard_DAL.DeleteHR(db, empID);
                return (isHRDeleted) ? true : false;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }

}

