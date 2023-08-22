import "./App.css";
import {useState, useEffect} from 'react'

export function Home() {

    const [data,setData] = useState([]);
    useEffect(()=>{
      getData();
    },[]);

    //Limpiar los campos
   

    const getData = async ()=>{
      try{
        const response = await fetch('http://localhost:8080/users');
        const dataJson = await response.json()

        setData(dataJson)
      }catch(error){
        console.log('Error',error)
      }
    }

    const [formData, setFormData] = useState(
        {
            title:'',
            year:'',
            genre:''
        }
    );
    const handleInputChange = (event) =>{
        const {name,value} = event.target;
        setFormData({
            ...formData,
            [name]:value
        });
        
    };

    const handleSubmit = async (event) =>{
        event.preventDefault();
        try{
            const response = await fetch('http://localhost:8080/createUser',{
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body: JSON.stringify(formData)
            });
            if(response.ok){
                alert("Datos Enviados correctamente")
                getData()
            }else{
                console.log('Hubo un problema al enviar los datos')
            }

        }catch(error){
            console.error('Error:',error)
        }
    }
  return (
    <div className="formulario-tabla-container">
      <div className="formulario">
        <h2>Formulario</h2>
        <form className="col-md-9 go-right" onSubmit={handleSubmit}>
          <div>
            <label>Titulo:</label>
            <input  type="text" id="title" name="title" placeholder="Título" autoComplete="off" value={formData.name} onChange={handleInputChange}/>
          </div>
          <div>
            <label>Año:</label>
            <input  type="text" id="year" name="year" placeholder="Año" autoComplete="off" value={formData.year} onChange={handleInputChange}/>
          </div>
          <div>
            <label>Género:</label>
            <input  type="text" id="genre" name="genre" placeholder="Género" autoComplete="off" value={formData.genre} onChange={handleInputChange}/>
          </div>
          <br></br>
          <button type="submit" className="btn btn-outline-primary">Primary</button>
        </form>
      </div>
      <div className="table">
        
        <table className="table table-dark">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Título</th>
            <th scope="col">Año</th>
            <th scope="col">Género</th>
          </tr>
        </thead>
        <tbody>
        {data !== null && data.length > 0 ? (
      data.map((item, index) => (
        <tr key={index}>
          <th scope="row">{index}</th>
          <td>{item.title}</td>
          <td>{item.year}</td>
          <td>{item.genre}</td>
        </tr>
      ))
    ) : (
      <tr>
        <td colSpan="4">No hay datos disponibles</td>
      </tr>
    )}
        </tbody>
        </table>
      </div>
    </div>
  );
}
