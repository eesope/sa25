import { MSG } from './en.js';

const END_POINT = 'https://jaiden-duncan-comp4537.azurewebsites.net/api/sql/';
const GET_REQ = 'https://jaiden-duncan-comp4537.azurewebsites.net/api/sql/?sql="SELECT * FROM patients"';

// write POST req 
document.getElementById('patientForm').addEventListener('submit', (event) => {
    event.preventDefault(); // check empty entry

    const pname = document.getElementById('pname').value;
    const dob = document.getElementById('dob').value;

    if (!pname || !dob) {
        alert(MSG.emptyField);
        return;
    }

    const patient = { name: pname, dob: dob };

    // send POST req
    fetch(END_POINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ values: JSON.stringify([patient.name + ',' + patient.dob]) })
    })
        .then(response => response.text())
        .then(data => {
            // res from server
            alert(data);
        })
        .catch(error => {
            console.error('Error:', error);
            alert(MSG.errorAddingPatient);
        });
});

// send GET req
document.getElementById('getBTN').addEventListener('click', () => {
    fetch(GET_REQ, { method: 'GET' })
        .then(response => response.json())
        .then(data => {
            const refreshedTime = new Date().toLocaleString();

            // show data in table
            let tableHTML = `
                <p>${MSG.refreshedOn} ${refreshedTime}</p>
                <table border="1">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Date of Birth</th>
                        </tr>
                    </thead>
                    <tbody>
            `;

            // add each row of data
            data.forEach(patient => {
                tableHTML += `
                    <tr>
                        <td>${patient.patientid}</td>
                        <td>${patient.name}</td>
                        <td>${patient.dateOfBirth}</td>
                    </tr>
                `;
            });

            tableHTML += `
                    </tbody>
                </table>
            `;

            document.getElementById('plist').innerHTML = tableHTML;
        })
        .catch(error => {
            console.error('Error:', error);
            alert(MSG.errorFetchingData);
        });
});

