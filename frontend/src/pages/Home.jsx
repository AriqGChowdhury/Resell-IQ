import Dropdown from 'react-bootstrap/Dropdown'
import { useEffect, useState } from 'react'
import '../styles/Home.css'
import Button from 'react-bootstrap/esm/Button';
import api from '../api';
import { useNavigate } from 'react-router-dom'

function Home() {
    const [brand, setBrand] = useState('Brand');
    const [cpuTier, setCpuTier] = useState("CPU Tier");
    const [cpu, setCpu] = useState("CPU");
    const [ram, setRam] = useState("RAM");
    const [storage, setStorage] = useState("Storage");
    const [year, setYear] = useState("Year");
    const [model, setModel] = useState("Model");
    const [screen_size, setScreen] = useState("Screen Size");
    const [condition, setCondition] = useState("Condition");
    const [recents, setRecents] = useState([]);
    const [conditionID, setConditionID] = useState(null);
    const [loading, setLoading] = useState(false);
    const [bid, setBid] = useState(null);
    
    const navigate = useNavigate();

    const handleBrand = (eventKey) => {
        setBrand(eventKey);
    }
    const handleCpuTier = (eventKey) => {
        setCpuTier(eventKey);
    }
    const handleCpu = (eventKey) => {
        setCpu(eventKey);
    }
    const handleRam = (eventKey) => {
        setRam(eventKey);
    }
    const handleStorage = (eventKey) => {
        setStorage(eventKey);
    }
    const handleYear = (eventKey) => {
        setYear(eventKey);
    }
    const handleModel = (eventKey) => {
        setModel(eventKey);
    }
    const handleScreen = (eventKey) => {
        setScreen(eventKey);
    }
    const handleCondition = (eventKey) => {
        setCondition(eventKey);
        console.log(eventKey);
        if (eventKey === "New") {
            setConditionID(1000);
        } else if (eventKey === "Open Box" || eventKey === "New - Open Box") {
            setConditionID(1500);
        } else if (eventKey === "New with defects") {
            setConditionID(1750);
        } else if (eventKey === "Certified Refurbished") {
            setConditionID(2000);
        } else if (eventKey === "Excellent Refurbished") {
            setConditionID(2010);
        } else if (eventKey === "Very Good - Refurbished") {
            setConditionID(2020);
        } else if (eventKey === "Good - Refurbished") {
            setConditionID(2030);
        } else if (eventKey === "Seller - Refurbished" || eventKey === "Remanufactured") {
            setConditionID(2500);
        } else if (eventKey === "Like New") {
            console.log("hi");
            setConditionID(2750);
        } else if (eventKey === "Pre-Owned Excellent") {
            setConditionID(2990);
        } else if (eventKey === "Used" || eventKey === "Pre-Owned Good") {
            setConditionID(3000);
        } else if (eventKey === "Very Good") {
            setConditionID(4000);
        } else if (eventKey === "Good") {
            setConditionID(5000);
        } else if (eventKey === "Acceptable") {
            setConditionID(6000);
        } else if (eventKey === "For part or not working") {
            setConditionID(7000);
        }
    };

    const getPrice = async () => {
        if (year == "Year" || brand == "Brand" || model == "Model" || cpu == "CPU" || cpuTier == "CPU Tier" || screen_size == "Screen Size" || ram == "RAM" || storage == "Storage" || condition == "Condition") {
            alert("Fill in all specs");
            return
        }
        setLoading(true);
        try {
            const response = await api.post("auth/resellAndBids", {
            year: year,
            model_type: model,
            ram: ram,
            storage: storage,
            brand: brand,
            cpu: cpu,
            cpu_tier: cpuTier,
            cpu_model: cpuTier,
            screen_size: screen_size,
            condition: condition,
            conditionID: conditionID,
            },
        {
            headers: {'Content-Type': "application/json", 'Accept': "application/json"}
            
        });
            setBid(response.data.generated_bid);
        } catch (error) {
            console.error(error);
        } finally {
            window.location.reload(false);
        }
        

    };

    useEffect(() => {
        api.get('auth/recents')
            .then(response => {
                setRecents(response.data);
                console.log(recents);
            })
            .catch(error => {
                console.log(error);
            })
    }, []);
    
    
    return (
        <div className="outer">
            <div className='generate'>
                <h2>Get Resell and Bid Price!</h2>
                <hr></hr>
                <Dropdown onSelect={handleYear}>
                    <Dropdown.Toggle variant='light' id='dropdown-basic'>
                        {year}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item href='#' eventKey={'2008'}>2008</Dropdown.Item>
                        <Dropdown.Item href='#' eventKey={'2009'}>2009</Dropdown.Item>
                        <Dropdown.Item href='#' eventKey={'2010'}>2010</Dropdown.Item>
                        <Dropdown.Item href='#' eventKey={'2011'}>2011</Dropdown.Item>
                        <Dropdown.Item href='#' eventKey={'2012'}>2012</Dropdown.Item>
                        <Dropdown.Item href='#' eventKey={'2013'}>2013</Dropdown.Item>
                        <Dropdown.Item href='#' eventKey={'2014'}>2014</Dropdown.Item>
                        <Dropdown.Item href='#' eventKey={'2015'}>2015</Dropdown.Item>
                        <Dropdown.Item href='#' eventKey={'2016'}>2016</Dropdown.Item>
                        <Dropdown.Item href='#' eventKey={'2017'}>2017</Dropdown.Item>
                        <Dropdown.Item href='#' eventKey={'2018'}>2018</Dropdown.Item>
                        <Dropdown.Item href='#' eventKey={'2019'}>2019</Dropdown.Item>
                        <Dropdown.Item href='#' eventKey={'2020'}>2020</Dropdown.Item>
                        <Dropdown.Item href='#' eventKey={'2021'}>2021</Dropdown.Item>
                        <Dropdown.Item href='#' eventKey={'2022'}>2022</Dropdown.Item>
                        <Dropdown.Item href='#' eventKey={'2023'}>2023</Dropdown.Item>
                        <Dropdown.Item href='#' eventKey={'2024'}>2024</Dropdown.Item>
                        <Dropdown.Item href='#' eventKey={'2025'}>2025</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>

                <Dropdown onSelect={handleBrand}>
                    <Dropdown.Toggle variant='light' id='dropdown-basic'>
                        {brand}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item href='#' eventKey={'Apple'}>Apple</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>

                <Dropdown onSelect={handleModel}>
                    <Dropdown.Toggle variant='light' id='dropdown-basic'>
                        {model}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item href='#' eventKey={'Macbook'}>Macbook</Dropdown.Item>
                        <Dropdown.Item href='#' eventKey={'Macbook Pro'}>Macbook Pro</Dropdown.Item>
                        <Dropdown.Item href='#' eventKey={'Macbook Air'}>Macbook Air</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>

                <Dropdown onSelect={handleCpu}>
                    <Dropdown.Toggle variant='light' id='dropdown-basic'>
                        {cpu}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        {brand === "Apple" ? (
                            <>
                            <Dropdown.Item href='#' eventKey={'Apple Silicon'}>Apple Silicon</Dropdown.Item>
                            <Dropdown.Item href='#' eventKey={'Intel Core'}>Intel Core</Dropdown.Item> 
                            </>
                        ) : (
                            <Dropdown.Item href='#' eventKey={'Intel Core'}>Intel Core</Dropdown.Item>
                        )}
                        
                    </Dropdown.Menu>
                </Dropdown>

                <Dropdown onSelect={handleCpuTier}>
                    <Dropdown.Toggle variant='light' id='dropdown-basic'>
                        {cpuTier}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        {cpu === "Apple Silicon" && (
                            <>   
                            <Dropdown.Item href='#' eventKey={'M1'}>M1</Dropdown.Item>
                            <Dropdown.Item href='#' eventKey={'M2'}>M2</Dropdown.Item>
                            <Dropdown.Item href='#' eventKey={'M3'}>M3</Dropdown.Item>
                            <Dropdown.Item href='#' eventKey={'M4'}>M4</Dropdown.Item>
                            <Dropdown.Item href='#' eventKey={'M1 Pro'}>M1 Pro</Dropdown.Item>
                            <Dropdown.Item href='#' eventKey={'M1 Max'}>M1 Max</Dropdown.Item>
                            <Dropdown.Item href='#' eventKey={'M1 Ultra'}>M1 Ultra</Dropdown.Item>
                            <Dropdown.Item href='#' eventKey={'M2 Pro'}>M2 Pro</Dropdown.Item>
                            <Dropdown.Item href='#' eventKey={'M2 Max'}>M2 Max</Dropdown.Item>
                            <Dropdown.Item href='#' eventKey={'M2 Ultra'}>M2 Ultra</Dropdown.Item>
                            <Dropdown.Item href='#' eventKey={'M3 Pro'}>M3 Pro</Dropdown.Item>
                            <Dropdown.Item href='#' eventKey={'M3 Max'}>M3 Max</Dropdown.Item>
                            <Dropdown.Item href='#' eventKey={'M3 Ultra'}>M3 Ultra</Dropdown.Item>
                            <Dropdown.Item href='#' eventKey={'M4 Pro'}>M4 Pro</Dropdown.Item>
                            <Dropdown.Item href='#' eventKey={'M4 Max'}>M4 Max</Dropdown.Item>                    

                            </>
                        )} 
                        {cpu === "Intel Core" && (
                            <>
                            <Dropdown.Item href='#' eventKey={'i5'}>i5</Dropdown.Item>
                            <Dropdown.Item href='#' eventKey={'i7'}>i7</Dropdown.Item>
                            <Dropdown.Item href='#' eventKey={'i9'}>i9</Dropdown.Item>
                            <Dropdown.Item href='#' eventKey={'2 Duo'}>2 Duo</Dropdown.Item>  
                            </>
                        )}
                            
                    </Dropdown.Menu>
                </Dropdown>

                <Dropdown onSelect={handleScreen}>
                    <Dropdown.Toggle variant='light' id='dropdown-basic'>
                        {screen_size}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item href='#' eventKey={13}>13"</Dropdown.Item>
                        <Dropdown.Item href='#' eventKey={14}>14"</Dropdown.Item>
                        <Dropdown.Item href='#' eventKey={15}>15"</Dropdown.Item>
                        <Dropdown.Item href='#' eventKey={16}>16"</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>

                <Dropdown onSelect={handleRam}>
                    <Dropdown.Toggle variant='light' id='dropdown-basic'>
                        {ram}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item href='#' eventKey={4}>4 GB</Dropdown.Item>
                        <Dropdown.Item href='#' eventKey={8}>8 GB</Dropdown.Item>
                        <Dropdown.Item href='#' eventKey={16}>16 GB</Dropdown.Item>
                        <Dropdown.Item href='#' eventKey={32}>32 GB</Dropdown.Item>
                        <Dropdown.Item href='#' eventKey={64}>64 GB</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>

                <Dropdown onSelect={handleStorage}>
                    <Dropdown.Toggle variant='light' id='dropdown-basic'>
                        {storage}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item href='#' eventKey={80}>80 GB</Dropdown.Item>
                        <Dropdown.Item href='#' eventKey={120}>120 GB</Dropdown.Item>
                        <Dropdown.Item href='#' eventKey={160}>160 GB</Dropdown.Item>
                        <Dropdown.Item href='#' eventKey={256}>256 GB</Dropdown.Item>
                        <Dropdown.Item href='#' eventKey={512}>512 GB</Dropdown.Item>
                        <Dropdown.Item href='#' eventKey={1000}>1TB </Dropdown.Item>
                        <Dropdown.Item href='#' eventKey={2000}>2TB</Dropdown.Item>
                        <Dropdown.Item href='#' eventKey={4000}>4TB</Dropdown.Item>
                        <Dropdown.Item href='#' eventKey={8000}>8TB</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>

                <Dropdown onSelect={handleCondition}>
                    <Dropdown.Toggle variant='light' id='dropdown-basic'>
                        {condition}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item href='#' eventKey={'New'}>New</Dropdown.Item>
                        <Dropdown.Item href='#' eventKey={'Like New'}>Like New</Dropdown.Item>
                        <Dropdown.Item href='#' eventKey={'Used'}>Used</Dropdown.Item>
                        <Dropdown.Item href='#' eventKey={'Pre-Owned Excellent'}>Pre-Owned Excellent</Dropdown.Item>
                        <Dropdown.Item href='#' eventKey={'Open Box'}>Open Box</Dropdown.Item>
                        <Dropdown.Item href='#' eventKey={'New - Open Box'}>New - Open Box</Dropdown.Item>
                        <Dropdown.Item href='#' eventKey={'New with defects'}>New with defects</Dropdown.Item>
                        <Dropdown.Item href='#' eventKey={'Certifided Refurbished'}>Certified Refurbished</Dropdown.Item>
                        <Dropdown.Item href='#' eventKey={'Excellent - Refurbished'}>Excellent Refurbished</Dropdown.Item>
                        <Dropdown.Item href='#' eventKey={'Very Good - Refurbished'}>Very Good - Refurbished</Dropdown.Item>
                        <Dropdown.Item href='#' eventKey={'Good - Refurbished'}>Good - Refurbished</Dropdown.Item>
                        <Dropdown.Item href='#' eventKey={'Seller - Refurbished'}>Seller - Refurbished</Dropdown.Item>
                        <Dropdown.Item href='#' eventKey={'Remanufactured'}>Remanufactured</Dropdown.Item>
                        <Dropdown.Item href='#' eventKey={'Used'}>Used</Dropdown.Item>
                        <Dropdown.Item href='#' eventKey={'Pre-Owned Good'}>Pre-Owned Good</Dropdown.Item>
                        <Dropdown.Item href='#' eventKey={'Good'}>Good</Dropdown.Item>
                        <Dropdown.Item href='#' eventKey={'Very Good'}>Very Good</Dropdown.Item>
                        <Dropdown.Item href='#' eventKey={'Acceptable'}>Acceptable</Dropdown.Item>
                        <Dropdown.Item href='#' eventKey={'For parts or not working'}>For parts or not working</Dropdown.Item>

                    </Dropdown.Menu>
                </Dropdown>
                <Button  id='genButton' variant='dark' onClick={getPrice} disabled={loading}> {loading ? "Generating.." : "Generate"}</Button>
                
            </div>

            <div className="showRecents">
                <h3>Recents</h3>
                {recents.length > 0 ? (
                    <>
                    {recents.slice(0, 3).map((item, idx) => (
                        <div key={idx} className="recent-item">
                        <p><strong>{item.brand}</strong> {item.model_type} ({item.year})</p>
                        <p>Suggested Bid: ${item.generated_bid?.toFixed(2)}</p>
                        <p>Suggested Resell: ${item.generated_resell?.toFixed(2)}</p>
                        </div>
                    ))}
                    {recents.length > 3 && (
                        <Button variant='dark' onClick={() => navigate('/recents')}>
                            Show Recents
                        </Button>
                        
                    )}
                    </>
                ) : (
                    <p>No recents yet.</p>
                )}
            </div>


        </div>
    )
}



export default Home;