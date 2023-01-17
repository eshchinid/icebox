import {useEffect, useRef, useState} from "react";
import Table from "./Table";

const App = () => {

    const [nameProduct, setNameProduct] = useState(null);
    const [commentProduct,setCommentProduct] = useState(null);
    const [countProduct, setCountProduct] = useState(null);
    const [typeProduct, setTypeProduct] = useState(null);

    function addToDB (jsonData) {
        fetch('/api/product/add/', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(jsonData)
        }).then((response) => response.json())
            .then(res => res.data) // or res.json()
            .then(res => {
                console.log(res);
                setNameProduct(null);
                setCommentProduct(null);
                setCountProduct(null);
                setTypeProduct(null);
            });
    }

    const addNewProduct = (e) => {
        e.preventDefault()
        const newProdObj = {
            name: nameProduct,
            count: countProduct,
            comment: commentProduct,
            type: typeProduct
        }

        console.log(nameProduct+" "+ countProduct+" "+commentProduct)
        console.log(newProdObj)
        console.log(JSON.stringify(newProdObj));
        addToDB(newProdObj)
    }



    return (
    <div>
        <Table/>
        <br/>
        <h3>Добавление</h3>
        <br/>
        <form>
            <input
                value={nameProduct}
                onChange={e => setNameProduct(e.target.value)}
                type="text"
                placeholder="Наименование"
            />
            <input
                value={countProduct}
                onChange={e => setCountProduct(e.target.value)}
                type="number"
                placeholder="количество"
            />
            <input
                value={commentProduct}
                onChange={e => setCommentProduct(e.target.value)}
                type="text"
                placeholder="комментарий"
            />
            <input
                value={typeProduct}
                onChange={e => setTypeProduct(e.target.value)}
                type="text"
                placeholder="тип"
            />
            <button onClick={addNewProduct}>Добавить</button>
        </form>
    </div>

    )
}

export default App