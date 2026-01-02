import React from 'react';
import { useState, useEffect } from 'react';

const FormAndList = () => {
    const userToken = localStorage.getItem("token");

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [description, setDescription] = useState("");
    const [items, setItems] = useState([]);
    const [editingItemId, setEditingItemId] = useState(null);
    const [editedItem, setEditedItem] = useState({
        name: "",
        email: "",
        phone: "",
        description: "",
    });

    // handling edit 
    const startEditing = (item) => {
        setEditingItemId(item._id);
        setEditedItem({
            name: item.name,
            email: item.email,
            phone: item.phone,
            description: item.description,
        });
    };

    // api call for edit
    const updateItem = async (itemId) => {
        try {
            const res = await fetch(
                `http://localhost:3000/user/items/${itemId}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${userToken}`,
                    },
                    body: JSON.stringify(editedItem),
                }
            );

            const data = await res.json();
            alert(data.message);

            if (res.ok) {
                setEditingItemId(null);
                loadItems();
            }
        } catch (error) {
            alert(error.message);
        }
    };

    // item update
    const fillFormForEdit = (item) => {
        setName(item.name);
        setEmail(item.email);
        setPhone(item.phone);
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

    // add contact request
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
                    "email": email,
                    "phone": Number(phone),
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

                {items.map((item) => {
                    const isEditing = editingItemId === item._id;

                    return (
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
                            {/* buttons */}
                            <div
                                style={{
                                    position: "absolute",
                                    top: "10px",
                                    right: "10px",
                                    display: "flex",
                                    gap: "8px",
                                }}
                            >
                                {isEditing ? (
                                    <button
                                        onClick={() => updateItem(item._id)}
                                        style={{
                                            background: "#4caf50",
                                            border: "none",
                                            color: "#fff",
                                            padding: "6px 10px",
                                            borderRadius: "6px",
                                            cursor: "pointer",
                                        }}
                                    >
                                        OK
                                    </button>
                                ) : (
                                    <button
                                        onClick={() => startEditing(item)}
                                        style={{
                                            background: "#4caf50",
                                            border: "none",
                                            color: "#fff",
                                            padding: "6px 10px",
                                            borderRadius: "6px",
                                            cursor: "pointer",
                                        }}
                                    >
                                        Edit
                                    </button>
                                )}

                                <button
                                    onClick={() => deleteItem(item._id)}
                                    style={{
                                        background: "#ff4d4d",
                                        border: "none",
                                        color: "#fff",
                                        padding: "6px 10px",
                                        borderRadius: "6px",
                                        cursor: "pointer",
                                    }}
                                >
                                    Delete
                                </button>
                            </div>

                            {/* fields */}
                            {isEditing ? (
                                <>
                                    <input
                                        value={editedItem.name}
                                        onChange={(e) =>
                                            setEditedItem({ ...editedItem, name: e.target.value })
                                        }
                                    />
                                    <input
                                        value={editedItem.email}
                                        onChange={(e) =>
                                            setEditedItem({ ...editedItem, email: e.target.value })
                                        }
                                    />
                                    <input
                                        type="number"
                                        value={editedItem.phone}
                                        onChange={(e) =>
                                            setEditedItem({ ...editedItem, phone: e.target.value })
                                        }
                                    />
                                    <textarea
                                        value={editedItem.description}
                                        onChange={(e) =>
                                            setEditedItem({ ...editedItem, description: e.target.value })
                                        }
                                    />
                                </>
                            ) : (
                                <>
                                    <strong style={{ fontSize: "1.2rem" }}>{item.name}</strong>
                                    <span>Email: {item.email}</span>
                                    <span>Phone: ₹{item.phone}</span>
                                    <p>{item.description}</p>
                                </>
                            )}
                        </div>
                    );
                })}
            </div>

            {/* item creation form div */}
            <div style={{ width: "30%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-evenly", background: "#cff1f0ff", border: "1px solid #fff", borderRadius: "20px" }}>
                {/* heading */}
                <div style={{ width: "100%", height: "10%", display: "flex", justifyContent: "center", alignItems: "center", fontSize: "1.5rem", cursor: "default" }}>
                    Add Contact
                </div>

                {/* form */}
                <div style={{ width: "100%", height: "78%", display: "flex", flexDirection: "column", justifyContent: "space-evenly", alignItems: "center" }}>
                    {/* name */}
                    <div style={{ width: "80%", height: "20%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-evenly" }}>
                        <div style={{ width: "100%", height: "20%", display: "flex", alignItems: "center", cursor: "default" }}>
                            Name of Contact
                        </div>
                        <textarea value={name} onChange={(e) => setName(e.target.value)} style={{ width: "100%", height: "45%", resize: "none", borderRadius: "10px", fontSize: "1.2rem", justifyItems: "center" }}></textarea>
                    </div>

                    {/* email */}
                    <div style={{ width: "80%", height: "20%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-evenly" }}>
                        <div style={{ width: "100%", height: "20%", display: "flex", alignItems: "center", cursor: "default" }}>
                            email of Contact
                        </div>
                        <textarea value={email} onChange={(e) => setEmail(e.target.value)} style={{ width: "100%", height: "45%", resize: "none", borderRadius: "10px", fontSize: "1.2rem", justifyItems: "center" }}></textarea>
                    </div>

                    {/* phone */}
                    <div style={{ width: "80%", height: "20%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-evenly" }}>
                        <div style={{ width: "100%", height: "20%", display: "flex", alignItems: "center", cursor: "default" }}>
                            Phone of Contact
                        </div>
                        <textarea value={phone} onChange={(e) => setPhone(e.target.value)} style={{ width: "100%", height: "45%", resize: "none", borderRadius: "10px", fontSize: "1.2rem", justifyItems: "center" }}></textarea>
                    </div>

                    {/* description */}
                    <div style={{ width: "80%", height: "35%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-evenly" }}>
                        <div style={{ width: "100%", height: "20%", display: "flex", alignItems: "center", cursor: "default" }}>
                            Description of Contact
                        </div>
                        <textarea value={description} onChange={(e) => setDescription(e.target.value)} style={{ width: "100%", height: "65%", resize: "none", borderRadius: "10px", fontSize: "1.2rem", justifyItems: "center" }}></textarea>
                    </div>
                </div>

                {/* button */}
                <div onClick={handleAddition} style={{ width: "80%", height: "8%", background: "#516af3ff", borderRadius: "20px", color: "#fff", display: "flex", justifyContent: "center", alignItems: "center", fontSize: "1.3rem", cursor: "default" }}>
                    add contact
                </div>
            </div>
        </div>
    )
}

export default FormAndList
