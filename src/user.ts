import { banaKv } from './consts';
import { compress } from './compress';

export class User {
    id: string;
    banaCount: number;
    lastGrab: number;
    buildings: object;
    achievements: [];

    constructor(id: string) {
        this.id = id;
        this.banaCount = 0;
        this.lastGrab = 0;
        this.buildings = {
            monke: {
                num: 1,
                lvl: 0
            }
        };
        this.achievements = [];
    }
}

// Checks if the player has played bana before, and if not,
export async function checkForNewPlayer(id: string) {
    // @ts-ignore
    if (!(await banaKv.get<jsonObject>(id))) {
        let userObj = new User(id);
        let compressedObj = compress(userObj);
        // @ts-ignore
        await banaKv.put<jsonObject>(id, compressedObj);
    }
}
