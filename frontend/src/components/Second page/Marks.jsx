import React, { useContext, useEffect, useState } from "react";
import "./Marks.css";
import MarksCard from "./MarksCard.jsx";
import Add from "./Add.jsx";
import { LoadingContext } from "../../context/LoadingContext.jsx";
import { IdContext } from "../../context/IdContext.jsx";
import LoadingSpinner from "../UIElements/loadingSpinner.jsx";

const Marks = () => {
  const [marks, setMarks] = useState([]);
  const { loading, SetLoading } = useContext(LoadingContext);
  const userId = useContext(IdContext);

  const fetchMarks = async () => {
    try {
      const response = await fetch("/api/marks/get");
      const data = await response.json();
      setMarks(data.all_marks);
    } catch (error) {
      console.error("Error fetching marks data:", error);
    } finally {
      SetLoading(false);
    }
  };
  useEffect(() => {
    fetchMarks();
  }, [loading, SetLoading]);

  const handleDelete = async (id) => {
    try {
      await fetch(`/api/marks/${id}`, {
        method: "DELETE",
      });
      setMarks(marks.filter((mark) => mark._id !== id));
    } catch (error) {
      console.error("Error deleting attendance data:", error);
    }
  };
  return (
    <>
      {loading && <LoadingSpinner asOverlay />}
      {!loading && (
        <div className="main_second">
          <div className="header_second">My Marks</div>
          <div className="marks">
            {marks.map((mark) => {
              return (
                <MarksCard
                  key={mark.id}
                  subject={mark.subject}
                  test1={mark.test1}
                  test2={mark.test2}
                  mid_sem={mark.mid_sem}
                  end_sem={mark.end_sem}
                  onDelete={() => handleDelete(mark._id)}
                  onUpdate={() => userId.SetAttendance_id(mark._id)}
                />
              );
            })}
            <Add />
          </div>
        </div>
      )}
    </>
  );
};

export default Marks;
