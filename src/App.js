import { useState } from 'react';
import './style.css';
import { FcSearch } from 'react-icons/fc';
import api from './searchs/api';

function App() {

  const [input, setInput] = useState('')
  //input=saber o valor
  //setInput = passar um novo valor

  const [cep, setCep] = useState({});

  async function handleSearch(){
    if (input === ''){
      alert("Preencha o CEP escolhido!")
      return;
    }

    try {
      const response = await api.get(`${input}/json`);
      setCep(response.data)
      setInput("");

    } catch{
      alert("Ops, CEP errado!")
      setInput("")
      //com esse set eu volto ao valor vazio
    }
  }
  
  

  return (

    <div className='container'>
      <h1 className='title'>Buscador de CEP</h1>
      
      <div className='containerInput'>
        <input type='number' 
        placeholder='Digite o seu CEP'
        value={input}
        onChange={(event) => setInput (event.target.value) }>

        </input>

        <button className='buttonSearch' onClick={handleSearch}>
          <FcSearch /></button>
      </div>


      {Object.keys(cep).length > 0 && (
        <div className='main'>
        <h2> CEP: {cep.cep} </h2>
        <span>  {cep.logradouro}</span>
        
        <span>{cep.bairro} </span>
        <span> {cep.localidade} - {cep.uf} </span>

      </div>
      //estou acessando a useState(cep) e verificando se há alguma coisa no objeto, assim ele só aparecerá se selecionado.
      )}
      
    </div>


  );
  }

export default App;
