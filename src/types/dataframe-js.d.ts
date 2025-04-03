declare module 'dataframe-js' {
    export class DataFrame {
        constructor(data: Record<string, any[]>);
        listColumns(): string[];
        select(column: string): DataFrame;
        toArray(): any[][];
    }
} 