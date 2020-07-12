const uuid = require('uuid').v4;

module.exports = {
    users: [
        {
            id: uuid(),
            createdAt: Date.now(),
            name: "Matthew",
            description: "The coolest fella",
            address: "200 Walnut St. Kansas City 64106"
        },
        {
            id: uuid(),
            createdAt: Date.now(),
            name: "Jack",
            description: "",
            address: ""
        },
        {
            id: uuid(),
            createdAt: Date.now(),
            name: "Bill",
            description: "The cable guy",
            address: ""
        },
        {
            id: uuid(),
            createdAt: Date.now(),
            name: "Penny",
            description: "A lucky lady",
            address: ""
        },
        {
            id: uuid(),
            createdAt: Date.now(),
            name: "Martha",
            description: "Very suspicious",
            address: ""
        },
        {
            id: uuid(),
            createdAt: Date.now(),
            name: "Lisa",
            description: "",
            address: ""
        },
        {
            id: uuid(),
            createdAt: Date.now(),
            name: "Yuta",
            description: "Adventurous",
            address: ""
        },
        {
            id: uuid(),
            createdAt: Date.now(),
            name: "Lili",
            description: "Not lily",
            address: ""
        }  
    ]
};