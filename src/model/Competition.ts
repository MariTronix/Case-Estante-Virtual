export class Competition {
    constructor(
        private id: string,
        private name: string,
        private date: string,
        private status: string
    ){}

    public getId = () => {
        return this.id
    };

    public getName = () => {
        return this.name
    };

    public getDate = () => {
        return this.date
    };

    public getStatus = () => {
        return this.status
    };
};