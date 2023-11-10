import React from 'react';
import { createUser } from '../../lib/services';
import { User } from 'types';
import Card  from '../components/Card';
import { LazyLoadComponent } from 'react-lazy-load-image-component';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useAPI } from '../hooks/useAPI';

const initialStateUSer = {
    firstname: "",
    lastname: "",
    address: "",
    phone_number: "",
    username: "",
    password: "",
    cedula: "",
    blood_type: "",
    certificado_pension_cesantias: "",
    certificado_procuraduria: "",
    certificado_bancario: "",
    certificado_eps: "",
    image: "",
    certificado_policia: "",
    role: "",
    contract: ""
}

function Users() {

    const [newUser, setNewUser] = React.useState(initialStateUSer);

    function HandleChange(e: React.ChangeEvent<HTMLInputElement>) {
        console.log("Hello");
        const { name, value } = e.target;
        setNewUser((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        try {
            const response = await createUser(newUser);
                setNewUser(initialStateUSer);
                return response
        } catch (error) {
            console.log(error)
        }
        
    }

    const { isLoading, error, data } = useAPI(
        "users", 
        "users", 
        {
            refetchOnMount: false
        }
    )

    if (isLoading) {
        return <p>Loading...</p>
    }

    if (error) {
        return <p>Error</p>
    }

    return (
        <div className=''>

            <div className='users-gal'>
                {data && (
                    data.map((user: User) => (
                        <LazyLoadComponent key={user._id} visibleByDefault={false}>
                            <Card user={user}/>
                        </LazyLoadComponent>
                    ))
                )}
            </div>

            <div className='accordion-wrapper'>
                <Accordion>
                    <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    >
                        <Typography variant='h5'>Add User</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <form action="" className='form' onSubmit={onSubmit}>

                            <label htmlFor="firstname">Name:</label>
                            <input type="text" name='firstname' id='firstname' value={newUser.firstname} onChange={HandleChange} required/>

                            <label htmlFor="lastname">Lastname:</label>
                            <input type="text" name='lastname'id='lastname' value={newUser.lastname} onChange={HandleChange} required/>

                            <label htmlFor="address">Address:</label>
                            <input type="text" name='address' id='address' value={newUser.address} onChange={HandleChange} required/>

                            <label htmlFor="phone_number">Phone Number:</label>
                            <input type="text" name='phone_number' id='phone_number' value={newUser.phone_number} onChange={HandleChange} required/>

                            <label htmlFor="username">Username:</label>
                            <input type="text" name='username' id='username'  value={newUser.username} onChange={HandleChange} required/>

                            <label htmlFor="password">Password:</label>
                            <input type="text" name='password' id='password' value={newUser.password} onChange={HandleChange} required/>

                            <label htmlFor="cedula">Cedula:</label>
                            <input type="text" name="cedula" id="cedula" value={newUser.cedula} onChange={HandleChange} required />

                            <label htmlFor="blood_type">Blood Type:</label>
                            <input type="text" name="blood_type" id="blood_type" value={newUser.blood_type} onChange={HandleChange} required />

                            <label htmlFor="certificado_pension_cesantias">Certificado Pension Cesantias:</label>
                            <input type="url" name="certificado_pension_cesantias" id="certificado_pension_cesantias" value={newUser.certificado_pension_cesantias} onChange={HandleChange} required />

                            <label htmlFor="certificado_procuraduria">Certificado Procuraduria:</label>
                            <input type="url" name="certificado_procuraduria" id="certificado_procuraduria" value={newUser.certificado_procuraduria} onChange={HandleChange} required />

                            <label htmlFor="certificado_bancario">Certificado Bancario:</label>
                            <input type="url" name="certificado_bancario" id="certificado_bancario" value={newUser.certificado_bancario} onChange={HandleChange} required />

                            <label htmlFor="certificado_eps">Certificado EPS:</label>
                            <input type="url" name="certificado_eps" id="certificado_eps" value={newUser.certificado_eps} onChange={HandleChange} required />

                            <label htmlFor="image">Image:</label>
                            <input type="url" name="image" id="image" value={newUser.image} onChange={HandleChange} required />

                            <label htmlFor="certificado_policia">Certificado Policia:</label>
                            <input type="url" name="certificado_policia" id="certificado_policia" value={newUser.certificado_policia} onChange={HandleChange} required />

                            <label htmlFor="role">Role:</label>
                            <input type="text" name="role" id="role" value={newUser.role} onChange={HandleChange} required />

                            <label htmlFor="contract">Contrato:</label>
                            <input type="url" name="contract" id="contract" value={newUser.contract} onChange={HandleChange} required />

                            <button className='btn' type='submit'>
                                Add User
                            </button>
                        </form>
                    </AccordionDetails>
                </Accordion>
            </div>
        </div>
    )
}

export default Users