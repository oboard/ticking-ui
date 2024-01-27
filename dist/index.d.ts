export declare class ZenLiter {
    pages: Record<string, string>;
    debug: boolean;
    constructor(pages: Record<string, string>);
}
export declare function back(): void;
export declare function forward(): void;
export declare function push(url: string): void;
export declare function to(url: string): void;
export declare function reload(): void;
export declare function build(parent: HTMLElement | string): void;
