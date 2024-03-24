import React, { Fragment, useState, useEffect } from "react";
import Cita from "./components/Cita";
import Formulario from "./components/Formulario";
import { PropTypes } from "prop-types";

function App() {

  // Citas en localStorage
  let citasIniciales = JSON.parse(localStorage.getItem('citas'));
  if (!citasIniciales)
  {
    citasIniciales = [];
  }

  // state de citas
  const [citas, setCitas] = useState(citasIniciales);

  // UseEfect para realizar algunas operaciones cuando un state cambia
  useEffect( () => {
    if (citasIniciales)
    {
      localStorage.setItem('citas', JSON.stringify(citas));
    }
    else
    {
      localStorage.setItem('citas', JSON.stringify([]));
    }
  }, [citas, citasIniciales])

  // Funcion que tome las citas actuales y agregue la nueva
  const crearCita = cita => {
    setCitas([...citas, cita]);
  }

  // Funcion que eliminar por id
  const eliminarCita = id => 
  {
    const citasFiltradas = citas.filter(cita => cita.id !== id);
    setCitas(citasFiltradas);
  }

  return (
    <Fragment>
      <h2>Administrador de Pacientes</h2>
      <div className="container" >
        <div className="row" >
          <div className="one-half column" >
            <Formulario
              crearCita={crearCita}
            />
          </div>
          <div className="one-half column" >
            <h2>{ citas.length ? 'Administrador tus citas' : 'No hay citas'}</h2>
            {
              citas.map(cita => (
                <Cita
                  cita={cita}
                  key={cita.id}
                  eliminarCita={eliminarCita}
                ></Cita>
              ))
            }
          </div>
        </div>
      </div>
    </Fragment>
  );
}

// Aqui se documenta todo
Formulario.propTypes = {
  crearCita : PropTypes.func.isRequired
}

export default App;
