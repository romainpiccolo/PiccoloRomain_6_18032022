import { MediaImg } from "../models/MediaImg.js";
import { MediaVideo } from "../models/MediaVideo.js";

class MediaFactory {
    constructor(data, type) {
        switch (type) {
            case 'img':
                return new MediaImg(data);
                break;

            case 'video':
                return new MediaVideo(data);
                break;
        
            default:
                throw 'Unknown type format'
        }
    }
}

export { MediaFactory };