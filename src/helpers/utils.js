//consts
const date = new Date('2021/1/5 00:00:00')
import { v4 as uuidv4 } from 'uuid';
export const dateDiff = (dateFuture = date, dateNow = new Date()) => {
    let diffInMilliSeconds = Math.abs(dateFuture - dateNow) / 1000;

    // calculate days
    const days = Math.floor(diffInMilliSeconds / 86400);
    diffInMilliSeconds -= days * 86400;

    // calculate hours
    const hours = Math.floor(diffInMilliSeconds / 3600) % 24;
    diffInMilliSeconds -= hours * 3600;

    // calculate minutes
    const minutes = Math.floor(diffInMilliSeconds / 60) % 60;
    diffInMilliSeconds -= minutes * 60;
    console.log('minutes', minutes);

    let difference = '';
    if (days > 0) {
        difference += (days === 1) ? `${days} Gün, ` : `${days} Gün, `;
    }

    difference += (hours === 0 || hours === 1) ? `${hours} Saat, ` : `${hours} Saat, `;

    difference += (minutes === 0 || hours === 1) ? `${minutes} Dakika` : `${minutes} Dakika`;

    return difference;
}


export const generateUuid = () => {
    return uuidv4();
}

export const formatListCols = (data, numColumns) => {
    const numberOfFullRows = Math.floor(data.length / numColumns);

    let numberOfElementsLastRow = data.length - (numberOfFullRows * numColumns);
    while (numberOfElementsLastRow !== numColumns && numberOfElementsLastRow !== 0) {
        data.push({ id: `blank-${numberOfElementsLastRow}`, empty: true });
        numberOfElementsLastRow++;
    }

    return data;
};