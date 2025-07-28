using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data;
using System.Data.Common;
using Microsoft.Practices.EnterpriseLibrary.Data;
namespace iPAS_Service_DAL
{
    public class HRDashboard_DAL
    {

        // this will give the CountInfo of all the dept ,,,, as well as i am checking if the dept already exist or not... based on this
        public static int GetDepartmentCount(Database db, string deptName)
        {
           
            StringBuilder sqlCmdBuilder = new StringBuilder();
            sqlCmdBuilder.Append("SELECT COUNT(*) FROM DEPARTMENT WHERE DEPTID>0 ");
            if (!string.IsNullOrEmpty(deptName))
            {
                sqlCmdBuilder.Append("AND DEPT = @DEPT");
            }
            DbCommand dbCmd = db.GetSqlStringCommand(sqlCmdBuilder.ToString());
            if (!string.IsNullOrEmpty(deptName))
            {
                db.AddInParameter(dbCmd, "@DEPT", DbType.AnsiString, deptName);
            }

            //bool isExist = false;
            //DataTable deptCount = db.ExecuteDataSet(dbCmd).Tables[0];
            //if(deptCount.Rows.Count>0 & Convert.ToInt32(deptCount.Rows[0][0]) > 0)
            //{
            //    isExist = true;
            //}
            //return isExist;
         return Convert.ToInt32(db.ExecuteScalar(dbCmd));
        }
        


        public static IDataReader GetTotalStatusCount(Database db, string role)
        {
            StringBuilder sqlCmdBuilder = new StringBuilder();
            sqlCmdBuilder.Append("SELECT STATUS , COUNT(*) AS COUNT FROM EMPLOYEES2 WHERE ROLE =@ROLE AND STATUS!='I'AND STATUS!='A' GROUP BY STATUS");
            DbCommand dbcmd = db.GetSqlStringCommand(sqlCmdBuilder.ToString());
            db.AddInParameter(dbcmd, "@ROLE", DbType.AnsiString, role);
            return db.ExecuteReader(dbcmd);
        }


        public static bool InsertNewDept(Database db,string deptName)
        {
            StringBuilder sqlCmdBuilder = new StringBuilder();
            sqlCmdBuilder.Append("INSERT INTO DEPARTMENT(DEPT) VALUES (@DEPTNAME)");
            DbCommand dbcmd = db.GetSqlStringCommand(sqlCmdBuilder.ToString());
            db.AddInParameter(dbcmd, "DEPTNAME", DbType.AnsiString, deptName);
            db.ExecuteNonQuery(dbcmd);
            return true;
        }

        //this is to delete the employee or the department based on HR preference
        public static bool DeleteEmp(Database db, DbTransaction transaction, int empID, string status)
        {

            StringBuilder sqlCmdBuilder = new StringBuilder();
            sqlCmdBuilder.Append("UPDATE EMPLOYEES2 SET STATUS = @STATUS WHERE EMPID=@EMPID");
            DbCommand dbCmd = db.GetSqlStringCommand(sqlCmdBuilder.ToString());
            db.AddInParameter(dbCmd, "@STATUS", DbType.AnsiString, status);
            db.AddInParameter(dbCmd, "@EMPID", DbType.Int32, empID);
            db.ExecuteNonQuery(dbCmd,transaction);
            return true;
        }



        public static int DeleteDept(Database db, int deptID)
        {
            StringBuilder sqlCmdBuilder = new StringBuilder();
            sqlCmdBuilder.Append("DELETE FROM DEPARTMENT WHERE DEPTID=@DEPTID");
            DbCommand dbCmd = db.GetSqlStringCommand(sqlCmdBuilder.ToString());
            db.AddInParameter(dbCmd, "@DEPTID", DbType.Int32, deptID);
            return db.ExecuteNonQuery(dbCmd);
        }


        // to check if the newly registered user already exist or not
        public static bool CheckIfUserNameExist(Database db, string userName)
        {
            //StringBuilder sqlCmdBuilder = new StringBuilder();
            //sqlCmdBuilder.Append("DELETE FROM DEPARTMENT WHERE DEPTID=@DEPTID");
            DbCommand dbCmd = db.GetSqlStringCommand("SELECT COUNT(USERNAME) FROM EMPLOYEES2 WHERE USERNAME=@USERNAME");
            db.AddInParameter(dbCmd, "@USERNAME", DbType.AnsiString, userName);
            bool isExist = false;
            DataTable usernameExist = db.ExecuteDataSet(dbCmd).Tables[0];
            if (usernameExist.Rows.Count>0 && Convert.ToInt32(usernameExist.Rows[0][0])>0)
            {
                isExist = true;
            }
            return isExist;
        //return Convert.ToInt32(db.ExecuteScalar(dbCmd));

        }
        // to check if the newly registered user already exist or not
        public static bool CheckIfEmailIDExist(Database db, string emailID)
        {
            //StringBuilder sqlCmdBuilder = new StringBuilder();
            //sqlCmdBuilder.Append("DELETE FROM DEPARTMENT WHERE DEPTID=@DEPTID");
            DbCommand dbCmd = db.GetSqlStringCommand("SELECT COUNT(EMAILID) FROM EMPLOYEES2 WHERE EMAILID=@EMAILID AND STATUS!='A'");
            db.AddInParameter(dbCmd, "@EMAILID", DbType.AnsiString, emailID);
            bool isExist = false;
            DataTable emailExist = db.ExecuteDataSet(dbCmd).Tables[0];
            if (emailExist.Rows.Count > 0 && Convert.ToInt32(emailExist.Rows[0][0]) > 0)
            {
                isExist = true;
            }
            return isExist;

            //return Convert.ToInt32(db.ExecuteScalar(dbCmd));

        }



