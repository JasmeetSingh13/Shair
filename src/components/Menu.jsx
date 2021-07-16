import React, {useEffect,useState } from 'react';

import axios from 'axios';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import { Navbar } from 'react-bootstrap';
import { Nav } from 'react-bootstrap';
import { NavDropdown } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { FormControl } from 'react-bootstrap';
import  Button  from 'react-bootstrap/Button';
import Logo from '../images/shair.png';
import tesla from '../images/TeslaModels.png';
import tesla2 from '../images/teslaModels2.png';
import { Container } from 'react-bootstrap';
import { Carousel } from 'react-bootstrap';



const MAKE = 'Make';
const VEHICLE_TYPE = 'Vehicle Type';

const Menu = ()=>{

   
    const [vehicles, setVehicles] = useState(null);

    const[type,setType] =  useState([]);
    const[AllTypes,setAllTypes] =  useState([]);
    const[car,setCar] = useState([]);
    const[year,setYear] = useState([]);
    const[searchTerm,setSearchTerm] = useState('');
    const [query,setQuery] = useState('honda');

    const [valueMake,setValueMake]=useState('');

    const [valueType,setValueType]=useState('');
    const [showResultType, setShowResultType] = useState(MAKE);
    
    const apiURL_GetAllMakes = "https://vpic.nhtsa.dot.gov/api/vehicles/getallmakes/?format=json";
    const apiURL_GetAllTypes = `https://vpic.nhtsa.dot.gov/api/vehicles/GetVehicleTypesForMake/merc?format=json`;
    const apiURL_Type = `https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForVehicleType/${query}?format=json`
    const apiURL_GetModelsForMake =`https://vpic.nhtsa.dot.gov/api/vehicles/getmodelsformake/${query}?format=json`;
    // const apiURL_Year =`https://vpic.nhtsa.dot.gov/api/vehicles/getmodelsformakeyear/make/honda/modelyear/${query}?format=json`
    const fetchData = async () => {
        //const response_All_Make = await axios.get(apiURL_GetAllMakes)
        
        const response_Car = await axios.get(apiURL_GetModelsForMake)
        const response_Type = await axios.get(apiURL_Type)
        const response_AllTypes = await axios.get(apiURL_GetAllTypes)
        // const response_Year = await axios.get(apiURL_Year)
        // console.log(response_Car.data);
        // console.log(response_Type.data);
        //setVehicles(response_All_Make.data.Results);
        setAllTypes(response_AllTypes.data.Results);
        if(response_Car.data.SearchCriteria.includes(MAKE)){
       
            setCar(response_Car.data.Results);
        }
      if(response_Type.data.SearchCriteria.includes(VEHICLE_TYPE)){
            setType(response_Type.data.Results);
          
        }

    }   

    // const fetchMakeForVehicleType = async () => {
    //     const response_Type = await axios.get(apiURL_T);
    //     setType(response_Type.data.Results);
    // }
    
    // const fetchModelsForMake = async () => {
    //     const response_Car = await axios.get(apiURL_GetModelsForMake);
    //     setCar(response_Car.data.Results);
    // }

    const fetchAllMake = async () => {
        const response_All_Make = await axios.get(apiURL_GetAllMakes);
        setVehicles(response_All_Make.data.Results);
    }

    useEffect(() => {
        fetchAllMake();
    },[]);
    
  
    useEffect(() => {
        
        fetchData();
     
    }, [query]);
    
    const handleSelect=(make)=>{
      console.log(make);
      setValueMake(make);
      setQuery(make);
   setSearchTerm('');
    }
    const handleSelectType=(type)=>{
        console.log(type);
        setValueType(type);
        setQuery(type);
     setSearchTerm('');
      }
const updateSearch = e => {
    setSearchTerm(e.target.value);
    console.log(e.target.value)
}

const getSearch = e => {
    e.preventDefault();
    // if(response_Type.data.SearchCriteria==);
    setQuery(searchTerm );
   setSearchTerm('');
  
}


 const getUnique = (arr,comp)=>{
     const unique = arr

     //store the comparison values in array
     .map(e => e[comp])

     //store the keys of the unique objects
     .map((e,i,final) => final.indexOf(e) == i && i)

     //eliminate  the dead keys & store unique objects
     .filter(e => arr[e])
     .map(e => arr[e]);
     return unique;
 }




 let uniqueType = getUnique(AllTypes,"VehicleTypeName")
 
    
  return(
   
    <div className="row">

  <Navbar sticky="top" collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
       
  <Navbar.Brand className="logo" href="#home">
      <img
        
        src={Logo}
        alt="logo"
        width="150px"
        height="20px"
        className="d-inline-block align-top"
      />
      </Navbar.Brand>
     <div className="navElements">
  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
  <Navbar.Collapse id="responsive-navbar-nav">
     

      <div className="search-Form">
          <Nav>
    <Form onSubmit={getSearch} className="d-flex">
      <FormControl  type="text" placeholder="Car, Type, Make, Tesla" className="mr-2 " id="search-bar" value ={searchTerm} onChange={updateSearch}/>
      <Button className="searchBtn"variant="outline-success">Search</Button>
    </Form>
    </Nav>
    </div>
   
    <Nav
      className="me-auto"
     
      
      >
 
      <NavDropdown className="basic-nav-dropdown" title={valueMake || 'Makes'}id="dropdownMakes"  onSelect={handleSelect}>
      {
                vehicles && vehicles.slice(0,15).map((v)=>{
                    
                    return(
                       
                            <div key={v.Make_ID}>
                                <div>                                
                                
                                    <NavDropdown.Item className="Nav-Dropdown-item" eventKey={v.Make_Name}>{v.Make_Name}
                              
        <NavDropdown.Divider />
                                    </NavDropdown.Item>
                                </div>
                            </div>
                        
                    )
                })
            
            }
       
      
      </NavDropdown>
     
  
      <NavDropdown title={valueType || 'Types'}id="dropdownTypes"  onSelect={handleSelectType}>
  
        {
              
        uniqueType.map((t)=>{
           
           return(
           
          
                   <div key={t.VehicleTypeId}>
                       <div>                                
                           <NavDropdown.Item eventKey={t.VehicleTypeName}>{t.VehicleTypeName}
                           {console.log(t.VehicleTypeName)}
                           <NavDropdown.Divider />
                           </NavDropdown.Item>
                       </div>
                       {/* {console.log(getUnique(t.VehicleTypeName,t.MakeId))} */}
                   </div>
               
           )
             })
       
   }
       
      
      </NavDropdown>
  
 
      </Nav>
  </Navbar.Collapse>
  </div>
  </Container>
</Navbar>

{/* ********************************** TYPES*********************** */}


<div id="types"className="cars">{
    type&&type.slice(0,9).map((ty)=>{
                    
        return(
           
                <div key={ty.MakeId}>
                  
                    <div className="car">    
                   
                    <div className="name-model" >                           
                    <h3>{ty.MakeName}
                    
                    </h3>

                   
                    </div> 
                    {/* <img src={tesla} alt="" /> */}
                    <Carousel className="right-left">
  <Carousel.Item>
    <img
      className="d-block w-100"
      src={tesla} 
      alt="First slide"
    />
  
  </Carousel.Item>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src={tesla2} 
      alt="Second slide"
    />

  </Carousel.Item>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src={tesla} 
      alt="Third slide"
    />


  </Carousel.Item>
</Carousel>
                        <div className="VTName">
                    <h5>Vehicle Type: <span>{ty.VehicleTypeName}</span></h5>
                        </div>
                        </div>
                    </div>
                
            
            
        )
    })
}

</div>
{/* ********************************** MAKES*********************** */}
<div id="makes" className="cars">
{
    car && car.slice(0,10).map((c)=>{
                    
        return(
           
                <div key={c.Model_ID}>
                  
                    <div className="car">    
                   
                    <div className="name-model" >                           
                    <h3>{c.Make_Name}
                    
                    </h3>

                    <h4>{c.Model_Name}</h4>
                    </div> 
                    {/* <img src={tesla} alt="" /> */}
                    <Carousel className="right-left">
  <Carousel.Item>
    <img
      className="d-block w-100"
      src={tesla} 
      alt="First slide"
    />
  
  </Carousel.Item>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src={tesla2} 
      alt="Second slide"
    />

  </Carousel.Item>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src={tesla} 
      alt="Third slide"
    />


  </Carousel.Item>
</Carousel>
                        <p>{c.VehicleTypeName}</p>
                        </div>
                    </div>
                
            
            
        )
    })
}
</div>



</div> 



  );
    
};
export default Menu;