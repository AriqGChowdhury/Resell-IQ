import '../styles/Recents.css'
import api from '../api';
import { useEffect, useState } from 'react';

function Recents () {
    const [recents, setRecents] = useState([]);
    
    useEffect(() => {
       api.get("auth/recents")
        .then(response => {
            setRecents(response.data);
            
        })
        .catch(error => {
            console.error(error);
        });
    }, []);
    

    return (
        <>
        <div className="">
            <div className="inner">
                {recents.length > 0 ? (
                    recents.map((item, idx) => (
                        <div key={idx} className='recent-item'>
                        <p>{item.brand} {item.model_type} ({item.year})</p>
                        <p>Bid: ${item.generated_bid?.toFixed(2)}</p>
                        <p>Resell: ${item.generated_resell?.toFixed(2)}</p>
                        </div>
                    ))
                    ) : (
                    <p>No recents yet.</p>
                )}

            </div>
        </div>
        </>
    )
    
}

export default Recents;