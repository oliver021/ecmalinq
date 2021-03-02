/**
 * @abstract
 * @description The basic inetrface to create data to make a test
 */
export interface IFixture {
    num: number;
    data: string;
}
/**
 * @inheritdoc
 */
export interface IFixture2 extends IFixture {
    support?: true;
    issue?: string;
    moment?: Date;
    num2?: number;
}

export interface IRelA{
    id: number,
    text: string
}

export interface IRelB{
    tag: number,
    tag2: number,
    text: string
}

export interface IRelResult{
    textA: string,
    textB: string,
    id: number
}

export interface RelResult{
    a: IRelA[],
    b: IRelB[]
}

export function mockRelations(): RelResult {
    return {
        a: [
            {
                id:2,
                text: 'this is one'
            },
            {
                id:5,
                text: 'this is two'
            }
        ],
        b: [
            {
                tag: 2,
                tag2: 1,
                text: 'this is binder #1'
            },
            {
                tag: 2,
                tag2: 5,
                text: 'this is binder #2'
            },
            {
                tag: 3,
                tag2: 3,
                text: 'this is binder #3'
            },
        ]
    }
}
