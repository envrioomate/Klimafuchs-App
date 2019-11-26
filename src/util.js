import {dev, prod} from '../env';
export const Env = __DEV__ ? dev : prod;

export class Util {
    static AvatarToUri(image) {

        if (image) {
            if (image.filename) {
                return `${Env.API_IMG_URL}${image.filename}`
            }
        }
        return `${Env.API_IMG_URL}avatar_default.png`

    }
}