import React, { useContext, useEffect, useState } from "react";

// import { CircularProgressWithLabel } from './progressBar'

import "./First.css";
import AttendanceCard from "./AttendanceCard.jsx";
import Add from "./Add_attendance.jsx";

// import Update_Attendance from "./Update_Attendance";
import { IdContext } from "../../context/IdContext.jsx";
import ClipLoader from "react-spinners/ClipLoader";
import LoadingSpinner from "../UIElements/loadingSpinner.jsx";
import { LoadingContext } from "../../context/LoadingContext.jsx";
import Modal from "./Update_Modal.jsx";
 
const First = () => {
  const [attendances, setAttendances] = useState([]);
  const userId = useContext(IdContext);
  const {loading,SetLoading} = useContext(LoadingContext);
   
  useEffect(() => {
   
    const fetchAttendances = async () => {
     
      try {
         
        const response = await fetch("/api/attendance/get");
        const data = await response.json();
        setAttendances(data.all_attendance);
         
      } catch (error) {
        console.error("Error fetching attendance data:", error);
      } finally {
        SetLoading(false);
        // Ensures loading is set to false even if there's an error
      }
     
    };

    fetchAttendances();
   
   
  }, [loading,SetLoading]);
  
  
  const handleDelete = async (id) => {
    
    try {
      await fetch(`/api/attendance/${id}`, {
        method: "DELETE",
      });
      setAttendances(attendances.filter((attendance) => attendance._id !== id));
    } catch (error) {
      console.error("Error deleting attendance data:", error);
    }
  };

 
  return (
    <>
       {loading && <LoadingSpinner asOverlay />}
     {!loading &&  <div className="main_first">
      
       <div className="header-first">My Attendance</div>
        <div className="attendence">
          <div className="attendence_header">
            {attendances.map((attendance) => {
              return (
                <AttendanceCard
                  key={attendance._id}
                  subject={attendance.subject}
                  classAbsent={attendance.class_absents}
                  totalClasses={attendance.total_classes}
                  percentage={attendance.percentage}
                  onDelete={() => handleDelete(attendance._id)}
                  onUpdate={() => userId.SetAttendance_id(attendance._id)}
                />
              );
            })}

            <div className="add_new">
              <Add />
             
            </div>
          </div>
        </div>
      </div>
     }
    </>
  );
};

export default First;
