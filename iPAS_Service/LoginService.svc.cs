using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.Text;
using System.Data;
using iPAS_Service_DAL;
using Microsoft.Practices.EnterpriseLibrary.Data;
namespace iPAS_Service
{
    public class LoginService : ILogin
    {
        public RegistrationInfo UserCredential(RegistrationInfo user)
        {
            IDataReader userReader = null;
            RegistrationInfo dto = new RegistrationInfo();
            try
            {
                Database db = DatabaseFactory.CreateDatabase("MyDB");
                if (!string.IsNullOrEmpty(user.UserName))
                {
                    userReader = Login_DAL.CheckLoginCredentials(db, user.UserName);

                    if (userReader.Read())
                    {
                        if (user.Password == userReader["Password"].ToString())
                        {
                            if (userReader["Status"].ToString() == "I")
                            {
                                dto.Success = false;
                                dto.label = "The user has been deleted please contact HR..";
                            }
                            else
                            {
                                dto.Role = userReader["Role"].ToString();
                                dto.Status = userReader["Status"].ToString();
                                dto.RejectedReason = userReader["RejectReason"].ToString();
                                //dto.UserName = userReader["UserName"].ToString();//its okay if not sent now
                                dto.EmpID = Convert.ToInt32(userReader["EmpID"]);
                                dto.Success = true;
                            }

                        }
                        else
                        {
                            dto.Success = false;
                            dto.label = "Invalid Username or Password";
                        }

                    }
                    else
                    {
                        dto.Success = false;
                        dto.label = "The username or the password may be wrong";
                        return dto;
                    }
                    userReader.Close();

                    return dto;
                }
                else
                {
                    dto.Success = false;
                    dto.label = "These fields cannot be empty";
                    return dto;
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
