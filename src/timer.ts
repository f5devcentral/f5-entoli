import { log } from "./service";



export function timer (): void {

    // clear any timer we are currently tracking
    // clearInterval(tokenIntervalId);
    let tokenTimeout = 3;
    
    const tokenIntervalId = setInterval(() => {
        tokenTimeout--;
    
        log.info('timmer runing:', tokenTimeout)

        // keep running the timer so everything looks good, but clear the rest when it reaches 0
        if (tokenTimeout <= 0) {
            clearInterval(tokenIntervalId);    
        }
    }, 1000);
}