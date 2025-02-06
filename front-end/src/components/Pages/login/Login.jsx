import { useState } from "react";

function Login(){
      
        const [img, setImg] = useState("")
        const [category, setCategory] = useState("")
        const [name, setName] = useState("")
       const categories =[ 
            "Atividade de pintura",
            "Atividade de matemática básica",
            "Atividade de português",
            "Atividade de alfabetização",
            "Atividade surpresa"
       ];
    
        const handleClick = () => {
    
            const formData = new FormData()
            formData.append("name", name)
            formData.append("category", category)
            formData.append("image", img)
    
            fetch("http://localhost:8080/single", {
                method: "POST",
                body: formData,
            })
            .then((res) => {
                console.log(res.msg)
            })
            .catch((err) => {
                console.log(err)
            });
        };
    return(
        <div>
                <h1>Escolha à atividade e sua categoria</h1>
                <input onChange={(e) => setName(e.target.value)} type="text" placeholder="Nome da atividade" />
                <select 
                onChange={(e) => setCategory(e.target.value)}
                value={category}
                >
                    <option value="">Selecione uma categoria</option>
                    {categories.map((cat, index) => (
                        <option key={index} value={cat}>
                            {cat}
                        </option>
                    ))}
                </select>
                <input onChange={(e) => setImg(e.target.files[0])} type="file" />
                <br />
                <button onClick={handleClick}>Submit</button>
            </div>
    )
}
export default Login