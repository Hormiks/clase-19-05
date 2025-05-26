const students=[];
let editingIndex=-1;

const tableBody=document.querySelector("#studentsTable tbody");
const averageDiv=document.getElementById("average");
const form=document.getElementById("studentForm");
const submitButton=form.querySelector("button[type='submit']");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const lastName = document.getElementById("lastName").value.trim();
  const grade = parseFloat(document.getElementById("grade").value.trim());

  if (grade<1 || grade>7 || !name || !lastName || isNaN(grade)) {
    alert("Error: Datos Incorrectos");
    return;
  }
  const student={name,lastName,grade};

  if (editingIndex === -1){
    students.push(student);
    addStudentToTable(student);
  } 
  else {
    students[editingIndex]=student;
    updateTable();
    submitButton.textContent="Agregar Estudiante";
    editingIndex=-1;
  }

  calcularPromedio();
  form.reset();
});

function addStudentToTable(student){
    const row=document.createElement("tr");
    row.innerHTML=
    `<td>${student.name}</td>
     <td>${student.lastName}</td>
    <td>${student.grade}</td>
    <td>
        <button class="delete">Eliminar</button>
        <button class="edit">Editar</button>
    </td>`;
    
    row.querySelector(".delete").addEventListener("click",function(){
        deleteEstudiante(student,row);
    });
    row.querySelector(".edit").addEventListener("click",function(){
        editEstudiante(student);
    });
   tableBody.appendChild(row);
}
function updateTable(){
    tableBody.innerHTML="";
    students.forEach(addStudentToTable);
}

function deleteEstudiante(student,row){
    const index=students.indexOf(student);
    if(index > -1){
        students.splice(index,1);
        row.remove();
        calcularPromedio();
    }
}
// intento de botón Actualizar
function editEstudiante(student){
    const index=students.indexOf(student);
    if(index > -1){
        document.getElementById("name").value=student.name;
        document.getElementById("lastName").value=student.lastName;
        document.getElementById("grade").value=student.grade;
        editingIndex=index;
        submitButton.textContent="Actualizar cambios";
    }
}
function calcularPromedio(){
    if(students.length===0){
       averageDiv.textContent="Promedio de Calificaciones: No Disponible"
        return;
    }
    const total=students.reduce((sum,s)=>sum+s.grade,0);
    const average=total/students.length;

    averageDiv.textContent=`Promedio de Calificaciones: ${average.toFixed(2)}`;
}
