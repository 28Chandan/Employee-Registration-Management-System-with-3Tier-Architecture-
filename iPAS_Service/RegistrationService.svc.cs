using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.Text;
using System.Data;
using iPAS_Service_DAL;
using Microsoft.Practices.EnterpriseLibrary.Data;
using System.Data.Common;
namespace iPAS_Service
{
    // NOTE: You can use the "Rename" command on the "Refactor" menu to change the class name "RegistrationService" in code, svc and config file together.
    // NOTE: In order to launch WCF Test Client for testing this service, please select RegistrationService.svc or RegistrationService.svc.cs at the Solution Explorer and start debugging.
    public class RegistrationService : IRegistrationService
    {
        //to load all the departments during page load in registration page
        public DepartmentListInfo GetDepartment()
        {
            IDataReader userReader = null;
            try
            {
                DepartmentListInfo departmentListInfo = new DepartmentListInfo();
                DepartmentInfo dtoInfo = null;

                Database db = DatabaseFactory.CreateDatabase("MyDB");

                userReader = Registration_DAL.DepartmentBind(db);

                while (userReader.Read())
                {
                    dtoInfo = new DepartmentInfo();

                    dtoInfo.DeptID = Convert.ToInt32(userReader["DEPTID"]);
                    dtoInfo.DeptName = userReader["DEPT"].ToString();

                    departmentListInfo.DepartmentInfoList.Add(dtoInfo);
                }
                userReader.Close();

                return departmentListInfo;
            }
            catch (Exception ex)
            {
                throw ex;
            }
            finally
            {
                if (userReader != null && !userReader.IsClosed)
                {
                    userReader.Close();
                }

            }
        }


        // register new user if not exist if already exist then retun the message through label...
        public RegistrationInfo InsertNewRegisteredUser(RegistrationInfo newUsers)
        {
            IDataReader userReader = null;
            RegistrationInfo newUser = new RegistrationInfo();
            try
            {
                bool isInserted = false;

                Database db = DatabaseFactory.CreateDatabase("MyDB");




                bool ifUsernameExist = HRDashboard_DAL.CheckIfUserNameExist(db, newUsers.UserName);
               
                if (ifUsernameExist)
                {
                    //the user exist so get its status
                    userReader = Login_DAL.CheckLoginCredentials(db, newUsers.UserName);
                    if (userReader.Read())
                    {
                        if (userReader["Status"].ToString() == "Pending")
                        {
                            newUser.label = "You have already registered, Your Registration is in the pending state wait for HR approval";
                            newUser.Success = false;
                        }
                        else if (userReader["Status"].ToString() == "Reject")
                        {

                            int id = Convert.ToInt32(userReader["empID"]);
                            if (id != 0)
                            {
                                int updateUser = Registration_DAL.RejectedUserReRegister(db, id, "Pending");
                                if (updateUser > 0)
                                {
                                    newUser.label = "Registration successful, wait for HR approval";
                                    newUser.Success = true;
                                }
                            }

                        }
                        else if (userReader["Status"].ToString() == "Accept")
                        {
                            newUser.label = "You have already been approved, just log-in through your credentials";
                            newUser.Success = false;
                        }
                        else if (userReader["Status"].ToString() == "I")
                        {
                            newUser.label = "The username already exist and currently in the inactive state ";
                            newUser.Success = false;
                        }
                    }

                    userReader.Close();
                    return newUser;

                }
                else
                {
                    bool ifEmailIDExist = HRDashboard_DAL.CheckIfEmailIDExist(db, newUsers.EmailID);
                    if (ifEmailIDExist)
                    {

                        newUser.label = "Entered EmailID already Exist";
                        newUser.Success = false;
                        return newUser;
                    }
                    else
                    {

                        if (newUsers.LanguagesList.Count > 0)
                        {
                            using (DbConnection connection = db.CreateConnection())
                            {
                                DbTransaction transaction = null;
                                try
                                {
                                    connection.Open();
                                    transaction = connection.BeginTransaction();
                                    string role = "2";
                                    //for new user
                                    int insertEmpData = Registration_DAL.InsertNewRegisteredUser(db, transaction, newUsers.FirstName, newUsers.LastName, newUsers.EmailID, newUsers.UserName, newUsers.Password, newUsers.Department, newUsers.ResumeUpload, role);
                                    newUsers.EmpID = Registration_DAL.GetEmpID(db, transaction, newUsers.UserName);

                                    isInserted = InsertLanguagesHelper(db, transaction, newUsers);
                                    transaction.Commit();
                                    if (isInserted)
                                    {
                                        newUser.label = "Registration successful, wait for HR approval";
                                    }
                                    newUser.Success = true;

                                }
                                catch
                                {
                                    if (transaction != null)
                                    {
                                        transaction.Rollback();
                                    }
                                    throw;
                                }
                                finally
                                {
                                    if (connection != null)
                                    {
                                        connection.Close();
                                    }
                                }

                            }




                        }
                        else
                        {
                            newUser.label = "Please select atleast one language";
                            newUser.Success = false;
                        }
                        return newUser;
                    }

                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
            finally
            {
                if (userReader != null && !userReader.IsClosed)
                {
                    userReader.Close();
                }

            }
        }

        public static bool InsertLanguagesHelper(Database db, DbTransaction transaction, RegistrationInfo newUsers)
        {
            try
            {
                bool isLangsInserted = false;
                foreach (LanguageInfo lang in newUsers.LanguagesList)
                {
                    isLangsInserted = Registration_DAL.InsertSelectedLanguages(db, transaction, newUsers.EmpID, lang.LangID);
                }
                return isLangsInserted;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public RegistrationInfo BindLanguages()
        {
            IDataReader userReader = null;
            try
            {
                Database db = DatabaseFactory.CreateDatabase("MyDB");
                userReader = Registration_DAL.BindLanguages(db);
                RegistrationInfo langList = new RegistrationInfo();
                LanguageInfo langItem = null;
               
                using (userReader)
                {
                    while (userReader.Read())
                    {
                        langItem = new LanguageInfo();
                        langItem.LangID = Convert.ToInt32(userReader["FLANG_ID"]);
                        langItem.LangName = userReader["FLANG_NAME"].ToString();
                        langList.LanguagesList.Add(langItem);
                        
                    }

                    userReader.Close();
                    return langList;

                }

            }
            catch (Exception ex)
            {
                throw ex;
            }
            finally
            {
                if (userReader != null && !userReader.IsClosed)
                {
                    userReader.Close();
                }
            }




        }


    }
}
