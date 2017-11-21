function timeout (milliseconds: number = 0 ) {
    return function (target, key, descriptor) {
        const originalMetod = descriptor.value;
        descriptor.value = function(...args) {
            setTimeout(() => {
                originalMetod.apply(this, args);
            }, milliseconds);
        };
        return descriptor;
    };
}
