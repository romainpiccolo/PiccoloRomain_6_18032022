import { LightboxImg } from '../template/LightboxImg.js'
import { LightboxVideo } from '../template/LightboxVideo.js'

class LightboxFactory {
    constructor(data, type) {
        switch (type) {
            case 'img':
                return new LightboxImg(data);

            case 'video':
                return new LightboxVideo(data);
        
            default:
                throw 'Unknown type format'
        }
    }
}

export { LightboxFactory };