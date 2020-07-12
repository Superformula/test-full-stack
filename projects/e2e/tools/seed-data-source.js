const uuid = require('uuid').v4;

const time = Math.floor(Date.now()/1000);

module.exports = {
    users: [
        {
            id: uuid(),
            createdAt: time,
            name: "Matthew",
            description: "The coolest fella",
            address: "200 Walnut St. Kansas City 64106"
        },
        {
            id: uuid(),
            createdAt: time,
            name: "Jack",
            description: "",
            address: ""
        },
        {
            id: uuid(),
            createdAt: time,
            name: "Bill",
            description: "The cable guy",
            address: ""
        },
        {
            id: uuid(),
            createdAt: time,
            name: "Penny",
            description: "A lucky lady",
            address: ""
        },
        {
            id: uuid(),
            createdAt: time,
            name: "Martha",
            description: "Very suspicious",
            address: ""
        },
        {
            id: uuid(),
            createdAt: time,
            name: "Lisa",
            description: "",
            address: ""
        },
        {
            id: uuid(),
            createdAt: time,
            name: "Yuta",
            description: "Adventurous",
            address: ""
        },
        {
            id: uuid(),
            createdAt: time,
            name: "Lili",
            description: "Not lily",
            address: ""
        }  
    ]
};