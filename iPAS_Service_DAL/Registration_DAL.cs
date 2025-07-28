using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Practices.EnterpriseLibrary.Data;
using Microsoft.Practices.EnterpriseLibrary.Common;
using System.Data;
using System.Data.Common;
namespace iPAS_Service_DAL
{
    public class Registration_DAL
    {
        //here i have binded the dept in page load 
        //as well as to load all the dept in hr page 
        // for both i have used the same asmx
        public static IDataReader DepartmentBind(Database db)
        {
            StringBuilder sqlCmdBuilder = new StringBuilder();
            sqlCmdBuilder.Append("SELECT DEPTID, DEPT FROM DEPARTMENT  WHERE DEPTID>0 ");
           
            DbCommand dbCmd = db.GetSqlStringCommand(sqlCmdBuilder.ToString());
            return db.ExecuteReader(dbCmd);
        }



        //here i have registered new user
        public static int InsertNewRegisteredUser(Database db, DbTransaction transaction, string firstName, string lastName, string emailID, string userName, string password, string dept, string resumepath, string role)
        {
            StringBuilder sqlCmdBuilder = new StringBuilder();
            sqlCmdBuilder.Append("INSERT INTO EMPLOYEES2 ");
            sqlCmdBuilder.Append("(FIRSTNAME, LASTNAME, EMAILID, USERNAME, PASSWORD, DEPARTMENT,RESUMEPATH, STATUS, ROLE) ");
            sqlCmdBuilder.Append("VALUES (@FIRSTNAME, @LASTNAME, @EMAILID, @USERNAME, @PASSWORD, @DEPARTMENT, @RESUMEPATH, @STATUS, @ROLE)");
            DbCommand dbCmd = db.GetSqlStringCommand(sqlCmdBuilder.ToString());
            db.AddInParameter(dbCmd, "@FIRSTNAME", DbType.AnsiString, firstName);
            db.AddInParameter(dbCmd, "@LASTNAME", DbType.AnsiString, lastName);
            db.AddInParameter(dbCmd, "@EMAILID", DbType.AnsiString, emailID);
            db.AddInParameter(dbCmd, "@USERNAME", DbType.AnsiString, userName);
            db.AddInParameter(dbCmd, "@PASSWORD", DbType.AnsiString, password);
            db.AddInParameter(dbCmd, "@DEPARTMENT", DbType.AnsiString, dept);
            db.AddInParameter(dbCmd, "@RESUMEPATH", DbType.AnsiString, resumepath);
            db.AddInParameter(dbCmd, "@STATUS", DbType.AnsiString, "Pending");
            db.AddInParameter(dbCmd, "@ROLE", DbType.AnsiString, role);
            return db.ExecuteNonQuery(dbCmd, transaction);

        }

        //when hr type accept or reject btn , as well as if the rejected user re register
        public static int RejectedUserReRegister(Database db, int empID, string status)
        {
            StringBuilder sqlCmdBuilder = new StringBuilder();
            sqlCmdBuilder.Append("UPDATE EMPLOYEES2 SET STATUS = @STATUS WHERE EMPID = @EMPID  ");
            DbCommand dbCmd = db.GetSqlStringCommand(sqlCmdBuilder.ToString());
            db.AddInParameter(dbCmd, "@EMPID", DbType.AnsiString, empID);
            db.AddInParameter(dbCmd, "@STATUS", DbType.AnsiString, status);
            return db.ExecuteNonQuery(dbCmd);

        }


        public static IDataReader BindLanguages(Database db)
        {

            StringBuilder sqlCmdBuilder = new StringBuilder();
            sqlCmdBuilder.Append("SELECT FLANG_ID, FLANG_NAME FROM LDB1_LANGUAGES  ");
            DbCommand dbCmd = db.GetSqlStringCommand(sqlCmdBuilder.ToString());
            return db.ExecuteReader(dbCmd);
        }



        public static bool InsertSelectedLanguages(Database db, DbTransaction transaction, int empID, int LangID)
        {
            StringBuilder sqlCmdBuilder = new StringBuilder();
            sqlCmdBuilder.Append("INSERT INTO LDB1_MULTI_LANGUAGES ");
            sqlCmdBuilder.Append("(FEMP_ID, FLANG_ID) ");
            sqlCmdBuilder.Append("VALUES (@EMPID, @LANGID)");

            DbCommand dbCmd = db.GetSqlStringCommand(sqlCmdBuilder.ToString());
            //dbCmd.CommandType = CommandType.Text;

            db.AddInParameter(dbCmd, "@EMPID", DbType.Int32, empID);
            db.AddInParameter(dbCmd, "@LANGID", DbType.Int32, LangID);

            db.ExecuteNonQuery(dbCmd, transaction);
            return true;
        }


        // this is to get the employee id for registering
        public static int GetEmpID(Database db, DbTransaction transaction, string userName)
        {
            StringBuilder sqlCmdBuilder = new StringBuilder();
            sqlCmdBuilder.Append("SELECT EMPID FROM EMPLOYEES2 WHERE USERNAME=@USERNAME  ");
            DbCommand dbCmd = db.GetSqlStringCommand(sqlCmdBuilder.ToString());
            db.AddInParameter(dbCmd, "@USERNAME", DbType.AnsiString, userName);
            return (int)db.ExecuteScalar(dbCmd,transaction);

        }


    }
}
