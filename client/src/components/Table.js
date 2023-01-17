import React, {useEffect, useState} from 'react';

const Table = () => {

    const refreshTable = () => fetch('/api/product', {
        method: 'GET'
    }).then(res => {
        if (res.status === 200) {
            return res.json()
        }
    }).then(data => {
        setProducts(data)
    })

    const [products, setProducts] = useState([]);
    const [name, setName] = useState([null]);
    const [id, setID] = useState([null]);
    const [type, setType] = useState([null]);
    const [comment, setComment] = useState([null])


    function uptDB(jsonData) {
        fetch('/api/product/update/', {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(jsonData)
        }).then((response) => response.json())
            .then(res => res.data) // or res.json()
            .then(res => {
                console.log(res);
                refreshTable();
            });
    }

    const changeProduct = (e) => {
        e.preventDefault()
        const changeProdObj = {
            name,
            type,
            comment,
            id
        }
        uptDB(changeProdObj)
    }

    const toChangeForm = (id, name, type, comment) => {
        setName(name);
        setType(type)
        setComment(comment)
        setID(id)
    }


    useEffect(() => {
        refreshTable()
    }, [])

    function deleteBt(id) {
        console.log("удалили", id)
        fetch('/api/product/delete/' + id, {
            method: "POST",
        }).then(res => res.data) // or res.json()
            .then(res => console.log(res));
        refreshTable();
    }


    return (
        <div>
            <table border="3px solid">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Наименование</th>
                    <th>Количество</th>
                    <th>Тип</th>
                    <th>Дата</th>
                    <th>Комментарий</th>
                    <th>Удаление</th>
                    <th>Изменение</th>
                </tr>
                </thead>
                <tbody>
                {products.map(function (el, index) {
                    return <tr onDoubleClick={() => toChangeForm(el.id, el.name, el.type, el.comment)}>
                        <td>{el.id}</td>
                        <td>{el.name}</td>
                        <td>{el.count}</td>
                        <td>{el.type}</td>
                        <td>{el.comment}</td>
                        <td>{el.date_create}</td>
                        <td>
                            <button onClick={() => deleteBt(el.id)}>Удалить</button>
                        </td>
                        <td>
                            <button onClick={() => toChangeForm(el.id, el.name, el.type, el.comment)}>Изменить</button>
                        </td>
                    </tr>
                })
                }
                </tbody>
            </table>
            <br/>
            <h3>Изменение</h3>
            <form>
                {/*<input*/}
                {/*    value={id}*/}
                {/*/>*/}
                <input
                    value={name}
                    onChange={e => setName(e.target.value)}
                />
                <input
                    value={type}
                    onChange={e => setType(e.target.value)}
                />
                <input
                    value={comment}
                    onChange={e => setComment(e.target.value)}
                />
                <button onClick={changeProduct}>Сохранить</button>
            </form>
        </div>
    );
};

export default Table;