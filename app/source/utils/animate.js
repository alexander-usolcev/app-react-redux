'use strict';

// based on http://en.wikipedia.org/wiki/Smoothstep
function smoothStep(start, end, point) {
    if (point <= start) {
        return 0;
    }

    if (point >= end) {
        return 1;
    }
    const x = (point - start) / (end - start); // interpolation

    return x * x * (3 - 2 * x);
}

export function animateScrollLeft(element, target, duration) {
    target = Math.round(target);
    duration = Math.round(duration);

    if (duration < 0) {
        return Promise.reject('Bad duration');
    }

    if (duration === 0) {
        element.scrollLeft = target;

        return Promise.resolve();
    }

    const startTime = Date.now();
    const endTime = startTime + duration;

    const startLeft = element.scrollLeft;
    const distance = target - startLeft;


    return new Promise(function(resolve, reject) {

        // This is like a think function from a game loop
        function scrollFrame() {
            if (element.scrollLeft !== previousLeft) {
                reject('Interrupt animation');

                return;
            }

            // set the scrollLeft for this frame
            const now = Date.now();
            const point = smoothStep(startTime, endTime, now);
            const frameLeft = Math.round(startLeft + (distance * point));

            element.scrollLeft = frameLeft;

            // check if we're done!
            if (now >= endTime) {
                resolve();

                return;
            }

            // If we were supposed to scroll but didn't, then we
            // probably hit the limit, so consider it done; not
            // interrupted.
            if (element.scrollLeft === previousLeft && element.scrollLeft !== frameLeft) {
                resolve();

                return;
            }

            previousLeft = element.scrollLeft;

            // schedule next frame for execution
            setTimeout(scrollFrame, 0);
        }

        // This is to keep track of where the element's scrollLeft is
        // supposed to be, based on what we're doing
        let previousLeft = element.scrollLeft;

        // boostrap the animation process
        setTimeout(scrollFrame, 0);
    });
}

