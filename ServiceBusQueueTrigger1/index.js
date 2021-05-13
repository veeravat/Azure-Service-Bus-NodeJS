module.exports = async function (context, mySbMsg) {
    context.log.warn('JavaScript ServiceBus queue trigger function processed message', mySbMsg);
    context.log.warn('EnqueuedTimeUtc =', context.bindingData.enqueuedTimeUtc);
    context.log.warn('DeliveryCount =', context.bindingData.deliveryCount);
    context.log.warn('MessageId =', context.bindingData.messageId);
    context.done();
};