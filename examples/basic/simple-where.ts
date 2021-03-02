import { from } from "linqscript";

type User = {
    id: number,
    username: string,
    group: string,
    data?: string,
    followers: number,
    login?: Date
};

const users: User[] = [
    {
        id: 1,
        username: "john",
        followers: 100,
        group: "a"
    },
    {
        id: 1,
        username: "charles",
        followers: 100,
        group: "d"
    },
    {
        id: 1,
        username: "victor",
        followers: 100,
        group: "c"
    },{
        id: 1,
        username: "tony",
        followers: 100,
        group: "a"
    }
];

const result = from(users).where(x => x.group === "a").count();

// show the result
console.log(result); // expected 2