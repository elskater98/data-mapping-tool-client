import moment from "moment";

const alphabeticalSort = (a: string, b: string) => {
    return a.localeCompare(b)
}

const integerSort = (a: number, b: number) => {
    return a - b;
}

const dateSort = (dateA: any, dateB: any) => moment(dateA).diff(moment(dateB));


export {alphabeticalSort, integerSort, dateSort};
