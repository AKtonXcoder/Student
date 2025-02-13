import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Modal,
  TextField,
} from "@mui/material";
import { Add, Visibility, Edit, Delete } from "@mui/icons-material";
import Sidebar from "./Sidebar";
import "../Styles/Students.css"; // Import the CSS file

const Students = () => {
  const [students, setStudents] = useState([]);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    class: "",
    section: "",
    rollNumber: "",
  });
  const [editStudent, setEditStudent] = useState(null); // For editing a student

  // Fetch students from Firestore
  const fetchStudents = async () => {
    const querySnapshot = await getDocs(collection(db, "students"));
    const studentsList = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setStudents(studentsList);
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // Function to generate random ID
  const generateRandomId = () => {
    return Math.random().toString(36).substr(2, 5); // Generates a random alphanumeric string
  };

  // Add or Edit Student
  const handleSubmit = async () => {
    const newStudent = { ...formData, id: generateRandomId() }; // Add random ID

    if (editStudent) {
      // Update existing student
      await updateDoc(doc(db, "students", editStudent.id), formData);
      setStudents(students.map((student) =>
        student.id === editStudent.id ? { ...student, ...formData } : student
      ));
    } else {
      // Add new student with random ID
      const docRef = await addDoc(collection(db, "students"), newStudent);
      setStudents([...students, { id: docRef.id, ...newStudent }]);
    }
    setOpen(false);
    setFormData({ name: "", class: "", section: "", rollNumber: "" });
    setEditStudent(null); // Reset edit student
  };

  // Delete Student
  const handleDeleteStudent = async (id) => {
    try {
      await deleteDoc(doc(db, "students", id));
      setStudents(students.filter(student => student.id !== id)); // Remove student from state
    } catch (error) {
      console.error("Error deleting student: ", error);
    }
  };

  return (
    <div className="students-container">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="main-content">
        <Button
          onClick={() => setOpen(true)}
          startIcon={<Add />}
          variant="contained"
          color="primary"
        >
          Add Student
        </Button>

        <TableContainer component={Paper} className="table-container">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Class</TableCell>
                <TableCell>Section</TableCell>
                <TableCell>Roll Number</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {students.map((student) => (
                <TableRow key={student.id}>
                  <TableCell>{student.id}</TableCell>
                  <TableCell>{student.name}</TableCell>
                  <TableCell>{student.class}</TableCell>
                  <TableCell>{student.section}</TableCell>
                  <TableCell>{student.rollNumber}</TableCell>
                  <TableCell>
                    <Visibility style={{ cursor: "pointer", marginRight: "10px" }} />
                    <Edit
                      style={{ cursor: "pointer", marginRight: "10px" }}
                      onClick={() => {
                        setFormData({
                          name: student.name,
                          class: student.class,
                          section: student.section,
                          rollNumber: student.rollNumber,
                        });
                        setEditStudent(student);
                        setOpen(true); // Open modal for editing
                      }}
                    />
                    <Delete
                      style={{ cursor: "pointer", color: "red" }}
                      onClick={() => handleDeleteStudent(student.id)} // Add onClick
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Add/Edit Student Modal */}
        <Modal open={open} onClose={() => setOpen(false)}>
          <div className="modal-container">
            <h2>{editStudent ? "Edit Student" : "Add Student"}</h2>
            <TextField
              label="Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
            <TextField
              label="Class"
              value={formData.class}
              onChange={(e) => setFormData({ ...formData, class: e.target.value })}
            />
            <TextField
              label="Section"
              value={formData.section}
              onChange={(e) => setFormData({ ...formData, section: e.target.value })}
            />
            <TextField
              label="Roll Number"
              value={formData.rollNumber}
              onChange={(e) => setFormData({ ...formData, rollNumber: e.target.value })}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit}
            >
              {editStudent ? "Update" : "Submit"}
            </Button>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default Students;
