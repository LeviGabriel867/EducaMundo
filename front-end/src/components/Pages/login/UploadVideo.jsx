import { useState } from "react";
import CustomDropdown from "./CustomDropdown";

function UploadVideo() {
  const [URLs, setURLs] = useState(""); //Precisam ser os mesmo nomes da API
  const [category, setCategory] = useState(""); 
  const [message, setMessage] = useState("")
  const categories = [
    "Vídeo musical educativo",
    "Vídeo de desenho educativo",
    "Filmes gratuitos no YouTube para educação especial"
  ];  


  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {URLs, category}
    
    try {
        const response = await fetch("http://localhost:8080/uploadVideos", {
        method: "POST",
        headers: {"Content-type": "application/json"},
        body: JSON.stringify(data)
    })

    const result = await response.json();
    setMessage(result.msg) //MSG vem da API

    if(response.ok){
        setMessage("Envio realizado com sucesso.")
        setURLs("");
        setCategory("");
    }
    } catch (error) {
        console.error(error)
        setMessage("Erro ao enviar o vídeo")
    }

  }

  return (
    <div className="container-video">
        <h2>Selecione a categoria e envie o link do vídeo.</h2>

        <form onSubmit={handleSubmit}>
            <label htmlFor="">Insira a URL do vídeo</label>
            <input type="text" placeholder="URL" value={URLs} onChange={(e) => setURLs(e.target.value)} required />

            <CustomDropdown options={categories} selected={category} setSelected={setCategory} width='100%' /> 
            <button type="submit">Enviar</button> {/*Por está dentro de um form, a propriedade Submit já faz o envio de forma encapsulada*/}
        </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default UploadVideo;
