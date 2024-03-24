import React, { Fragment, useState } from 'react';
import uuid from 'uuid/dist/v4'
import { PropTypes } from "prop-types";

const Formulario = ({crearCita}) => {

    //TODO logic here
    const [cita, setCita] = useState({
        mascota: '',
        propietario: '',
        fecha: '',
        hora: '',
        sintomas: ''
    });
    const [error, setError] = useState(false)

    // Funcion que se ejecuta cada que el usussario escribe en un input
    const actualizarState = e => {
        // console.log("Escribiendo...",e.target.name, e.target.value);
        setCita(
            // ...cita, //here is wrong
            {
                ...cita,
                [e.target.name] : e.target.value
            }
        )
    }

    // Extraer los valores
    const { mascota, propietario, fecha, hora, sintomas } = cita;


    // Cuando el usuario presiona agregar cita
    const submitCita = e => {
        e.preventDefault();

        // Validar
        if(mascota.trim() === "" || propietario.trim() === "" || fecha.trim() === "" || hora.trim() === "" || sintomas.trim() === "")
        {
            setError(true);
            return;
        }
        setError(false);

        // Asignqar un ID
        cita.id = uuid();
        // console.log(cita);

        // Crear la cita
        crearCita(cita);

        // Reiniciar el form
        setCita({
            mascota: '',
            propietario: '',
            fecha: '',
            hora: '',
            sintomas: ''
        })
    }

    return ( 
        <Fragment>
            <h2>Crear cita</h2>
            { error ? <p className="alerta-error">Todos los campos son obligatorios</p> : null }
            <form
                onSubmit={submitCita}
            >
                <label>Nombre de mascota</label>
                <input
                    type="text"
                    name="mascota"
                    className="u-full-width"
                    placeholder="nombre de mascota"
                    onChange={actualizarState}
                    value={mascota}
                />
                <label>Nombre del dueño</label>
                <input
                    type="text"
                    name="propietario"
                    className="u-full-width"
                    placeholder="nombre del dueño"
                    onChange={actualizarState}
                    value={propietario}
                />
                <label>Fecha</label>
                <input
                    type="date"
                    name="fecha"
                    className="u-full-width"
                    onChange={actualizarState}
                    value={fecha}
                />
                <label>Hora</label>
                <input
                    type="time"
                    name="hora"
                    className="u-full-width"
                    onChange={actualizarState}
                    value={hora}
                />
                <label>Síntomas</label>
                <textarea
                    className="u-full-width"
                    name="sintomas"
                    onChange={actualizarState}
                    value={sintomas}
                ></textarea>
                <button
                    className="u-full-width button-primary"
                    type="submit"
                >Agregar citas</button>
            </form> 
        </Fragment> 
    );
}
 // Aqui se documenta todo
Formulario.propTypes = {
    crearCita : PropTypes.func.isRequired
}

export default Formulario;