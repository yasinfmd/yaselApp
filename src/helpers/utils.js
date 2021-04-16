//consts
const MS_one_day = 1000 * 60 * 60 * 24;
const date = new Date(2021, 0, 5, 0, 0, 0, 0)
import { v4 as uuidv4 } from 'uuid';
export const dateDiff = (y) => {
    let date1 = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate());
    let date2 = Date.UTC(y.getFullYear(), y.getMonth(), y.getDate());
    return Math.floor((date2 - date1) / MS_one_day);
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