        // to add new HR
        public static bool AddNewHR(Database db, string userName, string password, string role,string status)
        {
            StringBuilder sqlCmdBuilder = new StringBuilder();
            sqlCmdBuilder.Append("INSERT INTO EMPLOYEES2 (USERNAME, PASSWORD, ROLE,STATUS) VALUES (@USERNAME , @PASSWORD, @ROLE,@STATUS)");
            DbCommand dbCmd = db.GetSqlStringCommand(sqlCmdBuilder.ToString());
            db.AddInParameter(dbCmd, "@USERNAME", DbType.AnsiString, userName);
            db.AddInParameter(dbCmd, "@PASSWORD", DbType.AnsiString, password);
            db.AddInParameter(dbCmd, "@ROLE", DbType.AnsiString, role);
            db.AddInParameter(dbCmd, "@STATUS", DbType.AnsiString, status);
            db.ExecuteNonQuery(dbCmd);
            return true;
        }

        // hr ka toggle btn for accept reject and pending, as well as to bind the employee data at the employee page

        public static IDataReader GetEmployeeByStatus(Database db, string status, string role, int pageSize, int offsetValue, int empID)
        {
            StringBuilder sqlCmdBuilder = new StringBuilder();
            sqlCmdBuilder.Append("SELECT * FROM EMPLOYEES2 WHERE STATUS<>'I'  ");
            if (!string.IsNullOrEmpty(status))
            {
                sqlCmdBuilder.Append("AND STATUS = @STATUS  ");
            }
            if (!string.IsNullOrEmpty(role))
            {
                sqlCmdBuilder.Append("AND ROLE= @ROLE ");
            }
            if (empID != 0)
            {
                sqlCmdBuilder.Append("AND EMPID=@EMPID");
            }

            if (pageSize != 0)
            {
                sqlCmdBuilder.Append("LIMIT @LIMIT OFFSET @OFFSET");
            } 
          
            DbCommand dbCmd = db.GetSqlStringCommand(sqlCmdBuilder.ToString());
            if (!string.IsNullOrEmpty(status))
            {
                db.AddInParameter(dbCmd, "@STATUS", DbType.AnsiString, status);
            }
            if (!string.IsNullOrEmpty(role))
            {

                db.AddInParameter(dbCmd, "@ROLE", DbType.AnsiString, role);
            }
            if (empID != 0)
            {
                db.AddInParameter(dbCmd, "@EMPID", DbType.Int32, empID);
            }
            if (pageSize != 0)
            {
                db.AddInParameter(dbCmd, "@LIMIT", DbType.Int32, pageSize);
                db.AddInParameter(dbCmd, "@OFFSET", DbType.Int32, offsetValue);

            }

            return db.ExecuteReader(dbCmd);
        }




        //to get the total HR Count
        public static IDataReader GetTotalHRCount(Database db, string role)
        {
            StringBuilder sqlCmdBuilder = new StringBuilder();
            sqlCmdBuilder.Append("SELECT COUNT(USERNAME) FROM EMPLOYEES2 WHERE STATUS='A' AND ROLE=@ROLE ");
            DbCommand dbCmd = db.GetSqlStringCommand(sqlCmdBuilder.ToString());
            db.AddInParameter(dbCmd, "@ROLE", DbType.AnsiString, role);
            return db.ExecuteReader(dbCmd);
        }



        //to get only the HR data for HR binding

        public static IDataReader GetAllHRDetail(Database db, string role)
        {
            StringBuilder sqlCmdBuilder = new StringBuilder();
            sqlCmdBuilder.Append("SELECT USERNAME, EMPID, ROLE FROM EMPLOYEES2 WHERE ROLE=@ROLE AND STATUS='A' ");
            DbCommand dbCmd = db.GetSqlStringCommand(sqlCmdBuilder.ToString());
            db.AddInParameter(dbCmd, "@ROLE", DbType.AnsiString, role);
            return db.ExecuteReader(dbCmd);
        }

        //to delete the specific HR
        public static bool DeleteHR(Database db, int empID)
        {
            StringBuilder sqlCmdBuilder = new StringBuilder();
            sqlCmdBuilder.Append("UPDATE EMPLOYEES2 SET STATUS='I' WHERE EMPID=@EMPID ");
            DbCommand dbCmd = db.GetSqlStringCommand(sqlCmdBuilder.ToString());
            db.AddInParameter(dbCmd, "@EMPID", DbType.Int32, empID);
            db.ExecuteNonQuery(dbCmd);
            return true;
        }

    }
}
