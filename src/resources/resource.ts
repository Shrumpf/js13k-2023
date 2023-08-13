export class Resource {
    name: string;
    value: number;
    current: number;

    constructor(name: string, value: number) {
        this.name = name;
        this.value = value;
        this.current = 0;
    }
}