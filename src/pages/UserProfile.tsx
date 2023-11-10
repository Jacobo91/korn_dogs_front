import { useNavigate, useParams } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useEffect, useState } from "react";
import { getUser } from "../../lib/services";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { User } from "types";

function UserProfile() {

    const [userProfile, setUserProfile] = useState<User>(
        {
            _id: "",
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
            createdAt: "",
            updatedAt: "",
            __v: 0,
            contract: ""
        }
    );
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const navigate = useNavigate();
    const { user } = useParams();


    useEffect(() => {
        const fetchUser = async () => {
            try {
                setIsLoading(true);
                const response = await getUser(user);
                setUserProfile(response)
            } catch (error) {
                console.log(error)
            } finally {
                setIsLoading(false)
            }
        };

        fetchUser()
    }, [user])

    if (isLoading) {
        return <p>Loading...</p>
    }

    return (
        <div className="inner-page-wrapper">
            <button
                className="arrow-back"
                onClick={() => {
                    navigate("/admin/users");
                }}
            >
                <ArrowBackIcon/> <span>Go Back</span>
            </button>
            {userProfile && (
                <div className="user-profile">
                    <div className="user-profile_image-wrapper">
                        <LazyLoadImage 
                            src={userProfile.image}  
                            alt={`${userProfile.firstname}'s picture`} 
                            className='card__image'
                            effect="blur"
                            height="156"
                            width="156"
                        />
                    </div>
                    <h2 className="fullname">
                        {`${userProfile.firstname} ${userProfile.lastname}`}
                    </h2>
                    <p>
                        {`Address: ${userProfile.address}`}
                    </p>
                    <p>
                        {`Phone: ${userProfile.phone_number}`}
                    </p>
                    <p>
                        Role: <span className="highlight">{userProfile.role}</span>
                    </p>
                    <div className="user-profile_anchors">
                        <a 
                            href={userProfile.certificado_pension_cesantias} 
                            target="_blank"
                            className="btn"
                        >
                            Cert. Pension y Cesantias
                        </a>
                        <a 
                            href={userProfile.certificado_procuraduria} 
                            target="_blank"
                            className="btn"
                        >
                            Cert. Procuraduria
                        </a>
                        <a 
                            href={userProfile.certificado_bancario} 
                            target="_blank"
                            className="btn"
                        >
                            Cert. Bancario
                        </a>
                        <a 
                            href={userProfile.certificado_eps} 
                            target="_blank"
                            className="btn"
                        >
                            Cert. EPS
                        </a>
                        <a 
                            href={userProfile.certificado_policia} 
                            target="_blank"
                            className="btn"
                        >
                            Cert. Policia
                        </a>
                        <a 
                            href={userProfile.contract} 
                            target="_blank"
                            className="btn"
                        >
                            Contrato
                        </a>
                    </div>
                </div>
            )}
        </div>
    );
}

export default UserProfile;