import React, { useState } from 'react';
import Swal from 'sweetalert2';
import 'bootstrap/dist/css/bootstrap.min.css';

const CalculatorNote = () => {
    const [grades, setGrades] = useState({ parcial1: '', parcial2: '', parcial3: '' });

    const handleChange = (e) => {
        setGrades({ ...grades, [e.target.name]: e.target.value });
    };

    const validateAndCalculate = () => {
        const { parcial1, parcial2, parcial3 } = grades;

        if (parcial1 === '' || parcial2 === '' || parcial3 === '') {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Por favor ingrese todas las notas',
            });
            return;
        }

        const grade1 = parseFloat(parcial1);
        const grade2 = parseFloat(parcial2);
        const grade3 = parseFloat(parcial3);

        if (
            isNaN(grade1) || isNaN(grade2) || isNaN(grade3) ||
            grade1 < 0 || grade1 > 30 || grade2 < 0 || grade2 > 30 || grade3 < 0 || grade3 > 40
        ) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Las notas deben ser válidas y estar en el rango permitido',
            });
            return;
        }

        const finalGrade = grade1 + grade2 + grade3;
        let message = '';

        if (finalGrade >= 90) {
            message = 'Sobresaliente';
        } else if (finalGrade >= 80) {
            message = 'Muy Bueno';
        } else if (finalGrade >= 60) {
            message = 'Bueno';
        } else {
            message = 'Reprobado';
        }

        Swal.fire({
            icon: 'success',
            title: 'Resultado',
            text: `Tu nota final es ${finalGrade}%. ${message}`,
        });
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Sumador de Notas</h2>
            <div className="form-group">
                <label>Primer Parcial (Valor maximo 30%)</label>
                <input
                    type="number"
                    name="parcial1"
                    className="form-control"
                    value={grades.parcial1}
                    onChange={handleChange}
                    max="30"
                    min="0"
                />
            </div>
            <div className="form-group">
                <label>Segundo Parcial (Valor maximo 30%)</label>
                <input
                    type="number"
                    name="parcial2"
                    className="form-control"
                    value={grades.parcial2}
                    onChange={handleChange}
                    max="30"
                    min="0"
                />
            </div>
            <div className="form-group">
                <label>Tercer Parcial (Valor maximo 40%)</label>
                <input
                    type="number"
                    name="parcial3"
                    className="form-control"
                    value={grades.parcial3}
                    onChange={handleChange}
                    max="40"
                    min="0"
                />
            </div>
            <button className="btn btn-primary btn-block mt-4" onClick={validateAndCalculate}>
                Calcular Nota Final
            </button>
        </div>
    );
};

export default CalculatorNote;