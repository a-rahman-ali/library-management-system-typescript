export class Book {
    private _title: string;
    private _author: string;
    private _bookId: number;
    private _checkedOut: boolean;

    constructor(title: string, author: string, bookId: number, checkedOut: boolean = false, public quantity: number = 1) {
        this._title = title;
        this._author = author;
        this._checkedOut = checkedOut;
        this._bookId = bookId;
    }

    get title(): string {
        return this._title;
    }

    get author(): string {
        return this._author;
    }

    get bookId(): number {
        return this._bookId;
    }

    get checkedOut(): boolean {
        return this._checkedOut;
    }

    set checkedOut(value: boolean) {
        this._checkedOut = value;
    }
}