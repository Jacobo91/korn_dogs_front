import * as React from 'react';
import '../index.css'
import Modal from '@mui/material/Modal';
import { Loader } from './'
import { authorizeUser } from '../../lib/services';



export default function LoginModal() {
    const [open, setOpen] = React.useState(true);
    const [error, setError] = React.useState<string>("");
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const [credentials, setCredentials] = React.useState({
        username: "",
        password: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setCredentials({
            ...credentials,
            [name]: value,
        })
    }

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            setIsLoading(true);
            const isAuth = await authorizeUser(credentials.username, credentials.password);
            console.log(isAuth);

            if (isAuth) {
                setOpen(false);
                window.location.reload()
            } else {
                setError('Invalid Username or password')
            }

        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false);
        }
    }

    React.useEffect(() => {
        console.log(credentials)
        const isAlreadyAuth = localStorage.getItem("isAuth");
        if (isAlreadyAuth){
            setOpen(false);
        }
    },[])

    return (
    <div>
        <Modal
            open={open}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <div className='modal'>
                <form 
                    action=""
                    className='login-form'
                    onSubmit={onSubmit}
                >
                    <label htmlFor="username">User:</label>
                    <input 
                        type="text"
                        id='username'
                        value={credentials.username}
                        onChange={handleChange}
                        name="username"
                        required
                    />

                    <label htmlFor="password">Password:</label>
                    <input 
                        type="password"
                        id='password'
                        value={credentials.password}
                        onChange={handleChange}
                        name='password'
                        required 
                    />
                    <span className='error'>{error && `${error}`}</span>
                    <button
                        className='btn btn--login-form'
                    >
                        {isLoading ? (<Loader />) : "Log in"}
                    </button>
                </form>
            </div>
        </Modal>
    </div>
    );
}