import dayjs from 'https://cdn.jsdelivr.net/npm/dayjs@1.11.13/+esm';

export const deliveryOptions = [
    {
        id: 1,
        deliveryDays: 7,
        priceCents: 0
    },
    {
        id: 2,
        deliveryDays: 3,
        priceCents: 499
    },
    {
        id: 3,
        deliveryDays: 1,
        priceCents: 999
    },

];
export function getDeliveryOption(deliveryOptionId) {
    let deliveryOption;

    deliveryOptions.forEach((option) => {
        if (option.id === deliveryOptionId) {
            deliveryOption = option;
        }
    });
    return deliveryOption || deliveryOptions[0];
}


function isWeekend(date) {
    const formatDate = date.format('dddd');
    if (formatDate === 'Sunday' || formatDate === 'Saturday')
        return true;

    return false;
}

export function calculateDeliveryDate(deliveryOption) {

    let deliveryDate = dayjs();
    let dayCounter = deliveryOption.deliveryDays;
    while (dayCounter > 0) {
        deliveryDate = deliveryDate.add(1, 'day');
        // if their is weekend then skip this step.
        if (!isWeekend(deliveryDate)) {
            dayCounter--;
        }
    }
    const dateString = deliveryDate.format(
        'dddd, MMMM D');
    return dateString;
}