import React from 'react';
import { useState, useEffect } from 'react';

const FormAndList = () => {
    const userToken = localStorage.getItem("token");

    const [name, setName] = useState("");
    const [company, setCompany] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [items, setItems] = useState([]);

    // item update
    const fillFormForEdit = (item) => {
        setName(item.name);
        setCompany(item.company);
        setPrice(item.price);
        setDescription(item.description);
    };


    // delete item
    const deleteItem = async (itemId) => {
        try {
            const res = await fetch(`http://localhost:3000/user/items/${itemId}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${userToken}`,
                },
            });

            const data = await res.json();
            alert(data.message);

            if (res.ok) {
                loadItems();
            }
        } catch (error) {
            alert(error.message);
        }
    };

    // load item list 
    const loadItems = async () => {
        try {
            const res = await fetch("http://localhost:3000/user/items", {
                headers: {
                    Authorization: `Bearer ${userToken}`,
                }
            });

            const data = await res.json();
            setItems(data.items);
        } catch (error) {
            alert(error.message);
        }
    }

    // add item request
    const handleAddition = async () => {
        try {
            const res = await fetch("http://localhost:3000/user/items", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${userToken}`,
                },
                body: JSON.stringify({
                    "name": name,
                    "company": company,
                    "price": Number(price),
                    "description": description
                }),
            });

            const data = await res.json();
            alert(data.message);

            if (res.ok) {
                loadItems();
            }
        } catch (error) {
            alert(error.message);
        }
    }

    // use context hook
    useEffect(() => {
        loadItems();
    }, []);

    return (
        // outer div
        <div style={{ width: "100%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
            {/* item list div */}
            <div
                style={{
                    width: "70%",
                    height: "100%",
                    overflow: "auto",
                    padding: "20px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "15px",
                }}
            >
                {items.length === 0 && (
                    <p style={{ textAlign: "center" }}>No items found</p>
                )}

                {items.map((item) => (
                    <div
                        key={item._id}
                        style={{
                            padding: "15px",
                            borderRadius: "12px",
                            background: "#f5f5f5",
                            display: "flex",
                            flexDirection: "column",
                            gap: "6px",
                            position: "relative",
                        }}
                    >
                        {/* buttons container */}
                        <div
                            style={{
                                position: "absolute",
                                top: "10px",
                                right: "10px",
                                display: "flex",
                                gap: "8px",
                            }}
                        >
                            {/* edit button */}
                            <button
                                onClick={() => fillFormForEdit(item)}
                                style={{
                                    background: "#4caf50",
                                    border: "none",
                                    color: "#fff",
                                    padding: "6px 10px",
                                    borderRadius: "6px",
                                    cursor: "pointer",
                                    fontSize: "0.9rem",
                                }}
                            >
                                Edit
                            </button>

                            {/* delete button */}
                            <button
                                onClick={() => deleteItem(item._id)}
                                style={{
                                    background: "#ff4d4d",
                                    border: "none",
                                    color: "#fff",
                                    padding: "6px 10px",
                                    borderRadius: "6px",
                                    cursor: "pointer",
                                    fontSize: "0.9rem",
                                }}
                            >
                                Delete
                            </button>
                        </div>

                        <strong style={{ fontSize: "1.2rem" }}>{item.name}</strong>
                        <span>Company: {item.company}</span>
                        <span>Price: ₹{item.price}</span>
                        <p>{item.description}</p>
                    </div>
                ))}
            </div>

            {/* item creation form div */}
            <div style={{ width: "30%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-evenly", background: "#cff1f0ff", border: "1px solid #fff", borderRadius: "20px" }}>
                {/* heading */}
                <div style={{ width: "100%", height: "10%", display: "flex", justifyContent: "center", alignItems: "center", fontSize: "1.5rem", cursor: "default" }}>
                    Add Item
                </div>

                {/* form */}
                <div style={{ width: "100%", height: "78%", display: "flex", flexDirection: "column", justifyContent: "space-evenly", alignItems: "center" }}>
                    {/* name */}
                    <div style={{ width: "80%", height: "20%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-evenly" }}>
                        <div style={{ width: "100%", height: "20%", display: "flex", alignItems: "center", cursor: "default" }}>
                            Name of Product
                        </div>
                        <textarea value={name} onChange={(e) => setName(e.target.value)} style={{ width: "100%", height: "45%", resize: "none", borderRadius: "10px", fontSize: "1.2rem", justifyItems: "center" }}></textarea>
                    </div>

                    {/* company */}
                    <div style={{ width: "80%", height: "20%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-evenly" }}>
                        <div style={{ width: "100%", height: "20%", display: "flex", alignItems: "center", cursor: "default" }}>
                            Company of Product
                        </div>
                        <textarea value={company} onChange={(e) => setCompany(e.target.value)} style={{ width: "100%", height: "45%", resize: "none", borderRadius: "10px", fontSize: "1.2rem", justifyItems: "center" }}></textarea>
                    </div>

                    {/* price */}
                    <div style={{ width: "80%", height: "20%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-evenly" }}>
                        <div style={{ width: "100%", height: "20%", display: "flex", alignItems: "center", cursor: "default" }}>
                            Price of Product
                        </div>
                        <textarea value={price} onChange={(e) => setPrice(e.target.value)} style={{ width: "100%", height: "45%", resize: "none", borderRadius: "10px", fontSize: "1.2rem", justifyItems: "center" }}></textarea>
                    </div>

                    {/* description */}
                    <div style={{ width: "80%", height: "35%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-evenly" }}>
                        <div style={{ width: "100%", height: "20%", display: "flex", alignItems: "center", cursor: "default" }}>
                            Description of Product
                        </div>
                        <textarea value={description} onChange={(e) => setDescription(e.target.value)} style={{ width: "100%", height: "65%", resize: "none", borderRadius: "10px", fontSize: "1.2rem", justifyItems: "center" }}></textarea>
                    </div>
                </div>

                {/* button */}
                <div onClick={handleAddition} style={{ width: "80%", height: "8%", background: "#516af3ff", borderRadius: "20px", color: "#fff", display: "flex", justifyContent: "center", alignItems: "center", fontSize: "1.3rem", cursor: "default" }}>
                    add item
                </div>
            </div>
        </div>
    )
}

export default FormAndList
