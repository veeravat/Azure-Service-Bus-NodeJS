/*
  Copyright (c) Microsoft Corporation. All rights reserved.
  Licensed under the MIT Licence.
  This sample demonstrates how to send/receive messages to/from session enabled queues/subscriptions
  in Service Bus.
  Setup: To run this sample, you would need session enabled Queue/Subscription.
  See https://docs.microsoft.com/azure/service-bus-messaging/message-sessions to learn about
  sessions in Service Bus.
*/

const { ServiceBusClient, delay } = require("@azure/service-bus");

// Load the .env file if it exists
// require("dotenv").config();

// Define connection string and related Service Bus entity names here
// Ensure on portal.azure.com that queue/topic has Sessions feature enabled
const connectionString = "<ServiceBus Connections>";
const queueName = "<Queue Name>";

const listOfScientists = [
    { lastName: "Einstein", firstName: "Albert" },
    { lastName: "Heisenberg", firstName: "Werner" },
    { lastName: "Curie", firstName: "Marie" },
    { lastName: "Hawking", firstName: "Steven" },
    { lastName: "Newton", firstName: "Isaac" },
    { lastName: "Bohr", firstName: "Niels" },
    { lastName: "Faraday", firstName: "Michael" },
    { lastName: "Galilei", firstName: "Galileo" },
    { lastName: "Kepler", firstName: "Johannes" },
    { lastName: "Kopernikus", firstName: "Nikolaus" }
];

async function main() {
    const sbClient = new ServiceBusClient(connectionString);

    try {

        await sendMessage(sbClient, listOfScientists[0], "session-1");
        await sendMessage(sbClient, listOfScientists[1], "session-1");
        await sendMessage(sbClient, listOfScientists[2], "session-1");
        await sendMessage(sbClient, listOfScientists[3], "session-1");
        await sendMessage(sbClient, listOfScientists[4], "session-1");

        await sendMessage(sbClient, listOfScientists[5], "session-2");
        await sendMessage(sbClient, listOfScientists[6], "session-2");
        await sendMessage(sbClient, listOfScientists[7], "session-2");
        await sendMessage(sbClient, listOfScientists[8], "session-2");
        await sendMessage(sbClient, listOfScientists[9], "session-2");

    } finally {
        console.log("Send message.... Completed");
    }
}

async function sendMessage(sbClient, scientist, sessionId) {
    // createSender() also works with topics
    const sender = sbClient.createSender(queueName);

    const message = {
        body: `${scientist.firstName} ${scientist.lastName}`,
        subject: "Scientist",
        sessionId: sessionId
    };
    try {
        console.log(`Sending message: "${message.body}" to "${sessionId}"`);
        await sender.sendMessages(message);
    } finally {
        await sender.close();
    }

}

main().catch((err) => {
    console.log("Error occurred: ", err);
    process.exit(1);
});