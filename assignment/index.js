const express = require('express');
const fs = require('fs/promises');
const url = require('url');
const app = express();
const {data} = require("./data");






 
// QUESTION NO 02:

// fs.writeFile("doc.txt", "Products List");


// QUESTION NO 03:
app.post("/students/", (req,res)=>{
    const {name,age} = req.query;
    fs.writeFile("params.txt", `${name} ${age}`);
    
//Task 4    
    // fs.appendFile("params.txt", `\n${name} ${age}`);
    res.send("Done");
})



// QUESTION NO 05:
const dummyData = [
    {
        id: 1,
        productName: "Product A",
        quantity: 100,
        active: true
    },
    {
        id: 2,
        productName: "Product B",
        quantity: 150,
        active: false
    },
    {
        id: 3,
        productName: "Product C",
        quantity: 200,
        active: true
    }
];
module.exports = {
    data: data
};

// QUESTION NO 06:
app.get("/products", (req, res)=>{
    let result = data.filter((x)=> x.active === true);
    res.send(result);
})

//QUESTION NO 07:
app.get("/products/:productName", (req,res)=>{
    let productName = req.params?.productName.toLowerCase();
    let result = data.filter((x)=>{
        return x.productName.toLowerCase().includes(productName);
    })
    res.send(result);
})

// QUESTION NO 08
app.get("/product/:id", (req,res)=>{
    let productID = Number(req.params?.id);
    let result = data.filter((x)=>{
        return x.id === productID;
    })
    res.send(result);
})

//QUESTION NO  09
app.get("/product", (req,res)=>{
    const {productName,quantity} = req.query;
    let result = data.filter((x)=>{
        return x.quantity === Number(quantity) || x.productName.toLowerCase().includes(productName.toLowerCase()); 
    })
    res.send(result);
})
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});